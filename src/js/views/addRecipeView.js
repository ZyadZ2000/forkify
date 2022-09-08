import icons from '../../img/icons.svg';
import View from './view';

class addRecipeView extends View {
  container = document.querySelector('.add-recipe-window');
  errorMessage = "Couldn't add Recipe, please follow the correct format";
  button = document.querySelector('.nav__btn--add-recipe');
  overlay = document.querySelector('.overlay');
  closeButton = document.querySelector('.btn--close-modal');
  constructor() {
    super(); //you must call the super() for the constructor to work even if you didn't pass any parameters
    this.handleAddClick();
  }
  toggleWindow() {
    this.container.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
  }
  handleAddClick() {
    this.button.addEventListener('click', this.toggleWindow.bind(this));
    this.overlay.addEventListener('click', this.toggleWindow.bind(this));
    this.closeButton.addEventListener('click', this.toggleWindow.bind(this));
  }
  handleUpload(handler) {
    document.querySelector('.upload').addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)]; //Object.fromEntries([...new FormData(this)]);
      handler(data);
    });
  }
  renderError() {
    const html = `<div class="error">
     <div>
       <svg>
         <use href="${icons}#icon-alert-triangle"></use>
       </svg>
     </div>
     <p>${this.errorMessage}</p>
   </div>`;
    this.container.insertAdjacentHTML('beforeend', html);
  }
}

export default new addRecipeView();
