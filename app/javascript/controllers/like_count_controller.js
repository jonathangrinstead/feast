import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="like-count"
export default class extends Controller {
  static targets = [ "count" ]

  connect() {
      this.element.addEventListener('like:updated', event => this.updateCount(event.detail));
  }

  updateCount(newCount) {
    this.countTarget.textContent = newCount;
  }
}
