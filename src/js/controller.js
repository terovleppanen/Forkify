// Imports
import icons from 'url:../img/icons.svg'; // app's icons-file
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// DOM-elements
const recipeContainer = document.querySelector('.recipe');

// URL for API used for project
// https://forkify-api.herokuapp.com/v2

//
// Promisifying function for timeout.
//
// seconds: timeout time in seconds.
//
const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} second`)
      );
    }, seconds * 1000);
  });
};

//
// Function to show loading spinner while waiting real data.
//
// parentElement: element where spinner is placed
//
const renderSpinner = function (parentELement) {
  // construct HTML markup
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;

  // First clear previous content then add new markup
  parentELement.innerHTML = '';
  parentELement.insertAdjacentHTML('afterbegin', markup);
};

//
// showRecipe
//
const showRecipe = async function () {
  try {
    // get has from location url
    const id = window.location.hash.slice(1);

    // check if there was hash
    if (!id) return;

    //
    // Loading recipe
    //
    // Render loading spinner
    renderSpinner(recipeContainer);

    // fetch recipe
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40'
    );
    const data = await res.json();

    // check if the fetch was successful
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // restructure recipe and create rest of the variables
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    //
    // Rendering recipe
    //
    const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.servings
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
   
        ${recipe.ingredients
          .map(ing => {
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
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>`;
          })
          .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            recipe.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
      `;

    // remove previous html from recipe container
    recipeContainer.innerHTML = '';

    // add new recipe to container
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    // alert(err);
    console.error(err);
  }
};

// 1. when hash of the location url changes show recipe for that hash
// 2. when page is loaded look for hash and show corresponding recipe
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, showRecipe)
);
