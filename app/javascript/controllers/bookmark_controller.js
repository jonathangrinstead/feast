import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="bookmark"
export default class extends Controller {
  static values = {recipeId: Number, bookmarkId: Number, bookmarked: Boolean}
  connect() {
    this.updateButton();
  }
  toggleBookmark() {
    const url = this.bookmarkedValue ? `/recipes/${this.recipeIdValue}/bookmarks/${this.bookmarkIdValue}` : `/recipes/${this.recipeIdValue}/bookmarks`;
    const method = this.bookmarkedValue ? 'DELETE' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").getAttribute("content"),
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({})
    })
    .then(response => {
      if (response.ok) {
        this.bookmarkedValue = !this.bookmarkedValue;
        this.updateButton();
      }
    })
    .catch(error => console.error("Error:", error));
  }

  updateButton() {
    if (this.bookmarkedValue) {
      this.element.innerHTML = `<i class="fa-solid fa-bookmark fa-xl" style="color: #000000;"></i>`;
      this.element.classList.remove('btn-outline')
      this.element.classList.add('btn-active')
    } else {
      this.element.innerHTML = `<i class="fa-regular fa-bookmark fa-xl" style="color: #000000;"></i>`;
      this.element.classList.add('btn-outline')
      this.element.classList.remove('btn-active')
    }
  }
}
