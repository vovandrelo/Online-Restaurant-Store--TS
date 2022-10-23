import Carousel from "./modules/carousel";
import RibbonMenu from "./modules/ribbon-menu";
import StepSlider from "./modules/slider";
import ProductGrid from "./modules/product-grid";
import CartIcon from "./modules/cart-icon";
import Cart from "./modules/cart";

import { ISlide } from "./modules/carousel";
import { ICategories } from "./modules/ribbon-menu";

import slides from "./assets/data/slides.json";
import products from "./assets/data/products.json";
import categories from "./assets/data/categories.json";

import "./styles/common.sass";
import "./styles/modules/filters.sass";
import "./styles/modules/button.sass";

// <=========================================== СОЗДАНИЕ НЕОБХОДИМЫХ МОДУЛЕЙ ==========================================> \\
class Main {
    // <============================================ ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ============================================> \\
    private carousel;		// Модуль "карусель"
    private ribbonMenu;		// Модуль "меню категорий"
    private stepSlider;		// Модуль "фильтр остроты"
    private productsGrid;	// Модуль "сетка продуктов"
    private cartIcon;		// Модуль "иконка корзины"
    private cart;			// Модуль "корзина"

    // <=========================================== РЕАЛИЗАЦИЯ КОНСТРУКТОРА ===========================================> \\
    constructor(slides: ISlide[], categories: ICategories[]) {
        this.carousel = new Carousel(slides);						// Создание объекта карусели
        this.ribbonMenu = new RibbonMenu(categories);				// Создание объекта меню категорий
        this.stepSlider = new StepSlider({ steps: 5, value: 3 });	// Создание объекта фильтра остроты
        this.productsGrid = new ProductGrid(products);				// Создание объекта сетки продуктов
        this.cartIcon = new CartIcon();								// Создание объекта иконки корзины
        this.cart = new Cart(this.cartIcon);						// Создание объекта корзины
        this.render();												// Отрисовка всех модулей
    }

    // <============================================== РЕНДЕР МОДУЛЕЙ =================================================> \\
    render() {
        // <======================================== ОТРИСОВКА ОСНОВНЫХ МОДУЛЕЙ =======================================> \\
        // Получение элемента карусель:
        const carouselElem = this.carousel.getElem();
        // Получение контейнера для карусели:
        const carouselContainer = document.querySelector("[data-carousel-holder]") as HTMLElement;
        // Добавление карусели на страницу:
        carouselContainer.append(carouselElem);

        // Получение элемента меню категорий:
        const ribbonMenu = this.ribbonMenu.getElem();
        // Получение контейнера для меню категорий:
        const ribbonMenuContainer = document.querySelector("[data-ribbon-holder]") as HTMLElement;
        // Добавление меню категорий на страницу:
        ribbonMenuContainer.append(ribbonMenu)

        // Получение элемента фильтр остроты:
        const stepSlider = this.stepSlider.getElem();
        // Получение контейнера для фильтра остроты:
        const stepSliderContainer = document.querySelector("[data-slider-holder]") as HTMLElement;
        // Добавление фильтра остроты на страницу:
        stepSliderContainer.append(stepSlider);

        // Получение элемента иконка корзины:
        const cartIcon = this.cartIcon.getElem();
        // Получение контейнера для иконки корзины:
        const cartIconContainer = document.querySelector("[data-cart-icon-holder]") as HTMLElement;
        // Добавление иконки корзины на страницу:
        cartIconContainer.append(cartIcon);

        // Получение элемента список продуктов:
        const productsGrid = this.productsGrid.getElem();
        // Получение контейнера для списка продуктов:
        const productsGridContainer = document.querySelector("[data-products-grid-holder]") as HTMLElement;
        // Добавление списка продуктов на страницу:
        productsGridContainer.innerHTML = "";
        productsGridContainer.append(productsGrid);

        // Получение иных элементов фильтрации: 
        const noNutsFilterElem = document.getElementById('nuts-checkbox') as HTMLInputElement;
        const vegeterianOnlyFilterElem = document.getElementById('nuts-checkbox') as HTMLInputElement;

        // <====================================== УСТАНОВКА НАЧАЛЬНОЙ ФИЛЬТРАЦЦИИ ====================================> \\
        this.productsGrid.updateFilter({
            noNuts: noNutsFilterElem.checked,
            vegeterianOnly: vegeterianOnlyFilterElem.checked,
            maxSpiciness: this.stepSlider.getValue(),
            category: this.ribbonMenu.getValue(),
        });

        // <==================================== УСТАНОВКА НЕОБХОДИМЫХ ОБРАБОТЧИКОВ ===================================> \\

        // Обработка пользовательского события "Добавление продукта в корзину":
        document.body.addEventListener("product-add", event => {
            if (event instanceof CustomEvent<string>) {
                // Получение добавляемого продукта по id:
                const product = products.filter(prod => prod.id === event.detail);
                // Добавление продукта в корзину:
                this.cart.addProduct(product[0]);
            }
        });

        // Изменение фильтра остроты:
        document.body.addEventListener("slider-change", (event) => {
            if (event instanceof CustomEvent<number>) {
                this.productsGrid.updateFilter({
                    maxSpiciness: event.detail
                });
            }
        });
      
        // Изменение фильтра категорий:
        document.body.addEventListener("ribbon-select", event => {
            if (event instanceof CustomEvent<string>) {
                this.productsGrid.updateFilter({
                    category: event.detail			
                });
            }
        });
      
        // Изменение иных категорий:
        document.body.addEventListener("change", event => {
            if (event.target) {
                const eventTarget = event.target as HTMLInputElement;

                if (eventTarget.id === "nuts-checkbox") {
                    this.productsGrid.updateFilter({
                        noNuts: eventTarget.checked
                    });
                } else if (eventTarget.id === "vegeterian-checkbox") {
                    this.productsGrid.updateFilter({
                        vegeterianOnly: eventTarget.checked
                    });
                }
            }
        });
    }
}

new Main(slides, categories);