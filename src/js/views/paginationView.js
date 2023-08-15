import View from './view.js'; // parent class
import icons from 'url:../../img/icons.svg'; // app's icons-file

//
// Class for displaying pagination buttons.
//
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  // Method for adding subscriberr to handle click events of
  // the buttons.
  //
  addHandlerClick(handler) {
    // add handler to parent element
    this._parentElement.addEventListener('click', function (event) {
      // get button that was clicked
      const btn = event.target.closest('.btn--inline');

      // If there is not button return immediately
      // I.e. user clicked parent element outside of buttons
      if (!btn) return;

      // read next page from dataset value named goto
      // convert to number using + prefix
      const goToPage = +btn.dataset.goto;

      // call handler
      handler(goToPage);
    });
  }

  // Method for generating markup for pagination buttons:
  //
  _generateMarkup() {
    const currentPage = this._data.page;

    // count how many pages are there
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Add dataset value to each button: data-goto="x"
    // where x is next page
    //
    // Page 1, there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>`;
    }

    // other page
    if (currentPage < numPages) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
        
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;
    }

    // Page 1, and there are no other pages
    // Only gets here in above situation
    return '';
  }
}

// export one instance from this module
export default new PaginationView();
