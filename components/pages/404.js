class NotFound {
   create() {
      this.element = document.createElement('div');
      this.element.className = 'notFound';
      this.element.innerHTML = `
         <h2>Page not found. Please check the URL of the site page.</h2>
         <span>404</span>
      `;
   }

   init() {
      this.create();
      return this.element;
   }
}

let notFound = new NotFound().init();
export { notFound };