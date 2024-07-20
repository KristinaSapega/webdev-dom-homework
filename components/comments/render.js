//import { deleteComment } from "../../api";
//import { toggleLike } from "../../api";

export const renderComments = (app, comments) => {

  app.innerHTML = comments
    .map((comment) => {
      const newComment = document.createElement('li');
      newComment.classList.add('comment');

      const likeButtonClass = comment.liked ? 'like-button -active-like' : 'like-button';

      const dateAndTime = `${comment.date.toLocaleDateString()} ${comment.date.toLocaleTimeString()}`;
      return `<li class='comment'>
            <div class="comment-header">
              <div>${comment.name}</div>
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
    .join('');

};
// Задаем обработчики для взаимодействия с комментом
//replyInitEvent(newComment, comment);
//likeInitEvent(comments);

// const deleteButtons = app.querySelectorAll('.delete-button');
//   deleteButtons.forEach(button => {
//     button.addEventListener('click', async (event) => {
//       const commentId = button.getAttribute('data-comment-id');
//       try {
//         await deleteComment({ id: commentId });
//         // Обновляем список комментариев после удаления
//         const updatedComments = await getCommentsRequest(getToken());
//         renderComments(app, updatedComments);
//       } catch (error) {
//         console.error('Ошибка при удалении комментария:', error);
//       }
//     });
//   });


// Ответ на коммент
export function replyInitEvent(newComment, comment) {
  newComment.addEventListener('click', (event) => {
    event.stopPropagation();
    const nameInput = document.querySelector('#name-input');
    const commentInput = document.querySelector('#comment-input');
    // При клике на комментарий, заполняем поля формы добавления комментария данными комментария
    nameInput.value = '';
    commentInput.value = `@${comment.name}, ${comment.text}:`;
    commentInput.focus();
  });
}

//Лайк
function likeInitEvent(comments, token) {
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      const commentId = parseInt(button.dataset.commentId);
      
      try {
        const result = await toggleLike(commentId, token);
        const comment = comment.find((c) => c.id === commentId);

        comment.likes = result.result.likes;
        comment.liked = result.result.isLiked;

        const commentsList = document.querySelector('.comments');
        renderComments(commentsList, comments);
      } catch (error) {
        console.error('Ошибка при переключении лайка:', error);
      }
      

      if (commentId.liked) {
        commentId.likes--;
      } else {
        commentId.likes++;
      }
      commentId.liked = !commentId.liked;
      //Обновляем список комментариев на странице

      const commentsList = document.querySelector('.comments');
      renderComments(commentsList, commentId); 
     
    });
  });
}
likeInitEvent();
   
