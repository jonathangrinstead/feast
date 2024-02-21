import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tabs"
export default class extends Controller {
  static targets = ["panel"]

  changeTab(event) {
    event.preventDefault();
    const tabTargetId = event.currentTarget.getAttribute('data-tab-target');
    this.panelTargets.forEach((panel) => {
      panel.classList.remove('active');
      if (panel.id === tabTargetId.substring(1)) {
        panel.classList.add('active');
      }
    });

    this.element.querySelectorAll('.tab').forEach((tab) => {
      tab.classList.remove('tab-active');
      tab.classList.remove('shadow');
    });
    event.currentTarget.classList.add('tab-active');
    event.currentTarget.classList.add('shadow');
  }
}
