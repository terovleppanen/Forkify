// transpiling and polyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// imports
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// just for Parcel
if (module.hot) {
  module.hot.accept();
}

//
// controlRecipes
//
const controlRecipes = async function () {
  try {
    // get hash from location url
    const id = window.location.hash.slice(1);

    // if there's no hash stop function
    if (!id) return;

    // Update results view to mark selected result
    resultsView.update(model.getSearchResultsPage());

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
    // show spinner while loading results
    resultsView.renderSpinner();

    // get query from view
    const query = searchView.getQuery();

    // if there is not query, return immediately
    if (!query) return;

    // request model to load search data for query
    await model.loadSearchResults(query);

    // render results in view
    resultsView.render(model.getSearchResultsPage());

    // render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    // !!!!temp
    console.error(err);
  }
};

// Function handling button clicks in pagination
//
// goToPage: number of page we are moving
const controlPagination = function (goToPage) {
  // render new results in view
  resultsView.render(model.getSearchResultsPage(goToPage));

  // render new pagination buttons
  paginationView.render(model.state.search);
};

// Function to change servings count in recipes.
//
const controlServings = function (newServings) {
  // Update the recipe servings(in state)
  model.updateServings(newServings);

  //  Update the recipe view by rendering it again
  //  with new values
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

// Initialize application
//
const init = function () {
  // register controlRecipes to handle 'hashchange'
  // and 'load' events in RecipeView
  // publisher-subcriber pattern.
  recipeView.addHandlerRender(controlRecipes);
  // and subscribe to handle servings buttons
  recipeView.addHandlerUpdateServings(controlServings);
  //  register controlSeachResults to handle events in SearchView
  searchView.addHandlerSearch(controlSeachResults);
  //  register controlPagination to handle events to PaginationView
  paginationView.addHandlerClick(controlPagination);
};
init();
