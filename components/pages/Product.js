class Product {
   showInfoAboutProduct() {
      this.element = document.createElement('div');
      this.element.className = 'product';
      this.render();
      return this.element;
   }
   render() {
      let itemID = +location.hash.match(/\d/g).join('');
      let localData = JSON.parse(localStorage.getItem('fakeStoreApi'));
      let item = localData.find(el => el.id === itemID);

      this.element.setAttribute('data-id', `${item.id}`);
      this.element.setAttribute('id', 'item');
      this.element.innerHTML = `
         <div class="product__image">
            <img src="${item.image}" alt="good">
         </div>
         <div class="product__info">
            <div class="product__info--top">
               <div class="product__category">${item.category}</div>
               <div class="product__title">${item.title}</div>
               <div class="product__count">In stock: ${item.rating.count}</div>
               <div class="product__description">${item.description}</div>
            </div>
            <div class="product__info--bottom">
               <div class="product__price"><span>only today</span>  ${item.price}$</div>
               <a class='item__btn--save'>Add to cart</a>
            </div>
         </div>
      `;
   }
}

let product = new Product();

export { product };