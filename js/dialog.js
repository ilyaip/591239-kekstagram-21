'use strict';

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

window.dialog = {
  controlSmaller,
  controlBigger,
  controlValue,
  editingForm
};

// Открытие и закрытие формы редактирования фото

var openForm = function () {
  editingForm.classList.remove("hidden");
  body.classList.add("modal-open");

  document.addEventListener("keydown", onPopupEscPress);
};

var closeForm = function () {
  editingForm.classList.add("hidden");
  body.classList.remove("modal-open");

  document.removeEventListener("keydown", onPopupEscPress);
};

var cleanInput = function () {
  inputUploadFile.value = "";
};

var onPopupEscPress = function (evt) {
  if ((inputHashtags !== document.activeElement) && (inputComment !== document.activeElement) && (evt.key === 'Escape')) {
    evt.preventDefault();
    editingForm.classList.add("hidden");
    body.classList.remove("modal-open");
    inputComment.value = "";
    inputHashtags.value = "";
    cleanInput();
  }
};

inputUploadFile.addEventListener("change", function () {
  openForm();
  controlValue.value = "100%";
  uploadImg.style.transform = "scale(1)";
});

function cleanFilters() {
  uploadImg.style.filter = "none";
}

closeEditingForm.addEventListener("click", function () {
  closeForm();
  cleanInput();
  cleanFilters();
});

// Выбор загружаемой фотографии

var FILE_TYPES = ["gif", "jpg", "jpeg", "png"];

inputUploadFile.addEventListener("change", function () {
  var file = inputUploadFile.files[0];
  var fileName = file.name.toLowerCase();

  var matches = FILE_TYPES.some(function (ending) {
    return fileName.endsWith(ending);
  });

  if (matches) {
    var reader = new FileReader();

    reader.addEventListener("load", function () {
      previewFile.src = reader.result;
      for (var i = 0; i < effectPreview.length; i++) {
        effectPreview[i].style.backgroundImage = `url("${reader.result}")`;
      }
    });

    reader.readAsDataURL(file);
  }
});
