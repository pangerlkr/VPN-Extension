import { REGIONS } from './regions.js';

const elements = {
  powerButton: document.querySelector('#powerButton'),
  powerText: document.querySelector('#powerText'),
  connectionRing: document.querySelector('#connectionRing'),
  statusLabel: document.querySelector('#statusLabel'),
  regionFlag: document.querySelector('#regionFlag'),
  regionLabel: document.querySelector('#regionLabel'),
  ipLabel: document.querySelector('#ipLabel'),
  latencyChip: document.querySelector('#latencyChip'),
  warningLabel: document.querySelector('#warningLabel'),
  regionList: document.querySelector('#regionList'),
  regionCount: document.querySelector('#regionCount'),
  fastestButton: document.querySelector('#fastestButton'),
  checkIpButton: document.querySelector('#checkIpButton'),
  settingsButton: document.querySelector('#settingsButton'),
  webrtcToggle: document.querySelector('#webrtcToggle')
};

let appState = null;
let regions = [];

const send = (message) => chrome.runtime.sendMessage(message);

const getSelectedRegion = () =>
  regions.find((region) => region.id === appState.selectedRegionId) || regions[0];

const setBusy = (busy) => {
  const region = appState ? getSelectedRegion() : null;
  elements.powerButton.disabled = busy || Boolean(region && !region.ready && !appState.enabled);
  elements.checkIpButton.disabled = busy;
  elements.fastestButton.disabled = busy;
};

const renderStatus = () => {
  const region = getSelectedRegion();
  if (!region) return;

  // Update orb state
  elements.connectionRing.classList.toggle('connected', appState.enabled);
  elements.connectionRing.classList.toggle('connecting', false);

  // Update status text
  elements.statusLabel.textContent = appState.enabled ? 'Protected' : 'Disconnected';

  // Update power button
  elements.powerText.textContent = appState.enabled ? 'Disconnect' : 'Connect';
  elements.powerButton.setAttribute('data-connected', appState.enabled);
  elements.powerButton.disabled = !region.ready && !appState.enabled;

  // Update region display
  elements.regionFlag.textContent = region.flag;
  elements.regionLabel.textContent = `${region.city}, ${region.country}`;

  // Update IP label
  elements.ipLabel.textContent =
    appState.lastKnownIp === 'Not checked' ? 'IP not checked' : `IP: ${appState.lastKnownIp}`;

  // Update latency chip
  elements.latencyChip.textContent = `${region.latencyMs} ms`;

  // Update warning
  elements.warningLabel.textContent = region.ready
    ? ''
    : 'Demo gateway only \u2014 add real endpoint in Settings';

  // Update WebRTC toggle
  if (elements.webrtcToggle) {
    elements.webrtcToggle.checked = appState.blockWebRtc;
  }
};

const renderRegions = () => {
  const readyCount = regions.filter((region) => region.ready).length;
  elements.regionCount.textContent = `${readyCount}/${regions.length} ready`;
  elements.regionList.innerHTML = '';

  // Group by continent
  const continents = {};
  regions.forEach((region) => {
    if (!continents[region.continent]) {
      continents[region.continent] = [];
    }
    continents[region.continent].push(region);
  });

  // Define continent order
  const continentOrder = ['Americas', 'Europe', 'Asia', 'Middle East', 'Africa', 'Oceania'];

  continentOrder.forEach((continent) => {
    if (!continents[continent] || continents[continent].length === 0) return;

    // Add continent header
    const header = document.createElement('div');
    header.className = 'continent-header';
    header.textContent = continent;
    elements.regionList.append(header);

    // Add regions in this continent
    continents[continent].forEach((region) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'region-row';
      button.dataset.selected = region.id === appState.selectedRegionId;

      const loadLevel =
        region.load < 50 ? 'low' : region.load < 75 ? 'medium' : 'high';

      button.innerHTML = `
        <span class="region-flag">${region.flag}</span>
        <div class="region-info">
          <div class="region-city">${region.city}</div>
          <div class="region-country">${region.country}</div>
        </div>
        <div class="region-metrics">
          <div class="region-status" data-demo="${!region.ready}">${region.ready ? 'READY' : 'DEMO'}</div>
          <div class="region-latency">${region.latencyMs} ms</div>
          <div class="region-load">
            <div class="region-load-bar" data-level="${loadLevel}" style="width: ${region.load}%"></div>
          </div>
        </div>
      `;

      button.addEventListener('click', async () => {
        setBusy(true);
        const response = await send({ type: 'SET_REGION', regionId: region.id });
        appState = response.state;
        render();
        setBusy(false);
      });

      elements.regionList.append(button);
    });
  });
};

const render = () => {
  renderStatus();
  renderRegions();
};

// Power button
elements.powerButton.addEventListener('click', async () => {
  setBusy(true);
  elements.connectionRing.classList.add('connecting');
  const response = await send({ type: 'SET_ENABLED', enabled: !appState.enabled });
  appState = response.state;
  if (response.error) {
    elements.warningLabel.textContent = response.error;
  }
  elements.connectionRing.classList.remove('connecting');
  render();
  setBusy(false);
});

// Fastest button
elements.fastestButton.addEventListener('click', async () => {
  const candidates = regions.filter(
    (region) => region.ready || region.id === appState.selectedRegionId
  );
  const fastest = [...candidates].sort(
    (a, b) => a.latencyMs + a.load - (b.latencyMs + b.load)
  )[0];
  if (!fastest) return;

  setBusy(true);
  const response = await send({ type: 'SET_REGION', regionId: fastest.id });
  appState = response.state;
  render();
  setBusy(false);
});

// Check IP button
elements.checkIpButton.addEventListener('click', async () => {
  elements.ipLabel.textContent = 'Checking IP...';
  try {
    const response = await send({ type: 'CHECK_IP' });
    appState.lastKnownIp = response.error ? 'Unavailable' : response.ip;
  } catch {
    appState.lastKnownIp = 'Unavailable';
  }
  render();
});

// Settings button
elements.settingsButton.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

// WebRTC toggle
if (elements.webrtcToggle) {
  elements.webrtcToggle.addEventListener('change', async () => {
    const response = await send({
      type: 'SET_WEBRTC',
      blockWebRtc: elements.webrtcToggle.checked
    });
    appState = response.state;
  });
}

// Initialize
const init = async () => {
  const response = await send({ type: 'GET_STATE' });
  appState = response.state;
  regions = response.regions;
  render();
};

init();
