import icons from '../../img/icons.svg';

export default class View {
  container;
  errorMessage;
  clearContainer() {
    this.container.innerHTML = '';
  }
  renderSpinner() {
    this.clearContainer();
    const html = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
 </div>`;
    this.container.insertAdjacentHTML('beforeend', html);
  }
  renderError() {
    this.clearContainer();
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
/*
export const clearContainer = function (container) {
  container.innerHTML = '';
};

export const renderSpinner = function (container) {
  const html = `<div class="spinner">
                   <svg>
                     <use href="${icons}#icon-loader"></use>
                   </svg>
                </div>`;
  container.insertAdjacentHTML('beforeend', html);
};

export const renderError = function(container,message){
  const html = 
  `<div class="error">
     <div>
       <svg>
         <use href="${icons}#icon-alert-triangle"></use>
       </svg>
     </div>
     <p>${message}</p>
   </div>`;
   container.insertAdjacentHTML('beforeend', html);
}
*/
