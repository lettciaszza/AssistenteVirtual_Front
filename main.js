const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");

let janela;
const tamanhoJanela = {
  width: 500,
  height: 500,
};

// Função para criar a janela principal
const criarJanela = () => {
  janela = new BrowserWindow({
    width: tamanhoJanela.width,
    height: screen.getPrimaryDisplay().workAreaSize.height,
    x: screen.getPrimaryDisplay().workAreaSize.width - 500,
    y: 0,
    alwaysOnTop: true,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve("./preload.js"),
    },
  });

  janela.webContents.openDevTools(); // Opcional: para depuração
};

// Funções adicionais
const abrirOuFecharJanela = (status) => {
  if (status === "show") {
    janela.setSize(tamanhoJanela.width, screen.getPrimaryDisplay().workAreaSize.height - 100);
    janela.setPosition(screen.getPrimaryDisplay().workAreaSize.width - 80, 30);
  } else {
    janela.setSize(100, 100);
    janela.setPosition(screen.getPrimaryDisplay().workAreaSize.width - 80, screen.getPrimaryDisplay().workAreaSize.height - 200);
  }
};

const removerBackground = () => {
  janela.webContents.executeJavaScript(`
    const todosOsElementos = document.querySelectorAll("*");
    todosOsElementos.forEach(elemento => {
      elemento.style.background = 'transparent';
    });

    const textarea = document.querySelector('textarea:first-of-type');
    textarea.style.background = "#fff";
    textarea.style.color = "#000";
    textarea.style.padding = "10px";

    const avatar = document.createElement('img');
    avatar.id = 'avatar';
    avatar.src = 'https://cliply.co/clip/winking-avatar-3d/';
    document.body.appendChild(avatar);
  `);
};

const aplicarNovosEstilos = () => {
  janela.webContents.insertCSS(`
    main {
      padding: 5px;
    }
    .bg-gray-50 {
      --tw-bg-opacity: 1;
      background-color: #000;
      border-radius: 30px;
      margin: 5px;
    }
  `);
};

const carregaGemini = () => {
  janela.loadURL("https://gemini.google.com/?hl=pt-PT");
};

// Evento quando o aplicativo está pronto
app.on("ready", () => {
  criarJanela();
  abrirOuFecharJanela("Ocultar");
  carregaGemini();

  janela.webContents.on("did-finish-load", () => {
    removerBackground();
    aplicarNovosEstilos();
  });
});
