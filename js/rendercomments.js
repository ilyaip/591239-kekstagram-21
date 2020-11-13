'use strict';

var MAX_COMMENTS = 5;
var DEFAULT_COMMENTS = 5;
var editingForm = document.querySelector(".img-upload__overlay");
var form = document.querySelector(".img-upload__form");
var uploadImg = document.querySelector(".img-upload__preview");
var pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
var pictureList = document.querySelector(".pictures");
var successTemplate = document.querySelector("#success").content.querySelector(".success");
var main = document.querySelector("main");
var errorTemplate = document.querySelector("#error").content.querySelector(".error");
var bigPhotoDiv = document.querySelector(".big-picture__img");
var bigPhoto = bigPhotoDiv.querySelector("img");
var picLikes = document.querySelector(".likes-count");
var commentList = document.querySelector(".social__comments");
var bigPhotoDescription = document.querySelector(".social__caption");
var commentsLoader = document.querySelector(".comments-loader");
var commentsNumberNew = document.querySelector(".comments-count");
var commentsView = document.querySelector(".social__comment-count");
var closeBigPhoto = document.querySelector(".big-picture__cancel");

function createCommentsNew(array) {
  var item = document.createElement("li");
  commentList.appendChild(item);
  item.classList.add("social__comment");
  var userAvatar = document.createElement("img");
  item.appendChild(userAvatar);
  userAvatar.classList.add("social__picture");
  userAvatar.src = array.avatar;
  userAvatar.alt = array.name;
  var commentText = document.createElement("p");
  item.appendChild(commentText);
  commentText.textContent = array.message;
  commentText.classList.add("social__text");

  closeBigPhoto.addEventListener("click", function () {
    item.remove();
  });
  document.addEventListener("keydown", function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      item.remove();
    }
  });
}

function createPhoto(photo) {
  bigPhoto.src = photo.url;
  picLikes.textContent = photo.likes;
  bigPhotoDescription.textContent = photo.description;
  if (photo.comments.length < MAX_COMMENTS) {
    commentsView.textContent = `${photo.comments.length} из ${photo.comments.length} комментариев`;
  } else {
    commentsNumberNew.textContent = photo.comments.length;
  }
}

var handler;

var renderPhoto = function (photo) {
  var picturElement = pictureTemplate.cloneNode(true);

  picturElement.querySelector(".picture__img").src = photo.url;
  picturElement.querySelector(".picture__likes").textContent = photo.likes;
  picturElement.querySelector(".picture__comments").textContent = photo.comments.length;

  pictureList.appendChild(picturElement);

  picturElement.addEventListener("click", function () {
    commentsView.textContent = `${MAX_COMMENTS} из ${photo.comments.length} комментариев`;
    openBigPhoto();
    createPhoto(photo);
    if (photo.comments.length < MAX_COMMENTS) {
      for (var i = 0; i < photo.comments.length; i++) {
        createCommentsNew(photo.comments[i]);
      }
    } else {
      for (var j = 0; j < MAX_COMMENTS; j++) {
        createCommentsNew(photo.comments[j]);
      }
    }
    if (photo.comments.length <= MAX_COMMENTS) {
      commentsLoader.classList.add("hidden");
    } else {
      commentsLoader.classList.remove("hidden");
    }

    handler = function () {
      renderFiveComments(photo);
    };
    commentsLoader.addEventListener("click", handler);
    closeBigPhoto.addEventListener("click", function () {
      closePhoto();
      MAX_COMMENTS = DEFAULT_COMMENTS;
      commentsLoader.classList.remove("hidden");
      commentsLoader.removeEventListener("click", handler);
    });
  });
};

function renderFiveComments(pictureArray) {
  if (pictureArray.comments.length > MAX_COMMENTS) {
    if (pictureArray.comments.length - MAX_COMMENTS > DEFAULT_COMMENTS) {
      MAX_COMMENTS += 5;
      commentsView.textContent = `${MAX_COMMENTS} из ${pictureArray.comments.length} комментариев`;
      for (var i = (MAX_COMMENTS - DEFAULT_COMMENTS); i < MAX_COMMENTS; i++) {
        createCommentsNew(pictureArray.comments[i]);
      }
    } else {
      commentsView.textContent = `${pictureArray.comments.length} из ${pictureArray.comments.length} комментариев`;
      for (var j = MAX_COMMENTS; j < pictureArray.comments.length; j++) {
        createCommentsNew(pictureArray.comments[j]);
      }
      commentsLoader.classList.add("hidden");
    }
  } else {
    commentsLoader.classList.add("hidden");
  }
}

bigPhotoDiv.addEventListener("click", function () {
  openBigPhoto();
});

function closePhoto() {
  bigPicture.classList.add("hidden");
  document.querySelector("body").classList.remove("modal-open");

  document.removeEventListener("keydown", handlerPopupEscPhoto);
}

function openBigPhoto() {
  bigPicture.classList.remove("hidden");
  document.querySelector("body").classList.add("modal-open");

  document.addEventListener("keydown", handlerPopupEscPhoto);
}

function handlerPopupEscPhoto(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add("hidden");
    document.querySelector("body").classList.remove("modal-open");
    MAX_COMMENTS = DEFAULT_COMMENTS;
    commentsLoader.removeEventListener("click", handler);
  }
}

var errorHandler = function (errorMessage) {
  var node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';

  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node);

};

window.rendercomments = {
  errorHandler,
  renderPhoto
};


var renderSuccessMessage = function (template) {
  var message = template.cloneNode(true);
  main.appendChild(message);

  message.querySelector("button").addEventListener("click", function () {
    message.classList.add("hidden");
  });

  function clickInsideModal(evt) {
    var window = message.querySelector("div");
    var isClickInsideModal = window.contains(evt.target);
    if (!isClickInsideModal) {
      message.classList.add("hidden");
    }
    document.removeEventListener("click", clickInsideModal);
  }

  document.addEventListener("click", clickInsideModal);

  var handlerPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      message.classList.add("hidden");
      document.removeEventListener("keydown", handlerPopupEscPress);
    }
  };

  document.addEventListener("keydown", handlerPopupEscPress);
};


var onSubmit = function () {
  editingForm.classList.add("hidden");
  renderSuccessMessage(successTemplate);
  uploadImg.style.filter = "none";
};

var submitHandler = function (evt) {
  window.backend.upload(new FormData(form), onSubmit, renderSuccessMessage(errorTemplate));
  evt.preventDefault();
};

form.addEventListener("submit", submitHandler);

var bigPicture = document.querySelector(".big-picture");

pictureTemplate.addEventListener("click", function () {
  bigPicture.classList.remove("hidden");
});
