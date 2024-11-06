let nome = "";
let numeroDigitado = "";
let tempoLimite = 30000; // 30 segundos em milissegundos
let timerId;

// Função para capturar o nome e iniciar a votação
function iniciarVotacao() {
  nome = document.getElementById("nomeInput").value;
  if (nome) {
    document.getElementById("nomeForm").style.display = "none";
    document.getElementById("urna").style.display = "block";
    document.getElementById("display").innerText = `Nome: ${nome}`;
    iniciarTimer();
  } else {
    alert("Por favor, digite seu nome.");
  }
}

// Função para iniciar o timer de 30 segundos
function iniciarTimer() {
  clearTimeout(timerId); // Limpa o timer anterior, se houver
  timerId = setTimeout(() => {
    alert("Tempo esgotado. Voto cancelado.");
    reiniciarVotacao();
  }, tempoLimite);
}

// Função para digitar número
function digitarNumero(num) {
  iniciarTimer(); // Reinicia o timer sempre que um número é digitado
  if (numeroDigitado.length < 2) {
    numeroDigitado += num;
    document.getElementById("display").innerText = `Nome: ${nome}\nNúmero: ${numeroDigitado}`;
  }
}

// Função para corrigir
function corrige() {
  iniciarTimer();
  numeroDigitado = numeroDigitado.slice(0, -1);
  document.getElementById("display").innerText = `Nome: ${nome}\nNúmero: ${numeroDigitado}`;
}

// Função para voto em branco
function branco() {
  iniciarTimer();
  if (confirm("Você deseja votar em branco? Prima confirma para encerrar seu voto.")) {
    enviarVoto("Branco", "https://i.imgur.com/placeholder.png");
  }
}

// Função para confirmar o voto
function confirma() {
  iniciarTimer();
  if (numeroDigitado === "69") {
    enviarVoto("ZID o Zientista", "https://i.ibb.co/0DBH3TD/zidozientista.png");
  } else if (numeroDigitado === "17") {
    enviarVoto("Gabriel do Capacete", "https://i.ibb.co/VmNfR6h/gabrieldocapacete.png");
  } else {
    if (confirm("Número não encontrado, deseja votar em branco? Prima confirma.")) {
      branco();
    }
  }
}

// Função para exibir o resultado após o voto e enviar os dados ao Netlify Forms sem recarregar a página
function enviarVoto(candidato, imagemUrl) {
  clearTimeout(timerId); // Para o timer
  document.getElementById("urna").style.display = "none";
  document.getElementById("resultado").style.display = "block";
  document.getElementById("mensagemVoto").innerText = `Você votou em ${candidato}!!`;
  document.getElementById("imagemCandidato").src = imagemUrl;

  let botaoResultado = document.createElement("button");
  botaoResultado.innerHTML = "Ver Resultado";
  botaoResultado.style.padding = "15px";
  botaoResultado.style.fontSize = "1.2em";
  botaoResultado.style.cursor = "pointer";
  botaoResultado.style.backgroundColor = "#0a0";
  botaoResultado.style.color = "white";
  botaoResultado.style.border = "none";
  botaoResultado.style.borderRadius = "5px";
  botaoResultado.style.width = "100%";
  botaoResultado.style.marginTop = "20px";
  
  // Redireciona para 'resultado.html' ao clicar
  botaoResultado.onclick = function() {
    window.location.href = 'resultado.html';
  };

  // Adiciona o botão ao elemento de resultado
  document.getElementById("resultado").appendChild(botaoResultado);

  // Envia os dados do formulário Netlify via fetch
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      "form-name": "votoForm",
      "nome": nome,
      "voto": candidato
    }).toString()
  })
  .then(() => console.log("Voto registrado com sucesso"))
  .catch((error) => console.error("Erro ao registrar o voto:", error));
}

// Função para reiniciar a votação após o tempo expirar
function reiniciarVotacao() {
  document.getElementById("nomeForm").style.display = "block";
  document.getElementById("urna").style.display = "none";
  document.getElementById("resultado").style.display = "none";
  nome = "";
  numeroDigitado = "";
  document.getElementById("nomeInput").value = "";
}
