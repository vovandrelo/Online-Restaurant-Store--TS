import { IProduct } from "./product-card";
import ProductCard from "./product-card";
import createElement from "../assets/lib/create-element";
import "../styles/modules/product-grid.sass";

// <================================================== ОПИСАНИЕ ТИПОВ =================================================> \\
// Структура объекта с фильтрацией:
interface IFilters {
	noNuts?: boolean,
	vegeterianOnly?: boolean,
	maxSpiciness?: number,
	category?: string,
}

// Структура списка блюд:
interface IProductGrids {
	render: () => void,
	getElem: () => HTMLElement,
	updateFilter: (filters: IFilters) => void,
}

// <================================================= РЕАЛИЗАЦИЯ МОДУЛЯ ===============================================> \\
export default class ProductGrid implements IProductGrids {
    // <============================================ ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ============================================> \\
    private products: IProduct[];                       // Блюда
    private elem: null | HTMLElement = null;            // Основной элемент списка блюд
    private productsList: null | HTMLElement = null;    // Контейнер для элементов-блюд
    private filters: IFilters = {};                     // Все применённые фильтры

    // <=========================================== РЕАЛИЗАЦИЯ КОНСТРУКТОРА ===========================================> \\
    constructor(products: IProduct[]) {
        this.products = products;                       // Получение всех продуктов:
        this.render();
    }

    // <============================================== РЕНДЕР КАРТОЧЕК ================================================> \\
    render() {
        // Создание вёрстки слайдера:
        this.elem = createElement(`
            <div class="products-grid">
                <div class="products-grid__inner"></div>
            </div>
        `);
        this.productsList = this.elem.querySelector(".products-grid__inner");

        this.updateFilter();
    }

    // <========================================= ПОЛУЧЕНИЕ СПИСКА КАРТОЧКЕ ===========================================> \\
    getElem = (): HTMLElement => {
        return this.elem as HTMLElement;
    }

    // <============================================ ОБНОВЛЕНИЕ КАРТОЧЕК ==============================================> \\
    updateFilter(filters: IFilters = {}) {
        // Объекдинение полученных в качестве аргумента фильтров с уже применёнными:      
        this.filters = Object.assign(this.filters, filters);
        
        // Создание отображаемых блюд:
        let displayedProds = this.products;

        // Фильтрация блюд на основе noNuts
        if (this.filters.noNuts) {
            displayedProds = displayedProds.filter(prod => !prod.nuts);
        }
        // Фильтрация блюд на основе vegeterianOnly
        if (this.filters.vegeterianOnly) {
            displayedProds = displayedProds.filter(prod => prod.vegeterian);
        }
        // Фильтрация блюд на основе maxSpiciness
        if (this.filters.hasOwnProperty("maxSpiciness")) {
            const maxSpiciness = this.filters.maxSpiciness as number;
            displayedProds = displayedProds.filter(prod => prod.spiciness <= maxSpiciness);
        }
        // Фильтрация блюд на основе category
        if (this.filters.category) {            
            displayedProds = displayedProds.filter(prod => prod.category === this.filters.category);
        }

        // Если контейнер для списка блюд был успешно создан, то:
        if (this.productsList) {
            this.productsList.innerHTML = "";
            displayedProds.forEach(product => {
                this.productsList = this.productsList as HTMLElement;
                // Добавляем отфильтрованные блюда на страницу:
                this.productsList.append(new ProductCard(product).getElem());
            });
        }
    }
}