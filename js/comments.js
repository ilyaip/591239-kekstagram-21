'use strict';

const DEFAULT_COMMENTS = 5;
const ESC_KEY = "Escape";
let maxComments = 5;
const editingForm = document.querySelector(".img-upload__overlay");
const form = document.querySelector(".img-upload__form");
const uploadImg = document.querySelector(".img-upload__preview");
const pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
const pictureList = document.querySelector(".pictures");
const successTemplate = document.querySelector("#success").content.querySelector(".success");
const main = document.querySelector("main");
const errorTemplate = document.querySelector("#error").content.querySelector(".error");
const bigPhotoDiv = document.querySelector(".big-picture__img");
const bigPhoto = bigPhotoDiv.querySelector("img");
const picLikes = document.querySelector(".likes-count");
const commentList = document.querySelector(".social__comments");
const bigPhotoDescription = document.querySelector(".social__caption");
const commentsLoader = document.querySelector(".comments-loader");
const commentsNumberNew = document.querySelector(".comments-count");
const commentsView = document.querySelector(".social__comment-count");
const closeBigPhoto = document.querySelector(".big-picture__cancel");

const createCommentsNew = (userComment) => {
  const item = document.createElement("li");
  item.classList.add("social__comment");
  const userAvatar = document.createElement("img");
  item.appendChild(userAvatar);
  userAvatar.classList.add("social__picture");
  userAvatar.src = userComment.avatar;
  userAvatar.alt = userComment.name;
  const commentText = document.createElement("p");
  item.appendChild(commentText);
  commentText.textContent = userComment.message;
  commentText.classList.add("social__text");
  return item;
};

const createPhoto = (photo) => {
  bigPhoto.src = photo.url;
  picLikes.textContent = photo.likes;
  bigPhotoDescription.textContent = photo.description;
  if (photo.comments.length < maxComments) {
    commentsView.textContent = `${photo.comments.length} из ${photo.comments.length} комментариев`;
  } else {
    commentsNumberNew.textContent = photo.comments.length;
  }
};

let onCommentsLoaderClick;

const commentListCleaner = () => {
  while (commentList.firstChild) {
    commentList.firstChild.remove();
  }
};

const renderPhoto = (photo) => {
  const fragmentPhoto = document.createDocumentFragment();

  const picturElement = pictureTemplate.cloneNode(true);

  picturElement.querySelector(".picture__img").src = photo.url;
  picturElement.querySelector(".picture__likes").textContent = photo.likes;
  picturElement.querySelector(".picture__comments").textContent = photo.comments.length;

  fragmentPhoto.appendChild(picturElement);

  pictureList.appendChild(fragmentPhoto);

  picturElement.addEventListener("click", () => {
    commentsView.textContent = `${maxComments} из ${photo.comments.length} комментариев`;
    openBigPhoto();
    createPhoto(photo);
    const fragment = document.createDocumentFragment();
    photo.comments.slice(0, maxComments).forEach((item) => {
      fragment.appendChild(createCommentsNew(item));
    });
    commentList.appendChild(fragment);
    if (photo.comments.length <= maxComments) {
      commentsLoader.classList.add("hidden");
    } else {
      commentsLoader.classList.remove("hidden");
    }

    onCommentsLoaderClick = () => {
      renderFiveComments(photo);
    };
    commentsLoader.addEventListener("click", onCommentsLoaderClick);

    const onPhotoCloseClick = () => {
      closePhoto();
      commentListCleaner();
      closeBigPhoto.removeEventListener("click", onPhotoCloseClick);
    };
    closeBigPhoto.addEventListener("click", onPhotoCloseClick);
  });
};

const renderFiveComments = (pictureArray) => {
  const fragment = document.createDocumentFragment();
  pictureArray.comments.slice(maxComments, maxComments + DEFAULT_COMMENTS).forEach((item) => {
    fragment.appendChild(createCommentsNew(item));
  });
  commentList.appendChild(fragment);
  maxComments += DEFAULT_COMMENTS;
  if (pictureArray.comments.length > maxComments) {
    commentsView.textContent = `${maxComments} из ${pictureArray.comments.length} комментариев`;
  } else {
    commentsView.textContent = `${pictureArray.comments.length} из ${pictureArray.comments.length} комментариев`;
    commentsLoader.classList.add("hidden");
  }
};

bigPhotoDiv.addEventListener("click", () => {
  openBigPhoto();
});

const closePhoto = () => {
  bigPicture.classList.add("hidden");
  document.querySelector("body").classList.remove("modal-open");
  commentsLoader.removeEventListener("click", onCommentsLoaderClick);
  commentsLoader.classList.remove("hidden");
  maxComments = DEFAULT_COMMENTS;

  document.removeEventListener("keydown", onPopupEscPhoto);
};

const openBigPhoto = () => {
  bigPicture.classList.remove("hidden");
  document.querySelector("body").classList.add("modal-open");

  document.addEventListener("keydown", onPopupEscPhoto);
};

const onPopupEscPhoto = (evt) => {
  if (evt.key === ESC_KEY) {
    evt.preventDefault();
    closePhoto();
    commentListCleaner();
  }
};

const onError = (errorMessage) => {
  const node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';

  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node);

};

const renderSuccessMessage = (template) => {
  const fragment = document.createDocumentFragment();
  const message = template.cloneNode(true);
  const successButton = message.querySelector("button");
  fragment.appendChild(message);
  const onSuccessMessageClick = () => {
    message.classList.add("hidden");
    successButton.removeEventListener("click", onSuccessMessageClick);
    document.removeEventListener("click", onInsideModalClick);
    document.removeEventListener("keydown", onPopupEscPress);
  };
  successButton.addEventListener("click", onSuccessMessageClick);

  main.appendChild(fragment);

  const onInsideModalClick = (evt) => {
    const window = message.querySelector("div");
    const isClickInsideModal = window.contains(evt.target);
    if (!isClickInsideModal) {
      message.classList.add("hidden");
      document.removeEventListener("click", onInsideModalClick);
      document.removeEventListener("keydown", onPopupEscPress);
    }
  };

  document.addEventListener("click", onInsideModalClick);

  const onPopupEscPress = (evt) => {
    if (evt.key === ESC_KEY) {
      evt.preventDefault();
      message.classList.add("hidden");
      document.removeEventListener("keydown", onPopupEscPress);
      document.removeEventListener("click", onInsideModalClick);
    }
  };

  document.addEventListener("keydown", onPopupEscPress);
};


const onSubmitMessage = () => {
  editingForm.classList.add("hidden");
  renderSuccessMessage(successTemplate);
  uploadImg.style.filter = "none";
  window.dialog.cleanInput();
};

const onErrorMessage = () => {
  renderSuccessMessage(errorTemplate);
  editingForm.classList.add("hidden");
  window.dialog.cleanInput();
};

const onSubmit = (evt) => {
  window.backend.upload(new FormData(form), onSubmitMessage, onErrorMessage);
  evt.preventDefault();
};

form.addEventListener("submit", onSubmit);

const bigPicture = document.querySelector(".big-picture");

pictureTemplate.addEventListener("click", () => {
  bigPicture.classList.remove("hidden");
});

window.comments = {
  onError,
  renderPhoto,
  renderSuccessMessage
};
