class App {
   create() {
      this.element = document.createElement('div');
      this.element.className = 'app';
   }

   render(container, el) {
      container.append(el);
   }

   async init() {

      this.create();

      //head
      this.render(document.body, this.element);

      document.documentElement.setAttribute('lang', 'en');

      let head = document.head;
      let meta1 = document.createElement('meta');
      meta1.setAttribute('charset', 'UTF-8');

      let meta2 = document.createElement('meta');
      meta2.setAttribute('http-equiv', 'X-UA-Compatible');
      meta2.setAttribute('content', 'IE=edge');


      let meta3 = document.createElement('meta');
      meta3.setAttribute('name', 'viewport');
      meta3.setAttribute('content', 'width=device-width, initial-scale=1.0');

      let favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = "image/png";
      favicon.href = '../images/icon.png';

      let resetStyle = document.createElement('link');
      resetStyle.rel = 'stylesheet';
      resetStyle.href = 'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css';

      let iconStyle = document.createElement('link');
      iconStyle.rel = 'stylesheet';
      iconStyle.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';

      let uniqueStyle = document.createElement('link');
      uniqueStyle.rel = 'stylesheet';
      uniqueStyle.href = './css/style.css';

      let title = document.createElement('title');
      title.textContent = 'SHOP SPA';
      head.append(meta1, meta2, meta3, favicon, resetStyle, iconStyle, uniqueStyle, title);

      //get data
      await this.getDataFromAPI();

      //add structure
      await import('./Header.js').then(data => {
         this.render(this.element, data.header);
      });

      await import('./Nav.js').then(data => {
         this.render(this.element.querySelector('.header__col'), data.nav);
      });

      await import('./Main.js').then(data => {
         this.render(this.element, data.main);
      });

      await import('./Footer.js').then(data => {
         this.render(this.element, data.footer);
      });
   }

   async getDataFromAPI() {
      try {
         if (!localStorage.getItem('fakeStoreApi')) {
            let response = await fetch('https://fakestoreapi.com/products')
                           .then(response => response.text());

            localStorage.setItem('fakeStoreApi', response);
         }
      } catch {
         document.body.innerHTML = `
            <div class="error__wrap">
               <div class="error">
                  <h2>Something went wrong...🛠</h2>
                  <span>Please come back later</span>
               </div>
            </div>
         `;
      }
   }
}

export default new App().init();