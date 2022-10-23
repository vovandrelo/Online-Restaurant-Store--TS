import createElement from "../assets/lib/create-element";
import "../styles/modules/product-card.sass";
// <================================================== ОПИСАНИЕ ТИПОВ =================================================> \\
// Структура продукта:
export interface IProduct {
    name: string,
    price: number,
    category: string,
    image: string,
    id: string,
    nuts: boolean,
    vegeterian: boolean,
    spiciness: number,
}

// Структура карточки проекта:
interface IProductCard {
    render: () => void,             // Рендер карточки продукта
    getElem: () => Node,            // Получение карточки продукта
    onAddClick: () => void,         // Обработка добавления блюда в корзину
}

// <================================================= РЕАЛИЗАЦИЯ МОДУЛЯ ===============================================> \\

// Элемент - карточка продукта:
export default class ProductCard implements IProductCard {
    // <============================================ ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ============================================> \\
    private product: IProduct;                  // Данные о продукте
    private elem: null | HTMLElement = null;    // Карточка продукта

    // <=========================================== РЕАЛИЗАЦИЯ КОНСТРУКТОРА ===========================================> \\
    constructor(product: IProduct) {
        this.product = product                  // Данные о продукте
        this.render();                          // Производим первоначальный рендер карточки продукта
    }

    // <========================================= РЕНДЕР КАРТОЧКИ ПРОДУКТА ============================================> \\
    render() {
        // Создание вёрстки карточки продукта
        this.elem = createElement(`
            <div class="card">
                <div class="card__top">
                    <img src="/dist/assets/images/products/${this.product.image}" class="card__image" alt="product">
                    <span class="card__price">€${this.product.price.toFixed(2)}</span>
                </div>
                <div class="card__body">
                    <div class="card__title">${this.product.name}</div>
                    <button type="button" class="card__button">
                        <img src="/dist/assets/images/icons/plus-icon.svg" alt="icon">
                    </button>
                </div>
            </div>
        `);

        // Получение кнопки добавления продукта в корзину:
        const addBtn = this.elem.querySelector(".card__button") as HTMLElement;
        // Прослушивание событие "Клика" по кнопке добавления. В случае нажатия вызываем метод добавления:
        addBtn.addEventListener("click", () => this.onAddClick.call(this));
    }

    // <======================================== ПОЛУЧЕНИЕ КАРТОЧКИ ПРОДУКТА ==========================================> \\
    getElem = (): Node => {
        return this.elem as Node;
    }

    // <============================== ГЛОБАЛЬНОЕ СОБЫТИЕ ДОБАВЛЕНИЯ БЛЮДА В КОРЗИНУ ==================================> \\
    onAddClick() {
        // Если карточка была успешно создана, то:
        if (this.elem) {
            // Формируем кастомное событие:
            const event = new CustomEvent('product-add', {
                detail: this.product.id,
                bubbles: true
            });
            // Запускаем собственное событие:
            this.elem.dispatchEvent(event);
        }
    }
}