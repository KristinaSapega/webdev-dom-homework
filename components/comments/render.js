import { deleteComment } from "../../api.js";
import { toggleLike } from "../../api.js";
import { getToken, token } from "../../main.js";
import { getComments, comments as renderCom} from "./index.js";


export const renderComments = (app, comments) => {
  app.innerHTML = comments
    .map((comment) => {
      const newComment = document.createElement('li');
      newComment.classList.add('comment');

      const likeButtonClass = comment.liked
        ? 'like-button -active-like'
        : 'like-button';

      const dateAndTime = `${comment.date.toLocaleDateString()} ${comment.date.toLocaleTimeString()}`;
      return `<li class='comment' data-comment-id="${comment.id}">
            <div class="comment-header">
              <div>${escapeHtml(comment.name)}</div>
              <div>${dateAndTime}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${comment.text}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="${likeButtonClass}" data-comment-id="${comment.id}"></button>
                <div class="edit-buttons">
            <button class="edit-button" data-comment-id="${comment.id}">Редактировать</button>
              </div>
              <div class="delete-buttons">
            <button class="delete-button" data-comment-id="${comment.id}">Удалить</button>
              </div>
            </div>
           </li>
          `;
    })
    .join("");

  if (token) {
    replyInitEvent();
    likeInitEvent(comments);
    deleteEventInit();
  }
};

function deleteEventInit() {
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      event.stopPropagation();
      const commentId = button.getAttribute('data-comment-id');
      try {
        await deleteComment({ id: commentId, token: getToken() });
        // Обновляем список комментариев после удаления
        renderCom(token);
      } catch (error) {
        console.error('Ошибка при удалении комментария:', error);
      }
    });
  });
}

export function replyInitEvent() {
  const comments = document.querySelectorAll('.comment')
  //console.log(comments)
  for (const comment of comments) {
    console.log(comment)
    comment.addEventListener('click', (event) => {
      event.stopPropagation();
      const id = comment.dataset.commentId;
      const data = getComments();
      const currentComment = data.find((comment) => comment.id === id);
      const commentInput = document.querySelector('#comment-input');
      // При клике на комментарий, заполняем поля формы добавления комментария данными комментария
      commentInput.value = `@${currentComment.name}, ${currentComment.text}:`;
      commentInput.focus();
    });
  }
}

function likeInitEvent(_comments) {
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.stopPropagation();
      const commentId = button.dataset.commentId;

      try {
        await toggleLike(commentId);

        renderCom(token);
      } catch (error) {
        console.error('Ошибка при переключении лайка:', error);
      }

    });
  });
}





