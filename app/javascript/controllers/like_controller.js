import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="like"
export default class extends Controller {
  static values = { recipeId: Number, liked: Boolean, likeId: Number }
  static targets = [ "icon" ]
  connect() {
    console.log('like controller connected');
    this.iconTarget.addEventListener('click', (event) => {
      console.log('Button clicked', event);
    });
    this.updateButton();
  }

  async toggleLike() {
  console.log('toggleLike started');
  console.log('likedValue', this.likedValue);
  const url = this.likedValue ? `/recipes/${this.recipeIdValue}/likes/${this.likeIdValue}` : `/recipes/${this.recipeIdValue}/likes`;
  const method = this.likedValue ? 'DELETE' : 'POST';
  console.log(url);
  console.log(method);

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").getAttribute("content"),
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      console.log(data);
      this.likedValue = !this.likedValue;
      const event = new CustomEvent('like:updated', { detail: data.newCount });
      this.element.dispatchEvent(event);
      this.updateButton();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

  updateButton() {
    if (this.likedValue) {
      this.iconTarget.innerHTML = `<i class="fa-solid fa-heart fa-xl" style="color: #000000;"></i>`;
      this.iconTarget.classList.remove('btn-outline')
      this.iconTarget.classList.add('btn-active')
    } else {
      this.iconTarget.innerHTML = `<i class="fa-regular fa-heart fa-xl" style="color: #000000;"></i>`;
      this.iconTarget.classList.add('btn-outline')
      this.iconTarget.classList.remove('btn-active')
    }
  }
}
