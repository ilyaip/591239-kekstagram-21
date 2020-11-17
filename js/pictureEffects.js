'use strict';

// Наложение эффекта и его насыщенности на изображение, изменение масштаба

const MAX_ZOOM = 100;
const MIN_ZOOM = 25;
const STEP = 25;
const Filters = {
  chrome: {
    DEFAULT: "grayscale(1)",
    MIN_VALUE: "0",
    MAX_VALUE: "1",
    UNIT: ""
  },
  sepia: {
    DEFAULT: "sepia(1)",
    MIN_VALUE: "0",
    MAX_VALUE: "1",
    UNIT: ""
  },
  marvin: {
    DEFAULT: "invert(100%)",
    MIN_VALUE: "0",
    MAX_VALUE: "100",
    UNIT: "%"
  },
  phobos: {
    DEFAULT: "blur(3px)",
    MIN_VALUE: "0",
    MAX_VALUE: "3",
    UNIT: "px"
  },
  heat: {
    DEFAULT: "brightness(3)",
    MIN_VALUE: "1",
    MAX_VALUE: "3",
    UNIT: ""
  },
  none: {
    DEFAULT: "none"
  },
};

const Effects = {
  CHROME: "chrome",
  SEPIA: "sepia",
  MARVIN: "marvin",
  PHOBOS: "phobos",
  HEAT: "heat",
  NONE: "none"
};

window.dialog.controlValue.value = MAX_ZOOM + "%";

function increaseZoom() {
  let oldValue = Number.parseInt(window.dialog.controlValue.value, 10);
  let newValue = oldValue + STEP;
  let result = newValue >= MAX_ZOOM ? MAX_ZOOM : newValue;
  window.dialog.controlValue.value = result + "%";
  uploadImg.style.transform = `scale(${result / 100})`;
}

function decreaseZoom() {
  let oldValue = Number.parseInt(window.dialog.controlValue.value, 10);
  let newValue = oldValue - STEP;
  let result = newValue <= MIN_ZOOM ? MIN_ZOOM : newValue;
  window.dialog.controlValue.value = result + "%";
  uploadImg.style.transform = `scale(${result / 100})`;
}

window.dialog.controlBigger.addEventListener("click", function () {
  increaseZoom();
});

window.dialog.controlSmaller.addEventListener("click", function () {
  decreaseZoom();
});

const pinSlider = document.querySelector(".effect-level__pin");
const pinField = document.querySelector(".effect-level");
const pinSliderValue = document.querySelector(".effect-level__value");
const uploadForm = document.querySelector(".img-upload__form");
const effectNone = document.querySelector("#effect-none");
const effectLevelDepth = document.querySelector(".effect-level__depth");
const uploadImg = document.querySelector(".img-upload__preview");
const sliderWidth = document.querySelector(".effect-level__line");

let currentEffect;
let sliderDefaultValue = {
  left: "450px",
  width: "100%"
};

uploadForm.addEventListener("change", checkedInput);

function filterChange(evt) {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    uploadImg.style.filter = Filters[evt.target.value].DEFAULT;
  }
  currentEffect = evt.target.value;
  pinSlider.style.left = sliderDefaultValue.left;
  effectLevelDepth.style.width = sliderDefaultValue.width;
}

uploadForm.addEventListener("change", filterChange);

function checkedInput() {
  if (effectNone.checked) {
    pinField.classList.add("hidden");
  } else {
    pinField.classList.remove("hidden");
  }
}

function getSaturation(value) {
  return Math.round(((Filters[currentEffect].MAX_VALUE - Filters[currentEffect].MIN_VALUE) * (value / sliderWidth.offsetWidth) + Filters[currentEffect].MIN_VALUE) * 100) / 100;
}

function getValueSaturation(value) {
  switch (currentEffect) {
    case Effects.CHROME:
      uploadImg.style.filter = `grayscale(${getSaturation(value) + Filters[currentEffect].UNIT})`;
      break;
    case Effects.SEPIA:
      uploadImg.style.filter = `sepia(${getSaturation(value) + Filters[currentEffect].UNIT})`;
      break;
    case Effects.MARVIN:
      uploadImg.style.filter = `invert(${getSaturation(value) + Filters[currentEffect].UNIT})`;
      break;
    case Effects.PHOBOS:
      uploadImg.style.filter = `blur(${getSaturation(value) + Filters[currentEffect].UNIT})`;
      break;
    case Effects.HEAT:
      uploadImg.style.filter = `brightness(${getSaturation(value) + Filters[currentEffect].UNIT})`;
      break;
    case Effects.NONE:
      uploadImg.style.filter = "none";
      break;
  }
}

pinSlider.addEventListener("mousedown", function (evt) {
  evt.preventDefault();

  let startX = evt.clientX;

  let dragged = false;

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    let shift = startX - moveEvt.clientX;
    startX = moveEvt.clientX;
    let newX = pinSlider.offsetLeft - shift;

    if (newX > 0 && newX < sliderWidth.offsetWidth) {
      pinSlider.style.left = newX + "px";
      effectLevelDepth.style.width = pinSlider.offsetLeft * 100 / sliderWidth.offsetWidth + "%";
    }

    getValueSaturation(newX);
    pinSliderValue.value = Number.parseInt(effectLevelDepth.style.width, 10);
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    if (dragged) {
      let onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        pinSlider.removeEventListener('click', onClickPreventDefault);
      };
      pinSlider.addEventListener('click', onClickPreventDefault);
    }
  }


  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

