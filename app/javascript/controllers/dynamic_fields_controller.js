import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dynamic-fields"
export default class extends Controller {
  static targets = ["template", "instruction"]

  addIngredient(event) {
    event.preventDefault();
    const content = this.templateTargets.find(t => t.getAttribute("data-type") === "ingredient").innerHTML.replace(/NEW_RECORD/g, new Date().getTime());
    this.element.querySelector("#ingredients").insertAdjacentHTML('beforeend', content);
  }

  addInstruction(event) {
    event.preventDefault();
    const currentSteps = this.instructionTargets.length;
    const newStepNumber = currentSteps + 1;
    let content = this.templateTargets.find(t => t.getAttribute("data-type") === "instruction").innerHTML;
    content = content.replace(/NEW_RECORD/g, new Date().getTime());
    content = content.replace(/STEP_NUMBER/g, newStepNumber);
    this.element.querySelector("#instructions").insertAdjacentHTML('beforeend', content);
  }
}
