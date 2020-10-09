'use strict';

var ARRAY_COMMENTS_LENGHT = 25;
var randomComment = [];
var COMMENTS = [];
var COMMENT_NAME = ["Anton", "Max", "Kantimir", "Marusya", "Toma", "Joshua"];
var COMMENT_DESCRIPTION = ["Всё отлично!", "В целом всё неплохо. Но не всё.", "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.", "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.", "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.", "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"];
var pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
var pictureList = document.querySelector(".pictures");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var createComments = function (commentsNumber) {
  for (var i = 0; i < commentsNumber; i++) {
    COMMENTS.push({
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: COMMENT_DESCRIPTION[getRandomInt(0, COMMENT_DESCRIPTION.length - 1)],
      name: COMMENT_NAME[getRandomInt(0, COMMENT_NAME.length - 1)]
    });
  }
};

var createArrayComments = function () {
  for (var i = 0; i < ARRAY_COMMENTS_LENGHT; i++) {
    var numberOfComment = getRandomInt(1, 5);
    randomComment.push({
      url: `photos/${getRandomInt(1, 25)}.jpg`,
      description: "Very nice pic",
      like: `${getRandomInt(15, 200)}`,
      comments: createComments(numberOfComment)
    });
  }
};

createArrayComments();

var getComment = function () {
  var picturElement = pictureTemplate.cloneNode(true);

  picturElement.querySelector(".picture__img").src = randomComment[i].url;
  picturElement.querySelector(".picture__likes").textContent = randomComment[i].like;
  picturElement.querySelector(".picture__comments").textContent = randomComment[i].comments;

  pictureList.appendChild(picturElement);
};

for (var i = 0; i < randomComment.length; i++) {
  getComment();
}


