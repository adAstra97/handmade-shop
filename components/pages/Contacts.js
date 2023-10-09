class Contacts {
   create() {
      this.element = document.createElement('div');
      this.element.className = 'contacts';
      this.element.innerHTML = `
         <h2 class="contacts__title">Contacts</h2>
         <div class="contacts__content">
            <div class="contacts__col">
               <div class="contacts__contact">
                  Address: <span>350 Fifth Avenue, Manhattan, New York 10118</span>
               </div>
               <div class="contacts__contact">
                  Phone: <span>+123 456 7890</span>
               </div>
               <div class="contacts__contact">
                  Email: <span>info@example.com</span>
               </div>
            </div>
            <div class="contacts__col">
               <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12091.165211929076!2d-73.9922597!3d40.7446175!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2z0K3QvNC_0LDQudGALdGB0YLQtdC50YIt0LHQuNC70LTQuNC90LM!5e0!3m2!1sru!2sby!4v1688414454125!5m2!1sru!2sby" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
         </div>
      `;
   }
   init() {
      this.create();
      return this.element;
   }
}
let contacts = new Contacts().init();

export { contacts };