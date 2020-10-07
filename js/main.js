'use strict';

var ARRAY_LENGHT = 25;
var array = [];
var COMMENT_ARRAY = [];
var COMMENT_NAME = ["Anton", "Max", "Kantimir", "Marusya", "Toma", "Joshua"];
var COMMENT_DESCRIPTION = ["Всё отлично!", "В целом всё неплохо. Но не всё.", "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.", "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.", "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.", "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"];
var pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
var pictureList = document.querySelector(".pictures");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var createComment = function (COMMENTS_NUMBER) {
  for (var i = 0; i < COMMENTS_NUMBER; i++) {
    COMMENT_ARRAY[i] = {
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: COMMENT_DESCRIPTION[getRandomInt(0, COMMENT_DESCRIPTION.length - 1)],
      name: COMMENT_NAME[getRandomInt(0, COMMENT_NAME.length - 1)]
    }
  }
}

var createArray = function () {
  for (var i = 0; i < ARRAY_LENGHT; i++) {
    var NUMBER_OF_COMMENT = getRandomInt(1, 5);
    array[i] = {
      url: `photos/${getRandomInt(1, 25)}.jpg`,
      description: "Very nice pic",
      like: `${getRandomInt(15, 200)}`,
      comments: createComment(NUMBER_OF_COMMENT)
    };
  }
};

createArray();

var getImg = function (className) {
  var picturElement = pictureTemplate.cloneNode(true);

  picturElement.querySelector(className).src = array[i].url;
};

var getLike = function (className) {
  var picturElement = pictureTemplate.cloneNode(true);

  picturElement.querySelector(className).textContent = array[i].like;
};

var getComment = function (className) {
  var picturElement = pictureTemplate.cloneNode(true);

  picturElement.querySelector(className).textContent = array[i].comments;
};

for (var i = 0; i < array.length; i++) {
  var picturElement = pictureTemplate.cloneNode(true);

  getImg(".picture__img");
  getLike(".picture__likes");
  getComment(".picture__comments");

  pictureList.appendChild(picturElement);
}


