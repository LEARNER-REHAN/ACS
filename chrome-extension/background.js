let activeSite = null;
let trackingInterval = null;

const socialSites = {
  youtube: ["youtube.com"],
  instagram: ["instagram.com"],
  facebook: ["facebook.com"],
  twitter: ["twitter.com", "x.com"],
};

// Detect active tab change
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  checkTracking(tab);
});

// Detect URL change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    checkTracking(tab);
  }
});

function checkTracking(tab) {
  stopTracking();

  if (!tab.url) return;

  for (let site in socialSites) {
    const domains = socialSites[site];

    const matched = domains.some((domain) => tab.url.includes(domain));

    if (matched) {
      startTracking(site);
      break;
    }
  }
}

function startTracking(site) {
  activeSite = site;

  console.log("Tracking started:", site);

  trackingInterval = setInterval(() => {
    chrome.storage.local.get(["usageData"], (result) => {
      let usageData = result.usageData || {
        youtube: 0,
        instagram: 0,
        facebook: 0,
        twitter: 0,
      };

      // Add 1 second
      usageData[activeSite] += 1;

      chrome.storage.local.set({ usageData });

      console.log("Updated:", usageData);

      // Send live data to React app
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach((tab) => {
          if (tab.url && tab.url.includes("localhost:3000")) {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: (data) => {
                localStorage.setItem("socialUsageData", JSON.stringify(data));
              },
              args: [usageData],
            });
          }
        });
      });
    });
  }, 1000); // every second
}

function stopTracking() {
  if (trackingInterval) {
    clearInterval(trackingInterval);
    trackingInterval = null;
  }

  activeSite = null;
}
