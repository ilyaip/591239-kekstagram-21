'use strict';

(function () {
  var editingForm = document.querySelector(".img-upload__overlay");
  var form = document.querySelector(".img-upload__form");
  var uploadImg = document.querySelector(".img-upload__preview");
  var effectNone = document.querySelector("#effect-none");
  var pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
  var pictureList = document.querySelector(".pictures");
  var successTemplate = document.querySelector("#success").content.querySelector(".success");
  var main = document.querySelector("main");
  var successButton = document.querySelector("#success").content.querySelector(".success__button");
  var errorTemplate = document.querySelector("#error").content.querySelector(".error");
  var bigPhotoDiv = document.querySelector(".big-picture__img");
  var bigPhoto = bigPhotoDiv.querySelector("img");
  var picLikes = document.querySelector(".likes-count");
  var commentList = document.querySelector(".social__comments");
  var MAX_COMMENTS = 5;
  var DEFAULT_COMMENTS = 5;
  var bigPhotoDescription = document.querySelector(".social__caption");
  var commentsLoader = document.querySelector(".comments-loader");
  var commentsNumberNew = document.querySelector(".comments-count");
  var commentsView = document.querySelector(".social__comment-count");
  var closeBigPhoto = document.querySelector(".big-picture__cancel");
  // var photosArray = [];

  // function loadComments(array) {
  //   if (array.comments.length > MAX_COMMENTS) {
  //     commentsLoader.addEventListener("click", function () {
  //       MAX_COMMENTS += 5;
  //       console.log(MAX_COMMENTS);
  //       for (let i = (MAX_COMMENTS - DEFAULT_COMMENTS); i < MAX_COMMENTS; i++) {
  //         createCommentsNew(array.comments[i]);
  //       }
  //     });
  //   } else {
  //     commentsLoader.classList.add("hidden");
  //   }
  // }

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
    // commentsNumberNew.textContent = photo.comments.length;
    if (photo.comments.length < MAX_COMMENTS) {
      commentsView.textContent = `${photo.comments.length} из ${photo.comments.length} комментариев`;
    } else {
      commentsNumberNew.textContent = photo.comments.length;
    }
  }

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
        for (let i = 0; i < photo.comments.length; i++) {
          createCommentsNew(photo.comments[i]);
        }
      } else {
        for (let i = 0; i < MAX_COMMENTS; i++) {
          createCommentsNew(photo.comments[i]);
        }
      }
      if (photo.comments.length <= MAX_COMMENTS) {
        commentsLoader.classList.add("hidden");
      }
      commentsLoader.addEventListener("click", function () {
        if (photo.comments.length > MAX_COMMENTS) {
          if (photo.comments.length - MAX_COMMENTS > MAX_COMMENTS) {
            MAX_COMMENTS += 5;
            console.log(MAX_COMMENTS);
            commentsView.textContent = `${MAX_COMMENTS} из ${photo.comments.length} комментариев`;
            for (let i = (MAX_COMMENTS - DEFAULT_COMMENTS); i < MAX_COMMENTS; i++) {
              createCommentsNew(photo.comments[i]);
            }
          } else {
            MAX_COMMENTS = photo.comments.length - MAX_COMMENTS;
            console.log(MAX_COMMENTS);
            commentsView.textContent = `${photo.comments.length} из ${photo.comments.length} комментариев`;
            for (let i = (photo.comments.length % DEFAULT_COMMENTS); i < photo.comments.length; i++) {
              createCommentsNew(photo.comments[i]);
            }
          }
        } else {
          commentsLoader.classList.add("hidden");
        }
      });
      closeBigPhoto.addEventListener("click", function () {
        closePhoto();
        DEFAULT_COMMENTS = 5;
        MAX_COMMENTS = 5;
        commentsLoader.classList.remove("hidden");
      });
    });
  };

  bigPhotoDiv.addEventListener("click", function () {
    openBigPhoto();
  });

  function closePhoto() {
    bigPicture.classList.add("hidden");
    document.querySelector("body").classList.remove("modal-open");

    document.removeEventListener("keydown", onPopupEscPress2);
  }

  function openBigPhoto() {
    bigPicture.classList.remove("hidden");
    document.querySelector("body").classList.add("modal-open");

    document.addEventListener("keydown", onPopupEscPress2);
  }

  function onPopupEscPress2(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      bigPicture.classList.add("hidden");
      document.querySelector("body").classList.remove("modal-open");
    }
  };

  // var renderPhotos = function () {
  //   for (var i = 0; i < picturesArray.length; i++) {
  //     renderPhoto(picturesArray[i]);
  //   }
  // };

  // renderPhotos();

  var successHandler = function (newPhotos) {

    for (var i = 0; i < newPhotos.length; i++) {
      renderPhoto(newPhotos[i]);
    }

  };

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

  window.backend.load(successHandler, errorHandler);

  // var escSuccessTemplate = function (message) {
  //   successButton.addEventListener("click", function () {
  //     message.classList.add("hidden");
  //     console.log("click");
  //   });
  // };


  var renderSuccessMessage = function (template) {
    var message = template.cloneNode(true);
    main.appendChild(message);

    message.querySelector("button").addEventListener("click", function () {
      message.classList.add("hidden");
    });

    document.addEventListener("click", function (evt) {
      var window = message.querySelector("div");
      var isClickInsideModal = window.contains(evt.target);
      if (!isClickInsideModal) {
        message.classList.add("hidden");
        console.log("Нажатие вне формы");
      }
    });

    document.addEventListener("keydown", onPopupEscPress(message));
  };

  var onPopupEscPress = function (evt, item) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      item.classList.add("hidden");
    }
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
  // bigPicture.classList.remove("hidden");
  var picture = document.querySelector(".picture");

  pictureTemplate.addEventListener("click", function () {
    bigPicture.classList.remove("hidden");
    console.log("click!");
  });
})();
