function aditem() {
  const itemName = document.querySelector("#item").value;
  alert(itemName); // ou faça o que quiser com o valor
}

const botao = document.querySelector(".botao-adicionar");
botao.addEventListener("click", aditem);