//addCommentForm.js

import {addCommentRequest, getCommentsRequest} from "../../api.js";
import {renderComments} from "./render.js";
import {comments, setComments} from "./index.js";
import { getToken } from "../../store.js";




function getAddCommentFormTemplate() {
    return `
      <div class="add-form">
        <input type="text" id="name-input" class="add-form-name" placeholder="Введите ваше имя"/>
        <textarea 
            id="comment-input"
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button">Написать</button>
        </div>
      </div>
    `
}

export function renderAddCommentForm(app) {
    app.innerHTML += getAddCommentFormTemplate()

    const addButton = document.querySelector('.add-form-button');

    // Обработчик кнопки "Написать"
    addButton.addEventListener('click', () => {
        const nameInput = document.querySelector('#name-input');
        const commentInput = document.querySelector('#comment-input');
        const addButton = document.querySelector('.add-form-button');
        if (nameInput.value.trim().length < 3 || commentInput.value.trim().length < 3) {
            alert('Имя и комментарий должны содержать хотя бы 3 символа!');
            return;
        }

    

        // Скрытие формы добавления комментария и отображение сообщения "Комментарий добавляется ..."
        nameInput.disabled = true;
        commentInput.disabled = true;
        addButton.disabled = true;
        app.innerHTML += '<div class="loading-message">Комментарий добавляется...</div>';
       
        //loadingMessage.textContent = 'Комментарий добавляется...';

        // Создание нового комментария
        //const now = new Date();
        // const dateString = `${now.getDate()}.${
        //     now.getMonth() + 1
        // }.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

        const newComment = {
            // name: nameInput.value,
            // date: dateString,
            text: commentInput.value,
            // likes: 0,
            // liked: false,
        };

        // Отправляем новый комментарий на сервер через POST-запрос
        addCommentRequest(newComment)
            .then(() => {
                comments (app, getToken ());
            })

            .catch((error) => {

                if (error.message === 'Ошибка сервера') {
                    alert('Сервер сломался, попробуй позже');
                    return;
                }
                if (error.message === 'Неверный запрос') {
                    alert('Имя и комментарий должны быть не короче трех символов');
                    return;
                }
                alert('Отсутствует интернет-соединение');
            })
            .finally (() => {
                const addForm = document.querySelector('.add-form');
                if (addForm.parentNode) {
                    addForm.parentNode.removeChild(addForm);
                  }
                const loadingMessage = document.querySelector('.loading-message');
                loadingMessage.style.display = 'none';
            }); 

    });
}