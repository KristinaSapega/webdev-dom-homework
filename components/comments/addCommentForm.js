import { addCommentRequest, getCommentsRequest } from "../../api.js";
import { renderComments } from "./render.js";
import { setComments } from "./index.js";




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

    const nameInput = document.querySelector('#name-input');
    const commentInput = document.querySelector('#comment-input');
    const addButton = document.querySelector('.add-form-button');
    const loadingMessage = document.querySelector('.loading-message');
    const commentsList = document.querySelector('.comments');


    // Обработчик кнопки "Написать"
    addButton.addEventListener('click', () => {
        if (nameInput.value.trim().length < 3 || commentInput.value.trim().length < 3) {
            alert('Имя и комментарий должны содержать хотя бы 3 символа!');
            return;
        }

        // Скрытие формы добавления комментария и отображение сообщения "Комментарий добавляется ..."
        nameInput.disabled = true;
        commentInput.disabled = true;
        addButton.disabled = true;
        loadingMessage.textContent = 'Комментарий добавляется...';

        // Создание нового комментария
        const now = new Date();
        const dateString = `${now.getDate()}.${now.getMonth() + 1
            }.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

        const newComment = {
            name: nameInput.value,
            date: dateString,
            text: commentInput.value,
            likes: 0,
            liked: false,
        };

        // Отправляем новый комментарий на сервер через POST-запрос
        addCommentRequest(newComment)
            .then(() => {
                getCommentsRequest()
                .then((responseData) => {
                    setComments(responseData);

                    renderComments(commentsList, getCommentsRequest());
                    
                    // Очистка полей ввода и включение элементов формы
                    nameInput.value = '';
                    commentInput.value = '';
                    nameInput.disabled = false;
                    commentInput.disabled = false;
                    addButton.disabled = false;
                    addButton.textContent = 'Добавить';
                    loadingMessage.style.display = 'none';
                })
                .catch((error) => {
                    // Обработка ошибок при добавлении комментария
                    console.log(error);
                    nameInput.disabled = false;
                    commentInput.disabled = false;
                    addButton.disabled = false;
                    addButton.textContent = 'Добавить';
                    loadingMessage.style.display = 'none';

                    if (error.message === 'Ошибка сервера') {
                        alert('Сервер сломался, попробуй позже');
                        return;
                    }
                    if (error.message === 'Неверный запрос') {
                        alert('Имя и комментарий должны быть не короче трех символов');
                        return;
                    }
                    alert('Отсутствует интернет-соединение');
                });

            })
        // .then(() => {
        //     //const updatedComments = responseData.comments; // Получаем обновленный массив комментариев

        //     // Обновляем список комментариев на странице
        //     //renderComments(commentsList, updatedComments);

        //     // Очистка полей ввода и включение элементов формы
        //     nameInput.value = '';
        //     commentInput.value = '';
        //     nameInput.disabled = false;
        //     commentInput.disabled = false;
        //     addButton.disabled = false;
        //     addButton.textContent = 'Добавить';
        //     loadingMessage.style.display = 'none';
        // })
        // .catch((error) => {
        //     // Обработка ошибок при добавлении комментария
        //     console.log(error);
        //     nameInput.disabled = false;
        //     commentInput.disabled = false;
        //     addButton.disabled = false;
        //     addButton.textContent = 'Добавить';
        //     loadingMessage.style.display = 'none';

        //     if (error.message === 'Ошибка сервера') {
        //         alert('Сервер сломался, попробуй позже');
        //         return;
        //     }
        //     if (error.message === 'Неверный запрос') {
        //         alert('Имя и комментарий должны быть не короче трех символов');
        //         return;
        //     }
        //     alert('Отсутствует интернет-соединение');
        // });
    });
}
