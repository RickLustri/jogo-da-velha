// Puxando os elementos do html
const quadrados = document.querySelectorAll('.quadrado');
const botao = document.getElementById('botao');
// Define o jogador atual
let jogador = 'X';
// Mapeando o tabuleiro
let tabuleiro = Array(9).fill(null);


// Definindo o evento de clique
quadrados.forEach(quadrado => {
  quadrado.addEventListener('click', () => quadradoClicado(quadrado));
});

botao.addEventListener('click', restartarJogo);

function quadradoClicado(quadrado) {

  // Pegando o id do quadrado clicado
  const i = quadrado.dataset.index;

  // Verifica se o quadrado com o id ja esta ocupado ou se o jogo acabou
  if (tabuleiro[i] || verificarVencedor()) return;

  // Atualiza o tabuleiro
  tabuleiro[i] = jogador;
  quadrado.textContent = jogador;

  // Verifica o ganhador
  if (verificarVencedor()) {
    alert(`O jogador ${jogador} venceu!`);

    // Verifica se todo o tabuleiro foi preenchido
  } else if (tabuleiro.every(quadrado => quadrado)) {
    alert('Empate!');

  } else {
    // Mudando o jogador
    jogador = jogador === 'X' ? 'O' : 'X';
  }
}

function verificarVencedor() {
  const conbinacoesDeVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Verifica se um dos jogadores venceu
  return conbinacoesDeVitoria.some(combinacao => {
    // Pega os elementos de cada combinação
    const [a, b, c] = combinacao;

    // Verifica se os elementos de cada combinação sao iguais
    return tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c];
  });
}


function restartarJogo() {
  // Zerando o tabuleiro
  tabuleiro = Array(9).fill(null);
  // Limpando os elementos do tabuleiro
  quadrados.forEach(quadrado => quadrado.textContent = '');
  // Mudando o jogador para X
  jogador = 'X';
}