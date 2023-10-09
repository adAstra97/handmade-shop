class Footer {
   create() {
      this.element = document.createElement('footer');
      this.element.className = 'footer';

      this.element.innerHTML = `
         <div class="container">
            <div class="footer__inner">
               <div class="footer__col">
                  <a class="logo" href="/" id="hash">
                     <span class='logo__top'>Laniakea</span>
                     <span class='logo__bottom'>Сlothing &#149; Jewelry &#149; Electronics</span>
                  </a>
               </div>
               <div class="footer__col">
                  <a target="_blank" class="footer__contact" href='https://goo.gl/maps/SXuKae4vSKMqgHXD6'>
                     <i class="fa-solid fa-map-location-dot fa-xl" style="color: #cc9163;"></i>
                     <span>350 Fifth Avenue, Manhattan, New York 10118</span>
                  </a>
                  <a class="footer__contact" href='tel:+1234567890'>
                     <i class="fa-solid fa-phone fa-xl" style="color: #cc9163;"></i>
                     <span>+123 456 7890</span>
                  </a>
                  <a class="footer__contact" href="mailto:info@example.com">
                     <i class="fa-sharp fa-solid fa-envelope fa-xl" style="color: #cc9163;"></i>
                     <span>info@example.com</span>
                  </a>
               </div>
            </div>
         </div>
      `;
   }

   init() {
      this.create();
      return this.element;
   }
}

const footer = new Footer().init();
export { footer };