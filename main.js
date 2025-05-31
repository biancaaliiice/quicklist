const items = [];

function aditem() {
  const itemName = document.querySelector("#item").value.trim();

  if (!itemName) return; // evita item vazio

  const item = {
    name: itemName,
    checked: false
  };

  items.push(item);
  document.querySelector("#item").value = ""; // limpa o input

  showItemsList(); // mostra os itens na tela
}

const botao = document.querySelector(".botao-adicionar");
botao.addEventListener("click", aditem);

function showItemsList() {
  const sectionList = document.querySelector(".list");
  sectionList.innerHTML = ""; // limpa lista antes de recriar

  items.forEach((item, index) => {
    sectionList.innerHTML += `
      <div class="item">
        <div>
          <input type="checkbox" name="list" id="item-${index}">
          <div class="custom-checkbox">
            <img src="./assets/checked.svg" alt="checked">
          </div>
          <label for="item-${index}">${item.name}</label>
        </div>

        <button>
          <img src="./assets/trash-icon.svg" alt="trash icon">
        </button>
      </div>`;
  });
}
