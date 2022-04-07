import View from './View';
import icons from '../../img/icons.svg';
import previewView from './previewView';

class resultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipes found for your query. Please try again!`;
  //   _message = 'sStart by searching for a recipe or an ingredient. Have fun!';

  _generateMockup() {
    return this._data.map(recipe => previewView.render(recipe, false)).join('');
    // return this._data.map(this._generatePreviewMockup).join('');
  }

  // _generateMockup() {
  //   return this._data.map(this._generatePreviewMockup).join('');
  // }

  // _generatePreviewMockup(recipe) {
  //   const id = window.location.hash.slice(1);
  //   return `<li class="preview">

  //   <a class="preview__link ${
  //     id === recipe.id ? 'preview__link--active' : ''
  //   }" href="#${recipe.id}">
  //     <figure class="preview__fig">
  //       <img src=${recipe.image} alt="${recipe.title}" />
  //     </figure>
  //     <div class="preview__data">
  //       <h4 class="preview__title">${recipe.title}</h4>
  //       <p class="preview__publisher">${recipe.publisher}</p>
  //       <div class="preview__user-generated">
  //         <svg>
  //           <use href="src/img/icons.svg#icon-user"></use>
  //         </svg>
  //       </div>
  //     </div>
  //   </a>
  // </li>`;
  // }
}

export default new resultView();
