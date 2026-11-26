import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPrincipal = document.querySelector(".caixa-principal");

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

function mostraPergunta() {

    perguntaAtual = perguntas[atual];

    caixaPerguntas.textContent = perguntaAtual.enunciado;

    caixaPerguntas.classList.add("mostrar");

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

    const afirmacoes = aleatorio(opcaoSelecionada.afirmacao);

    historiaFinal += afirmacoes + " ";

    if (opcaoSelecionada.proxima !== undefined) {

        atual = opcaoSelecionada.proxima;

    } else {

        mostraResultado();

        return;

    }

    mostraPergunta();

}

function mostraResultado() {

    caixaPerguntas.textContent = `Em 2049, ${nome}...`;

    textoResultado.textContent = historiaFinal;

    caixaAlternativas.innerHTML = "";

    caixaResultado.classList.add("mostrar");

}

function jogaNovamente() {

    atual = 0;

    historiaFinal = "";

    caixaResultado.classList.remove("mostrar");

    caixaPerguntas.classList.remove("mostrar");

    caixaAlternativas.innerHTML = "";

    telaInicial.style.display = "block";

    mostraPergunta();

}

function iniciaJogo() {

    atual = 0;

    historiaFinal = "";

    telaInicial.style.display = "none";

    caixaPerguntas.classList.remove("mostrar");

    caixaResultado.classList.remove("mostrar");

    mostraPergunta();

}

function substituiNome() {

    for (const pergunta of perguntas) {

        pergunta.enunciado = pergunta.enunciado.replace(/você/gi, nome);

        for (const alternativa of pergunta.alternativas) {

            alternativa.texto = alternativa.texto.replace(/você/gi, nome);

            for (let i = 0; i < alternativa.afirmacao.length; i++) {

                alternativa.afirmacao[i] = alternativa.afirmacao[i].replace(/você/gi, nome);

            }

        }

    }

}

botaoJogarNovamente.addEventListener("click", jogaNovamente);

substituiNome();