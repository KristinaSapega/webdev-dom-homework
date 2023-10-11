// api.js

const host = "https://wedev-api.sky.pro/api/v2/kristina-sapega/comments";

//get-запрос к серверу для получения комментариев
export const getCommentsRequest = (token) => {
  return fetch(host, {
    method: 'GET',
    headers: {
      Authorization: token,
    }
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error('Ошибка при авторизвции');
      }
      if (response.status === 500) {
        throw new Error("Произошла ошибка сервера");
      }
      return response.json();
    })
    .then((responseData) => {
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
    });
};
//post-запрос, чтобы добавить комментарии
export const addCommentRequest = ({text}) => {
  //console.log(newComment);
  return fetch(host, {
    method: 'POST',
    body: JSON.stringify({
      text,
    }),
    headers:
    {Authorization : `Bearer ${token}`},
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Неверный запрос');
    } else if (response.status === 500) {
      throw new Error('Ошибка сервера');
    }
    return response.json();
  });
};

//post-запрос, чтобы авторизовать пользователя
export function loginUser ({login, password}) {
  return fetch(" https://wedev-api.sky.pro/api/user/login", {
    method:"POST",
    body: JSON.stringify({
      login,
      password
    }),
  }).then((response) => {
    if (response.status === 400){
      throw new Error ('Введен неправильно логин или пароль') ;
    } else {
      return response.json();
    }
  });
};

//post-запрос, чтобы зарегистрировать пользователя
export function registerUser ({name, login, password}) {
  return fetch("https://wedev-api.sky.pro/api/user", {
    method:'post',
    body: JSON.stringify({
      name,
      login,
      password
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Пользователь с таким логином уже сущетсвуе");
    } else {
      return response.json();
    }
  });
};