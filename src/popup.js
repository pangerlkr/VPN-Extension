const elements = {
  powerButton: document.querySelector("#powerButton"),
  powerText: document.querySelector("#powerText"),
  connectionRing: document.querySelector("#connectionRing"),
  statusLabel: document.querySelector("#statusLabel"),
  regionFlag: document.querySelector("#regionFlag"),
  regionLabel: document.querySelector("#regionLabel"),
  ipLabel: document.querySelector("#ipLabel"),
  warningLabel: document.querySelector("#warningLabel"),
  regionList: document.querySelector("#regionList"),
  regionCount: document.querySelector("#regionCount"),
  fastestButton: document.querySelector("#fastestButton"),
  checkIpButton: document.querySelector("#checkIpButton"),
  settingsButton: document.querySelector("#settingsButton")
};

let appState = null;
let regions = [];

const send = (message) => chrome.runtime.sendMessage(message);

const getSelectedRegion = () => regions.find((region) => region.id === appState.selectedRegionId) || regions[0];

const setBusy = (busy) => {
  const region = appState ? getSelectedRegion() : null;
  elements.powerButton.disabled = busy || Boolean(region && !region.ready && !appState.enabled);
  elements.checkIpButton.disabled = busy;
};

const renderStatus = () => {
  const region = getSelectedRegion();
  if (!region) return;

  elements.statusLabel.textContent = appState.enabled ? "Protected in this browser" : "Disconnected";
  elements.powerText.textContent = appState.enabled ? "Disconnect" : "Connect";
  elements.powerButton.disabled = !region.ready && !appState.enabled;
  elements.connectionRing.classList.toggle("connected", appState.enabled);
  elements.regionFlag.textContent = region.flag;
  elements.regionLabel.textContent = `${region.city}, ${region.country}`;
  elements.ipLabel.textContent = appState.lastKnownIp === "Not checked" ? "IP not checked" : `Visible IP: ${appState.lastKnownIp}`;
  elements.warningLabel.textContent = region.ready ? "" : "This is only a Demo gateway: add a real proxy endpoint to connect.";
};

const renderRegions = () => {
  const readyCount = regions.filter((region) => region.ready).length;
  elements.regionCount.textContent = `${readyCount}/${regions.length} ready`;
  elements.regionList.innerHTML = "";

  regions.forEach((region) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "region-row";
    button.dataset.selected = region.id === appState.selectedRegionId;
    button.innerHTML = `
      <span class="flag">${region.flag}</span>
      <span class="region-main">
        <strong>${region.city}</strong>
        <small>${region.country}</small>
      </span>
      <span class="metrics">
        <em>${region.ready ? "Ready" : "Demo"}</em>
        <small>${region.latencyMs} ms</small>
        <span class="load"><span style="width:${region.load}%"></span></span>
      </span>
    `;
    button.addEventListener("click", async () => {
      setBusy(true);
      const response = await send({ type: "SET_REGION", regionId: region.id });
      appState = response.state;
      render();
      setBusy(false);
    });
    elements.regionList.append(button);
  });
};

const render = () => {
  renderStatus();
  renderRegions();
};

elements.powerButton.addEventListener("click", async () => {
  setBusy(true);
  const response = await send({ type: "SET_ENABLED", enabled: !appState.enabled });
  appState = response.state;
  if (response.error) {
    elements.warningLabel.textContent = response.error;
  }
  render();
  setBusy(false);
});

elements.fastestButton.addEventListener("click", async () => {
  const candidates = regions.filter((region) => region.ready || region.id === appState.selectedRegionId);
  const fastest = [...candidates].sort((a, b) => a.latencyMs + a.load - (b.latencyMs + b.load))[0];
  if (!fastest) return;
  setBusy(true);
  const response = await send({ type: "SET_REGION", regionId: fastest.id });
  appState = response.state;
  render();
  setBusy(false);
});

elements.checkIpButton.addEventListener("click", async () => {
  elements.ipLabel.textContent = "Checking visible IP...";
  try {
    const response = await send({ type: "CHECK_IP" });
    appState.lastKnownIp = response.error ? "Unavailable" : response.ip;
  } catch {
    appState.lastKnownIp = "Unavailable";
  }
  render();
});

elements.settingsButton.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

const init = async () => {
  const response = await send({ type: "GET_STATE" });
  appState = response.state;
  regions = response.regions;
  render();
};

init();
