const toggle = document.querySelector("#webrtcToggle");

const send = (message) => chrome.runtime.sendMessage(message);

const init = async () => {
  const response = await send({ type: "GET_STATE" });
  toggle.checked = response.state.blockWebRtc;
};

toggle.addEventListener("change", async () => {
  await send({ type: "SET_WEBRTC", blockWebRtc: toggle.checked });
});

init();
