class Shop {
   create() {
      this.element = document.createElement('ul');
      this.element.className = 'list';

      let data = JSON.parse(localStorage.getItem('fakeStoreApi'));

      // add goods

      data.forEach(el => {
         let item = document.createElement('li');
         item.className = 'list__item item';
         item.setAttribute('data-id', el.id);
         item.setAttribute('id', 'item');
         item.innerHTML = `
            <div class='item__top'>
               <img class='item__img' src='${el.image}' alt='product'>
            </div>
            <div class='item__info'>
               <span class='item__title'>${el.title}</span>
               <span class='item__price'>${el.price}$</span>
               <div class='item__btns'>
                  <a class='item__btn--info' href="/#product${el.id}">Show info</a>
                  <a class='item__btn--save'>Add to cart</a>
            </div>
         `;
         this.element.append(item);
      });
   }

   init() {
      this.create();
      return this.element;
   }
}
let shop = new Shop().init();

export { shop };