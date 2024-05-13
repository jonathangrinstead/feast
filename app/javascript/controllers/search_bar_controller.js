import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="search-bar"
export default class extends Controller {
  static targets = ["input"];

  connect() {
    console.log("SearchBarController connected!");
    this.inputTarget.addEventListener('keyup', this.search.bind(this));
  }

  toggleSearch() {
    const input = this.inputTarget;
    input.classList.toggle('w-32');
    input.classList.toggle('w-64');
    input.placeholder = input.placeholder === '🔍 Search' ? 'Search' : '🔍 Search';
  }

  search() {
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
      activeTab.innerHTML = '';
    }
    fetch(`/recipes/search?query=${encodeURIComponent(this.inputTarget.value)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").getAttribute("content")
      }
    })
    .then(response => response.text())
    .then(this.handleSuccess.bind(this))
    .catch(error => console.error('Error:', error));
  }

  handleSuccess(data) {
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
      activeTab.innerHTML = data;
    } else {
      console.error('No active tab found');
    }
  }
}