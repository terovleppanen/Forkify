import View from './view.js'; // parent class
import icons from 'url:../../img/icons.svg'; // app's icons-file

//
// Class for rendering search results to page.
//
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again.';
  _message = '';

  // Generates markup for search results
  //
  _generateMarkup() {
    // call helper function to create each result
    return this._data.map(this._generateMarkupPreview).join('');
  }

  // Generates markup for each individual result
  //
  _generateMarkupPreview(result) {
    // Get current id of page an if it's same mark corresponding
    // result line with class 'preview__link--active'
    const id = window.location.hash.slice(1);

    return `
         <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ''
            }" href="#${result.id}">
            <figure class="preview__fig">
               <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
               <h4 class="preview__title">${result.title}</h4>
               <p class="preview__publisher">${result.publisher}</p>
            </div>
            </a>
         </li>`;
  }
}

// export new instance of ResultsView so that there can be only one
// ResultsView
export default new ResultsView();
