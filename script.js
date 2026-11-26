import { aleatorio, nome } from "./aleatorio.js";
import { perguntas } from "./perguntas.js";

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

botaoIniciar.addEventListener("click", iniciaJogo);
botaoJogarNovamente.addEventListener("click", jogaNovamente);

function iniciaJogo() {
  atual = 0;
  historiaFinal = "";

  telaInicial.style.display = "none";

  caixaPerguntas.classList.add("mostrar");
  caixaAlternativas.classList.add("mostrar");
  caixaResultado.classList.remove("mostrar");

  mostraPergunta();
}

function mostraPergunta() {
  perguntaAtual = perguntas[atual];

  if (!perguntaAtual) {
    mostraResultado();
    return;
  }

  caixaPerguntas.textContent = perguntaAtual.enunciado;

  mostraAlternativas();
}

function mostraAlternativas() {
  caixaAlternativas.innerHTML = "";

  for (const alternativa of perguntaAtual.alternativas) {
    const botaoAlternativas = document.createElement("button");

    botaoAlternativas.textContent = alternativa.texto;

    botaoAlternativas.addEventListener("click", () => {
      respostaSelecionada(alternativa);
    });

    caixaAlternativas.appendChild(botaoAlternativas);
  }
}

function respostaSelecionada(opcaoSelecionada) {
  const afirmacaoEscolhida = aleatorio(
    opcaoSelecionada.afirmacao
  );

  historiaFinal += afirmacaoEscolhida + " ";

  if (opcaoSelecionada.proxima !== undefined) {
    atual = opcaoSelecionada.proxima;
    mostraPergunta();
  } else {
    mostraResultado();
  }
}

function mostraResultado() {
  caixaPerguntas.textContent = `Em 2049, ${nome}`;

  caixaAlternativas.classList.remove("mostrar");
  caixaResultado.classList.add("mostrar");

  textoResultado.textContent =
    "Suas escolhas ao longo do quiz foram: " +
    historiaFinal;
}

function jogaNovamente() {
  atual = 0;
  historiaFinal = "";

  caixaResultado.classList.remove("mostrar");
  caixaPerguntas.classList.add("mostrar");
  caixaAlternativas.classList.add("mostrar");

  mostraPergunta();
}

function substituiNome() {
  for (const pergunta of perguntas) {
    pergunta.enunciado =
      pergunta.enunciado.replace(/você/gi, nome);
  }
}

substituiNome();
