// Obtém o elemento HTML com o ID "dropdown"
const printArea = document.querySelector("#dropdown");
const plans = [
  { id: "basic", name: "Basic Pack", price: "Free" },
  { id: "pro", name: "Pro Pack", price: "$9.99" },
  { id: "ultimate", name: "Ultimate Pack", price: "$19.99" },
];

// Cria o componente do dropdown
const component = document.createElement("div");
component.classList.add("dropdown");

// Cria o input do dropdown
const input = createInput();

// Adiciona o input ao componente
component.appendChild(input);

// Adiciona o componente ao elemento com o ID "dropdown"
printArea.appendChild(component);

function createInput() {
  // Cria o elemento do input do dropdown
  const input = document.createElement("div");
  input.classList.add("select", "input");

  // Adiciona um event listener apenas para detectar o clique no input
  input.addEventListener("click", toggleDropdown);

  // Cria o elemento que mostra o texto e o preço selecionado
  const inputPlaceholder = document.createElement("div");
  inputPlaceholder.classList.add("dropdown-placeholder");

  // Cria o elemento para exibir o nome do plano selecionado
  const n = document.createElement("b");
  n.classList.add("dropdown-placeholder_name");
  n.textContent = "Basic Pack";

  // Cria o elemento para exibir o preço do plano selecionado
  const t = document.createElement("p");
  t.classList.add("dropdown-placeholder_price");
  t.textContent = "Free";

  // Adiciona o nome e o preço ao elemento que mostra o texto e o preço selecionado
  inputPlaceholder.appendChild(n);
  inputPlaceholder.appendChild(t);
  input.appendChild(inputPlaceholder);

  return input;
}

function toggleDropdown() {
  // Verifica se a estrutura do dropdown já foi criada
  let dropdown = document.querySelector(".dropdown-structure");

  if (!dropdown) {
    // Se a estrutura do dropdown ainda não foi criada, cria e adiciona ao componente
    dropdown = showDropdown();
    component.appendChild(dropdown);

    // Adiciona um event listener para detectar cliques fora do dropdown
    document.addEventListener("click", handleDocumentClick);
  } else {
    // Se a estrutura do dropdown já existe, alterna a classe "hidden" para mostrar ou esconder o dropdown
    dropdown.classList.toggle("hidden");
  }

  // Alterna a classe "select_active" para estilizar o input quando o dropdown estiver visível
  input.classList.toggle("select_active");
}

function handleDocumentClick(event) {
  const dropdown = document.querySelector(".dropdown-structure");
  // Verifica se o clique foi fora do dropdown e do input
  if (!dropdown.contains(event.target) && !input.contains(event.target)) {
    // Esconde o dropdown e remove o event listener para evitar interferências
    dropdown.classList.add("hidden");
    input.classList.remove("select_active");
    document.removeEventListener("click", handleDocumentClick);
  }
}

function showDropdown() {
  // Cria o elemento da estrutura do dropdown
  const structure = document.createElement("div");
  structure.classList.add("dropdown-structure", "hidden");

  plans.forEach((plan) => {
    const { id, name, price } = plan;
    const option = document.createElement("div");
    option.addEventListener("click", () => selectOption(option, name, price));
    option.setAttribute("id", id);
    option.classList.add("dropdown-structure_input");

    // Cria o elemento para exibir o nome do plano
    const n = document.createElement("b");
    n.classList.add("dropdown-structure_name");
    n.textContent = name;

    // Cria o elemento para exibir o preço do plano
    const t = document.createElement("p");
    t.classList.add("dropdown-structure_price");
    t.textContent = price;

    // Adiciona o nome e o preço à opção do dropdown
    option.appendChild(n);
    option.appendChild(t);
    structure.appendChild(option);
  });

  return structure;
}

function selectOption(option, name, price) {
  // Obtém todos os elementos das opções do dropdown
  const htmlElements = printArea.getElementsByClassName(
    "dropdown-structure_input"
  );

  // Remove a classe "dropdown-structure_input-selected" de todas as opções
  for (let i = 0; i < htmlElements.length; i++) {
    htmlElements[i].classList.remove("dropdown-structure_input-selected");
  }

  // Adiciona a classe "dropdown-structure_input--selected" à opção selecionada
  option.classList.add("dropdown-structure_input-selected");

  const n = document.querySelector(".dropdown-placeholder_name");
  const p = document.querySelector(".dropdown-placeholder_price");
  n.textContent = name;
  p.textContent = price;

  // Esconde o dropdown após a seleção de uma opção
  toggleDropdown();
}
