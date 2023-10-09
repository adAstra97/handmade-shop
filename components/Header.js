class Header {
   create() {
      this.element = document.createElement('header');
      this.element.className = 'header';

      this.element.innerHTML = `
         <div class="container">
            <div class="header__inner">
               <div class="header__col">
                  <a class="logo" href="/" id="hash">
                     <span class='logo__top'>Laniakea</span>
                     <span class='logo__bottom'>Сlothing &#149; Jewelry &#149; Electronics</span>
                  </a>
               </div>
               <div class="header__col">
                  <div class="cart">
                     <a class='cart__link' href='/#cart' id="hash">
                        <span class='cart__image'>
                           <i class="fa-sharp fa-solid fa-cart-shopping fa-2xl" style="color: rgb(66, 55, 33);"></i>
                           <span class='cart__amount'>0</span>
                        </span>
                        <span class='cart__sum'>0.00$</span>
                     </a>
                  </div>
               </div>
            </div>
         </div>
      `;
      this.correctAmountProductInCart();
   }

   correctAmountProductInCart() {

      let dataCart = [];
      let cartAmount = this.element.querySelector('.cart__amount');
      let cartSum = this.element.querySelector('.cart__sum');

      let data = JSON.parse(localStorage.getItem('fakeStoreApi'));

      // add product

      document.addEventListener('click', (event) => {
         if (event.target.className !== 'item__btn--save') return;

         let productsId = +event.target.closest('#item').dataset.id;
         let dataEl = data.find(item => item.id === productsId);

         if (dataCart.length < 99) {
            dataCart.push(dataEl.id);
         } else {
            return;
         }

         cartAmount.innerText = dataCart.length;
         cartSum.innerText = `${(parseFloat(cartSum.innerText) + dataEl.price).toFixed(2)}$`;

         document.cookie = "cart=" + JSON.stringify(dataCart) + ";max-age=" + 864000;
      });

      // delete product

      document.addEventListener('click', (event) => {
         if (!event.target.closest('.order-list__item--del')) return;

         let parent = event.target.closest('.order-list__item');
         let subtotalSum = parent.querySelector('.order-list__item--subtotal');
         dataCart = dataCart.filter(item => item !== +parent.dataset.id);

         cartAmount.innerText = dataCart.length;
         cartSum.innerText = `${(parseFloat(cartSum.innerText) - parseFloat(subtotalSum.innerText)).toFixed(2)}$`;

         document.cookie = "cart=" + JSON.stringify(dataCart) + ";max-age=" + 864000;
         document.querySelector('#totalSum').textContent = cartSum.innerText;
         parent.remove();

         if (this.getCookie('cart') === '[]') {
            document.querySelector('.order-list').innerHTML = '<h2>The cart is empty</h2>';
         }
      });

      // decrease the quantity of goods per unit

      document.addEventListener('click', (event) => {
         if (!event.target.closest('.minus')) return;

         let parent = event.target.closest('.order-list__item');
         let minus = parent.querySelector('.minus');
         let count = parent.querySelector('.count');
         let subtotalPrice = parent.querySelector('.order-list__item--subtotal');
         let price = parent.querySelector('.order-list__item--price');

         let indexOfParentInCart = dataCart.indexOf(+parent.dataset.id);

         if (indexOfParentInCart !== dataCart.lastIndexOf(+parent.dataset.id)) {
            dataCart.splice(indexOfParentInCart, 1);
            count.textContent = +count.textContent - 1;
            count.textContent == 1 ? minus.disabled = true : null;
            subtotalPrice.textContent = `${(parseFloat(price.textContent) * +count.textContent).toFixed(2)} $`;
         } else {
            return;
         }

         cartAmount.innerText = dataCart.length;
         cartSum.innerText = `${(parseFloat(cartSum.innerText) - parseFloat(price.innerText)).toFixed(2)}$`;
         document.querySelector('#totalSum').textContent = cartSum.innerText;
         document.cookie = "cart=" + JSON.stringify(dataCart) + ";max-age=" + 864000;
      });

      // increase the quantity of goods per unit

      document.addEventListener('click', (event) => {
         if (!event.target.closest('.plus')) return;

         if (cartAmount.innerText === '99' ) {
            let btnOkey = document.querySelector('.full-cart__btn');
            let modalWindow = document.querySelector('.full-cart');

            btnOkey.addEventListener('click', () => {
               modalWindow.classList.add('hide');
            });

            modalWindow.addEventListener('click', (event) => {
               if (event.target.closest('.full-cart__inner')) return;
               modalWindow.classList.add('hide');
            });
            modalWindow.classList.remove('hide');
            return;
         }

         let parent = event.target.closest('.order-list__item');
         let count = parent.querySelector('.count');
         let minus = parent.querySelector('.minus');
         let subtotalPrice = parent.querySelector('.order-list__item--subtotal');
         let price = parent.querySelector('.order-list__item--price');

         minus.disabled = false;

         dataCart.push(+parent.dataset.id);
         count.textContent = +count.textContent + 1;
         subtotalPrice.textContent = `${(parseFloat(price.textContent) * +count.textContent).toFixed(2)} $`;

         cartAmount.innerText = dataCart.length;
         cartSum.innerText = `${(parseFloat(cartSum.innerText) + parseFloat(price.innerText)).toFixed(2)}$`;
         document.querySelector('#totalSum').textContent = cartSum.innerText;
         document.cookie = "cart=" + JSON.stringify(dataCart) + ";max-age=" + 864000;
      });

      // get data from cookie without reload

      if (this.getCookie('cart')) {
         dataCart = JSON.parse(this.getCookie('cart'));
         cartAmount.innerText = dataCart.length;
         let sum = 0;

         for (let i = 0; i < dataCart.length; i++) {
            let dataItemFromLocalStorage = data.find(item => item.id === dataCart[i]);
            sum += dataItemFromLocalStorage.price;
         }

         cartSum.innerText = `${(parseFloat(cartSum.innerText) + sum).toFixed(2)}$`;
      }
   }

   getCookie(name) {
      let matches = document.cookie.match(new RegExp(
         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? matches[1] : undefined;
   }

   init() {
      this.create();
      return this.element;
   }
}

const header = new Header().init();
export { header };