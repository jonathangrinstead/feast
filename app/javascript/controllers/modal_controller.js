import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="modal"
export default class extends Controller {
  connect() {
    console.log("Modal controller connected")
  }

  static targets = ["modal"]

  toggle() {
    const modal = this.modalTarget;
    if (modal.classList.contains('modal-open')) {
      modal.classList.remove('modal-open');
      setTimeout(() => modal.style.display = 'none', 300); // Wait for the animation to finish
    } else {
      modal.style.display = 'block';
      setTimeout(() => modal.classList.add('modal-open'), 10); // Delay needed to trigger CSS transition
    }
  }
}
