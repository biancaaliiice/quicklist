const items = [];

function aditem() {
  const itemName = document.querySelector("#item").value.trim();
  if (!itemName) return;

  const item = {
    id: Date.now(), // ID único
    name: itemName,
    checked: false
  };

  items.push(item);
  document.querySelector("#item").value = "";
  showItemsList();
}

const botao = document.querySelector(".botao-adicionar");
botao.addEventListener("click", aditem);

function showItemsList() {
  const sectionList = document.querySelector(".list");
  sectionList.innerHTML = "";

  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <div>
        <input type="checkbox" id="item-${item.id}">
        <div class="custom-checkbox" onclick="checkItem('${item.name}')">
          <img src="./assets/checked.svg" alt="checked">
        </div>
        <label for="item-${item.id}" onclick="checkItem('${item.name}')">${item.name}</label>
      </div>
      <button class="remove-button" data-id="${item.id}">
        <img src="./assets/trash-icon.svg" alt="Remover">
      </button>
    `;
    sectionList.appendChild(div);
  });

  // Adiciona funcionalidade aos botões de remover
  document.querySelectorAll(".remove-button").forEach(button => {
    button.addEventListener("click", () => {
      const idToRemove = parseInt(button.getAttribute("data-id"));
      removeItem(idToRemove);
    });
  });
}

function removeItem(id) {
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items.splice(index, 1);
    showItemsList();

    const divWarning = document.querySelector(".warning");
    if (divWarning) {
      divWarning.classList.remove("hide-warning");
      setTimeout(() => {
        divWarning.classList.add("hide-warning");
      }, 3000);
    }
  }
}

function checkItem(itemName) {
  const item = items.find((item) => item.name === itemName)

    item.checked = !item.checked 
  

  showItemsList()
}


