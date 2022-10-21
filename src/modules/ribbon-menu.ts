import createElement from '../assets/lib/create-element';
import "../styles/modules/ribbon-menu.sass";
// <================================================== ОПИСАНИЕ ТИПОВ =================================================> \\

// Структура категории:
export interface ICategories {
    id: string,
    name: string
}

// Структура меню:
interface IRibbonMenu {
    render: () => void,                                 // Рендер элемента меню
    getElem: () => HTMLElement,                         // Получение элемента меню
    move: (event: Event) => void,                       // Движение полосы прокрутки
    arrowControl: () => void,                           // Калибровка органов управления
    onClickAdd: (event: Event) => void,                 // Реализация приминения фильтра
}

// <================================================= РЕАЛИЗАЦИЯ МОДУЛЯ ===============================================> \\
export default class RibbonMenu implements IRibbonMenu {

    // <============================================ ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ============================================> \\
    private elem: null | HTMLElement = null;            // Элемент - меню
    private value: string = ""                          // Выбранная категория
    private categories: ICategories[];                  // Данные о категориях
    private ribbonInner: null | HTMLElement = null;     // Внутренний блок со всеми категориями
    private arrowRight: null | HTMLElement = null;      // Стрелка вправо (для прокрутки меню)
    private arrowLeft: null | HTMLElement = null;       // Стрелка влево (для прокрутки меню)

    // <=========================================== РЕАЛИЗАЦИЯ КОНСТРУКТОРА ===========================================> \\
    constructor(categories:ICategories[]) {
        this.categories = categories;                   // Данные о категориях
        this.render();                                  // Производим первоначальное отображение элементов
    }

    // <============================================= РЕНДЕР ПОЛОСЫ МЕНЮ ==============================================> \\
    render() {
        // Создание вёрстки меню:
        this.elem = document.createElement("div") as HTMLElement;
        this.elem.classList.add("ribbon");
        this.elem.innerHTML = `
            <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
            <img src="/dist/assets/images/icons/angle-icon.svg" alt="icon">
            </button>

            <nav class="ribbon__inner">
                ${this.categories.map(elem => `<a href="#" class="ribbon__item" data-id="${elem.id}">${elem.name}</a>`).join("")}
            </nav>

            <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
                <img src="/dist/assets/images/icons/angle-icon.svg" alt="icon">
            </button>
        `;

        // Формирование строки меню:
        this.ribbonInner = this.elem.querySelector(".ribbon__inner") as HTMLElement;

        // Формирование органов управлени:
        this.arrowRight = this.elem.querySelector(".ribbon__arrow_right") as HTMLElement;
        this.arrowLeft = this.elem.querySelector(".ribbon__arrow_left") as HTMLElement;

        // Первоначальная калибровка органов управления:
        this.arrowControl();

        // События, отвечающие за движение строки-меню:
        this.ribbonInner.addEventListener("scroll", () => this.arrowControl());
        this.ribbonInner.addEventListener("click", event => this.onClickAdd(event));
        this.arrowRight.addEventListener("click", event => this.move(event));
        this.arrowLeft.addEventListener("click", event => this.move(event));
    }

    // <================================ ПОЛУЧЕНИЕ ПОЛОСЫ МЕНЮ И ВЫБРАННОЙ КАТЕГОРИИ ==================================> \\
    getElem = (): HTMLElement => this.elem as HTMLElement;
    getValue = (): string => this.value as string;

    // <============================================== ПРОКРУТКА МЕНЮ =================================================> \\
    move(event: Event) {
        // Получение элемента, на котором установлен обработчик:
        const eventCurTarget = event.currentTarget;

        // Если элемент, на котором установлен обработчик существует, а так же сущесвует само меню, то:
        if (eventCurTarget instanceof HTMLElement && this.ribbonInner) {
            // Если клик произошёл по стрелке "Вправо", то сдвигаем меню влево:
            if (eventCurTarget.classList.contains("ribbon__arrow_right")) {
                this.ribbonInner.scrollBy(350, 0);
            // Если клик произошёл по стрелке "Влево", то сдвигаем меню вправо:
            } else if (eventCurTarget.classList.contains("ribbon__arrow_left")) {
                this.ribbonInner.scrollBy(-350, 0);
            } else {
                console.log("Что-то сильно пошло не так...");
            }
        }
    }

    // <======================================= КАЛИБРОВКА ОРГАНОВ УПРАВЛЕНИЯ =========================================> \\
    arrowControl() {
        // Если меню и его органы управления существуют, то:
        if (this.ribbonInner && this.arrowLeft && this.arrowRight) {
            // Если полоса меню прижата к левому краю, то скрываем левую кнопку:
            if (this.ribbonInner.scrollLeft === 0) {
                this.arrowLeft.classList.remove("ribbon__arrow_visible");
            // Если полоса меню прижата к правому краю, то, скрыаем правую кнопку:
            } else if (this.ribbonInner.scrollLeft + this.ribbonInner.clientWidth + 30 >= this.ribbonInner.scrollWidth) {
                this.arrowRight.classList.remove("ribbon__arrow_visible");
            // Если полоса меню не прижата ни к одному из краёв, то показываем обе кнопки:
            } else {
                this.arrowLeft.classList.add("ribbon__arrow_visible");
                this.arrowRight.classList.add("ribbon__arrow_visible");
            }
        }
    }

    // <======================================== ОБРАБОТКА ВЫБОРА КАТЕГОРИИ ===========================================> \\
    onClickAdd(event: Event) {
        event.preventDefault();
        const eventTarget = event.target;

        // Если элемент, на котором произошло событие, и само меню существуют, то:
        if (eventTarget instanceof HTMLElement && this.elem) {
            // ВКлючаем активность только у того элемента меню, который выбрали:
            this.elem.querySelectorAll(".ribbon__item").forEach(item => item.classList.remove("ribbon__item_active"));
            eventTarget.classList.add("ribbon__item_active");

            // Запоминаем id выбранной категории:
            this.value = eventTarget.dataset.id as string;

            // Формируем пользовательское событие, которое указывает, что была применена фильтрацция:
            const customEvent = new CustomEvent('ribbon-select', {
                detail: eventTarget.dataset.id,
                bubbles: true
            });

            // Запускаем пользовательское событие:
            this.elem.dispatchEvent(customEvent);
        } 
    }
}
