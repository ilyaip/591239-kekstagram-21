'use strict';

(function () {
  var editingForm = document.querySelector(".img-upload__overlay");
  var form = document.querySelector(".img-upload__form");
  var uploadImg = document.querySelector(".img-upload__preview");
  var effectNone = document.querySelector("#effect-none");
  var PHOTO_ARRAY_LENGHT = 25;
  var MIN_NUMBER_PHOTO = 1;
  var MAX_NUMBER_PHOTO = 6;
  var MIN_NUMBER_OF_COMMENTS = 1;
  var MAX_NUMBER_OF_COMMENTS = 5;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var picturesArray = [];
  var comments = [];
  var COMMENT_NAME = ["Anton", "Max", "Kantimir", "Marusya", "Toma", "Joshua"];
  var COMMENT_DESCRIPTION = ["Всё отлично!", "В целом всё неплохо. Но не всё.", "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.", "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.", "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.", "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"];
  var pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
  var pictureList = document.querySelector(".pictures");
  var successTemplate = document.querySelector("#success").content.querySelector(".success");
  var main = document.querySelector("main");
  var successButton = document.querySelector("#success").content.querySelector(".success__button");
  var errorTemplate = document.querySelector("#error").content.querySelector(".error");

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var createComments = function (commentsNumber) {
    for (var i = 0; i < commentsNumber; i++) {
      comments.push({
        avatar: `img/avatar-${getRandomInt(MIN_NUMBER_PHOTO, MAX_NUMBER_PHOTO)}.svg`,
        message: COMMENT_DESCRIPTION[getRandomInt(0, COMMENT_DESCRIPTION.length - 1)],
        name: COMMENT_NAME[getRandomInt(0, COMMENT_NAME.length - 1)]
      });
    }
  };

  var createPictureArray = function () {
    for (var i = 0; i < PHOTO_ARRAY_LENGHT; i++) {
      var numberOfComment = getRandomInt(MIN_NUMBER_OF_COMMENTS, MAX_NUMBER_OF_COMMENTS);
      picturesArray.push({
        url: `photos/${i + 1}.jpg`,
        description: "Hello",
        like: getRandomInt(MIN_LIKES, MAX_LIKES),
        comments: createComments(numberOfComment),
        commentsNumber: numberOfComment
      });
    }
  };

  createPictureArray();

  var bigPhotoDiv = document.querySelector(".big-picture__img");
  var bigPhoto = bigPhotoDiv.querySelector("img");
  var picLikes = document.querySelector(".likes-count");
  var commentList = document.querySelector(".social__comments");
  var MAX_COMMENTS = 5;
  var DEFAULT_COMMENTS = 5;
  var bigPhotoDescription = document.querySelector(".social__caption");
  var commentsLoader = document.querySelector(".comments-loader");
  var commentsNumberNew = document.querySelector(".comments-count");
  var closeBigPhoto = document.querySelector(".big-picture__cancel");

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
    var avatar = document.createElement("img");
    item.appendChild(avatar);
    avatar.classList.add("social__picture");
    avatar.src = array.avatar;
    avatar.alt = array.name;
    var commentText = document.createElement("p");
    item.appendChild(commentText);
    commentText.textContent = array.message;
    commentText.classList.add("social__text");
  }

  function createPhoto(photo) {
    bigPhoto.src = photo.url;
    picLikes.textContent = photo.likes;
    bigPhotoDescription.textContent = photo.description;
    commentsNumberNew.textContent = photo.comments.length;
  }

  var renderPhoto = function (photo) {
    var picturElement = pictureTemplate.cloneNode(true);

    picturElement.querySelector(".picture__img").src = photo.url;
    picturElement.querySelector(".picture__likes").textContent = photo.likes;
    picturElement.querySelector(".picture__comments").textContent = photo.comments.length;

    pictureList.appendChild(picturElement);

    picturElement.addEventListener("click", function () {
      openBigPhoto();
      createPhoto(photo);
      for (let i = 0; i < MAX_COMMENTS; i++) {
        createCommentsNew(photo.comments[i]);
      }
      if (photo.comments.length <= MAX_COMMENTS) {
        commentsLoader.classList.add("hidden");
      }
      commentsLoader.addEventListener("click", function () {
        if (photo.comments.length > MAX_COMMENTS) {
          MAX_COMMENTS += 5;
          console.log(MAX_COMMENTS);
          for (let i = (MAX_COMMENTS - DEFAULT_COMMENTS); i < MAX_COMMENTS; i++) {
            createCommentsNew(photo.comments[i]);
          }
        } else {
          commentsLoader.classList.add("hidden");
        }
      });
      closeBigPhoto.addEventListener("click", function () {
        closePhoto();
      });
    });
  };

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
