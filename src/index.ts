import "./styles/button.sass";
import "./styles/common.sass";
import Carousel from "./modules/carousel";
import { ISlide } from "./modules/carousel";
import slides from "./assets/data/slides.json";
import RibbonMenu from "./modules/ribbon-menu";
import categories from "./assets/data/categories.json";
import { ICategories } from "./modules/ribbon-menu";

class Main {
	private carousel;
	private ribbonMenu;

	constructor(slides: ISlide[], categories: ICategories[]) {
        this.carousel = new Carousel(slides);
		this.ribbonMenu = new RibbonMenu(categories);
        this.render();
    }

	render() {
		const carouselElem = this.carousel.getElem();
		const carouselContainer = document.querySelector("[data-carousel-holder]") as HTMLElement;
		carouselContainer.append(carouselElem);

		const ribbonMenu = this.ribbonMenu.getElem();
		const ribbonMenuContainer = document.querySelector("[data-ribbon-holder]") as HTMLElement;
		ribbonMenuContainer.append(ribbonMenu)
  	}
}

new Main(slides, categories);