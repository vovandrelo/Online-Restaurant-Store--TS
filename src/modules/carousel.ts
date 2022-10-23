import createElement from "../assets/lib/create-element"
import "../styles/modules/carousel.sass";

// <================================================== ОПИСАНИЕ ТИПОВ =================================================> \\

// Структура слайда:
export interface ISlide {
    name: string,
    price: number,
    image: string,
    id: string,
}

// Структура слайдера:
interface ICarousel {
    getElem: () => HTMLElement,                 // Получение слайдера
    render: () => void,                         // Рендер слайдера
    move: (direction: string) => void,          // Перемещение слайдов
    arrowControl: (start: boolean) => void,     // Калибровка органов управления
    onAddClick: (slideId: string) => void       // Обработка добавления блюда в корзину
}

// <================================================= РЕАЛИЗАЦИЯ МОДУЛЯ ===============================================> \\

// Элемент Слайдер(Карусель):
export default class Carousel implements ICarousel {
    // <============================================ ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ============================================> \\
    private elem: null | HTMLElement = null;            // Элемент "Карусель"
    private carouselInner: null | HTMLElement = null;   // Движимый элемент (содержащит внутри себя все слайды)
    private slides: ISlide[] = [];                      // Данные о слайдах
    private arrowLeft: null | HTMLElement = null;       // Элемент управления "Влево"
    private arrowRight: null | HTMLElement = null;      // Элемент управления "Вправо"
    private widthSlide: number = 0;                     // Ширина слайда
    private numSlides: number = 0;                      // Количество слайдов
    private curSlide: number = 1;                       // Индекс текущего слайда (начинается с 1)
    private position: number = 0;                       // Позиция слайдера (отступ от начального положения)

    // <=========================================== РЕАЛИЗАЦИЯ КОНСТРУКТОРА ===========================================> \\
    constructor(slides: ISlide[]) {
        this.slides = slides                            // Данные о слайдах
        this.render();                                  // Производим первоначальное отображение элементов
    }

    // <============================================== РЕНДЕР СЛАЙДЕРА ================================================> \\
    render = (): void => {
        // Создание вёрстки слайдера:
        this.elem = createElement(`
            <div class="carousel">
            
                <div class="carousel__arrow carousel__arrow_right">
                    <img src="/dist/assets/images/icons/angle-icon.svg" alt="icon">
                </div>
                <div class="carousel__arrow carousel__arrow_left">
                    <img src="/dist/assets/images/icons/angle-left-icon.svg" alt="icon">
                </div>
            
                <div class="carousel__inner">
                    ${this.slides.map(slide => `
                        <div class="carousel__slide" data-id=${slide.id}>
                            <img src="/dist/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
                            <div class="carousel__caption">
                                <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                                <div class="carousel__title">${slide.name}</div>
                                <button type="button" class="carousel__button">
                                    <img src="/dist/assets/images/icons/plus-icon.svg" alt="icon">
                                </button>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);

        // Получаем "Движимый" элемент:
        this.carouselInner = this.elem.querySelector(".carousel__inner") as HTMLElement;

        // Получаем органы управления:
        this.arrowLeft = this.elem.querySelector(".carousel__arrow_left") as HTMLElement;
        this.arrowRight = this.elem.querySelector(".carousel__arrow_right") as HTMLElement;

        // Начинаем прослушивание событие клина на органах управления:
        this.arrowLeft.addEventListener("click", (): void => this.move("left"));
        this.arrowRight.addEventListener("click", (): void => this.move("right"));

        // Первоначальная калиброввка органов управления:
        this.arrowControl(true);

        // Начинаем прослушивание событие клина на кнопке добавления:
        this.elem.addEventListener("click", event => {
            // Если элемент события клика является html-элементом:
            if (event.target instanceof HTMLElement && event.target.parentElement instanceof HTMLElement) {
                // Получение элемента, на котором произошло событие:
                const targetElem: HTMLElement = event.target;
                // Получение родителя элемента, на котором произошло событие:
                const parentElem: HTMLElement = event.target.parentElement;
                // Если нажатый элемент - кнопка или картинка внутри кнопки, то вызываем метод добавления:
                if (targetElem.classList.contains("carousel__button") || parentElem.classList.contains("carousel__button")) {
                    // Определяем id продукта, на котором произошёл клик:
                    const slide: HTMLElement = targetElem.closest("[data-id]") as HTMLElement;
                    const slideId = slide.dataset.id as string;
                    // Вызываем метод добавления:
                    this.onAddClick(slideId);
                }
            }
        });
    };

    // <============================================= ПОЛУЧЕНИЕ СЛАЙДЕРА ==============================================> \\
    getElem = (): HTMLElement => {
        return this.elem as HTMLElement;
    }

    // <============================================= ДВИЖЕНИЕ СЛАЙДОВ ================================================> \\
    move = (direction: string): void => {
        // Если слайды существуют, то:
        if (this.carouselInner) {
             // При самом первом нажатии на органы управления подсчитываем количество слайдов и их ширину:
            if (this.widthSlide === 0 && this.numSlides === 0) {
                this.widthSlide = this.carouselInner.offsetWidth;                                   // Ширина слайда
                this.numSlides = this.carouselInner.querySelectorAll(".carousel__slide").length;    // Кол-во слайдов
            }

            // Если была нажата клавиша "Влево", то:
            if (direction === "left") {
                // Сдвигаем слайд влево:
                this.curSlide--;
                this.position += this.widthSlide;
                this.carouselInner.style.transform = `translateX(${this.position}px)`;
            // Если была нажата клавиша "Вправо", то:
            } else if (direction === "right") {
                // Сдвигаем слайд вправо:
                this.curSlide++;
                this.position -= this.widthSlide;
                this.carouselInner.style.transform = `translateX(${this.position}px)`;
                // В случае ошибки выводим соответствующее уведомление:
            } else {
                console.log("Что-то сильно пошло не так...");
            }
            // При любой нажатой клавише производим калибровку органов управления:
            this.arrowControl();
        }
    }

    // <======================================= КАЛИБРОВКА ОРГАНОВ УПРАВЛЕНИЯ =========================================> \\
    arrowControl = (start: boolean = false): void => {
        // Если органы управления были успешно получены, то:
        if (this.arrowLeft && this.arrowRight) {
            // При первоначальном запуске просто скрываем левувю кнопку:
            if (start) {
                this.arrowLeft.style.display = 'none';
            // При всех последующих запусках кнопка скрывается на основании текущего слайда:
            } else {
                // Если текущий слайд - последний, то скрываем правую кнопку:
                if (this.curSlide + 1 > this.numSlides) {
                    this.arrowRight.style.display = 'none';
                // Если текущий слайд - первый, то скрываем левую кнопку:
                } else if (this.curSlide - 1 < 1) {
                    this.arrowLeft.style.display = 'none';
                // Во всех остальных случаях показываем обе стрелки:
                } else {
                    this.arrowRight.style.display = '';
                    this.arrowLeft.style.display = '';
                }
            }
        }
    }

    // <============================== ГЛОБАЛЬНОЕ СОБЫТИЕ ДОБАВЛЕНИЯ БЛЮДА В КОРЗИНУ ==================================> \\
    onAddClick(slideId: string): void {        
        // Если слайдер был успешно создан, то:
        if (this.elem) {
            // Формируем кастомное событие:
            const event = new CustomEvent('product-add', {
                // ID текущего слайда определяем из индекса текущего слайда:
                detail: slideId,
                bubbles: true,
            });
            // Запускаем собственное событие
            this.elem.dispatchEvent(event);
        }
    }
}