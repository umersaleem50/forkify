import View from './View';
import icons from '../../img/icons.svg';
// import bookmarkView from './bookmarkView';
import previewView from './previewView';

class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  //   _message = 'sStart by searching for a recipe or an ingredient. Have fun!';

  _generateMockup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
    // return this._data.map(this._generatePreviewMockup).join('');
  }

  //   _generatePreviewMockup(recipe) {
  //     const id = window.location.hash.slice(1);
  //     return `<li class="preview">

  //     <a class="preview__link ${
  //       id === recipe.id ? 'preview__link--active' : ''
  //     }" href="#${recipe.id}">
  //       <figure class="preview__fig">
  //         <img src=${recipe.image} alt="${recipe.title}" />
  //       </figure>
  //       <div class="preview__data">
  //         <h4 class="preview__title">${recipe.title}</h4>
  //         <p class="preview__publisher">${recipe.publisher}</p>
  //         <div class="preview__user-generated">
  //           <svg>
  //             <use href="src/img/icons.svg#icon-user"></use>
  //           </svg>
  //         </div>
  //       </div>
  //     </a>
  //   </li>`;
  //   }

  addHandlerLoadBookmark(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }
}

export default new bookmarkView();
