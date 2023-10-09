class Home {
   create() {
      this.element = document.createElement('div');
      this.element.className = 'home';

      this.element.innerHTML = `
      <h2 class="home__title">Welcome</h2>
      <div class="home__content">
         <div class="home__sale">
            <img class="home__img" src="../../images/sale.png" >
            <a class="home__btn" href="/#shop" id="hash">Show more</a>
         </div>
      </div>
      `;
   }
   init() {
      this.create();
      return this.element;
   }
}
let home = new Home().init();

export { home };
