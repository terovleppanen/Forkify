import View from './view.js'; // parent class
import icons from 'url:../../img/icons.svg'; // app's icons-file

//
// Class for rendering search results to page.
//
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again.';
  _message = '';

  _generateMarkup() {
    console.log(this._data);

    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    return `
         <li class="preview">
            <a class="preview__link" href="#${result.id}">
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
