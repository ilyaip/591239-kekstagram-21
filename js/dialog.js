'use strict';

(function () {
  var inputUploadFile = document.querySelector("#upload-file");
  var editingForm = document.querySelector(".img-upload__overlay");
  var body = document.querySelector("body");
  var closeEditingForm = document.querySelector("#upload-cancel");
  var controlSmaller = document.querySelector(".scale__control--smaller");
  var controlBigger = document.querySelector(".scale__control--bigger");
  var controlValue = document.querySelector(".scale__control--value");
  var uploadImg = document.querySelector(".img-upload__preview");
  var inputHashtags = document.querySelector(".text__hashtags");

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

  var onPopupEscPress = function (evt) {
    if ((inputHashtags != document.activeElement) && (evt.key === 'Escape')) {
      evt.preventDefault();
      editingForm.classList.add("hidden");
      body.classList.remove("modal-open");
    }
  };

  var cleanInput = function () {
    inputUploadFile.value = "";
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
})();
