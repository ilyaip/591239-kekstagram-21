'use strict';

function getRandomElement(array) {
  let randomElementIndex = Math.floor(Math.random() * array.length);
  return array[randomElementIndex];
}

window.utils = {
  getRandomElement
};
