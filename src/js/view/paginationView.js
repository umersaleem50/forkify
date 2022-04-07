import View from './View';
import icons from '../../img/icons.svg';

class resultView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMockup() {
    const numOfPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;
    // console.log(currentPage);
    //page 1 and other pages
    if (currentPage === 1 && numOfPage > 1) {
      return `<button class="btn--inline pagination__btn--next" data-goto = "${
        currentPage + 1
      }">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>`;
    }

    //other page
    if (currentPage < numOfPage) {
      return `<button class="btn--inline pagination__btn--prev" data-goto = "${
        currentPage - 1
      }">
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${currentPage - 1}</span>
                    </button>
                    <button class="btn--inline pagination__btn--next" data-goto = "${
                      currentPage + 1
                    }">
                        <span>Page ${currentPage + 1}</span>
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                        </svg>
                    </button>`;
    }
    //last page
    if (currentPage === numOfPage) {
      return `<button class="btn--inline pagination__btn--prev" data-goto = "${
        currentPage - 1
      }">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>`;
    }

    return ``;
  }

  //WHEN YOU COUNTINE ADD GET DATASET FROM BUTTON AND CHANGE AND RENDER RESULTS AND PROPOGATION

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);
      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }
}

export default new resultView();
