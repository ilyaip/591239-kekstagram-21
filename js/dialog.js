'use strict';

var ESC_KEY = "Escape";
var FILE_TYPES = ["gif", "jpg", "jpeg", "png"];
var inputUploadFile = document.querySelector("#upload-file");
var uploadImg = document.querySelector(".img-upload__preview");
var previewFile = uploadImg.querySelector("img");
var effectPreview = document.querySelectorAll(".effects__preview");
var editingForm = document.querySelector(".img-upload__overlay");
var body = document.querySelector("body");
var closeEditingForm = document.querySelector("#upload-cancel");
var controlSmaller = document.querySelector(".scale__control--smaller");
var controlBigger = document.querySelector(".scale__control--bigger");
var controlValue = document.querySelector(".scale__control--value");
var inputHashtags = document.querySelector(".text__hashtags");
var inputComment = document.querySelector(".text__description");
var errorTemplate = document.querySelector("#error").content.querySelector(".error");

// Открытие и закрытие формы редактирования фото

var openForm = function () {
  editingForm.classList.remove("hidden");
  body.classList.add("modal-open");

  document.addEventListener("keydown", handlerPopupEscPress);
};

var closeForm = function () {
  editingForm.classList.add("hidden");
  body.classList.remove("modal-open");

  document.removeEventListener("keydown", handlerPopupEscPress);
};

var cleanInput = function () {
  inputUploadFile.value = "";
};

var handlerPopupEscPress = function (evt) {
  if ((inputHashtags !== document.activeElement) && (inputComment !== document.activeElement) && (evt.key === ESC_KEY)) {
    evt.preventDefault();
    editingForm.classList.add("hidden");
    body.classList.remove("modal-open");
    inputComment.value = "";
    inputHashtags.value = "";
    cleanInput();
  }
};

// inputUploadFile.addEventListener("change", function () {
//   openForm();
//   controlValue.value = "100%";
//   uploadImg.style.transform = "scale(1)";
// });

function cleanFilters() {
  uploadImg.style.filter = "none";
}

closeEditingForm.addEventListener("click", function () {
  closeForm();
  cleanInput();
  cleanFilters();
});

// Выбор загружаемой фотографии

inputUploadFile.addEventListener("change", function () {
  var file = inputUploadFile.files[0];
  var fileName = file.name.toLowerCase();

  var matches = FILE_TYPES.some(function (ending) {
    return fileName.endsWith(ending);
  });

  if (matches) {
    var reader = new FileReader();
    openForm();
    controlValue.value = "100%";
    uploadImg.style.transform = "scale(1)";

    reader.addEventListener("load", function () {
      previewFile.src = reader.result;
      effectPreview.forEach(function (item) {
        item.style.backgroundImage = `url("${reader.result}")`;
      });
    });

    reader.readAsDataURL(file);
  } else {
    window.comments.renderSuccessMessage(errorTemplate);
    cleanInput();
  }
});

window.dialog = {
  controlSmaller,
  controlBigger,
  controlValue,
  editingForm
};
