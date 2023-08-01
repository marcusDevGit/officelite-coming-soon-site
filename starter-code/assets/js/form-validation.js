// Obtendo referências dos elementos do formulário
const form = document.getElementById("form"); // Obtém a referência do elemento de formulário pelo seu ID
const nameInput = document.getElementById("name"); // Obtém a referência do campo de nome pelo seu ID
const emailInput = document.getElementById("email"); // Obtém a referência do campo de e-mail pelo seu ID

// Expressão regular para validar o formato do e-mail
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Função para validar o formulário
function validateForm(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Verifica se o campo de nome está vazio
  const isNameEmpty = nameInput.value.trim() === "";

  // Verifica se o e-mail é inválido de acordo com a expressão regular
  const isEmailInvalid = !emailRegex.test(emailInput.value);

  // Adiciona ou remove a classe de erro nos campos de acordo com a validação
  if (isNameEmpty) {
    nameInput.classList.add("input-error");
  } else {
    nameInput.classList.remove("input-error");
  }
  // Adiciona ou remove a classe de erro nos campos de acordo com a validação
  if (isEmailInvalid) {
    emailInput.classList.add("input-error");
  } else {
    emailInput.classList.remove("input-error");
  }

  // Se o nome e o e-mail forem válidos, abrir o link em uma nova janela
  if (!isNameEmpty && !isEmailInvalid) {
    window.open("https://www.frontendmentor.io/", "_blank");
  }
}

// Função para remover a classe de erro quando o campo está em foco
function removeError() {
  this.classList.remove("input-error");
}

// Adicionando o evento de validação ao formulário
form.addEventListener("submit", validateForm);

// Adicionando eventos de foco para remover a classe de erro ao interagir com os campos
nameInput.addEventListener("focus", removeError);
emailInput.addEventListener("focus", removeError);
