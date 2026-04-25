chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "STREAMING_UPDATE") {
    window.postMessage(
      {
        type: "STREAMING_UPDATE",
        data: message.data,
      },
      "*",
    );
  }
});
