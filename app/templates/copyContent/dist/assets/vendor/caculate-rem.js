!function(e){function t(){var e=o.getBoundingClientRect().width;e>540&&(e=540);var t=e/6.4;o.style.fontSize=t+"px"}var n,i=e.document,o=i.documentElement;e.addEventListener("resize",function(){clearTimeout(n),n=setTimeout(t,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(n),n=setTimeout(t,300))},!1),t()}(window);
//# sourceMappingURL=../../assets/vendor/caculate-rem.js.map