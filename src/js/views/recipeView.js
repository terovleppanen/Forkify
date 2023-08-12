// Imports
import icons from 'url:../../img/icons.svg'; // app's icons-file
import fracty from 'fracty'; // converting decimal numbers to fraction numbers

//
//  Class for rendering recipe page
//
class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;

  // Method for rendering recipe page
  //
  // data: recipe data
  render(data) {
    this.#data = data;

    const markup = this.#generateMarkup();

    // remove previous html from recipe container
    //  and add new recipe to container
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Private method to clear previous HTML from #parentElement
  //
  #clear() {
    this.#parentElement.innerHTML = '';
  }

  // Method to show loading spinner while waiting real data.
  //
  // parentElement: element where spinner is placed
  //
  renderSpinner() {
    // construct HTML markup
    const markup = `
     <div class="spinner">
       <svg>
         <use href="${icons}#icon-loader"></use>
       </svg>
     </div>
   `;

    // First clear previous content then add spinner
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Method to register event handler for events
  // (publisher-subscriber pattern)
  //
  // handler: function that handles the events
  //
  addHandlerRender(handler) {
    // 1. when hash of the location url changes show recipe for that hash
    // 2. when page is loaded look for hash and show corresponding recipe
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }

  // Private method to generate recipe page HTML
  //
  #generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this.#data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this.#data.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
   
        ${this.#data.ingredients.map(this.#generateMarkupIngredient).join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this.#data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.#data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
      `;
  }

  // Private method for generating HTML for each ingredient
  //
  // ing: ingredient data. Object format: {quantity: 1.5, unit: 'pounds',
  //      description: 'ground beef'}
  #generateMarkupIngredient(ing) {
    //
    // map ingredients to HTML elements
    // example of ingredient:
    // {quantity: 1.5, unit: 'pounds', description: 'ground beef'}
    //
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? fracty(ing.quantity) : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>`;
  }
}

// export new instance of class from this module
//
export default new RecipeView();
