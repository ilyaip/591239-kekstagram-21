'use strict';

const ESC_KEY = "Escape";
const FILE_TYPES = ["gif", "jpg", "jpeg", "png"];
const inputUploadFile = document.querySelector("#upload-file");
const uploadImg = document.querySelector(".img-upload__preview");
const previewFile = uploadImg.querySelector("img");
const effectPreview = document.querySelectorAll(".effects__preview");
const editingForm = document.querySelector(".img-upload__overlay");
const body = document.querySelector("body");
const buttonSubmit = document.querySelector(".img-upload__submit");
const closeEditingForm = document.querySelector("#upload-cancel");
const controlSmaller = document.querySelector(".scale__control--smaller");
const controlBigger = document.querySelector(".scale__control--bigger");
const controlValue = document.querySelector(".scale__control--value");
const inputHashtags = document.querySelector(".text__hashtags");
const inputComment = document.querySelector(".text__description");
const errorTemplate = document.querySelector("#error").content.querySelector(".error");

// Открытие и закрытие формы редактирования фото

const openForm = () => {
  editingForm.classList.remove("hidden");
  body.classList.add("modal-open");
  buttonSubmit.addEventListener("click", onButtonSubmitClick);

  document.addEventListener("keydown", onPopupEscPress);
};

const closeForm = () => {
  editingForm.classList.add("hidden");
  body.classList.remove("modal-open");

  document.removeEventListener("keydown", onPopupEscPress);
  buttonSubmit.removeEventListener("click", onButtonSubmitClick);
};

const cleanInput = () => {
  inputUploadFile.value = "";
};

const onPopupEscPress = (evt) => {
  if ((inputHashtags !== document.activeElement) && (inputComment !== document.activeElement) && (evt.key === ESC_KEY)) {
    evt.preventDefault();
    inputComment.value = "";
    inputHashtags.value = "";
    cleanInput();
    closeForm();
  }
};

const cleanFilters = () => {
  uploadImg.style.filter = "none";
};

closeEditingForm.addEventListener("click", () => {
  closeForm();
  cleanInput();
  cleanFilters();
});

const onButtonSubmitClick = () => {
  document.removeEventListener("keydown", onPopupEscPress);
  buttonSubmit.removeEventListener("click", onButtonSubmitClick);
};

// Выбор загружаемой фотографии

inputUploadFile.addEventListener("change", () => {
  const file = inputUploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => {
    return fileName.endsWith(ending);
  });

  if (matches) {
    const reader = new FileReader();
    openForm();
    controlValue.value = "100%";
    uploadImg.style.transform = "scale(1)";

    reader.addEventListener("load", () => {
      previewFile.src = reader.result;
      effectPreview.forEach((item) => {
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
