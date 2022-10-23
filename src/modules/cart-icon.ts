import createElement from "../assets/lib/create-element";
import { ICart } from "./cart";
import "../styles/modules/cart/cart-icon.sass";

// <================================================== ОПИСАНИЕ ТИПОВ =================================================> \\
// Структура модуля иконки корзины:
export interface ICartIcon {
    render: () => void,
    getElem: () => HTMLElement,
    update: (cart: ICart) => void,
}

// <================================================= РЕАЛИЗАЦИЯ МОДУЛЯ ===============================================> \\
export default class CartIcon implements ICartIcon {
    // <============================================ ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ============================================> \\
    private elem: null | HTMLElement = null;    // Иконка корзины

    // <=========================================== РЕАЛИЗАЦИЯ КОНСТРУКТОРА ===========================================> \\
    constructor() {
        this.render();
    }

    // <=============================================== РЕНДЕР ИКОНКИ =================================================> \\
    render() {
        this.elem = createElement('<div class="cart-icon"></div>');
    }
    // <============================================== ПОЛУЧЕНИЕ ИКОНКИ ===============================================> \\
    getElem = (): HTMLElement => {
        return this.elem as HTMLElement;
    }

    // <============================================== ОБНОВЛЕНИЕ ИКОНКИ ==============================================> \\
    update(cart: ICart) {
        // Если иконка с корзиной существует, то: 
        if (this.elem) {
            // Если корзине не пустая, то отображаем её:
            if (!cart.isEmpty()) {
                // Отображение иконки:
                this.elem.classList.add('cart-icon_visible');
    
                // Добавление иконке информации о продуктах в корзине:
                this.elem.innerHTML = `
                    <div class="cart-icon__inner">
                        <span class="cart-icon__count">${cart.getTotalCount()}</span>
                        <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
                    </div>`
                ;
    
                // Воспроизведение анимации при добавлении элемента в корзину:
                this.elem.classList.add('shake');
                document.addEventListener('transitionend', () => {
                    this.elem = this.elem as HTMLElement;
                    this.elem.classList.remove('shake');
                }, {once: true});
            // Если корзина пустая, скрываем её:
            } else {
                this.elem.classList.remove('cart-icon_visible');
            }
        }
    }
}