import createElement from "../assets/lib/create-element";
import "../styles/modules/modal.sass";
// <================================================== ОПИСАНИЕ ТИПОВ =================================================> \\

// Структура модального окна:
interface IModal {
    render: () => void,                         // Рендер модального окна
    getElem: () => HTMLElement,                 // Получение модального окна
    open: () => void,                           // Открытие модального окна
    setTitle: (title: string) => void           // Установка заголовка модального окна
    setBody: (node: HTMLElement) => void,       // Установка тела модального окна
    close: () => void,                          // Закрытие модального окна
    onTapKey: (event: KeyboardEvent) => void,   // Закрытие модального окна с помощью клавиш
}

// <================================================= РЕАЛИЗАЦИЯ МОДУЛЯ ===============================================> \\
export default class Modal implements IModal {

    // <============================================ ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ============================================> \\
    private elem: null | HTMLElement = null;    // Модальное окно

    // <=========================================== РЕАЛИЗАЦИЯ КОНСТРУКТОРА ===========================================> \\
    constructor() {
        this.render();                          // Производим первоначальный рендер модального окна
    }

    // <========================================== РЕНДЕР МОДАЛЬНОГО ОКНА =============================================> \\
    render() {
        // Создание вёрстки модального окна:
        this.elem = createElement(`
            <div class="modal">
                <div class="modal__overlay"></div>
                <div class="modal__inner">
                    <div class="modal__header">
                        <button type="button" class="modal__close">
                            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                        </button>

                        <h3 class="modal__title"></h3>
                    </div>
                    <div class="modal__body"></div>
                </div>
            </div>
        `);
    }

    // <========================================= ПОЛУЧЕНИЕ МОДАЛЬНОГО ОКНА ===========================================> \\
    getElem = (): HTMLElement => {
        return this.elem as HTMLElement;
    }

    // <========================================== ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ===========================================> \\
    open() {
        // Если модальное окно действительно открыто (и существует):
        if (this.elem) {
            // Блокировка scroll-а:
            document.body.classList.add("is-modal-open");
            // Размещение модального окна внутри body:
            document.body.append(this.elem);
            // Получение кнопки закрытия модального окна:
            const closeBtn = this.elem.querySelector(".modal__close") as HTMLElement;
            // Обработка события закрытия модального окна:
            closeBtn.addEventListener("click", () => this.close(), {once: true});
            // Обработка события закрытия модального окна по кажатию клавиши:
            document.addEventListener('keydown', this.onTapKey);
        }
    }

    // <========================================== УДАЛЕНИЕ МОДАЛЬНОГО ОКНА ===========================================> \\
    close() {
        // Если модальное окно существует, то:
        if (this.elem) {
            // Удаляем модальное окно со страницы:
            this.elem.remove();
            this.elem = null;
            // Возвращаем возможность прокрутки:
            document.body.classList.remove("is-modal-open");
        }
    }

    // <========================================= ЗАКРЫТИЕ ПО НАЖАТИЮ КНОПКИ ===========================================> \\
    onTapKey = (event: KeyboardEvent) => {
        // Если нажатая клавиша -  Escape, то:
        if (event.key == 'Escape') {
            // Закрываем модальное окно:
            this.close();
            // Удаляем обработчик на нажатие клавиши:
            document.removeEventListener('keydown', this.onTapKey);
        }
    }

    // <==================================== УСТАНОВКА ЗАГОЛОВКА МОДАЛЬНОГО ОКНА ======================================> \\
    setTitle(title: string) {
        // Если модальное окно существует, то:
        if (this.elem) {
            // Получаем заголовок модального окна:
            const modalTitle = this.elem.querySelector(".modal__title") as HTMLElement;
            // Устанавливаем новый заголовок:
            modalTitle.innerHTML = title;
        }
    }

    // <======================================= УСТАНОВКА ТЕЛА МОДАЛЬНОГО ОКНА ========================================> \\
    setBody(node: HTMLElement) {
        // Если модальное окно существует, то:
        if (this.elem) {
            // Получаем тело модального окна:
            const modalBody = this.elem.querySelector(".modal__body") as HTMLElement;
            // Устанавливаем новое тело:
            modalBody.innerHTML = "";
            modalBody.append(node);
        }
    }
}