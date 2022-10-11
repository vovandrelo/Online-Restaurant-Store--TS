import "./styles/button.sass";
import "./styles/common.sass";
import Carousel from "./modules/carousel";
import { Slide } from "./modules/carousel";
import slides from "./assets/slides.json";

class Main {
	private carousel;

	constructor(slides: Slide[]) {
        this.carousel = new Carousel(slides);
        this.render();
    }

	render() {
		const carouselElem = this.carousel.getElem();
		const carouselContainer = document.querySelector("[data-carousel-holder]") as HTMLElement;
		carouselContainer.append(carouselElem);
  	}
}

new Main(slides);