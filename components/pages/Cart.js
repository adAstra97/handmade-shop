class Cart {
   showCart() {
      this.element = document.createElement('div');
      this.element.className = 'order-list';

      if (this.getCookie('cart') && this.getCookie('cart') !== '[]') {
         this.render();
      } else {
         this.element.innerHTML = '<h2>The cart is empty</h2>';
      }

      return this.element;
   }

   render() {
      let data = JSON.parse(localStorage.getItem('fakeStoreApi'));
      let cartArrFromCookie = JSON.parse(this.getCookie('cart'));
      let cartUnicElements = Array.from(new Set(cartArrFromCookie));

      let title = document.createElement('h2');
      title.textContent = 'Cart';
      title.className = 'order-list__title';
      this.element.append(title);

      let table = document.createElement('table');
      this.element.append(table);
      table.innerHTML = `
         <thead>
            <tr>
               <th colspan ="3">Product</th>
               <th>Price</th>
               <th>Quantity</th>
               <th>Subtotal</th>
            </tr>
         </thead>
      `;

      data.forEach(el => {

         if (cartUnicElements.indexOf(el.id) !== -1) {

            let count = cartArrFromCookie.filter(item => item == el.id).length;

            let item = document.createElement('tr');
            item.className = 'order-list__item';
            item.setAttribute('data-id', el.id);
            item.innerHTML = `
               <td><button type="button" class="order-list__item--del"><i class="fa-solid fa-xmark" style="color: #64615e;"></i></button></td>
               <td class="order-list__item--img">
                  <a href="/#product${el.id}">
                  <img src='${el.image}' alt="good">
                  </a>
               </td>
               <td class="order-list__item--title"><span>${el.title}</span></td>
               <td class="order-list__item--price">${el.price} $</td>
               <td>
                  <div class="order-list__item--quantity">
                     <button class="minus">-</button>
                     <span class="count">${count}</span>
                     <button class="plus">+</button>
                  </div>
               </td>
               <td class="order-list__item--subtotal">${(el.price * count).toFixed(2)} $</td>
            `;
            this.element.querySelector('thead').insertAdjacentElement('afterend', item);

            let minus = item.querySelector('.minus');
            let countValue = +item.querySelector('.count').textContent;

            countValue === 1 ? minus.disabled = true : null;

         }
      });

      let rowTotalSum = document.createElement('tr');
      rowTotalSum.className = 'order-list__total';
      rowTotalSum.innerHTML = `
         <td colspan="5" style="text-align: right">Total :</td>
         <td id="totalSum">${document.querySelector('.cart__sum').textContent}</td>
      `;
      this.element.querySelector('table').append(rowTotalSum);

      let fullCart = document.createElement('div');
      fullCart.className = 'full-cart hide';
      fullCart.innerHTML = `
         <div class="full-cart__inner">
            <h3 class="full-cart__title">Сart is full!</h3>
            <span class="full-cart__text">Maximum 99 items</span><br>
            <button class="full-cart__btn">OKEY</button>
         </div>
      `;
      this.element.insertAdjacentElement('beforeend', fullCart);
   }

   getCookie(name) {
      let matches = document.cookie.match(new RegExp(
         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? matches[1] : undefined;
   }
}
let cart = new Cart();

export { cart };