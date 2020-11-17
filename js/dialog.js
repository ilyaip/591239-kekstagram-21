'use strict';

const ESC_KEY = "Escape";
const FILE_TYPES = ["gif", "jpg", "jpeg", "png"];
const inputUploadFile = document.querySelector("#upload-file");
const uploadImg = document.querySelector(".img-upload__preview");
const previewFile = uploadImg.querySelector("img");
const effectPreview = document.querySelectorAll(".effects__preview");
const editingForm = document.querySelector(".img-upload__overlay");
const body = document.querySelector("body");
const closeEditingForm = document.querySelector("#upload-cancel");
const controlSmaller = document.querySelector(".scale__control--smaller");
const controlBigger = document.querySelector(".scale__control--bigger");
const controlValue = document.querySelector(".scale__control--value");
const inputHashtags = document.querySelector(".text__hashtags");
const inputComment = document.querySelector(".text__description");
const errorTemplate = document.querySelector("#error").content.querySelector(".error");

// Открытие и закрытие формы редактирования фото

function openForm() {
  editingForm.classList.remove("hidden");
  body.classList.add("modal-open");

  document.addEventListener("keydown", onPopupEscPress);
}

function closeForm() {
  editingForm.classList.add("hidden");
  body.classList.remove("modal-open");

  document.removeEventListener("keydown", onPopupEscPress);
}

function cleanInput() {
  inputUploadFile.value = "";
}

function onPopupEscPress(evt) {
  if ((inputHashtags !== document.activeElement) && (inputComment !== document.activeElement) && (evt.key === ESC_KEY)) {
    evt.preventDefault();
    editingForm.classList.add("hidden");
    body.classList.remove("modal-open");
    inputComment.value = "";
    inputHashtags.value = "";
    cleanInput();
  }
}

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
  const file = inputUploadFile.files[0];
  const fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (ending) {
    return fileName.endsWith(ending);
  });

  if (matches) {
    const reader = new FileReader();
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
  editingForm,
  cleanInput
};
