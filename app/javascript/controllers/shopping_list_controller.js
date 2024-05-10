import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="shopping-list"
export default class extends Controller {
  static targets = ["items", "input"]

  connect() {
    this.loadItems();
  }

  add(event) {
    event.preventDefault()
    const value = this.inputTarget.value.trim()
    if (value.length > 0) {
      this.createItem(value);
      this.inputTarget.value = ''
      this.saveItems();
    }
  }

  toggleComplete(event) {
    const checkbox = event.target
    checkbox.parentNode.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    this.saveItems();
  }

  createItem(text, completed = false) {
    const listItem = document.createElement("li")
    listItem.classList.add("m-4");
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = completed;
    checkbox.onchange = this.toggleComplete.bind(this);
    checkbox.classList.add("checkbox");
    checkbox.classList.add("checkbox-primary");

    listItem.textContent = text;
    listItem.prepend(checkbox);
    listItem.style.textDecoration = completed ? 'line-through' : 'none';

    this.itemsTarget.appendChild(listItem);
  }

  saveItems() {
    const items = [];
    this.itemsTarget.querySelectorAll('li').forEach(li => {
      const text = li.textContent.trim();
      const completed = li.querySelector('input').checked;
      items.push({ text, completed });
    });
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }

  loadItems() {
    const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    items.forEach(item => this.createItem(item.text, item.completed));
  }
}
