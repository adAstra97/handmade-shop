class Main {
   create() {
      this.element = document.createElement('main');
      this.element.className = 'main';
      this.element.innerHTML = `
         <div class="main__top">
            <div class='container'>
               <span class='main__tagline'>Find the item of your dreams!</span>
            </div>
         </div>
         <div class="main__bottom">
            <div class='container' id='slot'>
            </div>
         </div>
      `;
      document.addEventListener('click', this.cancelReload);
      window.addEventListener('hashchange', this.changePage);
   }
   cancelReload(event) {
      let link = event.target.closest('#hash');
      if (link) {
         event.preventDefault();
         window.history.pushState({}, '', link.href);
         window.dispatchEvent(new HashChangeEvent('hashchange'));
      }
   }
   async changePage() {
      let wrapper = document.querySelector('#slot');
      let hashLocation = window.location.hash.substring(1);
      let html;
      let routers = {
         'contacts' : 'Contacts.js',
         'shop' : 'Shop.js',
      };

      if (window.location.hash.length === 0 && window.location.pathname === '/') {
         await import(`./pages/Home.js`)
                     .then(data => html = data.home);
         wrapper.innerHTML = html.outerHTML;

      } else if (hashLocation.includes('product')) {
         await import(`./pages/Product.js`)
                     .then(data => {
                        html = data.product.showInfoAboutProduct();
                     });
         wrapper.innerHTML = html.outerHTML;

      } else if (hashLocation.includes('cart')) {
         await import(`./pages/Cart.js`)
                     .then(data => {
                        html = data.cart.showCart();
                     });
         wrapper.innerHTML = html.outerHTML;
      } else if (hashLocation in routers) {
         await import(`./pages/${routers[hashLocation]}`)
                     .then(data => html = data[hashLocation]);
         wrapper.innerHTML = html.outerHTML;
      } else {
         await import(`./pages/404.js`)
                     .then(data => html = data.notFound);
         wrapper.innerHTML = html.outerHTML;
      }

   };
   init() {
      this.create();
      setTimeout(this.changePage, 0);
      return this.element;
   }
}

let main = new Main().init();
export { main };