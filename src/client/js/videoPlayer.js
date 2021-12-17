const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;

const handlePlayClick = (event) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.className = video.paused ? "fas fa-play" : "fas fa-pause";
};

const volumeIcon = () => {
  muteBtnIcon.className = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
};

const videoMuted = () => {
  video.muted = false;
};
const videoUnMuted = () => {
  video.muted = true;
};
const handleMute = (event) => {
  if (video.muted) {
    videoMuted();
  } else {
    volumeRange.value = 0;
    videoUnMuted();
  }
  volumeIcon();
  volumeRange.value = video.muted ? 0 : volumeValue;
};
const handelVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (value === "0") {
    videoUnMuted();
  } else {
    videoMuted();
    volumeValue = volumeRange.value;
  }
  volumeIcon();
};

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};
const hadleLoadedMetadata = (event) => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
};
const hadleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};
const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};
const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");
const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000); //controlsMovementTimeout 에는 setTimeout의 id가 들어감1
};
const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handelVolumeChange);
video.addEventListener("loadedmetadata", hadleLoadedMetadata);
video.addEventListener("timeupdate", hadleTimeUpdate);
video.addEventListener("ended", handleEnded);
timeLine.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
