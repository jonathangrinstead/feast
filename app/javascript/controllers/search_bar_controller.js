import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="search-bar"
export default class extends Controller {
  static targets = ["input"];

  connect() {
    console.log("SearchBarController connected!");
  }

  toggleSearch() {
    const input = this.inputTarget;
    input.classList.toggle('w-32');
    input.classList.toggle('w-64');
    input.placeholder = input.placeholder === '🔍 Search' ? 'Search' : '🔍 Search';
  }
}