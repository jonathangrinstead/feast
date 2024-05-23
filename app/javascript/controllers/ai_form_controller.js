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
      this.spinnerTarget.style.display = 'none';
      const recipePattern = /Title:\s*(.*?)\s*\/\/\s*Ingredients:\s*(.*?)\s*\/\/\s*Instructions:\s*(.*)/s;
      const matches = data.content.match(recipePattern);

      let title = "Not Available";
      let ingredients = "No ingredients listed.";
      let instructions = "No instructions available.";

      if (matches) {
        title = matches[1];
        ingredients = matches[2];
        instructions = matches[3];

        const steps = instructions.split(/(?=\d+\.)/).filter(Boolean);
        const ol = document.createElement('ol');
        steps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step.trim();
            ol.appendChild(li);
        })
        const instructionContainer = document.createElement('div');
        instructionContainer.appendChild(ol);
        instructions = instructionContainer.innerHTML;
      } else {
        console.log("Failed to parse the recipe string.");
      }

      this.outputTarget.innerHTML = `<div class="card w-96 bg-base-100 shadow-xl">
                                      <figure><img src="${data.image_url}" alt="${title}" class="h-48"/></figure>
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
