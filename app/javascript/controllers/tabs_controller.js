import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["panel"]

  connect() {
        let hash = window.location.hash;
      if (hash) {
        const tab = this.element.querySelector(`[data-tab-target="${hash}"]`);
        if (tab) {
          this.activateTab(tab);
        }
      } else {
        this.setActiveTabFromStorage();
      }
      this.updateBackLink(); // Call to update the back link on page load
    }

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
      
      sessionStorage.setItem('activeTabId', tabTargetId);
      this.updateBackLink(); // Update the back link each time a tab changes
    }

  setActiveTabFromStorage() {
    const activeTabId = sessionStorage.getItem('activeTabId');
    if (activeTabId) {
      const activeTab = this.element.querySelector(`[data-tab-target="${activeTabId}"]`);
      if (activeTab) {
        this.activateTab(activeTab);
      }
    }
  }

  activateTab(tab) {
    const event = new Event('click', {bubbles: true});
    tab.dispatchEvent(event);
  }

  updateBackLink() {
    const backButton = document.getElementById('back-to-home'); // Adjust the ID as necessary
    const activeTabId = sessionStorage.getItem('activeTabId');
    if (backButton && activeTabId) {
      backButton.href = `${backButton.baseURI}${activeTabId}`; // Ensure correct path formation
    }
  }
}
