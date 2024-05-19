import { getToken } from "./main.js";

const host = "https://wedev-api.sky.pro/api/v2/kristina-sapega/comments";


export const getCommentsRequest = async (token) => {
  const response = await fetch(host, {
    method: 'GET',
    headers: {
      Authorization: token,
    }
  });
  if (response.status === 401) {
    throw new Error('Ошибка при авторизвции');
  }
  if (response.status === 500) {
    throw new Error("Произошла ошибка сервера");
  }
  const responseData = await response.json();
  const appComments = responseData.comments.map((comment) => {
    return {
      id: comment.id,
      name: comment.author.name,
      date: new Date(comment.date), // Преобразование строки даты в объект Date
      text: comment.text,
      likes: comment.likes,
      liked: false,
    };
  });
  return appComments;
};

export const addCommentRequest = async ({ text }) => {
  //console.log(newComment);
  const response = await fetch(host, {
    method: 'POST',
    body: JSON.stringify({
      text,
    }),
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (response.status === 400) {
    throw new Error('Неверный запрос');
  } else if (response.status === 500) {
    throw new Error('Ошибка сервера');
  }
  return await response.json();
};


export function loginUser({ login, password }) {
  return fetch(" https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Введен неправильно логин или пароль');
    } else {
      return response.json();
    }
  });
};


export function registerUser({ name, login, password }) {
  return fetch("https://wedev-api.sky.pro/api/user", {
    method: 'POST',
    body: JSON.stringify({
      name,
      login,
      password
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Пользователь с таким логином уже сущетсвует");
    } else {
      return response.json();
    }
  });
};

export function toggleLike(commentId, token) {
  return fetch("https://wedev-api.sky.pro/api/comments/:id/toggle-like", {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      'Authorization': `Bearer ${getToken()}`
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = response.json();
    return result;
  }
  )
}
