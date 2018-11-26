import axios from 'axios';

const baseURL = 'https://f94e2fc3.ngrok.io/api';
// const baseURL = 'http://localhost:48147/api';

global.baseUrl = baseURL;

axios.defaults.baseURL = baseURL;

const tratamentos = (reason) => {
  console.log(reason);
};

const tratarErro = (respostaDeErro) => {
  // alert(respostaDeErro);
  if (axios.isCancel(respostaDeErro)) {
    // eslint-disable-next-line no-console
    console.warn('Requisição AJAX cancelada: ', respostaDeErro);
  } else {
    // eslint-disable-next-line no-console
    tratamentos(respostaDeErro);
    console.error('Erro na requisição ajax: ', respostaDeErro);
  }
};

// Add a response interceptor
axios.interceptors.response
  .use(
    response =>
    // console.log(response);
      response
    ,
    (error) => {
      const promessaRejeitada = Promise.reject(error);
      promessaRejeitada.catch(tratarErro);
      // return error;
      return promessaRejeitada;
    },
  );
