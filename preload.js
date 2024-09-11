const { ipcRenderer } = require('electron');

ipcRenderer.on("iniciar", (event, arg) => {
  console.log("Iniciando...");

  const elementoAvatar = document.querySelector("#avatar");
  const elementMain = document.querySelector('main');

  if (!elementoAvatar || !elementMain) {
    console.error("Elementos não encontrados");
    return;
  }

  console.log(elementoAvatar);

  elementoAvatar.onclick = async () => {
    if (elementMain.style.display === "none") {
      ipcRenderer.send("AbriuOuFecharJanela", "show");
      elementMain.style.backgroundColor = "#1c59fd61";
      elementMain.style.display = "block"; // Exibe novamente o elemento

      // Exemplo de envio de mensagem para o servidor
      const resposta = await ipcRenderer.invoke('enviar-mensagem', "Sua mensagem aqui");
      console.log(resposta);
    } else {
      ipcRenderer.send("AbriuOuFecharJanela", "hide");
      elementMain.style.display = "none";
      elementMain.style.backgroundColor = "";
    }
  };
});
