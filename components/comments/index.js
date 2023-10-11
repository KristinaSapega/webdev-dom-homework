import { commentsList } from "./list.js";
import { renderAddCommentForm } from "./addCommentForm.js";
import { renderForm } from "../loginRegistrationForm.js";

let commentsData = [];

export const getComments = () => { //возвращает текущее значение массива
    return commentsData;
}
export const setComments = (newValue) => { //устанавливает новое значение массива
    commentsData = newValue
}


const comments = (app, token) => { //app DOM-элемент куда будет добавляться контент комментария
    commentsList(app, token).then(() => {
        if (!token) {
            app.innerHTML += `<div class="login-button"><p class="login-text">Чтобы добавить комментарий, <button class="login-button">авторизуйтесь</button></p></div>`;
            document.querySelector(".login-button").addEventListener("click", () => {
                renderForm(app);
            });
            return;
        }

        renderAddCommentForm(app); //если пользователь авторизован, то отображается форма для добавления комментария
    });
};

export { comments };
