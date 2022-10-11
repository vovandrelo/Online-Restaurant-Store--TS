!function(){"use strict";function e(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function n(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}var r=function(){function r(e){var t=this;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,r),n(this,"elem",null),n(this,"carouselInner",null),n(this,"slides",[]),n(this,"arrowLeft",null),n(this,"arrowRight",null),n(this,"widthSlide",0),n(this,"numSlides",0),n(this,"curSlide",1),n(this,"position",0),n(this,"render",(function(){var e,n;t.elem=(e='\n            <div class="carousel">\n            \n                <div class="carousel__arrow carousel__arrow_right">\n                    <img src="/dist/assets/images/icons/angle-icon.svg" alt="icon">\n                </div>\n                <div class="carousel__arrow carousel__arrow_left">\n                    <img src="/dist/assets/images/icons/angle-left-icon.svg" alt="icon">\n                </div>\n            \n                <div class="carousel__inner">\n                    '.concat(t.slides.map((function(e){return'\n                        <div class="carousel__slide" data-id='.concat(e.id,'>\n                            <img src="/dist/assets/images/carousel/').concat(e.image,'" class="carousel__img" alt="slide">\n                            <div class="carousel__caption">\n                                <span class="carousel__price">€').concat(e.price.toFixed(2),'</span>\n                                <div class="carousel__title">').concat(e.name,'</div>\n                                <button type="button" class="carousel__button">\n                                    <img src="/dist/assets/images/icons/plus-icon.svg" alt="icon">\n                                </button>\n                            </div>\n                        </div>\n                    ')})).join(""),"\n                </div>\n            </div>\n        "),(n=document.createElement("div")).innerHTML=e,n.firstElementChild),t.carouselInner=t.elem.querySelector(".carousel__inner"),t.arrowLeft=t.elem.querySelector(".carousel__arrow_left"),t.arrowRight=t.elem.querySelector(".carousel__arrow_right"),t.arrowLeft.addEventListener("click",(function(){return t.move("left")})),t.arrowRight.addEventListener("click",(function(){return t.move("right")})),t.arrowControl(!0),t.elem.addEventListener("click",(function(e){if(e.target instanceof HTMLElement&&e.target.parentElement instanceof HTMLElement){var n=e.target,r=e.target.parentElement;if(n.classList.contains("carousel__button")||r.classList.contains("carousel__button")){var i=n.closest("[data-id]").dataset.id;t.onAddClick(i)}}}))})),n(this,"getElem",(function(){return t.elem})),n(this,"move",(function(e){t.carouselInner&&(0===t.widthSlide&&0===t.numSlides&&(t.widthSlide=t.carouselInner.offsetWidth,t.numSlides=t.carouselInner.querySelectorAll(".carousel__slide").length),"left"===e?(t.curSlide--,t.position+=t.widthSlide,t.carouselInner.style.transform="translateX(".concat(t.position,"px)")):"right"===e?(t.curSlide++,t.position-=t.widthSlide,t.carouselInner.style.transform="translateX(".concat(t.position,"px)")):console.log("Что-то сильно пошло не так..."),t.arrowControl())})),n(this,"arrowControl",(function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t.arrowLeft&&t.arrowRight&&(e?t.arrowLeft.style.display="none":t.curSlide+1>t.numSlides?t.arrowRight.style.display="none":t.curSlide-1<1?t.arrowLeft.style.display="none":(t.arrowRight.style.display="",t.arrowLeft.style.display=""))})),this.slides=e,this.render()}var t,i;return t=r,(i=[{key:"onAddClick",value:function(e){if(this.elem){var n=new CustomEvent("product-add",{detail:e,bubbles:!0});this.elem.dispatchEvent(n)}}}])&&e(t.prototype,i),Object.defineProperty(t,"prototype",{writable:!1}),r}(),t=JSON.parse('[{"name":"Penang shrimp","price":16,"image":"penang_shrimp.png","id":"penang-shrimp"},{"name":"Chicken cashew","price":14,"image":"chicken_cashew.png","id":"chicken-cashew"},{"name":"Red curry veggies","price":12.5,"image":"red_curry_vega.png","id":"red-curry-veggies"},{"name":"Chicken springrolls","price":6.5,"image":"chicken_loempias.png","id":"chicken-springrolls"}]');function i(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}new(function(){function e(n){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.carousel=new r(n),this.render()}var n,t;return n=e,(t=[{key:"render",value:function(){var e=this.carousel.getElem();document.querySelector("[data-carousel-holder]").append(e)}}])&&i(n.prototype,t),Object.defineProperty(n,"prototype",{writable:!1}),e}())(t)}();