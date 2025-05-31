let items = [];

function aditem() {
  const input = document.querySelector("#item");
  const itemName = input.value.trim();

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

  items.sort((a, b) => Number(a.checked) - Number(b.checked));

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

    fakeBox.addEventListener("click", () => {
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event("change"));
    });

    checkbox.addEventListener("change", () => {
      const id = parseInt(checkbox.getAttribute("data-id"));
      const item = items.find(i => i.id === id);
      if (item) {
        item.checked = checkbox.checked;
        renderList();
      }
    });

    const removeBtn = div.querySelector(".remove-button");
    removeBtn.addEventListener("click", () => {
      const id = parseInt(removeBtn.getAttribute("data-id"));
      removeItem(id);
    });
  });

  saveToLocalStorage();
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

function saveToLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}

function verifyLocalStorageItems() {
  const storedItems = localStorage.getItem("items");
  if (storedItems) {
    items = JSON.parse(storedItems);
  }
  renderList();
}

function addHideWarningClass() {
  document.querySelector(".warning").classList.add("hide-warning");
}

window.addEventListener("DOMContentLoaded", verifyLocalStorageItems);
