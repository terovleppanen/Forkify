// imports
import * as model from './model.js';
import recipeView from './views/recipeView.js';

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

    // if there's no hash stop fucntion
    if (!id) return;

    // Render loading spinner
    recipeView.renderSpinner();

    // Load recipe
    await model.loadRecipe(id);

    // render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

// Initialize apllication
//
const init = function () {
  // register controlRecipes to handle events in view
  // publisher-subcriber pattern.
  recipeView.addHandlerRender(controlRecipes);
};
init();
