// menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// validação de form
const contactForm = document.getElementById('contactForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const mensagemInput = document.getElementById('mensagem');
const successModal = document.getElementById('successModal');
const closeModal = document.querySelector('.close');

// validadores
function validarNome(nome) {
    const ehValido = nome.trim().length >= 3;
    return ehValido;
}

function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email.trim());
}

function validarMensagem(mensagem) {
    const ehValida = mensagem.trim().length >= 10;
    return ehValida;
}

// Mostrar/esconder mensagens de erro
function mostrarErro(input, mensagem, spanError) {
    input.classList.add('input-error');
    spanError.textContent = mensagem;
    spanError.style.display = 'block';
}

function limparErro(input, spanError) {
    input.classList.remove('input-error');
    spanError.textContent = '';
    spanError.style.display = 'none';
}

nomeInput.addEventListener('blur', () => {
    const nome = nomeInput.value;
    if (!validarNome(nome)) {
        mostrarErro(nomeInput, 'Nome deve ter pelo menos 3 caracteres', document.getElementById('erroNome'));
    } else {
        limparErro(nomeInput, document.getElementById('erroNome'));
    }
});

emailInput.addEventListener('blur', () => {
    const email = emailInput.value;
    if (!validarEmail(email)) {
        mostrarErro(emailInput, 'E-mail inválido. Use o formato: usuario@dominio.com', document.getElementById('erroEmail'));
    } else {
        limparErro(emailInput, document.getElementById('erroEmail'));
    }
});

mensagemInput.addEventListener('blur', () => {
    const mensagem = mensagemInput.value;
    if (!validarMensagem(mensagem)) {
        mostrarErro(mensagemInput, 'Mensagem deve ter pelo menos 10 caracteres', document.getElementById('erroMensagem'));
    } else {
        limparErro(mensagemInput, document.getElementById('erroMensagem'));
    }
});

// submeter form
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    limparErro(nomeInput, document.getElementById('erroNome'));
    limparErro(emailInput, document.getElementById('erroEmail'));
    limparErro(mensagemInput, document.getElementById('erroMensagem'));

    // valida campos
    const nome = nomeInput.value;
    const email = emailInput.value;
    const mensagem = mensagemInput.value;

    let temErro = false;

    if (!validarNome(nome)) {
        mostrarErro(nomeInput, 'Nome deve ter pelo menos 3 caracteres', document.getElementById('erroNome'));
        temErro = true;
    }

    if (!validarEmail(email)) {
        mostrarErro(emailInput, 'E-mail inválido. Use o formato: usuario@dominio.com', document.getElementById('erroEmail'));
        temErro = true;
    }

    if (!validarMensagem(mensagem)) {
        mostrarErro(mensagemInput, 'Mensagem deve ter pelo menos 10 caracteres', document.getElementById('erroMensagem'));
        temErro = true;
    }

    // Se não houver erros, simular envio
    if (!temErro) {
        // Simular envio do formulário (aqui você poderia fazer uma requisição real)
        console.log('Formulário enviado:', {
            nome,
            email,
            mensagem
        });

        // Exibir modal de sucesso
        successModal.style.display = 'block';

        // Limpar campos do formulário
        contactForm.reset();

        // Fechar modal após 3 segundos (opcional)
        setTimeout(() => {
            successModal.style.display = 'none';
        }, 3000);
    }
});

// Fechar modal ao clicar no X
closeModal.addEventListener('click', () => {
    successModal.style.display = 'none';
});

// Fechar modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target === successModal) {
        successModal.style.display = 'none';
    }
});

// navegação em ancora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
