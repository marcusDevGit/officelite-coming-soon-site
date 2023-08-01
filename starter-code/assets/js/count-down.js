// Obtém o elemento HTML com o ID "countdown"
var countdown = document.getElementById("countdown");

// Chama a função para criar a data de lançamento ou obter a data existente
var releaseDate = getOrCreateReleaseDate();

// Renderiza a data de lançamento na página
renderReleaseDate(releaseDate);

// Atualiza o countdown a cada 1 segundo (1000 milissegundos)
setInterval(renderCountdown, 1000);

// Função para criar a data de lançamento ou obter a data existente do armazenamento local
function getOrCreateReleaseDate() {
  var storedReleaseDate = window.localStorage.getItem("releaseDate");

  if (!storedReleaseDate) {
    // Se não houver data de lançamento armazenada, cria uma nova data 30 dias a partir de agora
    var date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000); // adiciona 30 dias em milissegundos
    window.localStorage.setItem("releaseDate", date);
    return date;
  } else {
    // Se houver data de lançamento armazenada, converte a string para um objeto Date e retorna
    return new Date(storedReleaseDate);
  }
}

// Função para renderizar a data de lançamento na página
function renderReleaseDate(releaseDate) {
  var releaseDateElement = document.getElementById("release_date");
  var options = { day: "numeric", month: "long", year: "numeric" };

  // Converte a data para uma string no formato "dia mês ano" e exibe no elemento da página
  releaseDateElement.innerHTML = releaseDate.toLocaleDateString(
    "en-GB",
    options
  );
}

// Função para renderizar o countdown
function renderCountdown() {
  var countdownNumbers = countdown.getElementsByClassName("countdown_number");
  var parsedCountdown = calculateCountdown();

  // Itera pelos elementos do countdown e atualiza seus valores com os números do countdown
  parsedCountdown.forEach(function renderNumbers(number, i) {
    countdownNumbers[i].innerHTML = number;
  });
}

// Função para calcular o countdown (diferença entre a data de lançamento e a data atual)
function calculateCountdown() {
  var releaseDate = new Date(window.localStorage.getItem("releaseDate"));
  var currentDate = new Date();
  var milisecondsLeft = releaseDate.getTime() - currentDate.getTime();

  var conversionRates = [24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000, 1000]; // milissegundos em [dias, horas, minutos, segundos]

  // Converte os milissegundos restantes para dias, horas, minutos e segundos
  var parsedCountdown = conversionRates.map(function parseMilliseconds(rate) {
    var convertedValue = Math.floor(milisecondsLeft / rate);
    milisecondsLeft = milisecondsLeft % rate;
    return convertedValue;
  });

  return parsedCountdown;
}
