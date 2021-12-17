const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll(".comment_delete button");
const list = document.querySelectorAll(".video__comment");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const div = document.createElement("div");
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.className = "comment_delete";
  const btn = document.createElement("button");
  btn.dataset.id = id;
  btn.innerText = "❌";

  div.appendChild(icon);
  div.appendChild(span);

  span2.appendChild(btn);

  newComment.appendChild(div);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);

  location.reload();
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDeleteButton = async (event) => {
  const {
    target: {
      dataset: { Id },
    },
  } = event;
  const videoId = videoContainer.dataset.id;
  await fetch(`/api/videos/${videoId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Id }),
  });
  location.reload();
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
deleteBtn.forEach((element) => {
  element.addEventListener("click", handleDeleteButton);
});
