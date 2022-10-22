import createElement from "../assets/lib/create-element";
import "../styles/modules/cart/cart-icon.sass";
import { ICart } from "./cart";

export interface ICartIcon {
    render: () => void,
    getElem: () => HTMLElement,
    update: (cart: ICart) => void,
}


export default class CartIcon implements ICartIcon {

    private elem: null | HTMLElement = null;

    constructor() {
        this.render();
    }

    render() {
        this.elem = createElement('<div class="cart-icon"></div>');
    }

    getElem = (): HTMLElement => {
        return this.elem as HTMLElement;
    }

    update(cart: ICart) {
        if (this.elem) {
            if (!cart.isEmpty()) {
                this.elem.classList.add('cart-icon_visible');
    
                this.elem.innerHTML = `
                    <div class="cart-icon__inner">
                        <span class="cart-icon__count">${cart.getTotalCount()}</span>
                        <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
                    </div>`
                ;
    
                this.elem.classList.add('shake');
                document.addEventListener('transitionend', () => {
                    this.elem = this.elem as HTMLElement;
                    this.elem.classList.remove('shake');
                }, {once: true});
    
            } else {
                this.elem.classList.remove('cart-icon_visible');
            }
        }
    }
}