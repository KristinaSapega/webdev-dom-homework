
//import { renderForm } from './components/loginRegistrationForm.js';
import { comments } from './components/comments/index.js';


const app = document.querySelector('#app');
const loadingMessage = app.querySelector('.loading-message');
let isLoading = true;


const host = "https://wedev-api.sky.pro/api/v2/kristina-sapega/comments";


//let token = "bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
export let token = null;
const appElement = document.querySelector('#app')

export function setToken (value) {
  token = value;
}

export function getToken () {
  return token.token;
}


function showLoadingMessage() {
  if (isLoading) {
    loadingMessage.textContent = 'Пожалуйста, подождите, загружаю комментарии...';
    loadingMessage.style.display = 'block';
  } else {
    loadingMessage.style.di