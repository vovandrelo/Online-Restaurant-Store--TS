import createElement from "../assets/lib/create-element";
import "../styles/modules/slider.sass";
// <================================================== ОПИСАНИЕ ТИПОВ =================================================> \\
// Структура входного объекта:
interface IInitialValue {
	steps: number,
	value: number,
}

// Структура слайдера:
interface IStepSlider {
	render: () => void,
	getElem: () => HTMLElement,
	getValue: () => number,
	move: (event: MouseEvent) => void,
	updateActiveTab: () => void,
	updateScale: (offset: number) => void,
	updatePoint: (offset: number) => void,
	createCustomEvent: () => void,
}

// <================================================= РЕАЛИЗАЦИЯ МОДУЛЯ ===============================================> \\
export default class StepSlider implements IStepSlider {
	// <============================================ ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ============================================> \\
	private steps: number;								// Количество "шагов" слайдера
	private value: number;								// Текущее значение слайдера
	private elem: null | HTMLElement = null;			// Элемент "Слайдер"
	private sliderProgress: null | HTMLElement = null;	// Элемент "Активная шкала"
	private point: null | HTMLElement = null;			// Эдемент "Ползунок"
	private tabs: HTMLElement[] = [];					// Набор элементов "Таб"

	// <=========================================== РЕАЛИЗАЦИЯ КОНСТРУКТОРА ===========================================> \\
	constructor(initialValue: IInitialValue) {
		this.steps = initialValue.steps;				// Установка количества "шагов" слайдера
		this.value = initialValue.value;				// Установка текущего значения слайдера
		this.render();
	}
  
	// <============================================== РЕНДЕР СЛАЙДЕРА ================================================> \\
	render() {
		// Создание вёрстки слайдера:
		this.elem = createElement(`
			<div class="slider">
				<div class="slider__thumb">
    				<span class="slider__value">${this.value + 1}</span>
				</div>

  				<div class="slider__progress"></div>

  				<div class="slider__steps"></div>
			</div>
		`);
		const stepsContainer = this.elem.querySelector(".slider__steps") as HTMLElement;
		for (let i = 0; i < this.steps; i++) {
			const newStep: HTMLElement = document.createElement("span");
			this.tabs.push(newStep);
			stepsContainer.append(newStep);
		}

		// Получение необходимых элементов: "Активную шкалу" и "Ползунка":
		this.sliderProgress = this.elem.querySelector(".slider__progress") as HTMLElement;
		this.point = this.elem.querySelector(".slider__thumb") as HTMLElement;

		// Первоначальное выставление "ползунка"
		this.updateScale(this.value * 100 / (this.steps - 1));	// Установка активной шкалы
		this.updatePoint(this.value * 100 / (this.steps - 1));	// Установка ползунка
		this.updateActiveTab();									// Установка активного таба

		// После клика по шкале слайдера происходит перемещение "ползунка":
		this.elem.addEventListener("click", this.move);

		// <======================================== НАСТРОЙКА DRAG AND DROP ==========================================> \\

		// Отключение встроенного DragAndDrop:
		this.point.ondragstart = () => false;

		// После нажатия на ползунок происходит:
		this.point.addEventListener("pointerdown", () => {
			this.elem = this.elem as HTMLElement;
			this.elem.classList.add("slider_dragging");               // Добавление класса активности слайдера
			document.addEventListener("pointermove", this.move);      // Обработка события движения мыши

			// После деактивации "ползунка" происходит:
			document.addEventListener("pointerup", event => {
				this.elem = this.elem as HTMLElement;
				this.move(event);                                       // Установка ползунка на допустимое значение
				document.removeEventListener("pointermove", this.move)  // Удаление обработчика события на движение мыши
				this.elem.classList.remove("slider_dragging");          // Удаление класса активности слайдера
			}, { once: true });
		});
	}

    // <===================================== ПОЛУЧЕНИЕ СЛАЙДЕРА И ЕГО ЗНАЧЕНИЯ =======================================> \\
	getElem = (): HTMLElement => this.elem as HTMLElement;
	getValue = (): number => this.value as number;
  
    // <============================================= ДВИЖЕНИЕ ПОЛЗУНКА ===============================================> \\
	move = (event: MouseEvent) => {
		// Отмена стандартного поведения браузера
		event.preventDefault();
		if (this.elem) {
			// Подсчёт расстояния от начала слайдера до курсора (по Х):
			const cursPos = event.clientX - this.elem.getBoundingClientRect().left;
			// Подсчёт ширины сегмента:
			const segWidth = this.elem.getBoundingClientRect().width / (this.steps - 1);
			// Позиция ползунка в %:
			let newPointPos: number = 0;

			// Если курсор вышел за левую границу движения "ползунка", то:
			if (cursPos < 0) {
				newPointPos = 0;				// Подсчитываем новое положение ползунка
				this.value = 0;					// Подсчитываем новое значение слайдера
			// Если курсор вышел за правую границу движения "ползунка", то:
			} else if (cursPos > this.elem.getBoundingClientRect().width) {	
				newPointPos = 100;				// Подсчитываем новое положение ползунка
				this.value = this.steps - 1;	// Подсчитываем новое значение слайдера
			// Если курсор находится в области движения слайдера, то:
			} else {
				// Подсчитываем новое положение ползунка:
				newPointPos = cursPos * 100 / this.elem.getBoundingClientRect().width;
				// Подсчитываем новое значение слайдера:
				this.value = Math.round(cursPos / segWidth);
			}

			// Если произошёл клик или диактивация нажатия, то:
			if (event.type === "click" || event.type === "pointerup") {
				// Подсчитываем новое положение ползунка:
				newPointPos = this.value * 100 / (this.steps - 1);
				// Запускаем пользовательское событие:		
				this.createCustomEvent();
			}

			// Запуск обновления:
			this.updateScale(newPointPos);	// Активной шкалы
			this.updatePoint(newPointPos);	// Положения ползунка
			this.updateActiveTab();			// Активного таба
		}
	}
  
	// <========================================= УСТАНОВКА АКТИВНОГО ТАБА ============================================> \\
	updateActiveTab() {
		this.tabs.forEach(tab => tab.classList.remove("slider__step-active"));
		this.tabs[this.value].classList.add("slider__step-active");
	}

	// <====================================== ЗАПОЛНЕНИЕ АКТИВНОЙ ЧАСТИ ШКАЛЫ ========================================> \\
	updateScale(offset: number) {
		if (this.sliderProgress) {
			this.sliderProgress.style.width = `${offset}%`;
		}
	}
	// <============================================ УСТАНОВКА ПОЛЗУНКА ===============================================> \\
	updatePoint(offset: number) {		
		if (this.point) {
			// Установка ползунка
			this.point.style.left = `${offset}%`;

			// Установка целочисленного значения под ползунком 
			const valuePoint = this.point.querySelector(".slider__value") as HTMLElement;
			valuePoint.innerHTML = String(this.value + 1);
		}
	}

	// <=================================== ГЛОБАЛЬНОЕ СОБЫТИЕ ИЗМЕНЕНИЯ ПОЛЗУНКА =====================================> \\
	createCustomEvent() {
		if (this.elem) {					
			const eventSliderChange = new CustomEvent('slider-change', {
				
				detail: this.value,
				bubbles: true
			});
			this.elem.dispatchEvent(eventSliderChange);
		}
	}
}