import { ICartIcon } from "./cart-icon";
import createElement from "../assets/lib/create-element";
import escapeHtml from "../assets/lib/escape-html";
import Modal from "./modal";
import { IModal } from "./modal";

import "../styles/modules/cart/cart-buttons.sass";
import "../styles/modules/cart/cart-counter.sass";
import "../styles/modules/cart/cart-form.sass";
import "../styles/modules/cart/cart-product.sass";
import "../styles/modules/cart/mobile.sass";

interface ICartItem {
    product: {
        name: string,
        price: number,
        category: string,
        image: string,
        id: string,
    },
    count: number,
}

export interface ICart {
    onProductUpdate: (cartItem: ICartItem) => void,
    addProduct: (product: ICartItem["product"]) => void,
    updateProductCount: (productId: string, amount: number) => void,
    isEmpty: () => boolean,
    getTotalCount: () => number,
    getTotalPrice: () => number,
}

export default class Cart implements ICart {
    private cartItems: ICartItem[] = [];
    private cartIcon: ICartIcon;
    private modal: IModal = new Modal();

    constructor(cartIcon: ICartIcon) {        
        this.cartIcon = cartIcon;
        this.addEventListeners();
    }

    // <========================================= РЕНДЕР ЭЛЕМЕНТА В КОРЗИНЕ ===========================================> \\
    renderProduct(product: ICartItem["product"], count: number) {
        return createElement(`
            <div class="cart-product" data-product-id="${product.id}">
                <div class="cart-product__img">
                    <img src="/assets/images/products/${product.image}" alt="product">
                </div>
                <div class="cart-product__info">
                    <div class="cart-product__title">${escapeHtml(product.name)}</div>
                    <div class="cart-product__price-wrap">
                        <div class="cart-counter">
                            <button type="button" class="cart-counter__button cart-counter__button_minus">
                                <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
                            </button>
                            <span class="cart-counter__count">${count}</span>
                            <button type="button" class="cart-counter__button cart-counter__button_plus">
                                <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
                            </button>
                        </div>
                        <div class="cart-product__price">€${product.price.toFixed(2)}</div>
                    </div>
                </div>
            </div>`
        );
    }

    // <=========================================== РЕНДЕР ФОРМЫ В КОРЗИНЕ ============================================> \\
    renderOrderForm() {
        return createElement(`
            <form class="cart-form">
                <h5 class="cart-form__title">Delivery</h5>
                <div class="cart-form__group cart-form__group_row">
                    <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
                    <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
                    <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
                </div>

                <div class="cart-form__group">
                    <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
                </div>

                <div class="cart-buttons">
                    <div class="cart-buttons__buttons btn-group">
                        <div class="cart-buttons__info">
                            <span class="cart-buttons__info-text">total</span>
                            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
                        </div>
                        <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
                    </div>
                </div>
            </form>
        `);
    }

    // <========================================= ОБРАБОТКА КЛИКА ПО КОРЗИНЕ ==========================================> \\
    addEventListeners() {
        const cartItem = this.cartIcon.getElem();
        cartItem.addEventListener("click", () => this.renderModal())
    }
  
    // <========================================= ОБНОВЛЕНИЕ ИКОНКИ КОРЗИНЫ ===========================================> \\
    onProductUpdate(cartItem: ICartItem) {
        this.cartIcon.update(this);        
        
        if (document.body.classList.contains("is-modal-open") && this.modal.getElem()) {
            let productId = cartItem.product.id;
            let productCount = this.modal.getElem().querySelector(`[data-product-id="${productId}"] .cart-counter__count`) as HTMLElement;
            let productPrice = this.modal.getElem().querySelector(`[data-product-id="${productId}"] .cart-product__price`) as HTMLElement;
            let infoPrice = this.modal.getElem().querySelector(`.cart-buttons__info-price`) as HTMLElement;
      
            if (this.cartItems.length === 0) {
                this.modal.close();
            } else if (cartItem.count === 0) {
                const modal = this.modal.getElem().querySelector(`[data-product-id=${cartItem.product.id}]`) as HTMLElement;
                modal.remove();
            } else {
                productCount.innerHTML = String(cartItem.count);
                productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
                infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
            }
        }
    }

    // <======================================= ДОБАВЛЕНИЕ ПРОДУКТА В КОРЗИНУ =========================================> \\
    addProduct(product: ICartItem["product"]) {
        // Если функция была вызвана с аргументом, то:
        if (product) {
            // Получение индекса элемента из корзины, который нас интересует:
            const productIndex = this.cartItems.findIndex(item => item.product.id === product.id);
            // Если такого элемента в корзине нет, то добавляем его. Если есть - увеличиваем количество:
            productIndex !== -1 ? this.cartItems[productIndex].count++ : this.cartItems.push({product, count: 1});
            // Выполняем обновление иконкикорзины:
            this.onProductUpdate({product, count: 1});
        }
    }

    // <================================= ОБНОВЛЕНИЕ КОЛИЧЕСТВА ПРОДУКТА В КОРЗИНЕ ====================================> \\
    updateProductCount(productId: string, amount: number) {
        // Получение индекса элемента из корзины, который нас интересует:
        const productIndex = this.cartItems.findIndex(item => item.product.id === productId);

        // Если такого элемента нет, то ничего не делаем:
        if (productIndex === -1) return;

        // Получение вспомогательных переменных:
        const targetProduct = this.cartItems[productIndex]; // интересующий продукт
        const targetProductCount = targetProduct.count;     // количество интересующего продукта
        const targetProductId = targetProduct.product.id;   // id интересующего продукта
        const newCount = targetProductCount + amount;       // новое количество интересующего продукта

        // Если новвое количество равно 0, то удаляем его из корзины:
        if (newCount === 0) {
            targetProduct.count = 0;
            this.cartItems = this.cartItems.filter(item => item.product.id !== targetProductId)
        // В противном случае изменяем количество:
        } else {
            this.cartItems[productIndex].count = newCount;
        }

        // Обновляем интерфейс корзины на основании новых значений:
        this.onProductUpdate(targetProduct);
    }

    isEmpty = (): boolean => this.cartItems.length === 0 ? true : false;
    getTotalCount = (): number => this.cartItems.reduce((sum, item) => sum + item.count, 0);
    getTotalPrice = (): number => this.cartItems.reduce((sum, item) => sum + item.count * item.product.price, 0);

    renderModal() {                
        this.modal.render();
        this.modal.setTitle("Your order");

        const cartBody = document.createElement("div");
        this.cartItems.forEach(item => cartBody.append(this.renderProduct(item.product, item.count)));
        cartBody.append(this.renderOrderForm());

        const btnAdd = cartBody.querySelectorAll(".cart-counter__button_plus");
        const btnDel = cartBody.querySelectorAll(".cart-counter__button_minus");
        const form = cartBody.querySelector(".cart-form") as HTMLElement;

        const clickHandler = (event: Event) => {
            if (event && event.currentTarget) {
                const eventTarget = event.currentTarget as HTMLElement;
                const productTarget = eventTarget.closest("[data-product-id]") as HTMLElement;
                const productIdTarget = productTarget.dataset.productId as string;
                const action = eventTarget.classList.contains('cart-counter__button_plus') ? 1 : -1;                
                this.updateProductCount(productIdTarget, action);
            }
        }
        btnAdd.forEach(btn => btn.addEventListener("click", clickHandler));
        btnDel.forEach(btn => btn.addEventListener("click", clickHandler));
        form.addEventListener("submit", (event: Event) => this.onSubmit(event));

        this.modal.setBody(cartBody);
        this.modal.open();
    }

    onSubmit(event: Event) {
        event.preventDefault();
        
        if (event && event.currentTarget) {
            const eventTarget = event.currentTarget as HTMLFormElement;
            const btnSubmit = eventTarget.querySelector('[type="submit"]') as HTMLElement;
            btnSubmit.classList.add("is-loading")

            fetch('https://httpbin.org/post', {
                method: "POST",
                body: new FormData(eventTarget)
            })
            .then(() => {                
                this.cartItems = [];
                this.cartIcon.update(this);
                this.modal.setTitle('Success!');

                const cartBody = createElement(`
                    <div class="modal__body-inner">
                        <p>Order successful! Your order is being cooked :)
                            <br>We’ll notify you about delivery time shortly.<br>
                            <img src="/assets/images/delivery.gif">
                        </p>
                    </div>
                `);

                this.modal.setBody(cartBody);
            })
            .catch(error => console.log("Error:", error));
        }
    }
}