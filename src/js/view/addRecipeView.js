import View from './View';
import icons from '../../img/icons.svg';
// import bookmarkView from './bookmarkView';
import previewView from './previewView';

class bookmarkView extends View {
  _message = 'Sucessfully send the data!';

  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.addHandlerOpenWindow();
    this.addHandlerCloseWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerOpenWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerAddRecipe(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //this will return aarr from a FORM which is parent element
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
      console.log(data);
    });
  }
}

export default new bookmarkView();
