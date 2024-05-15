import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="follow"
export default class extends Controller {
  static targets = ["button", "count"];

  async toggle(event) {
    event.preventDefault();
    
    const response = await fetch(this.buttonTarget.action, {
      method: "POST",
      headers: { "X-CSRF-Token": document.querySelector("[name='csrf-token']").content }
    });
    const data = await response.json();

    console.log(data);

    this.buttonTarget.innerText = data.following ? "Following" : "Follow";
    this.buttonTarget.classList.add("btn");
    this.buttonTarget.classList.add("btn-primary");
    if (data.following === true) {
      this.buttonTarget.classList.add("btn-outline");
    }
    this.countTarget.innerText = data.followers_count;
  }
}
