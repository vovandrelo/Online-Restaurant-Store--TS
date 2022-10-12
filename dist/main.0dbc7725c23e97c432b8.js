/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/lib/create-element.ts":
/*!**************************************!*\
  !*** ./assets/lib/create-element.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var createElement = function createElement(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
};
/* harmony default export */ __webpack_exports__["default"] = (createElement);

/***/ }),

/***/ "./modules/carousel.ts":
/*!*****************************!*\
  !*** ./modules/carousel.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Carousel; }
/* harmony export */ });
/* harmony import */ var _assets_lib_create_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/lib/create-element */ "./assets/lib/create-element.ts");
/* harmony import */ var _styles_carousel_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/carousel.sass */ "./styles/carousel.sass");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



// <================================================== ОПИСАНИЕ ТИПОВ =================================================> \\

// Структура слайда:
// <================================================= РЕАЛИЗАЦИЯ МОДУЛЯ ===============================================> \\
// Элемент Слайдер(Карусель):
var Carousel = /*#__PURE__*/function () {
  // <============================================ ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ============================================> \\
  // Элемент "Карусель"
  // Движимый элемент (содержащит внутри себя все слайды)
  // Данные о слайдах
  // Элемент управления "Влево"
  // Элемент управления "Вправо"
  // Ширина слайда
  // Количество слайдов
  // Индекс текущего слайда (начинается с 1)
  // Позиция слайдера (отступ от начального положения)

  // <=========================================== РЕАЛИЗАЦИЯ КОНСТРУКТОРА ===========================================> \\
  function Carousel(slides) {
    var _this = this;
    _classCallCheck(this, Carousel);
    _defineProperty(this, "elem", null);
    _defineProperty(this, "carouselInner", null);
    _defineProperty(this, "slides", []);
    _defineProperty(this, "arrowLeft", null);
    _defineProperty(this, "arrowRight", null);
    _defineProperty(this, "widthSlide", 0);
    _defineProperty(this, "numSlides", 0);
    _defineProperty(this, "curSlide", 1);
    _defineProperty(this, "position", 0);
    _defineProperty(this, "render", function () {
      // Создание вёрстки слайдера:
      _this.elem = (0,_assets_lib_create_element__WEBPACK_IMPORTED_MODULE_0__["default"])("\n            <div class=\"carousel\">\n            \n                <div class=\"carousel__arrow carousel__arrow_right\">\n                    <img src=\"/dist/assets/images/icons/angle-icon.svg\" alt=\"icon\">\n                </div>\n                <div class=\"carousel__arrow carousel__arrow_left\">\n                    <img src=\"/dist/assets/images/icons/angle-left-icon.svg\" alt=\"icon\">\n                </div>\n            \n                <div class=\"carousel__inner\">\n                    ".concat(_this.slides.map(function (slide) {
        return "\n                        <div class=\"carousel__slide\" data-id=".concat(slide.id, ">\n                            <img src=\"/dist/assets/images/carousel/").concat(slide.image, "\" class=\"carousel__img\" alt=\"slide\">\n                            <div class=\"carousel__caption\">\n                                <span class=\"carousel__price\">\u20AC").concat(slide.price.toFixed(2), "</span>\n                                <div class=\"carousel__title\">").concat(slide.name, "</div>\n                                <button type=\"button\" class=\"carousel__button\">\n                                    <img src=\"/dist/assets/images/icons/plus-icon.svg\" alt=\"icon\">\n                                </button>\n                            </div>\n                        </div>\n                    ");
      }).join(""), "\n                </div>\n            </div>\n        "));

      // Получаем "Движимый" элемент:
      _this.carouselInner = _this.elem.querySelector(".carousel__inner");

      // Получаем ораганы управления:
      _this.arrowLeft = _this.elem.querySelector(".carousel__arrow_left");
      _this.arrowRight = _this.elem.querySelector(".carousel__arrow_right");

      // Начинаем прослушивание событие клина на органах управления:
      _this.arrowLeft.addEventListener("click", function () {
        return _this.move("left");
      });
      _this.arrowRight.addEventListener("click", function () {
        return _this.move("right");
      });

      // Первоначальная калиброввка органов управления:
      _this.arrowControl(true);

      // Начинаем прослушивание событие клина на кнопке добавления:
      _this.elem.addEventListener("click", function (event) {
        // Если элемент события клика является html-элементом:
        if (event.target instanceof HTMLElement && event.target.parentElement instanceof HTMLElement) {
          // Получение элемента, на котором произошло событие:
          var targetElem = event.target;
          // Получение родителя элемента, на котором произошло событие:
          var parentElem = event.target.parentElement;
          // Если нажатый элемент - кнопка или картинка внутри кнопки, то вызываем метод добавления:
          if (targetElem.classList.contains("carousel__button") || parentElem.classList.contains("carousel__button")) {
            // Определяем id продукта, на котором произошёл клик:
            var slide = targetElem.closest("[data-id]");
            var _slideId = slide.dataset.id;
            // Вызываем метод добавления:
            _this.onAddClick(_slideId);
          }
        }
      });
    });
    _defineProperty(this, "getElem", function () {
      return _this.elem;
    });
    _defineProperty(this, "move", function (direction) {
      // Если слайды существуют, то:
      if (_this.carouselInner) {
        // При самом первом нажатии на органы управления подсчитываем количество слайдов и их ширину:
        if (_this.widthSlide === 0 && _this.numSlides === 0) {
          _this.widthSlide = _this.carouselInner.offsetWidth; // Ширина слайда
          _this.numSlides = _this.carouselInner.querySelectorAll(".carousel__slide").length; // Кол-во слайдов
        }

        // Если была нажата клавиша "Влево", то:
        if (direction === "left") {
          // Сдвигаем слайд влево:
          _this.curSlide--;
          _this.position += _this.widthSlide;
          _this.carouselInner.style.transform = "translateX(".concat(_this.position, "px)");
          // Если была нажата клавиша "Вправо", то:
        } else if (direction === "right") {
          // Сдвигаем слайд вправо:
          _this.curSlide++;
          _this.position -= _this.widthSlide;
          _this.carouselInner.style.transform = "translateX(".concat(_this.position, "px)");
          // В случае ошибки выводим соответствующее уведомление:
        } else {
          console.log("Что-то сильно пошло не так...");
        }
        // При любой нажатой клавише производим калибровку органов управления:
        _this.arrowControl();
      }
    });
    _defineProperty(this, "arrowControl", function () {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // Если органы управления были успешно получены, то:
      if (_this.arrowLeft && _this.arrowRight) {
        // При первоначальном запуске просто скрываем левувю кнопку:
        if (start) {
          _this.arrowLeft.style.display = 'none';
          // При всех последующих запусках кнопка скрывается на основании текущего слайда:
        } else {
          // Если текущий слайд - последний, то скрываем правую кнопку:
          if (_this.curSlide + 1 > _this.numSlides) {
            _this.arrowRight.style.display = 'none';
            // Если текущий слайд - первый, то скрываем левую кнопку:
          } else if (_this.curSlide - 1 < 1) {
            _this.arrowLeft.style.display = 'none';
            // Во всех остальных случаях показываем обе стрелки:
          } else {
            _this.arrowRight.style.display = '';
            _this.arrowLeft.style.display = '';
          }
        }
      }
    });
    this.slides = slides; // Данные о слайдах
    this.render(); // Производим первоначальное отображение элементов
  }

  // <============================================== РЕНДЕР СЛАЙДЕРА ================================================> \\
  _createClass(Carousel, [{
    key: "onAddClick",
    value:
    // <=========================================== РЕАЛИЗАЦИЯ ДОБАВЛЕНИЯ =============================================> \\
    function onAddClick(slideId) {
      // Если слайдер был успешно создан, то:
      if (this.elem) {
        // Формируем кастомное событие:
        var event = new CustomEvent('product-add', {
          // ID текущего слайда определяем из индекса текущего слайда:
          detail: slideId,
          bubbles: true
        });
        // Запускаем собственное событие
        this.elem.dispatchEvent(event);
      }
    }
  }]);
  return Carousel;
}();


/***/ }),

/***/ "./modules/ribbon-menu.ts":
/*!********************************!*\
  !*** ./modules/ribbon-menu.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ RibbonMenu; }
/* harmony export */ });
/* harmony import */ var _styles_ribbon_menu_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/ribbon-menu.sass */ "./styles/ribbon-menu.sass");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// <================================================== ОПИСАНИЕ ТИПОВ =================================================> \\

// Структура категории:
// <================================================= РЕАЛИЗАЦИЯ МОДУЛЯ ===============================================> \\
var RibbonMenu = /*#__PURE__*/function () {
  // <============================================ ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ============================================> \\

  // Данные о категориях
  // Внутренний блок со всеми категориями
  // Стрелка вправо (для прокрутки меню)
  // Стрелка влево (для прокрутки меню)

  // <=========================================== РЕАЛИЗАЦИЯ КОНСТРУКТОРА ===========================================> \\
  function RibbonMenu(categories) {
    var _this = this;
    _classCallCheck(this, RibbonMenu);
    _defineProperty(this, "elem", null);
    _defineProperty(this, "ribbonInner", null);
    _defineProperty(this, "arrowRight", null);
    _defineProperty(this, "arrowLeft", null);
    _defineProperty(this, "getElem", function () {
      return _this.elem;
    });
    this.categories = categories; // Данные о категориях
    this.render(); // Производим первоначальное отображение элементов
  }

  // <============================================= РЕНДЕР ПОЛОСЫ МЕНЮ ==============================================> \\
  _createClass(RibbonMenu, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      // Создание вёрстки меню:
      this.elem = document.createElement("div");
      this.elem.classList.add("ribbon");
      this.elem.innerHTML = "\n            <button class=\"ribbon__arrow ribbon__arrow_left ribbon__arrow_visible\">\n            <img src=\"/dist/assets/images/icons/angle-icon.svg\" alt=\"icon\">\n            </button>\n\n            <nav class=\"ribbon__inner\">\n                ".concat(this.categories.map(function (elem) {
        return "<a href=\"#\" class=\"ribbon__item\" data-id=\"".concat(elem.id, "\">").concat(elem.name, "</a>");
      }).join(""), "\n            </nav>\n\n            <button class=\"ribbon__arrow ribbon__arrow_right ribbon__arrow_visible\">\n                <img src=\"/dist/assets/images/icons/angle-icon.svg\" alt=\"icon\">\n            </button>\n        ");

      // Формирование строки меню:
      this.ribbonInner = this.elem.querySelector(".ribbon__inner");

      // Формирование органов управлени:
      this.arrowRight = this.elem.querySelector(".ribbon__arrow_right");
      this.arrowLeft = this.elem.querySelector(".ribbon__arrow_left");

      // Первоначальная калибровка органов управления:
      this.arrowControl();

      // События, отвечающие за движение строки-меню:
      this.ribbonInner.addEventListener("scroll", function () {
        return _this2.arrowControl();
      });
      this.ribbonInner.addEventListener("click", function (event) {
        return _this2.onClickAdd(event);
      });
      this.arrowRight.addEventListener("click", function (event) {
        return _this2.move(event);
      });
      this.arrowLeft.addEventListener("click", function (event) {
        return _this2.move(event);
      });
    }

    // <=========================================== ПОЛУЧЕНИЕ ПОЛОСЫ МЕНЮ =============================================> \\
  }, {
    key: "move",
    value:
    // <============================================== ПРОКРУТКА МЕНЮ =================================================> \\
    function move(event) {
      // Получение элемента, на котором установлен обработчик:
      var eventCurTarget = event.currentTarget;

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
  }, {
    key: "arrowControl",
    value: function arrowControl() {
      // Если меню и его органы управления существуют, то:
      if (this.ribbonInner && this.arrowLeft && this.arrowRight) {
        console.log(this.ribbonInner.scrollLeft);

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

    // <=========================================== РЕАЛИЗАЦИЯ ДОБАВЛЕНИЯ =============================================> \\
  }, {
    key: "onClickAdd",
    value: function onClickAdd(event) {
      event.preventDefault();
      var eventTarget = event.target;

      // Если элемент, на котором произошло событие, и само меню существуют, то:
      if (eventTarget instanceof HTMLElement && this.elem) {
        // ВКлючаем активность только у того элемента меню, который выбрали:
        this.elem.querySelectorAll(".ribbon__item").forEach(function (item) {
          return item.classList.remove("ribbon__item_active");
        });
        eventTarget.classList.add("ribbon__item_active");

        // Формируем пользовательское событие, которое указывает, что была применена фильтрацция:
        var customEvent = new CustomEvent('ribbon-select', {
          detail: eventTarget.dataset.id,
          bubbles: true
        });

        // Запускаем пользовательское событие:
        this.elem.dispatchEvent(customEvent);
      }
    }
  }]);
  return RibbonMenu;
}();


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles/button.sass":
/*!***********************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles/button.sass ***!
  \***********************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "../node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../assets/images/icons/loader-icon-sm.svg */ "./assets/images/icons/loader-icon-sm.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".button {\n  height: 64px;\n  padding: 19px 24px;\n  background-color: #ecd41a;\n  font-family: \"Lato\", sans-serif;\n  font-style: italic;\n  font-weight: 600;\n  font-size: 20px;\n  line-height: 1.2;\n  color: #1f1e19;\n  display: inline-block;\n  transition: 0.2s all;\n  text-transform: uppercase;\n  cursor: pointer;\n}\n.button:hover, .button:active, .button:focus {\n  background-color: #c8b416;\n}\n.button.button_block {\n  display: block;\n  width: 100%;\n}\n.button.is-loading {\n  pointer-events: none;\n}\n.button.is-loading::after {\n  content: \"\";\n  width: 24px;\n  height: 24px;\n  margin-left: 12px;\n  position: relative;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") center no-repeat;\n  background-size: cover;\n  vertical-align: bottom;\n  display: inline-block;\n  animation: loadingSpinner 1s infinite linear;\n}\n\n.btn-group {\n  display: inline-flex;\n  flex-direction: row;\n  justify-content: center;\n}\n.btn-group__button {\n  position: relative;\n}\n\n@media all and (max-width: 767px) {\n  .btn-group {\n    display: flex;\n  }\n  .btn-group__button {\n    flex-grow: 1;\n  }\n}", "",{"version":3,"sources":["webpack://./styles/button.sass","webpack://./styles/var.sass"],"names":[],"mappings":"AAEA;EACI,YAAA;EACA,kBAAA;EACA,yBCHW;EDIX,+BAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,gBAAA;EACA,cCVU;EDWV,qBAAA;EACA,oBAAA;EACA,yBAAA;EACA,eAAA;AADJ;AAGI;EACI,yBCfY;ADcpB;AAGI;EACI,cAAA;EACA,WAAA;AADR;AAGI;EACI,oBAAA;AADR;AAEQ;EACI,WAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,kBAAA;EACA,oEAAA;EACA,sBAAA;EACA,sBAAA;EACA,qBAAA;EACA,4CAAA;AAAZ;;AAEA;EACI,oBAAA;EACA,mBAAA;EACA,uBAAA;AACJ;AAAI;EACI,kBAAA;AAER;;AAAA;EACI;IACI,aAAA;EAGN;EADE;IACI,YAAA;EAGN;AACF","sourcesContent":["@import './var.sass'\n    \n.button\n    height: 64px\n    padding: 19px 24px\n    background-color: $color-yellow\n    font-family: \"Lato\", sans-serif\n    font-style: italic\n    font-weight: 600\n    font-size: 20px\n    line-height: 1.2\n    color: $color-black\n    display: inline-block\n    transition: 0.2s all\n    text-transform: uppercase\n    cursor: pointer\n\n    &:hover, &:active, &:focus\n        background-color: $color-yellow-dark\n\n    &.button_block\n        display: block\n        width: 100%\n\n    &.is-loading\n        pointer-events: none\n        &::after\n            content: \"\"\n            width: 24px\n            height: 24px\n            margin-left: 12px\n            position: relative\n            background: url(/assets/images/icons/loader-icon-sm.svg) center no-repeat\n            background-size: cover\n            vertical-align: bottom\n            display: inline-block\n            animation: loadingSpinner 1s infinite linear\n\n.btn-group\n    display: inline-flex\n    flex-direction: row\n    justify-content: center\n    &__button\n        position: relative\n\n@media all and (max-width: 767px)\n    .btn-group\n        display: flex\n\n    .btn-group__button\n        flex-grow: 1\n","$color-white: #fff\n$color-black: #1f1e19\n$color-yellow: #ecd41a\n$color-yellow-dark: #c8b416\n$color-pink: #c92086\n$color-black-light: #6e6a51\n$color-black-middle: #414036\n$color-black-dark: #2d2c25\n$color-grey: #b6b4a2\n$color-body: $color-white\n$carousel-height: 313px\n$card-height: 320px\n$font-primary: \"Lato\"\n$font-secondary: \"Sriracha\""],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles/carousel.sass":
/*!*************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles/carousel.sass ***!
  \*************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".carousel {\n  height: 313px;\n  position: relative;\n  overflow: hidden;\n}\n.carousel__caption {\n  position: absolute;\n  z-index: 2;\n  right: 0;\n  bottom: 0;\n  height: 70px;\n  background-color: #2d2c25;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n}\n.carousel__price {\n  position: absolute;\n  right: 0;\n  bottom: 100%;\n  display: inline-block;\n  padding: 8px;\n  min-width: 72px;\n  text-align: center;\n  background-color: #c92086;\n  color: #fff;\n  font-family: \"Lato\", sans-serif;\n  font-weight: 700;\n  font-size: 17px;\n  line-height: 1.2;\n}\n.carousel__title {\n  text-align: center;\n  font-weight: 500;\n  font-size: 21px;\n  font-style: italic;\n  line-height: 1.2;\n  width: 100%;\n  padding: 0 20px;\n}\n.carousel__button {\n  background-color: #ecd41a;\n  width: 72px;\n  flex: 1 0 72px;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: 0.2s all;\n}\n.carousel__button:active, .carousel__button:hover {\n  background-color: #c8b416;\n}\n.carousel__inner {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: row;\n  position: absolute;\n  left: 0;\n  top: 0;\n  transition: all 1s ease;\n}\n.carousel__slide {\n  width: 100%;\n  min-width: 100%;\n  height: 100%;\n  position: relative;\n  margin: 0;\n}\n.carousel__arrow {\n  position: absolute;\n  z-index: 3;\n  bottom: 0;\n  top: 50%;\n  transform: translate(0, -50%);\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 70px;\n  height: 70px;\n}\n.carousel__arrow img, .carousel__arrow svg {\n  max-width: 20px;\n}\n.carousel__arrow_right {\n  right: 0;\n}\n.carousel__arrow_left {\n  left: 0;\n}\n.carousel__img {\n  min-width: 100%;\n  display: block;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n@media all and (max-width: 767px) {\n  .carousel {\n    padding-bottom: 57px;\n  }\n  .carousel__caption {\n    left: 0;\n    height: 57px;\n  }\n  .carousel__arrow {\n    bottom: 57px;\n  }\n  .carousel__arrow_right img, .carousel__arrow_right svg {\n    margin-top: 0;\n  }\n  .carousel__arrow_left img, .carousel__arrow_left svg {\n    margin-bottom: 0;\n  }\n}\n@media (max-width: 992px) {\n  .carousel__img {\n    position: absolute;\n    top: 0;\n    left: 0;\n    transform: none;\n  }\n}", "",{"version":3,"sources":["webpack://./styles/carousel.sass","webpack://./styles/var.sass"],"names":[],"mappings":"AAEA;EACE,aCOgB;EDNhB,kBAAA;EACA,gBAAA;AADF;AAEE;EACE,kBAAA;EACA,UAAA;EACA,QAAA;EACA,SAAA;EACA,YAAA;EACA,yBCLe;EDMf,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,8BAAA;AAAJ;AACE;EACE,kBAAA;EACA,QAAA;EACA,YAAA;EACA,qBAAA;EACA,YAAA;EACA,eAAA;EACA,kBAAA;EACA,yBCrBS;EDsBT,WC1BU;ED2BV,+BAAA;EACA,gBAAA;EACA,eAAA;EACA,gBAAA;AACJ;AAAE;EACE,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,WAAA;EACA,eAAA;AAEJ;AADE;EACE,yBCtCW;EDuCX,WAAA;EACA,cAAA;EACA,YAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;EACA,oBAAA;AAGJ;AAFI;EACE,yBChDc;ADoDpB;AAHE;EACE,WAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,uBAAA;AAKJ;AAJE;EACE,WAAA;EACA,eAAA;EACA,YAAA;EACA,kBAAA;EACA,SAAA;AAMJ;AALE;EACE,kBAAA;EACA,UAAA;EACA,SAAA;EACA,QAAA;EACA,6BAAA;EACA,eAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,WAAA;EACA,YAAA;AAOJ;AANI;EACE,eAAA;AAQN;AAPE;EACE,QAAA;AASJ;AARE;EACE,OAAA;AAUJ;AATE;EACE,eAAA;EACA,cAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;AAWJ;;AARA;EACE;IACE,oBAAA;EAWF;EAVE;IACE,OAAA;IACA,YAAA;EAYJ;EAXE;IACE,YAAA;EAaJ;EAXM;IACE,aAAA;EAaR;EAXM;IACE,gBAAA;EAaR;AACF;AAXA;EACE;IACE,kBAAA;IACA,MAAA;IACA,OAAA;IACA,eAAA;EAaF;AACF","sourcesContent":["@import 'var.sass'\n    \n.carousel\n  height: $carousel-height\n  position: relative\n  overflow: hidden\n  &__caption\n    position: absolute\n    z-index: 2\n    right: 0\n    bottom: 0\n    height: 70px\n    background-color: $color-black-dark\n    display: flex\n    flex-direction: row\n    align-items: center\n    justify-content: space-between\n  &__price\n    position: absolute\n    right: 0\n    bottom: 100%\n    display: inline-block\n    padding: 8px\n    min-width: 72px\n    text-align: center\n    background-color: $color-pink\n    color: $color-body\n    font-family: $font-primary, sans-serif\n    font-weight: 700\n    font-size: 17px\n    line-height: 1.2\n  &__title\n    text-align: center\n    font-weight: 500\n    font-size: 21px\n    font-style: italic\n    line-height: 1.2\n    width: 100%\n    padding: 0 20px\n  &__button\n    background-color: $color-yellow\n    width: 72px\n    flex: 1 0 72px\n    height: 100%\n    display: flex\n    flex-direction: column\n    align-items: center\n    justify-content: center\n    cursor: pointer\n    transition: 0.2s all\n    &:active, &:hover\n      background-color: $color-yellow-dark\n  &__inner\n    width: 100%\n    height: 100%\n    display: flex\n    flex-direction: row\n    position: absolute\n    left: 0\n    top: 0\n    transition: all 1s ease\n  &__slide\n    width: 100%\n    min-width: 100%\n    height: 100%\n    position: relative\n    margin: 0\n  &__arrow\n    position: absolute\n    z-index: 3\n    bottom: 0\n    top: 50%\n    transform: translate(0, -50%)\n    cursor: pointer\n    display: flex\n    flex-direction: column\n    align-items: center\n    justify-content: center\n    width: 70px\n    height: 70px\n    img, svg\n      max-width: 20px\n  &__arrow_right\n    right: 0\n  &__arrow_left\n    left: 0\n  &__img\n    min-width: 100%\n    display: block\n    position: absolute\n    top: 50%\n    left: 50%\n    transform: translate(-50%, -50%)\n\n\n@media all and (max-width: 767px)\n  .carousel\n    padding-bottom: 57px\n    &__caption\n      left: 0\n      height: 57px\n    &__arrow\n      bottom: 57px\n      &_right\n        img, svg\n          margin-top: 0\n      &_left\n        img, svg\n          margin-bottom: 0\n\n\n@media (max-width: 992px)\n  .carousel__img\n    position: absolute\n    top: 0\n    left: 0\n    transform: none\n","$color-white: #fff\n$color-black: #1f1e19\n$color-yellow: #ecd41a\n$color-yellow-dark: #c8b416\n$color-pink: #c92086\n$color-black-light: #6e6a51\n$color-black-middle: #414036\n$color-black-dark: #2d2c25\n$color-grey: #b6b4a2\n$color-body: $color-white\n$carousel-height: 313px\n$card-height: 320px\n$font-primary: \"Lato\"\n$font-secondary: \"Sriracha\""],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles/common.sass":
/*!***********************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles/common.sass ***!
  \***********************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Lato:400,400i|Source+Sans+Pro|Sriracha&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\nbody {\n  font-family: \"Lato\", cursive;\n  color: #fff;\n  font-size: 16px;\n  line-height: 1.5;\n  background-color: #1f1e19;\n  margin: 0;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\nbody main {\n  position: relative;\n  z-index: 2;\n  padding-bottom: 100px;\n}\n\na {\n  background-color: transparent;\n  -webkit-text-decoration-skip: objects;\n}\na:active, a:hover {\n  outline-width: 0;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n.text-center {\n  text-align: center;\n}\n\nselect {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n\nbutton {\n  box-shadow: none;\n  outline: none;\n  border: none;\n  background-color: transparent;\n}\n\np {\n  font-family: \"Lato\", sans-serif;\n  margin: 0;\n}\n\nh1 {\n  font-size: 46px;\n  line-height: 1.2;\n  color: #ecd41a;\n  text-shadow: 3px 3px #c92086;\n  margin: 0;\n  text-align: center;\n  text-transform: uppercase;\n}\n\n.heading {\n  font-size: 46px;\n  line-height: 1.2;\n  color: #ecd41a;\n  text-shadow: 3px 3px #c92086;\n  margin: 0;\n  text-align: center;\n  text-transform: uppercase;\n}\n.heading.logo {\n  font-family: \"Sriracha\", sans-serif;\n}\n\nh2 {\n  font-family: \"Sriracha\", sans-serif;\n  font-size: 36px;\n  line-height: 1.2;\n  font-weight: 400;\n  color: #ecd41a;\n  text-shadow: 3px 3px #c92086;\n  margin: 40px 0 30px;\n  text-align: center;\n  text-transform: uppercase;\n}\n\n.section-heading {\n  font-family: \"Sriracha\", sans-serif;\n  font-size: 36px;\n  line-height: 1.2;\n  font-weight: 400;\n  color: #ecd41a;\n  text-shadow: 3px 3px #c92086;\n  margin: 40px 0 30px;\n  text-align: center;\n  text-transform: uppercase;\n}\n\n.page-title {\n  font-size: 230px;\n  line-height: 1;\n  font-weight: 400;\n  color: #ecd41a;\n  text-shadow: 6px 6px #c92086;\n  text-align: center;\n  text-transform: uppercase;\n  margin-bottom: 26px;\n}\n\n.general-text {\n  font-family: \"Sriracha\", sans-serif;\n  font-style: italic;\n  font-weight: 700;\n  font-size: 21px;\n  line-height: 1.2;\n  color: #fff;\n  text-align: center;\n}\n\n.container {\n  max-width: 988px;\n  margin: 0 auto;\n}\n\n.container_half {\n  max-width: 494px;\n}\n\n.header {\n  padding: 50px 0 36px;\n  position: relative;\n}\n\n.subheading {\n  font-size: 21px;\n  font-style: italic;\n  font-weight: 500;\n  line-height: 1.2;\n  text-align: center;\n  color: #b6b4a2;\n  margin: 0;\n}\n\n@media all and (max-width: 767px) {\n  h1, .heading {\n    font-size: 32px;\n  }\n  .subheading {\n    font-size: 18px;\n  }\n  h2, .section-heading {\n    font-size: 28px;\n    margin: 40px 0 20px;\n  }\n  .page-title {\n    font-size: 118px;\n    text-shadow: 4px 4px #c92086;\n  }\n  .header {\n    padding: 20px 0 30px;\n    overflow: hidden;\n  }\n}\n@media only screen and (max-width: 480px) {\n  html {\n    font-size: 100%;\n  }\n}\n@keyframes loadingSpinner {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}", "",{"version":3,"sources":["webpack://./styles/common.sass","webpack://./styles/var.sass"],"names":[],"mappings":"AAGA;EACI,uBAAA;EACA,0BAAA;EACA,8BAAA;AADJ;;AAGA;EACI,4BAAA;EACA,WCVU;EDWV,eAAA;EACA,gBAAA;EACA,yBCZU;EDaV,SAAA;EACA,mCAAA;EACA,kCAAA;AAAJ;AACI;EACI,kBAAA;EACA,UAAA;EACA,qBAAA;AACR;;AAEA;EACI,6BAAA;EACA,qCAAA;AACJ;AAAI;EACI,gBAAA;AAER;;AAAA;EACE,SAAA;EACA,UAAA;EACA,sBAAA;AAGF;;AAAA;EACI,kBAAA;AAGJ;;AAAA;EACI,wBAAA;EACA,qBAAA;EACA,gBAAA;AAGJ;;AADA;EACI,gBAAA;EACA,aAAA;EACA,YAAA;EACA,6BAAA;AAIJ;;AADA;EACI,+BAAA;EACA,SAAA;AAIJ;;AADA;EACI,eAAA;EACA,gBAAA;EACA,cCzDW;ED0DX,4BAAA;EACA,SAAA;EACA,kBAAA;EACA,yBAAA;AAIJ;;AAFA;EACI,eAAA;EACA,gBAAA;EACA,cClEW;EDmEX,4BAAA;EACA,SAAA;EACA,kBAAA;EACA,yBAAA;AAKJ;AAJI;EACI,mCAAA;AAMR;;AAHA;EACI,mCAAA;EACA,eAAA;EACA,gBAAA;EACA,gBAAA;EACA,cChFW;EDiFX,4BAAA;EACA,mBAAA;EACA,kBAAA;EACA,yBAAA;AAMJ;;AAHA;EACI,mCAAA;EACA,eAAA;EACA,gBAAA;EACA,gBAAA;EACA,cC5FW;ED6FX,4BAAA;EACA,mBAAA;EACA,kBAAA;EACA,yBAAA;AAMJ;;AAHA;EACI,gBAAA;EACA,cAAA;EACA,gBAAA;EACA,cCvGW;EDwGX,4BAAA;EACA,kBAAA;EACA,yBAAA;EACA,mBAAA;AAMJ;;AAHA;EACI,mCAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,gBAAA;EACA,WCtHU;EDuHV,kBAAA;AAMJ;;AAHA;EACI,gBAAA;EACA,cAAA;AAMJ;;AAJA;EACI,gBAAA;AAOJ;;AALA;EACI,oBAAA;EACA,kBAAA;AAQJ;;AALA;EACI,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,gBAAA;EACA,kBAAA;EACA,cCpIS;EDqIT,SAAA;AAQJ;;AALA;EACI;IACI,eAAA;EAQN;EANE;IACI,eAAA;EAQN;EANE;IACI,eAAA;IACA,mBAAA;EAQN;EANE;IACI,gBAAA;IACA,4BAAA;EAQN;EANE;IACI,oBAAA;IACA,gBAAA;EAQN;AACF;AANA;EACI;IACI,eAAA;EAQN;AACF;AAPA;EACI;IACI,uBAAA;EASN;EARE;IACI,yBAAA;EAUN;AACF","sourcesContent":["@import \"https://fonts.googleapis.com/css?family=Lato:400,400i|Source+Sans+Pro|Sriracha&display=swap\"\n@import \"./var.sass\"\n\nhtml\n    font-family: sans-serif\n    -ms-text-size-adjust: 100%\n    -webkit-text-size-adjust: 100%\n\nbody\n    font-family: $font-primary, cursive\n    color: $color-body\n    font-size: 16px\n    line-height: 1.5\n    background-color: $color-black\n    margin: 0\n    -webkit-font-smoothing: antialiased\n    -moz-osx-font-smoothing: grayscale\n    main\n        position: relative\n        z-index: 2\n        padding-bottom: 100px\n\n\na\n    background-color: transparent\n    -webkit-text-decoration-skip: objects\n    &:active, &:hover\n        outline-width: 0\n\n* \n  margin: 0\n  padding: 0\n  box-sizing: border-box\n\n\n.text-center\n    text-align: center\n\n\nselect\n    -webkit-appearance: none\n    -moz-appearance: none\n    appearance: none\n\nbutton\n    box-shadow: none\n    outline: none\n    border: none\n    background-color: transparent\n\n\np\n    font-family: $font-primary, sans-serif\n    margin: 0\n\n\nh1\n    font-size: 46px\n    line-height: 1.2\n    color: $color-yellow\n    text-shadow: 3px 3px $color-pink\n    margin: 0\n    text-align: center\n    text-transform: uppercase\n    \n.heading\n    font-size: 46px\n    line-height: 1.2\n    color: $color-yellow\n    text-shadow: 3px 3px $color-pink\n    margin: 0\n    text-align: center\n    text-transform: uppercase\n    &.logo\n        font-family: $font-secondary, sans-serif\n\n\nh2\n    font-family: $font-secondary, sans-serif\n    font-size: 36px\n    line-height: 1.2\n    font-weight: 400\n    color: $color-yellow\n    text-shadow: 3px 3px $color-pink\n    margin: 40px 0 30px\n    text-align: center\n    text-transform: uppercase\n\n\n.section-heading\n    font-family: $font-secondary, sans-serif\n    font-size: 36px\n    line-height: 1.2\n    font-weight: 400\n    color: $color-yellow\n    text-shadow: 3px 3px $color-pink\n    margin: 40px 0 30px\n    text-align: center\n    text-transform: uppercase\n\n\n.page-title\n    font-size: 230px\n    line-height: 1\n    font-weight: 400\n    color: $color-yellow\n    text-shadow: 6px 6px $color-pink\n    text-align: center\n    text-transform: uppercase\n    margin-bottom: 26px\n\n\n.general-text\n    font-family: $font-secondary, sans-serif\n    font-style: italic\n    font-weight: 700\n    font-size: 21px\n    line-height: 1.2\n    color: $color-body\n    text-align: center\n\n\n.container\n    max-width: 988px\n    margin: 0 auto\n\n.container_half\n    max-width: 494px\n\n.header\n    padding: 50px 0 36px\n    position: relative\n\n\n.subheading\n    font-size: 21px\n    font-style: italic\n    font-weight: 500\n    line-height: 1.2\n    text-align: center\n    color: $color-grey\n    margin: 0\n\n\n@media all and (max-width: 767px)\n    h1, .heading\n        font-size: 32px\n\n    .subheading\n        font-size: 18px\n\n    h2, .section-heading\n        font-size: 28px\n        margin: 40px 0 20px\n\n    .page-title \n        font-size: 118px\n        text-shadow: 4px 4px $color-pink\n\n    .header\n        padding: 20px 0 30px\n        overflow: hidden\n\n\n@media only screen and (max-width: 480px)\n    html\n        font-size: 100%\n\n@keyframes loadingSpinner\n    from\n        transform: rotate(0deg)\n    to\n        transform: rotate(360deg)","$color-white: #fff\n$color-black: #1f1e19\n$color-yellow: #ecd41a\n$color-yellow-dark: #c8b416\n$color-pink: #c92086\n$color-black-light: #6e6a51\n$color-black-middle: #414036\n$color-black-dark: #2d2c25\n$color-grey: #b6b4a2\n$color-body: $color-white\n$carousel-height: 313px\n$card-height: 320px\n$font-primary: \"Lato\"\n$font-secondary: \"Sriracha\""],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles/ribbon-menu.sass":
/*!****************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles/ribbon-menu.sass ***!
  \****************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ribbon {\n  margin-bottom: 38px;\n  height: 50px;\n  overflow: hidden;\n  position: relative;\n}\n.ribbon__inner {\n  box-sizing: content-box;\n  display: flex;\n  flex-direction: row;\n  height: 100%;\n  scroll-behavior: smooth;\n  overflow-x: hidden;\n}\n.ribbon__arrow {\n  display: none;\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  bottom: 0;\n  width: 120px;\n  flex-direction: column;\n  justify-content: center;\n  cursor: pointer;\n}\n.ribbon__arrow.ribbon__arrow_left {\n  left: 0;\n  background: linear-gradient(90deg, #1f1e19 25%, #1f1e19 61%, rgba(31, 30, 25, 0) 100%);\n  padding-left: 14px;\n}\n.ribbon__arrow.ribbon__arrow_left img {\n  transform: rotate(180deg);\n}\n.ribbon__arrow.ribbon__arrow_right {\n  right: 0;\n  background: linear-gradient(90deg, rgba(31, 30, 25, 0) 25%, #1f1e19 61%, #1f1e19 100%);\n  text-align: right;\n  align-items: flex-end;\n  padding-right: 14px;\n}\n.ribbon__arrow.ribbon__arrow_visible {\n  display: flex;\n}\n.ribbon__arrow img {\n  width: 8px;\n}\n.ribbon__arrow:hover img {\n  opacity: 0.8;\n}\n.ribbon__item {\n  color: #fff;\n  background: #2d2c25;\n  padding: 13px 38px;\n  font-size: 21px;\n  font-style: italic;\n  line-height: 1.2;\n  font-weight: 500;\n  text-decoration: none;\n  white-space: nowrap;\n  border: none;\n  border-left: 1px solid #1f1e19;\n  cursor: pointer;\n  height: 50px;\n}\n.ribbon__item:first-child {\n  border-left: none;\n}\n.ribbon__item.ribbon__item_active, .ribbon__item .ribbon__item:hover {\n  background-color: #6e6a51;\n}\n\n@media all and (max-width: 767px) {\n  .ribbon {\n    margin-bottom: 0;\n  }\n  .ribbon__item {\n    font-size: 18px;\n    padding: 13px;\n  }\n  .ribbon__arrow {\n    display: none;\n  }\n  .ribbon__arrow.ribbon__arrow_visible {\n    display: none;\n  }\n}", "",{"version":3,"sources":["webpack://./styles/ribbon-menu.sass","webpack://./styles/var.sass"],"names":[],"mappings":"AAEA;EACI,mBAAA;EACA,YAAA;EACA,gBAAA;EACA,kBAAA;AADJ;AAEI;EAGI,uBAAA;EACA,aAAA;EACA,mBAAA;EACA,YAAA;EACA,uBAAA;EACA,kBAAA;AAFR;AAGI;EACI,aAAA;EACA,kBAAA;EACA,UAAA;EACA,MAAA;EACA,SAAA;EACA,YAAA;EACA,sBAAA;EACA,uBAAA;EACA,eAAA;AADR;AAEQ;EACI,OAAA;EACA,sFAAA;EACA,kBAAA;AAAZ;AACY;EACI,yBAAA;AAChB;AAAQ;EACI,QAAA;EACA,sFAAA;EACA,iBAAA;EACA,qBAAA;EACA,mBAAA;AAEZ;AADQ;EACI,aAAA;AAGZ;AAFQ;EACI,UAAA;AAIZ;AAFY;EACI,YAAA;AAIhB;AAHI;EACI,WC9CM;ED+CN,mBCxCW;EDyCX,kBAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,gBAAA;EACA,qBAAA;EACA,mBAAA;EACA,YAAA;EACA,8BAAA;EACA,eAAA;EACA,YAAA;AAKR;AAJQ;EACI,iBAAA;AAMZ;AALQ;EACI,yBCzDQ;ADgEpB;;AALA;EACI;IACI,gBAAA;EAQN;EANE;IACI,eAAA;IACA,aAAA;EAQN;EANE;IACI,aAAA;EAQN;EANE;IACI,aAAA;EAQN;AACF","sourcesContent":["@import \"./var.sass\"\n\n.ribbon\n    margin-bottom: 38px\n    height: 50px\n    overflow: hidden\n    position: relative\n    &__inner\n        //padding-bottom: 15px\n        //margin-bottom: -15px\n        box-sizing: content-box\n        display: flex\n        flex-direction: row\n        height: 100%\n        scroll-behavior: smooth\n        overflow-x: hidden\n    &__arrow\n        display: none\n        position: absolute\n        z-index: 1\n        top: 0\n        bottom: 0\n        width: 120px\n        flex-direction: column\n        justify-content: center\n        cursor: pointer\n        &.ribbon__arrow_left \n            left: 0\n            background: linear-gradient(90deg, $color-black 25%, $color-black 61%, rgba(31, 30, 25, 0) 100%)\n            padding-left: 14px\n            img\n                transform: rotate(180deg)\n        &.ribbon__arrow_right\n            right: 0\n            background: linear-gradient(90deg,rgba(31, 30, 25, 0) 25%, $color-black 61%, $color-black 100%)\n            text-align: right\n            align-items: flex-end\n            padding-right: 14px\n        &.ribbon__arrow_visible\n            display: flex\n        img\n            width: 8px\n        &:hover\n            img\n                opacity: 0.8\n    &__item\n        color: $color-body\n        background: $color-black-dark\n        padding: 13px 38px\n        font-size: 21px\n        font-style: italic\n        line-height: 1.2\n        font-weight: 500\n        text-decoration: none\n        white-space: nowrap\n        border: none\n        border-left: 1px solid $color-black\n        cursor: pointer\n        height: 50px\n        &:first-child\n            border-left: none\n        &.ribbon__item_active, .ribbon__item:hover\n            background-color: $color-black-light\n\n@media all and (max-width: 767px)\n    .ribbon\n        margin-bottom: 0\n\n    .ribbon__item\n        font-size: 18px\n        padding: 13px\n\n    .ribbon__arrow\n        display: none\n\n    .ribbon__arrow.ribbon__arrow_visible\n        display: none\n\n","$color-white: #fff\n$color-black: #1f1e19\n$color-yellow: #ecd41a\n$color-yellow-dark: #c8b416\n$color-pink: #c92086\n$color-black-light: #6e6a51\n$color-black-middle: #414036\n$color-black-dark: #2d2c25\n$color-grey: #b6b4a2\n$color-body: $color-white\n$carousel-height: 313px\n$card-height: 320px\n$font-primary: \"Lato\"\n$font-secondary: \"Sriracha\""],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/***/ (function(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ (function(module) {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!*************************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*************************************************************/
/***/ (function(module) {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./styles/button.sass":
/*!****************************!*\
  !*** ./styles/button.sass ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_button_sass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./button.sass */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles/button.sass");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_button_sass__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_button_sass__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_button_sass__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_button_sass__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./styles/carousel.sass":
/*!******************************!*\
  !*** ./styles/carousel.sass ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_carousel_sass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./carousel.sass */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles/carousel.sass");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_carousel_sass__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_carousel_sass__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_carousel_sass__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_carousel_sass__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./styles/common.sass":
/*!****************************!*\
  !*** ./styles/common.sass ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_common_sass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./common.sass */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles/common.sass");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_common_sass__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_common_sass__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_common_sass__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_common_sass__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./styles/ribbon-menu.sass":
/*!*********************************!*\
  !*** ./styles/ribbon-menu.sass ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ribbon_menu_sass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./ribbon-menu.sass */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles/ribbon-menu.sass");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ribbon_menu_sass__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ribbon_menu_sass__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ribbon_menu_sass__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ribbon_menu_sass__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/***/ (function(module) {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!*********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*********************************************************************/
/***/ (function(module) {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!***********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***********************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!****************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \****************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!**********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**********************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./assets/images/icons/loader-icon-sm.svg":
/*!************************************************!*\
  !*** ./assets/images/icons/loader-icon-sm.svg ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8e7f8df68c7d46e0d85f.svg";

/***/ }),

/***/ "./assets/data/categories.json":
/*!*************************************!*\
  !*** ./assets/data/categories.json ***!
  \*************************************/
/***/ (function(module) {

module.exports = JSON.parse('[{"id":"","name":"All"},{"id":"salads","name":"Salads"},{"id":"soups","name":"Soups"},{"id":"chicken-dishes","name":"Chicken dishes"},{"id":"beef-dishes","name":"Beef dishes"},{"id":"seafood-dishes","name":"Seafood dishes"},{"id":"vegetable-dishes","name":"Vegetable dishes"},{"id":"bits-and-bites","name":"Bits and bites"},{"id":"on-the-side","name":"On the side"}]');

/***/ }),

/***/ "./assets/data/slides.json":
/*!*********************************!*\
  !*** ./assets/data/slides.json ***!
  \*********************************/
/***/ (function(module) {

module.exports = JSON.parse('[{"name":"Penang shrimp","price":16,"image":"penang_shrimp.png","id":"penang-shrimp"},{"name":"Chicken cashew","price":14,"image":"chicken_cashew.png","id":"chicken-cashew"},{"name":"Red curry veggies","price":12.5,"image":"red_curry_vega.png","id":"red-curry-veggies"},{"name":"Chicken springrolls","price":6.5,"image":"chicken_loempias.png","id":"chicken-springrolls"}]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_button_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/button.sass */ "./styles/button.sass");
/* harmony import */ var _styles_common_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/common.sass */ "./styles/common.sass");
/* harmony import */ var _modules_carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/carousel */ "./modules/carousel.ts");
/* harmony import */ var _assets_data_slides_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/data/slides.json */ "./assets/data/slides.json");
/* harmony import */ var _modules_ribbon_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/ribbon-menu */ "./modules/ribbon-menu.ts");
/* harmony import */ var _assets_data_categories_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/data/categories.json */ "./assets/data/categories.json");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }






var Main = /*#__PURE__*/function () {
  function Main(slides, categories) {
    _classCallCheck(this, Main);
    this.carousel = new _modules_carousel__WEBPACK_IMPORTED_MODULE_2__["default"](slides);
    this.ribbonMenu = new _modules_ribbon_menu__WEBPACK_IMPORTED_MODULE_4__["default"](categories);
    this.render();
  }
  _createClass(Main, [{
    key: "render",
    value: function render() {
      var carouselElem = this.carousel.getElem();
      var carouselContainer = document.querySelector("[data-carousel-holder]");
      carouselContainer.append(carouselElem);
      var ribbonMenu = this.ribbonMenu.getElem();
      var ribbonMenuContainer = document.querySelector("[data-ribbon-holder]");
      ribbonMenuContainer.append(ribbonMenu);
    }
  }]);
  return Main;
}();
new Main(_assets_data_slides_json__WEBPACK_IMPORTED_MODULE_3__, _assets_data_categories_json__WEBPACK_IMPORTED_MODULE_5__);
}();
/******/ })()
;
//# sourceMappingURL=main.0dbc7725c23e97c432b8.js.map