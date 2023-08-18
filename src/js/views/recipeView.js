// parent class
import View from './view.js';

// Imports
import icons from 'url:../../img/icons.svg'; // app's icons-file
import fracty from 'fracty'; // converting decimal numbers to fraction numbers

//
//  Class for rendering recipe page
//
class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  // Method to register event handler for events
  // 'hashchange', 'load'
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

  // Method for subcribe to handle servings buttons clicks
  //
  // handler: handler that is called on button clicks
  //
  addHandlerUpdateServings(handler) {
    // Use event delegation for listening buttons
    this._parentElement.addEventListener('click', function (event) {
      // check if clicks happened within buttons
      // if was outside of buttons btn will be null
      const btn = event.target.closest('.btn--update-servings');

      // if null, click wasn't on buttons -> exit
      if (!btn) return;

      // read updateTo dataset value from button
      const updateTo = +btn.dataset.updateTo;

      // Call handler (subscriber), pass new servings amount
      // to handler.
      // Only do call if servings doesn't go under 1
      if (updateTo > 0) handler(updateTo);
    });
  }

  // Method for adding handler to add recipe to bookmarks
  // i.e. for click event of bookmark button
  //
  // handler: handler that is called
  //
  addHandlerAddBookmark(handler) {
    // Use event delegation to add handler to button.
    this._parentElement.addEventListener('click', function (event) {
      // get button if user clicked within button
      const btn = event.target.closest('.btn--bookmark');

      // if null it wasn't button that was clicked
      if (!btn) return;

      // notify handler
      handler();
    });
  }

  // Method to generate recipe page HTML
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
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.servings - 1
            }">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.servings + 1
            }">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated 
          ${this._data.key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
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

  // Method for generating HTML for each ingredient
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
