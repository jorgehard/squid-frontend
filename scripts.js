document.addEventListener("DOMContentLoaded", function() {
  //Variavel com link da API
  const API_URL = 'https://vision.squidit.com.br/v1/feed/test?count=36';
  //Primeira consulta da API
  buscaAPI(API_URL)
      .then((showmetheapi))
  //Função para buscar API
  function buscaAPI(val) {
      return fetch(val)
          .then((data) => data.json())
  }
  //Função para carregar mais conteudo
  function carregarMais(url) {
      return function () {
          buscaAPI(API_URL + '&nextUrl=' + encodeURIComponent(url) )
              .then((showmetheapi))
      }
  }
  //Função para exibir os dados da API
  function showmetheapi({ medias: data , pagination : data2}){
      data.forEach((dados) => {
          const root = document.getElementById('root');
          //
          let a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('href', dados.link);
          //
          let divBox = document.createElement('div');
          divBox.setAttribute('class', 'box-img');
          //
          let img = document.createElement('img');
          img.src = dados.imagens.resolucaoMedia.url;
          //
          let divHover = document.createElement('div');
          divHover.setAttribute('class', 'hover-box');

          //OPÇÃO PARA HOVER NÃO UTILIZEI, FIZ PELO PROPRIO CSS
          // divHover.onmouseover = function() {
          //   this.setAttribute('style', 'opacity:1');
          // }
          // divHover.onmouseout = function() {
          //   this.setAttribute('style', 'opacity:0');
          // }

          let divHoverTitle = document.createElement('div');
          divHoverTitle.setAttribute('class', 'hover-box-title');
          //
          let ul = document.createElement('ul');

          let user = document.createElement('li');
          user.innerHTML = `@${dados.usuario.username}`;
 
          let likes = document.createElement('li');
          likes.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i> ' + dados.upvotes;

          let comments = document.createElement('li');
          comments.innerHTML = '<i class="fa fa-comment" aria-hidden="true"></i>' + dados.comentarios;

          let dataPost = document.createElement('li');
          dataPost.innerHTML = '<i class="fa fa-calendar" aria-hidden="true"></i>' + formatDate(dados.criadoEm);

          root.appendChild(a);
          a.appendChild(divBox);
          divBox.appendChild(img);
          divBox.appendChild(divHover);
          divHover.appendChild(divHoverTitle);
          divHoverTitle.appendChild(ul);
          ul.appendChild(user);
          ul.appendChild(likes);
          ul.appendChild(comments);
          ul.appendChild(dataPost);
      });
      let button = document.getElementById('button');
      button.onclick = carregarMais(data2.next_url);
  }
  //Função para converter a data para formato BR (Não é a melhor forma, mas irá servir)
  function formatDate(varDate){
    var dateTime = new Date(varDate);
    return (
        (dateTime.getDate() > 9) ? 
        (dateTime.getDate()) : 
        ('0' + dateTime.getDate())
      ) + '/' + 
      (
        (dateTime.getMonth() > 8) ? 
        (dateTime.getMonth() + 1) : 
        ('0' + (dateTime.getMonth() + 1))
      ) + '/' + 
      dateTime.getFullYear();
  }
});