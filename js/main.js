'use strict';

var PHOTO_ARRAY_LENGHT = 25;
var MIN_NUMBER_PHOTO = 1;
var MAX_NUMBER_PHOTO = 6;
var MIN_NUMBER_OF_COMMENTS = 1;
var MAX_NUMBER_OF_COMMENTS = 5;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var picturesArray = [];
var comments = [];
var COMMENT_NAME = ["Anton", "Max", "Kantimir", "Marusya", "Toma", "Joshua"];
var COMMENT_DESCRIPTION = ["Всё отлично!", "В целом всё неплохо. Но не всё.", "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.", "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.", "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.", "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var createComments = function (commentsNumber) {
  for (var i = 0; i < commentsNumber; i++) {
    comments.push({
      avatar: `img/avatar-${getRandomInt(MIN_NUMBER_PHOTO, MAX_NUMBER_PHOTO)}.svg`,
      message: COMMENT_DESCRIPTION[getRandomInt(0, COMMENT_DESCRIPTION.length - 1)],
      name: COMMENT_NAME[getRandomInt(0, COMMENT_NAME.length - 1)]
    });
  }
};

var createPictureArray = function () {
  for (var i = 0; i < PHOTO_ARRAY_LENGHT; i++) {
    var numberOfComment = getRandomInt(MIN_NUMBER_OF_COMMENTS, MAX_NUMBER_OF_COMMENTS);
    picturesArray.push({
      url: `photos/${i + 1}.jpg`,
      description: "Hello",
      like: getRandomInt(MIN_LIKES, MAX_LIKES),
      comments: createComments(numberOfComment),
      commentsNumber: numberOfComment
    });
  }
};

createPictureArray();

