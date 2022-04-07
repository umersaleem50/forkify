class searchView {
  _parentElement = document.querySelector('.search');

  _clean() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  getQuery() {
    // this.clean();
    const query = this._parentElement.querySelector('.search__field').value;
    this._clean();
    return query;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      handler();
    });
  }
}
export default new searchView();
