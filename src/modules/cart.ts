import createElement from "../assets/lib/create-element";
import escapeHtml from "../assets/lib/escape-html";
import Modal from "./modal";
import { ICartIcon } from "./cart-icon";
import { IModal } from "./modal";

import "../styles/modules/cart/cart-buttons.sass";
import "../styles/modules/cart/cart-counter.sass";
import "../styles/modules/cart/cart-form.sass";
import "../styles/modules/cart/cart-product.sass";
import "../styles/modules/cart/mobile.sass";

// <================================================== ОПИСАНИЕ ТИПОВ =================================================> \\
// Структура элемента корзины:
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

// Структура модуля корзины:
export interface ICart {
    renderProduct: (product: ICartItem["product"], count: number) => HTMLElement,   // Рендер продукта в корзине
    renderOrderForm: () => HTMLElement,                                             // Рендер формы в корзине
    addEventListeners: () => void,                                                  // Обработка клика по иконке
    onProductUpdate: (cartItem: ICartItem) => void,                                 // Обновление информации в корзине
    addProduct: (product: ICartItem["product"]) => void,                            // Обработка добавления продукта
    updateProductCount: (productId: string, amount: number) => void,                // Обновление количества продукта
    isEmpty: () => boolean,                                                         // Проверка на пустоту корзины
    getTotalCount: () => number,                                                    // Получение общего количества продуктов
    getTotalPrice: () => number,                                                    // Получение общей цены продуктов
    renderModal: () => void,                                                        // Открытие корзины
    onSubmit: (event: Event) => void,                                               // Отправка заказа
}

// <================================================= РЕАЛИЗАЦИЯ МОДУЛЯ ===============================================> \\

// Модуль - корзина:
export default class Cart implements ICart {
    // <============================================ ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ============================================> \\
    private cartItems: ICartItem[] = [];    // Элементы в корзине
    private cartIcon: ICartIcon;            // Объект иконки корзины
    private modal: IModal = new Modal();    // Объект модального окна

    // <=========================================== РЕАЛИЗАЦИЯ КОНСТРУКТОРА ===========================================> \\
    constructor(cartIcon: ICartIcon) {        
        this.cartIcon = cartIcon;           // Получение иконки корзины
        this.addEventListeners();           // Обработка клика по иконке корзины
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
        const cartItem = this.cartIcon.getElem();                       // Получение элемента коризны
        cartItem.addEventListener("click", () => this.renderModal())    // Клик по корзине вызывает открытие модальног окна
    }

    // <================================ ОТОБРАЖЕНИЕ ИНФОРМАЦИИ О ПРОДУКТЕ В КОРЗИНЕ ==================================> \\
    onProductUpdate(cartItem: ICartItem) {
        // Обновление иконки корзины:
        this.cartIcon.update(this);
        
        // Если модальное окно открыто и существует элемент модального окна, то:
        if (document.body.classList.contains("is-modal-open") && this.modal.getElem()) {
            // Получение id обновляемого продукта:
            let productId = cartItem.product.id;
            // Получение количества обновляемого продукта
            let productCount = this.modal.getElem().querySelector(`[data-product-id="${productId}"] .cart-counter__count`) as HTMLElement;
            // Получение цены обновляемого продукта:
            let productPrice = this.modal.getElem().querySelector(`[data-product-id="${productId}"] .cart-product__price`) as HTMLElement;
            // Получение общей цены:
            let totalPrice = this.modal.getElem().querySelector(`.cart-buttons__info-price`) as HTMLElement;
      
            // Если в корзине нет элементов, то закрываем модальное окно:
            if (this.cartItems.length === 0) {
                this.modal.close();
            // Если количество обновляемого продукта в корзине равно 0, то удаляем его:
            } else if (cartItem.count === 0) {
                const modal = this.modal.getElem().querySelector(`[data-product-id=${cartItem.product.id}]`) as HTMLElement;
                modal.remove();
            // Если количество обновляемого продукта в корзине не равен 0, то изменяем его количество:
            } else {
                productCount.innerHTML = String(cartItem.count);
                productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
                totalPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
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
    // <======================================== ПРОВЕРКА КОРЗИНЫ НА ПУСТОТУ ==========================================> \\
    isEmpty = (): boolean => this.cartItems.length === 0 ? true : false;

    // <==================================== ПОДСЧЁТ ОБЩЕГО КОЛИЧЕСТВА ПРОДУКТОВ ======================================> \\
    getTotalCount = (): number => this.cartItems.reduce((sum, item) => sum + item.count, 0);

    // <========================================= ПОДСЧЁТ ОБЩЕЙ СТОИМОСТИ =============================================> \\
    getTotalPrice = (): number => this.cartItems.reduce((sum, item) => sum + item.count * item.product.price, 0);

    // <================================== ОТОБРАЖЕНИЕ МОДАЛЬНОГО ОКНА(КОРЗИНЫ) =======================================> \\
    renderModal() {
        // Рендер модального окна:
        this.modal.render();

        // Установка заголовка:
        this.modal.setTitle("Your order");

        // Формирование тела модального окна (отображение продуктов):
        const cartBody = document.createElement("div");
        this.cartItems.forEach(item => cartBody.append(this.renderProduct(item.product, item.count)));
        // Формирование тела модального окна (отображение формы):
        cartBody.append(this.renderOrderForm());

        // Получение необходимых элементов модального окна:
        const btnAdd = cartBody.querySelectorAll(".cart-counter__button_plus");     // Кнопки увеличения кол-ва
        const btnDel = cartBody.querySelectorAll(".cart-counter__button_minus");    // КНопки уменьшения кол-ва
        const form = cartBody.querySelector(".cart-form") as HTMLElement;           // Форма

        // Обработчик события увеличения/уменьшения количества продуктов в корзине:
        const clickHandler = (event: Event) => {
            if (event && event.currentTarget) {
                // Получение кнопки, по которой произошёл клик:
                const eventTarget = event.currentTarget as HTMLElement;
                // Получение элемента, которому принадлежит кнопка:
                const productTarget = eventTarget.closest("[data-product-id]") as HTMLElement;
                // Получение id элемента, которому принадлежит кнопка:
                const productIdTarget = productTarget.dataset.productId as string;
                // Определение типа кнопки (+ или -):
                const action = eventTarget.classList.contains('cart-counter__button_plus') ? 1 : -1;      
                // Обновление отображения нового количества:          
                this.updateProductCount(productIdTarget, action);
            }
        }
        btnAdd.forEach(btn => btn.addEventListener("click", clickHandler));
        btnDel.forEach(btn => btn.addEventListener("click", clickHandler));
        form.addEventListener("submit", (event: Event) => this.onSubmit(event));

        // Установка тела модального окна:
        this.modal.setBody(cartBody);

        // Открытие модального окна:
        this.modal.open();
    }


    // <======================================= ОБРАБОТКА ОТПРАВКИ ЗАКАЗА =============================================> \\
    onSubmit(event: Event) {
        event.preventDefault();
        
        if (event && event.currentTarget) {
            // Получение формы:
            const eventTarget = event.currentTarget as HTMLFormElement;
            // Получение кнопки "Отправить":
            const btnSubmit = eventTarget.querySelector('[type="submit"]') as HTMLElement;
            btnSubmit.classList.add("is-loading");

            // Отправка запроса на добавление заказа:
            fetch('https://httpbin.org/post', {
                method: "POST",
                body: new FormData(eventTarget)
            })
            // Обработка ответа:
            .then(() => {                
                this.cartItems = [];                // Отчищение заказа
                this.cartIcon.update(this);         // Обновление иконки корзины
                this.modal.setTitle('Success!');    // Добавление статуса успешной отправки заказа

                // Добавление в тело модального окна статуса успешного зхаказа:
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