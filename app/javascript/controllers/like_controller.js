import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="like"
export default class extends Controller {
  static values = { recipeId: Number, liked: Boolean, likeId: Number }

  connect() {
    console.log(`Like controller connected for recipe ${this.recipeIdValue}`);
    console.log(`Like controller connected for like ${this.likeIdValue}`);
    this.updateButton();
  }

  toggleLike() {
    const url = this.likedValue ? `/recipes/${this.recipeIdValue}/likes/${this.likeIdValue}` : `/recipes/${this.recipeIdValue}/likes`;
    const method = this.likedValue ? 'DELETE' : 'POST';

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
        this.likedValue = !this.likedValue;
        this.updateButton();
      }
    })
    .catch(error => console.error("Error:", error));
  }

  updateButton() {
    if (this.likedValue) {
      this.element.innerHTML = `<i class="fa-solid fa-heart fa-xl" style="color: #000000;"></i>`;
      this.element.classList.remove('btn-outline')
      this.element.classList.add('btn-active')
    } else {
      this.element.innerHTML = `<i class="fa-regular fa-heart fa-xl" style="color: #000000;"></i>`;
      this.element.classList.add('btn-outline')
      this.element.classList.remove('btn-active')
    }
  }
}
