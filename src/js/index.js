function criarEstrela() {
    const estrela = document.createElement("i");
    estrela.className = "bi bi-star-fill star";

    const tamanho = Math.random() * 20 + 10; // 10px a 30px
    estrela.style.fontSize = `${tamanho}px`;

    estrela.style.left = `${Math.random() * window.innerWidth}px`;
    estrela.style.top = `${window.innerHeight}px`;

    estrela.style.color = Math.random() > 0.5 ? "#ff69b4" : "#00f"; // rosa ou azul

    document.body.appendChild(estrela);

    // Remover após animação
    setTimeout(() => estrela.remove(), 10000);
  }

  // Criar estrelas continuamente
  setInterval(criarEstrela, 600);

 const frases = [
    "I love you",
    "Tv Girl",
    "Amo você",
    "Te adoro",
    "Amo seus olhos"
  ];

  function criarFrase() {
    const el = document.createElement("div");
    el.className = "frase";

    el.textContent = frases[Math.floor(Math.random() * frases.length)];

    const tamanho = Math.random() * 20 + 14; // 14px a 34px
    el.style.fontSize = `${tamanho}px`;

    el.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
    el.style.top = `${Math.random() * (window.innerHeight - 50)}px`;

    el.style.color = Math.random() > 0.5 ? "#ff69b4" : "#1e7cff"; // rosa ou azul

    document.body.appendChild(el);

    // Mostrar suavemente
    setTimeout(() => el.style.opacity = 1, 100);

    // Desaparecer e remover
    setTimeout(() => {
      el.style.opacity = 0;
      setTimeout(() => el.remove(), 1000);
    }, 4000); // visível por 4 segundos
  }

  // Frequência baixa: uma frase a cada 7 a 15 segundos
  function iniciarFrases() {
    setInterval(() => {
      if (Math.random() < 0.8) { // 40% de chance de aparecer
        criarFrase();
      }
    }, 2000);
  }

  iniciarFrases();

const bola = document.querySelector('.bola');
const mensagem = document.querySelector('.mensagem');

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

let lastX = 0;
let lastY = 0;
let lastTime = Date.now();

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  const now = Date.now();
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const dt = now - lastTime;

  const velocidade = Math.sqrt(dx * dx + dy * dy) / dt;

  if (velocidade > 3) {
    mensagem.classList.add('ativa');

    clearTimeout(mensagem.timeout);
    mensagem.timeout = setTimeout(() => {
      mensagem.classList.remove('ativa');
    }, 1000);
  }

  lastX = e.clientX;
  lastY = e.clientY;
  lastTime = now;
});

function animate() {
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;

  bola.style.left = `${currentX}px`;
  bola.style.top = `${currentY}px`;

  // atualiza a posição da mensagem ao lado da bola
  mensagem.style.left = `${currentX + 40}px`;
  mensagem.style.top = `${currentY - 20}px`;

  requestAnimationFrame(animate);
}

animate();


window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('tela-senha').style.display = 'flex';
  }, 4000);
});

const senhaCorreta = '12345'; // altere para sua senha desejada

document.getElementById('btn-login').addEventListener('click', () => {
  const senhaDigitada = document.getElementById('senha').value;

  if (senhaDigitada === senhaCorreta) {
    document.getElementById('tela-senha').style.display = 'none';
  } else {
    const msgErro = document.getElementById('msg-erro');
    msgErro.style.display = 'block';
  }
});


const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show')
        }
        else {
            entry.target.classList.remove('show')
        }
    })
})

const elements = document.querySelectorAll('.hidden')
elements.forEach( (element) => myObserver.observe(element))


