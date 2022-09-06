(function () { 
  const input = document.querySelector(".site-header__search-custom .search-header-custom .search-header__input");
  const container = document.querySelector(".site-header__search-custom .search-result-wrapper");
  const containerCollections = document.querySelector(
    ".site-header__search-custom .search-result-wrapper .search-collections .collection_container ul",
  );
  const containerProducts = document.querySelector(
    ".site-header__search-custom .search-result-wrapper .search-autocomplete-results",
  );
  const submit = document.querySelector(".site-header__search-custom .search-header-custom .search-header__submit");
  const inputMob = document.querySelector(".search-mobile .search-header__input");
  const containerMob = document.querySelector(".search-mobile .search-result-wrapper");
  const containerMobProducts = document.querySelector(
    ".search-mobile .search-result-wrapper .search-autocomplete-results",
  );
  const containerMobCollections = document.querySelector(".search-mobile .search-collections .collection_container ul");
  const submitMob = document.querySelector(".search-mobile .search-header__submit");
  // const productCarousel = document.querySelector('.search-mobile .product-search .product_container');

  input.addEventListener("input", (e) => {
    const input = e.target;

    searchAjax(input, container, submit, containerProducts);
    ajaxPredictiveSearch(input, containerCollections);
  });

  input.addEventListener("keydown", (event) => {
    const input = event.target;

    if (event.key === "Backspace" || event.key === "Delete") {
      searchAjax(input, container, submit, containerProducts);
      ajaxPredictiveSearch(input, containerCollections);
    }
  });

  inputMob.addEventListener("input", (e) => {
    //.log("target", e.target);
    const input = e.target;

    searchAjax(input, containerMob, submitMob, containerMobProducts);
    ajaxPredictiveSearch(input, containerMobCollections);
  });

  inputMob.addEventListener("keydown", (event) => {
    //console.log("target", event.target);
    const input = event.target;

    if (event.key === "Backspace" || event.key === "Delete") {
      ajaxPredictiveSearch(input, containerMobCollections);
      searchAjax(input, containerMob, submitMob, containerMobProducts);
    }
  });

  async function ajaxPredictiveSearch(searchInput, container) {
    //console.log("input", searchInput);
    const query = searchInput.value;
    //console.log("query", query);
    let response = await fetch(`/search/suggest.json?q=${query}&resources[type]=collection`);
    response = await response.json();

    container.innerHTML = "";
    // console.log("response", response);
    const collectionSuggestions = response.resources.results.collections;
    //console.log("suggestions", collectionSuggestions);
    // console.log(productSuggestions);

    const emptyContainer = document.querySelector(".emptyState");
    if (collectionSuggestions.length > 0) {
      collectionSuggestions.forEach((collection) => {
        console.log("blya");
        const collGrid = `<li class="collection__item">
                <a href=${collection.url} class="collection-title">${collection.title}</a>
              </li>`;
        container.innerHTML += collGrid;
      });
    } else {
      container.innerHTML = `<h3 class="emptyState">No results</h3>`;
    }
  }

  async function searchAjax(input, container, submit, containerProd) {
    const query = input.value.split(" ").join(" AND ");
    var template_suffix = "ajax";

    var url = `/search?q=${query}&view=${template_suffix}&type=product`;

    res = await fetch(url);
    res = await res.text();
    //console.log("res", res);
    containerProd.innerHTML = res;
    container.classList.add("active");
    const viewAll = document.querySelector(`#${submit.dataset.id} .result_footer a`);
    //console.log("view all", viewAll);
    if (viewAll) {
      viewAll.addEventListener("click", function (e) {
        e.preventDefault();
        submit.click();
      });
    }

    const body = document.querySelector("body");
    body.addEventListener("click", (e) => {
      container.addEventListener("click", (event) => {
        event.stopPropagation();
      });
      submit.addEventListener("click", (event) => {
        event.stopPropagation();
      });
      container.classList.remove("active");
    });

    $(".search-mobile .product-search .product_container").slick({
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 3,
    });
  }

  // 23/6/2021
  let pss = {};
  $(".js-ct-toggle-submenu").click(function (e) {
    $(this).next().slideToggle();
    $(this).toggleClass("ct-active");
  });
  $(".js-toggle-read").click(function (e) {
    if ($(this).data("type") == "less") {
      $(this).text($(this).data("more"));
      $(this).data("type", "more");
    } else {
      $(this).text($(this).data("less"));
      $(this).data("type", "less");
    }
    $(".js-layout-read .grid__item.small--hide").toggleClass("show-read");
  });

  $(".js-link-mb").click(function (e) {
    if ($(window).width() <= 749) {
      window.location.href = $(this).data("href");
    }
  });

  $(".grid-media .js-media-grid").click(function (e) {
    if ($(window).width() > 749) {
      $("body").addClass("fixed-body");
      $(".product-single").addClass("show-gallery-popup");
    }
  });
  $(".js-zoom-btn").click(function () {
    if ($(window).width() < 750) {
      $("body").addClass("fixed-body");
      $(".product-single").addClass("show-gallery-popup");
    }
  });

  $(".background-gallery .close").click(function (e) {
    $("body").removeClass("fixed-body");
    $(".product-single").removeClass("show-gallery-popup");
  });

  $(".vertical-main .product-single__media-wrapper").each(function () {
    pss[$(this).data("index")] = $(this).position().top;
  });

  $(window).resize(function () {
    let a = $(".vertical-main").scrollTop();
    $(".vertical-main").scrollTop(0);
    $(".vertical-main .product-single__media-wrapper").each(function () {
      pss[$(this).data("index")] = $(this).position().top;
    });
    $(".vertical-main").scrollTop(a);
  });
  if ($(".vertical-thumb .item").length > 0) {
    $(".vertical-thumb .item").on("click", function () {
      let dataIndex = $(this).data("index");
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
      $(".vertical-main").animate(
        {
          scrollTop: pss[dataIndex] - 100,
        },
        500,
      );
    });

    $(".vertical-main .media-image").each(function () {
      let domImg = $(this);
      domImg.zoom({
        on: "click",
        url: domImg.data("zoom"),
        onZoomIn: function () {
          domImg.addClass("zoom-in");
        },
        onZoomOut: function () {
          domImg.removeClass("zoom-in");
        },
      });
      domImg.mouseleave(function () {
        $(".vertical-main").click();
      });
    });
  }
  $(document).ready(function () {
    function a() {
      if ($(window).width() > 749) {
        if ($(".main-media, .vertical-main, .vertical-thumb, .media__thumbnails").hasClass("slick-initialized")) {
          $(".main-media, .vertical-main, .vertical-thumb, .media__thumbnails").unslick("unslick");
        }
      } else {
        if ($(".main-media").length) {
          $(".main-media").slick({
            slidesToShow: 1,
            asNavFor: ".media__thumbnails",
            arrows: true,
            dots: true,
            prevArrow: `<button class="slick-arrow slick-prev"><svg width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.6364 0.32572C11.1754 0.326195 11.7023 0.486402 12.1503 0.786112C12.5984 1.08582 12.9476 1.51159 13.1538 2.00963C13.36 2.50768 13.414 3.05567 13.309 3.5844C13.204 4.11312 12.9446 4.59886 12.5637 4.98027L7.21821 10.3257L12.5637 15.6712C13.0454 16.1882 13.3077 16.872 13.2952 17.5785C13.2827 18.2851 12.9965 18.9592 12.4968 19.4589C11.9972 19.9586 11.323 20.2448 10.6165 20.2573C9.90992 20.2697 9.22612 20.0075 8.70912 19.5257L1.43639 12.253C0.925663 11.7416 0.638792 11.0484 0.638792 10.3257C0.638792 9.60299 0.925663 8.90981 1.43639 8.39845L8.70912 1.12572C9.22009 0.614109 9.91332 0.326357 10.6364 0.32572Z" fill="#d72324"/>
                      </svg></button>`,
            nextArrow: `<button class="slick-arrow slick-next"><svg width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.36361 20.2577C2.82455 20.2572 2.29773 20.097 1.84967 19.7973C1.40162 19.4976 1.05242 19.0718 0.846201 18.5737C0.639978 18.0757 0.585973 17.5277 0.691007 16.999C0.796041 16.4703 1.0554 15.9845 1.43634 15.6031L6.78179 10.2577L1.43634 4.9122C0.95459 4.3952 0.692324 3.71139 0.70479 3.00484C0.717256 2.2983 1.00348 1.62417 1.50317 1.12448C2.00285 0.6248 2.67698 0.338575 3.38353 0.326108C4.09008 0.313642 4.77388 0.575908 5.29088 1.05765L12.5636 8.33038C13.0743 8.84175 13.3612 9.53492 13.3612 10.2577C13.3612 10.9804 13.0743 11.6736 12.5636 12.1849L5.29088 19.4577C4.77991 19.9693 4.08668 20.257 3.36361 20.2577Z" fill="#d72324"/>
                      </svg></button>`,
            appendDots: $(".grid-media"),
            infinite: false,
          });
          $(".media__thumbnails").slick({
            slidesToShow: 6.2,
            slidesToScroll: 1,
            focusOnSelect: true,
            asNavFor: ".main-media",
            arrows: false,
            dots: false,
            infinite: false,
          });
          // ===
          $(".vertical-main").slick({
            slidesToShow: 1,
            asNavFor: ".vertical-thumb",
            arrows: true,
            dots: true,
            prevArrow: `<button class="slick-arrow slick-prev"><svg width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.6364 0.32572C11.1754 0.326195 11.7023 0.486402 12.1503 0.786112C12.5984 1.08582 12.9476 1.51159 13.1538 2.00963C13.36 2.50768 13.414 3.05567 13.309 3.5844C13.204 4.11312 12.9446 4.59886 12.5637 4.98027L7.21821 10.3257L12.5637 15.6712C13.0454 16.1882 13.3077 16.872 13.2952 17.5785C13.2827 18.2851 12.9965 18.9592 12.4968 19.4589C11.9972 19.9586 11.323 20.2448 10.6165 20.2573C9.90992 20.2697 9.22612 20.0075 8.70912 19.5257L1.43639 12.253C0.925663 11.7416 0.638792 11.0484 0.638792 10.3257C0.638792 9.60299 0.925663 8.90981 1.43639 8.39845L8.70912 1.12572C9.22009 0.614109 9.91332 0.326357 10.6364 0.32572Z" fill="#d72324"/>
                      </svg></button>`,
            nextArrow: `<button class="slick-arrow slick-next"><svg width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.36361 20.2577C2.82455 20.2572 2.29773 20.097 1.84967 19.7973C1.40162 19.4976 1.05242 19.0718 0.846201 18.5737C0.639978 18.0757 0.585973 17.5277 0.691007 16.999C0.796041 16.4703 1.0554 15.9845 1.43634 15.6031L6.78179 10.2577L1.43634 4.9122C0.95459 4.3952 0.692324 3.71139 0.70479 3.00484C0.717256 2.2983 1.00348 1.62417 1.50317 1.12448C2.00285 0.6248 2.67698 0.338575 3.38353 0.326108C4.09008 0.313642 4.77388 0.575908 5.29088 1.05765L12.5636 8.33038C13.0743 8.84175 13.3612 9.53492 13.3612 10.2577C13.3612 10.9804 13.0743 11.6736 12.5636 12.1849L5.29088 19.4577C4.77991 19.9693 4.08668 20.257 3.36361 20.2577Z" fill="#d72324"/>
                      </svg></button>`,
            appendDots: $(".main-gallery"),
            infinite: false,
          });
          $(".vertical-thumb").slick({
            slidesToShow: 6.2,
            slidesToScroll: 1,
            focusOnSelect: true,
            asNavFor: ".vertical-main",
            arrows: false,
            infinite: false,
            dots: false,
          });
        }
      }
    }

    a();
    $(window).resize(function () {
      a();
    });
  });
})();

/*!
 * Javascript Cookie v1.5.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
!(function (e) {
  var o;
  if ("function" == typeof define && define.amd) define(["jquery"], e);
  else if ("object" == typeof exports) {
    try {
      o = require("jquery");
    } catch (e) {}
    module.exports = e(o);
  } else {
    var n = window.Cookies,
      r = (window.Cookies = e(window.jQuery));
    r.noConflict = function () {
      return (window.Cookies = n), r;
    };
  }
})(function (e) {
  var o = /\+/g;
  function n(e) {
    return c.raw ? e : encodeURIComponent(e);
  }
  function r(e, n) {
    var r = c.raw
      ? e
      : (function (e) {
          0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
          try {
            return (e = decodeURIComponent(e.replace(o, " "))), c.json ? JSON.parse(e) : e;
          } catch (e) {}
        })(e);
    return i(n) ? n(r) : r;
  }
  function t() {
    for (var e, o, n = 0, r = {}; n < arguments.length; n++) {
      o = arguments[n];
      for (e in o) r[e] = o[e];
    }
    return r;
  }
  function i(e) {
    return "[object Function]" === Object.prototype.toString.call(e);
  }
  var c = function (e, o, u) {
    if (arguments.length > 1 && !i(o)) {
      if ("number" == typeof (u = t(c.defaults, u)).expires) {
        var s = u.expires,
          f = (u.expires = new Date());
        f.setMilliseconds(f.getMilliseconds() + 864e5 * s);
      }
      return (document.cookie = [
        n(e),
        "=",
        ((a = o), n(c.json ? JSON.stringify(a) : String(a))),
        u.expires ? "; expires=" + u.expires.toUTCString() : "",
        u.path ? "; path=" + u.path : "",
        u.domain ? "; domain=" + u.domain : "",
        u.secure ? "; secure" : "",
      ].join(""));
    }
    for (
      var a, d, p = e ? void 0 : {}, l = document.cookie ? document.cookie.split("; ") : [], m = 0, v = l.length;
      m < v;
      m++
    ) {
      var g = l[m].split("="),
        w = ((d = g.shift()), c.raw ? d : decodeURIComponent(d)),
        j = g.join("=");
      if (e === w) {
        p = r(j, o);
        break;
      }
      e || void 0 === (j = r(j)) || (p[w] = j);
    }
    return p;
  };
  return (
    (c.get = c.set = c),
    (c.defaults = {}),
    (c.remove = function (e, o) {
      return c(e, "", t(o, { expires: -1 })), !c(e);
    }),
    e && ((e.cookie = c), (e.removeCookie = c.remove)),
    c
  );
});

function addToCartSuccess(jqXHR, textStatus, errorThrown) {
  Shopify.getCart(function (cart) {
    Shopify.updateCartInfo(cart, ".cart-info .cart-content");
  });

  !$(".cart-sb.opened").length && jQuery(".cart-sb").addClass("opened");
  !$("body.cart-opened").length && jQuery("body").addClass("cart-opened");
}

var AT_Main = {
  init_handle: function () {
    $(document)
      .on("click", function (e) {
        if ($(".cart-sb .cart-item--content.qty-active").length) {
          if ($(e.target).closest(".qty-wrapper").length) {
            return;
          }
          $(".cart-sb .cart-item--content.qty-active").removeClass("qty-active");
        }
      })
      .on("click", ".cart-sb .input-cart-qty[readonly]", (e) => {
        let _this = $(e.currentTarget);
        $(".cart-sb .cart-item--content.qty-active").removeClass("qty-active");
        _this.closest(".cart-item--content").addClass("qty-active");
      });

    jQuery(".cart-sb .c-close").on("click", function () {
      if (jQuery(".cart-sb").hasClass("opened") || jQuery("html,body").hasClass("cart-opened")) {
        jQuery(".cart-sb").removeClass("opened");
        jQuery("html,body").removeClass("cart-opened");
      }
    });
  },
  _requestAjax: (data = {}, type = "POST", url = _bc_config.cart_change_url + ".js", dataType = "json") => {
    return $.ajax({
      type: type,
      url: url,
      data: data,
      dataType: dataType,
    });
  },
  search_menu_mobile: function () {
    jQuery(".menu-mobile-title .menu-mobile-search").on("click", function () {
      if (jQuery(".menu-search-content").hasClass("search-opened")) {
        jQuery(".mobile-nav-wrapper .menu-search-content").removeClass("search-opened");
      } else {
        jQuery(".mobile-nav-wrapper .menu-search-content").addClass("search-opened");
      }
    });
  },

  init: function () {
    this.init_handle();
    this.search_menu_mobile();
  },
};

jQuery(document).ready(function ($) {
  AT_Main.init();
});
