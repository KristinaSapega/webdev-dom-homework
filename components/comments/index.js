import { commentsList } from "./list.js";
import { renderAddCommentForm } from "./addCommentForm.js";
import { renderForm } from "../loginRegistrationForm.js";

let commentsData = [];

export const getComments = () => {
    //возвращает текущее значение массива
    return commentsData;
}
export const setComments = (newValue) => {
    //устанавливает новое значение массива
    commentsData = newValue
}

const comments = (token, isCommentsUpdate) => {
    //app DOM-элемент куда будет добавляться контент комментария
    commentsList(token).then(() => {
        if (!token) {
            document.querySelector(".form")
                .innerHTML = `<div class="login-button"><p class="login-text">Чтобы добавить комментарий, <button class="login-button">авторизуйтесь</button></p></div>`;
            document.querySelector(".login-button").addEventListener("click", () => {
                renderForm(app);
            });
            return;
        }
        if (!isCommentsUpdate) {
            renderAddCommentForm(app); //если пользователь авторизован, то отображается форма для добавления комментария
        }
    });
};

export { comments };
