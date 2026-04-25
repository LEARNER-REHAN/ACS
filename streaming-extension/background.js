let activeSite = null;
let trackingInterval = null;

const streamingSites = {
  netflix: ["netflix.com"],
  prime: ["primevideo.com", "amazonprime.com"],
  hotstar: ["hotstar.com", "jiocinema.com"],
  twitch: ["twitch.tv"],
};

// Detect tab switching
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  checkTracking(tab);
});

// Detect URL changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    checkTracking(tab);
  }
});

function checkTracking(tab) {
  stopTracking();

  if (!tab.url) return;

  for (let site in streamingSites) {
    const domains = streamingSites[site];

    const matched = domains.some((domain) => tab.url.includes(domain));

    if (matched) {
      startTracking(site);
      break;
    }
  }
}

function startTracking(site) {
  activeSite = site;

  console.log("Streaming tracking started:", site);

  trackingInterval = setInterval(() => {
    chrome.storage.local.get(["streamingData"], (result) => {
      let streamingData = result.streamingData || {
        netflix: 0,
        prime: 0,
        hotstar: 0,
        twitch: 0,
      };

      // Add 1 second
      streamingData[activeSite] += 1;

      chrome.storage.local.set({ streamingData });

      console.log("Updated Streaming Data:", streamingData);

      // Send data to React app
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach((tab) => {
          if (tab.url && tab.url.includes("localhost:3000")) {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: (data) => {
                localStorage.setItem(
                  "streamingUsageData",
                  JSON.stringify(data),
                );
              },
              args: [streamingData],
            });
          }
        });
      });
    });
  }, 1000);
}

function stopTracking() {
  if (trackingInterval) {
    clearInterval(trackingInterval);
    trackingInterval = null;
  }

  activeSite = null;
}
