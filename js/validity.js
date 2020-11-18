'use strict';

// Валидация хэш-тегов

const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS = 5;
const MAX_COMMENTS_LENGTH = 140;
const inputHashtags = document.querySelector(".text__hashtags");
const inputComment = document.querySelector(".text__description");
const checkHashtags = /^#[a-zа-я0-9]{1,20}$/;

inputHashtags.addEventListener('input', () => {
  const hashtagsArray = inputHashtags.value.trim().toLowerCase().split(/\s+/);
  hashtagsArray.forEach((item, i) => {
    const {length} = item;
    if (length < MIN_HASHTAG_LENGTH) {
      inputHashtags.setCustomValidity("Хэш-тег не может состоять только из #");
    } else if (length >= MAX_HASHTAG_LENGTH) {
      inputHashtags.setCustomValidity("Хэш-тег должен содержать не польше 20-ти символов");
    } else if (!checkHashtags.test(item)) {
      inputHashtags.setCustomValidity("Хэш-тег должен начинаться с # и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.");
    } else if (i >= MAX_HASHTAGS) {
      inputHashtags.setCustomValidity("Нельзя указать больше 5 хэш-тегов");
    } else {
      inputHashtags.setCustomValidity('');
    }
    const duplicatedHashtags = hashtagsArray.filter((element) => {
      return element === item;
    });
    if (duplicatedHashtags.length > 1) {
      inputHashtags.setCustomValidity("Хэш-теги не могут быть одинаковыми");
    }
  });
});

inputComment.addEventListener("input", () => {
  if (inputComment.value.length > MAX_COMMENTS_LENGTH) {
    inputComment.setCustomValidity("Максимум 140 символов");
  } else {
    inputComment.setCustomValidity('');
  }
});


