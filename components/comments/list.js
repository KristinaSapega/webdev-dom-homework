import { getCommentsRequest } from '../../api.js';
import { renderComments } from './render.js';

const commentsList = (app, token) => {
    app.innerHTML += '<ul class="comments"></ul>';
    const commentsListNode = app.querySelector('.comments'); //commentsListNode-контейнер для отображения комментариев

    let isLoading = true;

    return getCommentsRequest(token)
        .then((responseData) => {
            // Рендеринг начального списка комментариев
            renderComments(commentsListNode, responseData);
        })
        .catch((error) => {
            console.error(error);
            alert('Кажется что-то пошло не так, попробуйте позже.');
            isLoading = false;
            renderComments(commentsListNode, []); // Показываем сообщение об ошибке
        });
};

export { commentsList };
