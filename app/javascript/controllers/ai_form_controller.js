import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form", "output", "spinner", "disappear"]

  connect() {
    console.log("AI form controller connected!");
  }

  addIngredient() {
    const ingredientIndex = this.formTarget.querySelectorAll('input').length;
    const newField = document.createElement("div");
    newField.innerHTML = `<label for="ingredient_${ingredientIndex}">Ingredient ${ingredientIndex + 1}</label>
                          <input type="text" name="ingredients[${ingredientIndex}]" id="ingredient_${ingredientIndex}" placeholder="Enter an ingredient" class="input input-bordered input-primary w-full max-w-xs mt-4 mb-8">`;
    this.formTarget.appendChild(newField);
  }

  submitForm(event) {
    event.preventDefault();
    const formData = new FormData(this.formTarget);
    this.spinnerTarget.style.display = 'block';
    this.disappearTarget.style.display = 'none';
    this.formTarget.style.display = 'none';

    fetch('/ai/create', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.recipes)
      this.spinnerTarget.style.display = 'none';
      const recipePattern = /Title:\s*(.*?)\s*\/\/\s*Ingredients:\s*(.*?)\s*\/\/\s*Instructions:\s*(.*)/s;
      const matches = data.recipes.match(recipePattern);

      let title = "Not Available";
      let ingredients = "No ingredients listed.";
      let instructions = "No instructions available.";

      if (matches) {
        title = matches[1];
        ingredients = matches[2];
        instructions = matches[3];
      } else {
        console.log("Failed to parse the recipe string.");
      }

      this.outputTarget.innerHTML = `<div class="card w-96 bg-base-100 shadow-xl">
                                        <div class="card-body">
                                          <h2 class="card-title">${title}</h2>
                                          <h4 class="font-bold">Ingredients:</h4>
                                          <p> ${ingredients}</p>
                                          <h4 class="font-bold">Instructions:</h4>
                                          <p>${instructions}</p>
                                        </div>
                                      </div>`;
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
      this.outputTarget.innerHTML = "<p>Error loading recipes. Please try again.</p>";
    });
  }
}