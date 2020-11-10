'use strict';

(function () {

  var getRandomElement = function (array) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  window.utils = {
    getRandomElement: getRandomElement
  };
})();
