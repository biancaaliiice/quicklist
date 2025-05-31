const items = [];

function aditem() {
  const input = document.querySelector("#item");
  const itemName = input.value.trim();

  // Validação: campo vazio ou "maçã"
  if (!itemName || itemName.toLowerCase() === "maçã") {
    alert("Digite um item válido!");
    input.value = "";
    return;
  }

  items.push({
    id: Date.now(),
    name: itemName,
    checked: false
  });

  input.value = "";
  renderList();
}

document.querySelector(".botao-adicionar").addEventListener("click", aditem);

function renderList() {
  const section = document.querySelector(".list");
  section.innerHTML = "";

  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div class="item-content">
        <input 
          type="checkbox" 
          id="item-${index}" 
          data-id="${item.id}" 
          ${item.checked ? "checked" : ""}
        >
        <div class="custom-checkbox">
          <img src="./assets/checked.svg" alt="checked">
        </div>
        <label for="item-${index}">${item.name}</label>
      </div>
      <button class="remove-button" data-id="${item.id}">
        <img src="./assets/trash-icon.svg" alt="Remover">
      </button>
    `;

    section.appendChild(div);

    const checkbox = div.querySelector('input[type="checkbox"]');
    const fakeBox = div.querySelector('.custom-checkbox');

    // Clicar na div custom-checkbox marca o checkbox
    fakeBox.addEventListener("click", () => {
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event("change"));
    });

    // Atualiza o estado interno no array
    checkbox.addEventListener("change", () => {
      const id = parseInt(checkbox.getAttribute("data-id"));
      const item = items.find(i => i.id === id);
      if (item) {
        item.checked = checkbox.checked;
      }
    });

    // Botão de remover
    const removeBtn = div.querySelector(".remove-button");
    removeBtn.addEventListener("click", () => {
      const id = parseInt(removeBtn.getAttribute("data-id"));
      removeItem(id);
    });
  });
}

function removeItem(id) {
  const index = items.findIndex(i => i.id === id);
  if (index !== -1) {
    items.splice(index, 1);
    renderList();

    const warning = document.querySelector(".warning");
    if (warning) {
      warning.classList.remove("hide-warning");
      setTimeout(() => {
        warning.classList.add("hide-warning");
      }, 3000);
    }
  }
}
