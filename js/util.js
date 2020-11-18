'use strict';

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

window.utils = {
  getRandomElement
};
