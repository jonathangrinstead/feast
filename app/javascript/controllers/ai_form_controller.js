import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form", "output"]

  connect() {
    console.log("AI form controller connected!");
  }

  addIngredient() {
    const ingredientIndex = this.formTarget.querySelectorAll('input').length;
    const newField = document.createElement("div");
    newField.innerHTML = `<label for="ingredient_${ingredientIndex}">Ingredient ${ingredientIndex + 1}</label>
                          <input type="text" name="ingredients[${ingredientIndex}]" id="ingredient_${ingredientIndex}" placeholder="Enter an ingredient" class="input input-bordered input-primary w-full max-w-xs mt-4 mb-8">`;
    this.formTarget.appendChild(newField);  // Append directly to the form target
  }

  submitForm(event) {
    event.preventDefault();
    const formData = new FormData(this.formTarget);

    fetch('/ai/create', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      this.outputTarget.innerHTML = data.recipes.join("<br>");
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
      this.outputTarget.innerHTML = "<p>Error loading recipes. Please try again.</p>";
    });
  }
}
