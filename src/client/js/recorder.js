const starBtn = document.getElementById("starBtn");
const preview = document.getElementById("preview");
const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 200, height: 200 },
  });
  video.srcObject = stream;
  video.play();
};

starBtn.addEventListener("click", handleStart);
