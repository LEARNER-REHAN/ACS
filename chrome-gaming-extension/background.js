let activeSite = null;
let trackingInterval = null;

const gamingSites = {
  roblox: ["roblox.com"],
  chess: ["chess.com"],
  poki: ["poki.com"],
  crazygames: ["crazygames.com"],
  miniclip: ["miniclip.com"],
  steam: ["store.steampowered.com"],
};

// Detect tab switch
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  checkTracking(tab);
});

// Detect URL updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    checkTracking(tab);
  }
});

function checkTracking(tab) {
  stopTracking();

  if (!tab.url) return;

  for (let site in gamingSites) {
    const domains = gamingSites[site];

    const matched = domains.some((domain) => tab.url.includes(domain));

    if (matched) {
      startTracking(site);
      break;
    }
  }
}

function startTracking(site) {
  activeSite = site;

  console.log("Gaming tracking started:", site);

  trackingInterval = setInterval(() => {
    chrome.storage.local.get(["gamingData"], (result) => {
      let gamingData = result.gamingData || {
        roblox: 0,
        chess: 0,
        poki: 0,
        crazygames: 0,
        miniclip: 0,
        steam: 0,
      };

      gamingData[site] += 1;

      chrome.storage.local.set({ gamingData });

      console.log("Updated Gaming Data:", gamingData);

      // Send to React app
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach((tab) => {
          if (tab.url && tab.url.includes("localhost:3000")) {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: (data) => {
                localStorage.setItem("gamingUsageData", JSON.stringify(data));
              },
              args: [gamingData],
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
