class Nav {
   create() {
      this.element = document.createElement('nav');
      this.element.className = 'nav';
      this.element.innerHTML = `
         <div class="hamb hide">
            <div class="hamb__field">
               <span class="bar"></span>
               <span class="bar"></span>
               <span class="bar"></span>
            </div>
         </div>
         <ul class="menu">
            <li class="menu__item">
               <a class="menu__link" href="/" id="hash">Home</a>
            </li>
            <li class="menu__item">
               <a class="menu__link" href="/#shop" id="hash">Shop</a>
            </li>
            <li class="menu__item">
               <a class="menu__link" href="/#contacts" id="hash">Contacts</a>
            </li>
         </ul>
         <div class="popup hide"></div>
      `;

      this.addHambMenu();
   }
   addHambMenu() {
      let hamb = this.element.querySelector('.hamb__field');
      let popup = this.element.querySelector('.popup');
      let menu = this.element.querySelector('.menu').cloneNode(true);

      hamb.addEventListener('click', hambHandler);
      document.addEventListener('click', openPageFromMenu);

      function hambHandler(event) {
         event.preventDefault();
         popup.classList.toggle('hide');
         popup.classList.toggle('open');
         hamb.classList.toggle('active');
         document.body.classList.toggle('noscroll');
         popup.append(menu);
      }

      function openPageFromMenu(event) {
         if (event.target.closest('#hash')) {
            popup.classList.add('hide');
            popup.classList.remove('open');
            document.body.classList.remove('noscroll');
            hamb.classList.remove('active');
         }
      }
   }

   init() {
      this.create();
      return this.element;
   }
}

let nav = new Nav().init();
export { nav };
