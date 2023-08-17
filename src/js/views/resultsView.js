import View from './view.js'; // parent class
import previewView from './previewView.js'; // class to render eash result
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
    // call helper function to create each bookmark
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

// export new instance of ResultsView so that there can be only one
// ResultsView
export default new ResultsView();
