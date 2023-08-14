// imports
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

// transpiling and polyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//
// controlRecipes
//
const controlRecipes = async function () {
  try {
    // get hash from location url
    const id = window.location.hash.slice(1);

    // if there's no hash stop function
    if (!id) return;

    // Render loading spinner
    recipeView.renderSpinner();

    // Load recipe
    await model.loadRecipe(id);

    // render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // Error handling
    // Call view to show error to user.
    recipeView.renderError();
  }
};

// Function to handle search requests from user(view) and getting corresponding
// data from model.
//
const controlSeachResults = async function () {
  try {
    // get query from view
    const query = searchView.getQuery();

    // if there is not query, return immediately
    if (!query) return;

    // request model to load search data for query
    await model.loadSearchResults(query);

    console.log(model.state.search.results);
  } catch (err) {
    // !!!!temp
    console.error(err);
  }
};

// Initialize application
//
const init = function () {
  // register controlRecipes to handle events in RecipeView
  // publisher-subcriber pattern.
  recipeView.addHandlerRender(controlRecipes);
  //  register controlSeachResults to handle events in SearchView
  searchView.addHandlerSearch(controlSeachResults);
};
init();
