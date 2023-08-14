// parent class
import View from './view.js';

// Imports
import icons from 'url:../../img/icons.svg'; // app's icons-file
import fracty from 'fracty'; // converting decimal numbers to fraction numbers

//
//  Class for rendering recipe page
//
class RecipeView {
  _parentElement = document.querySelector('.recipe');
  _data;
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  // Method for rendering recipe page
  //
  // data: recipe data
  render(data) {
    this._data = data;

    const markup = this._generateMarkup();

    // remove previous html from recipe container
    //  and add new recipe to container
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Private method to clear previous HTML from #parentElement
  //
  _clear() {
    this._parentElement.innerHTML = '';
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
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Method for showing errors to user.
  //
  // message: Error message that is shown on page. If no
  //          message is given, show default(this._errorMessage)
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    // First clear previous content then add spinner
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Method for showing errors to user.
  //
  // message: Error message that is shown on page. If no
  //          message is given, show default(this._errorMessage)
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    // First clear previous content then add spinner
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
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
   
        ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
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
  _generateMarkupIngredient(ing) {
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
