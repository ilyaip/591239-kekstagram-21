'use strict';

(function () {

  const getRandomElement = function (array) {
    const randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  window.utils = {
    getRandomElement: getRandomElement
  };
})();
