import "./styles/modules/button.sass";
import "./styles/common.sass";
import "./styles/modules/filters.sass";

import Carousel from "./modules/carousel";
import { ISlide } from "./modules/carousel";
import slides from "./assets/data/slides.json";
import RibbonMenu from "./modules/ribbon-menu";
import products from "./assets/data/products.json";
import categories from "./assets/data/categories.json";
import { ICategories } from "./modules/ribbon-menu";
import StepSlider from "./modules/slider";
import ProductGrid from "./modules/product-grid";


class Main {
	private carousel;
	private ribbonMenu;
	private stepSlider;
	private productsGrid;

	constructor(slides: ISlide[], categories: ICategories[]) {
        this.carousel = new Carousel(slides);
		this.ribbonMenu = new RibbonMenu(categories);
		this.stepSlider = new StepSlider({ steps: 5, value: 3 });
		this.productsGrid = new ProductGrid(products);
        this.render();
    }

	render() {
		const carouselElem = this.carousel.getElem();
		const carouselContainer = document.querySelector("[data-carousel-holder]") as HTMLElement;
		carouselContainer.append(carouselElem);

		const ribbonMenu = this.ribbonMenu.getElem();
		const ribbonMenuContainer = document.querySelector("[data-ribbon-holder]") as HTMLElement;
		ribbonMenuContainer.append(ribbonMenu)

		const stepSlider = this.stepSlider.getElem();
		const stepSliderContainer = document.querySelector("[data-slider-holder]") as HTMLElement;
    	stepSliderContainer.append(stepSlider);

		const productsGrid = this.productsGrid.getElem();
		const productsGridContainer = document.querySelector("[data-products-grid-holder]") as HTMLElement;
		productsGridContainer.innerHTML = "";
    	productsGridContainer.append(productsGrid);

		// Первоначальная установка фильтрации:
		const noNutsFilterElem = document.getElementById('nuts-checkbox') as HTMLInputElement;
		const vegeterianOnlyFilterElem = document.getElementById('nuts-checkbox') as HTMLInputElement;
		this.productsGrid.updateFilter({
			noNuts: noNutsFilterElem.checked,
			vegeterianOnly: vegeterianOnlyFilterElem.checked,
			maxSpiciness: this.stepSlider.getValue(),
			category: this.ribbonMenu.getValue(),
		});


		document.body.addEventListener("slider-change", (event) => {
			if (event instanceof CustomEvent<number>) {
				this.productsGrid.updateFilter({
					// Значение остроты из события 'slider-change'
					maxSpiciness: event.detail
				});
			}
		});
	  

		document.body.addEventListener("ribbon-select", event => {
			if (event instanceof CustomEvent<string>) {
				this.productsGrid.updateFilter({
					// Тип блюда из события 'ribbon-select'
					category: event.detail			
				});
			}
		});
	  
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