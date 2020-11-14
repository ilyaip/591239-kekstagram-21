'use strict';

// Валидация хэш-тегов

var inputHashtags = document.querySelector(".text__hashtags");
var inputComment = document.querySelector(".text__description");
var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAG_LENGTH = 20;
var MAX_HASHTAGS = 5;
var MAX_COMMENTS_LENGTH = 140;
var checkHashtags = /^#[a-zа-я0-9]{1,20}$/;

inputHashtags.addEventListener('input', function () {
  var hashtagsArray = inputHashtags.value.trim().toLowerCase().split(/\s+/);
  for (var i = 0; i < hashtagsArray.length; i++) {
    var valueLength = hashtagsArray[i].length;
    if (valueLength < MIN_HASHTAG_LENGTH) {
      inputHashtags.setCustomValidity("Хэш-тег не может состоять только из #");
    } else if (valueLength >= MAX_HASHTAG_LENGTH) {
      inputHashtags.setCustomValidity("Хэш-тег должен содержать не польше 20-ти символов");
    } else if (!checkHashtags.test(hashtagsArray[i])) {
      inputHashtags.setCustomValidity("Хэш-тег должен начинаться с # и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.");
    } else if (i >= MAX_HASHTAGS) {
      inputHashtags.setCustomValidity("Нельзя указать больше 5 хэш-тегов");
    } else {
      inputHashtags.setCustomValidity('');
    }
    var duplicatedHashtags = hashtagsArray.filter(function (item) {
      return item === hashtagsArray[i];
    });
    if (duplicatedHashtags.length > 1) {
      inputHashtags.setCustomValidity("Хэш-теги не могут быть одинаковыми");
    }
  }
});

inputComment.addEventListener("input", function () {
  if (inputComment.value.length > MAX_COMMENTS_LENGTH) {
    inputComment.setCustomValidity("Максимум 140 символов");
  } else {
    inputComment.setCustomValidity('');
  }
});


