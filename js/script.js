//< " БАННЕР " >=============================================================================================================>//
function banner() {
  const bannerBody = document.querySelector(".banner");
  const bannerClose = document.querySelector(".banner__close");

  bannerClose.addEventListener("click", function () {
    bannerBody.style.display = "none";
  });
}
banner()

//< " МОБИЛЬНОЕ МЕНЮ БУРГЕР " >=============================================================================================================>//
function showMenu() {
  const menuBody = document.querySelector(".header-menu__body");
  const body = document.body;

  document.addEventListener("click", function (e) {
    const elementTarget = e.target;

    if (elementTarget.closest(".header-menu__icon") || elementTarget.closest(".header-menu__close")) {
      menuBody.classList.toggle("_active");
      body.classList.toggle("_lock-scroll");
    }

    if (!elementTarget.closest(".header-menu") && menuBody.classList.contains("_active")) {
      menuBody.classList.remove("_active");
      body.classList.remove("_lock-scroll");
    }

    if (window.innerWidth < 768.2 && elementTarget.closest(".header-menu__item")) {
      menuBody.classList.remove("_active");
      body.classList.remove("_lock-scroll");
    }
  });
}
showMenu()

//< " ДИНАМИЧЕСКИЙ АДАПТИВ " >=============================================================================================================>//
function myDinamicAdapt() {

  function DynamicAdapt(type) {
    this.type = type;
  }

  DynamicAdapt.prototype.init = function () {
    const _this = this;
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    this.nodes = document.querySelectorAll("[data-da]");

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    });

    for (let i = 0; i < this.mediaQueries.length; i++) {
      const media = this.mediaQueries[i];
      const mediaSplit = String.prototype.split.call(media, ',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
        return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
        _this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
    }
  };

  DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
    } else {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        if (оbject.element.classList.contains(this.daClassname)) {
          this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
      }
    }
  };

  DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
    }
    if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
  }

  DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
      parent.insertAdjacentElement('beforeend', element);
    }
  }

  DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  };

  DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return -1;
          }

          if (a.place === "last" || b.place === "first") {
            return 1;
          }

          return a.place - b.place;
        }

        return a.breakpoint - b.breakpoint;
      });
    } else {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return 1;
          }

          if (a.place === "last" || b.place === "first") {
            return -1;
          }

          return b.place - a.place;
        }

        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  };

  const da = new DynamicAdapt("max");
  da.init();
}
myDinamicAdapt()

/*

//< " КАСТОМНЫЙ СЕЛЕКТ " >=============================================================================================================>//
$(".select__button").click(function () {
  $(this).parent().toggleClass("_active");
})

$(".select__list li").click(function () {
  let currentele = $(this).html();
  $(".select__selected").html(currentele);
  $(this).parents(".select").removeClass("_active");
})

*/

/*

//< " ПОПАП " >=============================================================================================================>//
document.addEventListener("click", function popup(e) {
  const popupBody = document.querySelector('.popup__body');

  if (event.target.closest('.popup__open')) {
    popupBody.classList.add('_active');
    document.body.classList.add('_lock-scroll');
  }
  if (!event.target.closest('.popup')) {
    popupBody.classList.remove('_active');
    document.body.classList.remove('_lock-scroll');
  }
  if (event.target.closest('.popup__close')) {
    popupBody.classList.remove('_active');
    document.body.classList.remove('_lock-scroll');
  }
  document.addEventListener('keyup', function (e) {
    if (event.code === 'Escape') {
      popupBody.classList.remove('_active');
      document.body.classList.remove('_lock-scroll');
    }
  });
});

*/

/*

//< " ОПРЕДЕЛЕНИЕ ТИПА УСТРОЙСТВА " >=============================================================================================================>//
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    IOS: function () {
      return navigator.userAgent.match(/IPhone|IPad|IPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.IOS() ||
        isMobile.Opera() ||
        isMobile.Windows());
    }
  };

  */