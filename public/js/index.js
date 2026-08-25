const sollusHeaderHide = {
  lastY: 0,
  hideDelta: 0,
  bound: false,
  readY() {
    const inner = document.querySelector(".body-inner");
    if (
      inner &&
      window.innerWidth <= 767 &&
      getComputedStyle(document.body).position === "fixed"
    ) {
      return inner.scrollTop || 0;
    }
    return window.scrollY || document.documentElement.scrollTop || 0;
  },
  apply(y) {
    const header = document.querySelector(".header");
    if (!header) return;
    const scrollY = Number.isFinite(y) ? y : this.readY();
    if (window.innerWidth > 991 || header.classList.contains("on-open-nav")) {
      header.classList.remove("on-hide");
      this.lastY = scrollY;
      this.hideDelta = 0;
      return;
    }
    const headerH = header.offsetHeight || 56;
    if (scrollY <= Math.max(8, headerH * 0.15)) {
      header.classList.remove("on-hide");
      this.lastY = scrollY;
      this.hideDelta = 0;
      return;
    }
    const delta = scrollY - this.lastY;
    this.lastY = scrollY;
    if (delta === 0) return;
    if (delta > 0) {
      this.hideDelta = Math.max(0, this.hideDelta) + delta;
      if (this.hideDelta > 10 && scrollY > headerH) {
        header.classList.add("on-hide");
        this.hideDelta = 0;
      }
    } else {
      this.hideDelta = Math.min(0, this.hideDelta) + delta;
      if (this.hideDelta < -8) {
        header.classList.remove("on-hide");
        this.hideDelta = 0;
      }
    }
  },
  onScroll() {
    this.apply(this.readY());
  },
  bind() {
    if (this.bound) return;
    this.bound = true;
    const onScroll = () => this.onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const attachInner = () => {
      const inner = document.querySelector(".body-inner");
      if (inner && inner.dataset.sollusHeaderHide !== "1") {
        inner.dataset.sollusHeaderHide = "1";
        inner.addEventListener("scroll", onScroll, { passive: true });
      }
    };
    attachInner();
    if (!document.querySelector(".body-inner")) {
      const obs = new MutationObserver(() => {
        attachInner();
        if (document.querySelector(".body-inner")) obs.disconnect();
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
    }
  },
};

const script = () => {
    $.easing.exponentialEaseOut = function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
    };
    $.fn.hasAttr = function (name) {
        return this.attr(name) !== undefined;
    };
    $.fn.select = function (name) {
        return this.find(name).get(0);
    };
    $.fn.selectAll = function (name) {
        return this.find(name);
    };
    barba.use(barbaPrefetch);

    gsap.registerPlugin(ScrollTrigger, SplitText);
    if (window.innerWidth <= 767) {
        ScrollTrigger.defaults({
      scroller: ".body-inner",
        });
    }
    const viewport = {
        w: window.innerWidth,
        h: window.innerHeight,
    };
  const device = { desktop: 991, tablet: 767, mobile: 479 };
    const cvUnit = (val, unit) => {
        let result;
        switch (true) {
      case unit === "vw":
                result = window.innerWidth * (val / 100);
                break;
      case unit === "vh":
                result = window.innerHeight * (val / 100);
                break;
      case unit === "rem":
        result = (val / 10) * parseFloat($("html").css("font-size"));
                break;
      default:
        break;
        }
        return result;
  };
    const debounce = (func, timeout = 300) => {
    let timer;

        return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };
    function reinitializeWebflow(data) {
        if (!window.Webflow) return;
    console.log("reinitializeWebflow");

		try {
			window.Webflow.destroy();
			window.Webflow.ready();
			const ix2 = window.Webflow.require("ix2");
			if (ix2 && typeof ix2.init === "function") {
				ix2.init();
			}
			const forms = window.Webflow.require("forms");
			if (forms && typeof forms.ready === "function") {
				forms.ready();
			}
			["slider", "tabs", "dropdown", "navbar"].forEach((module) => {
				try {
					const mod = window.Webflow.require(module);
					if (mod && typeof mod.ready === "function") {
						mod.ready();
					}
				} catch (e) {}
			});
			if (window.Webflow.redraw) {
				window.Webflow.redraw.up();
        }

        if (data) {
            let parser = new DOMParser();
            let dom = parser.parseFromString(data.next.html, "text/html");
            let webflowPageId = $(dom).find("html").attr("data-wf-page");
            $("html").attr("data-wf-page", webflowPageId);
        }
		} catch (e) {
			console.warn("Webflow reinit failed:", e);
		}
    }
    const lerp = (a, b, t) => (1 - t) * a + t * b;
    const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
    const normalize = (mousePos, maxDis) => (mousePos / maxDis - 0.5) * 2;
    const childSelect = (parent) => {
    return (child) => (child ? $(parent).find(child) : parent);
  };
  const isInViewport = (el, orientation = "vertical") => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
    if (orientation == "horizontal") {
      return rect.left <= window.innerWidth && rect.right >= 0;
        } else {
      return rect.top <= window.innerHeight && rect.bottom >= 0;
        }
  };
    const getAllScrollTrigger = (fn) => {
        let triggers = ScrollTrigger.getAll();
    triggers.forEach((trigger) => {
            trigger[fn]();
        });
  };
  const xSetter = (el) => gsap.quickSetter(el, "x", "px");
  const ySetter = (el) => gsap.quickSetter(el, "y", "px");
  const xGetter = (el) => gsap.getProperty(el, "x");
  const yGetter = (el) => gsap.getProperty(el, "y");
    const documentHeightObserver = (action, data, callback) => {
        let resizeObserver;
        let debounceTimer;
        let observerEl = document.documentElement;
        let previousHeight = observerEl?.scrollHeight;

        function onRefresh() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const currentHeight = observerEl.scrollHeight;

                if (currentHeight !== previousHeight) {
                    if (smoothScroll.lenis) {
                        smoothScroll.lenis.resize();
            ScrollTrigger.getAll().forEach((trigger) => {
                            if (trigger.progress === 0) {
                                trigger.refresh();
                            }
                        });
                    }
                    if (callback) {
                        callback();
                    }
                    previousHeight = currentHeight;
                }
            }, 200);
        }

        if (action === "init") {
            if (!observerEl) return;
            resizeObserver = new ResizeObserver(onRefresh);
            resizeObserver.observe(observerEl);
        } else if (action === "disconnect") {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        }
    };
  function ecosystemHubScrollY() {
    const wrap = document.querySelector("#ecosystem");
    if (!wrap) return 0;
    const empty = wrap.querySelector(".home-yacth-empty-block");
    const slide = wrap.querySelector(".home-yacth-main-slide");
    const intro = empty ? empty.offsetHeight : window.innerHeight;
    const slideH = slide ? slide.offsetHeight : window.innerHeight;
    let wrapTop = 0;
    for (let n = wrap; n; n = n.offsetParent) wrapTop += n.offsetTop;
    return Math.max(0, Math.round(wrapTop + intro + slideH + 24));
  }
  function scrollToEcosystemHub() {
    const y = ecosystemHubScrollY();
    const finish = () => {
      hideMobileHeader();
      revealEcosystemHub();
    };
    if (smoothScroll.lenis) {
      smoothScroll.start();
      smoothScroll.lenis.scrollTo(y, {
        duration: 1.35,
        force: true,
        lock: true,
        onComplete: finish,
      });
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
      finish();
    }
  }
  function navScrollOffset(el) {
    const id = typeof el === "string" ? el.replace(/^#/, "") : el && el.id;
    const isMobileNav = window.innerWidth <= 991;
    if (id === "ecosystem") return 0;
    if (isMobileNav) return 0;
    const bar = document.querySelector(".glass-nav-bar");
    return bar ? -(bar.getBoundingClientRect().bottom + 12) : -80;
  }
  function revealEcosystemHub() {
    const wrap = document.querySelector("#ecosystem");
    if (!wrap) return;
    const first = wrap.querySelector(".home-yacth-main-slide-item");
    if (!first) return;
    wrap
      .querySelectorAll(
        ".home-yacth-main-slide-text, .home-yacth-main-slide-gallery, .home-yacth-main-slide-thumb",
      )
      .forEach((el) => el.classList.remove("active"));
    first.querySelector(".home-yacth-main-slide-text")?.classList.add("active");
    first
      .querySelector(".home-yacth-main-slide-gallery")
      ?.classList.add("active");
    first
      .querySelector(".home-yacth-main-slide-thumb")
      ?.classList.add("active");
    wrap.querySelectorAll(".home-yacth-main-bar-item").forEach((el, i) => {
      el.classList.toggle("active", i === 0);
    });
  }
  function hideMobileHeader() {
    if (window.innerWidth > 991) return;
    const header = document.querySelector(".header");
    if (!header || header.classList.contains("on-open-nav")) return;
    header.classList.add("on-hide");
    sollusHeaderHide.lastY = sollusHeaderHide.readY();
    sollusHeaderHide.hideDelta = 0;
  }
  function scrollToPageSection(target, { duration = 1.15 } = {}) {
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return false;
    hideMobileHeader();
    const finish = () => {
      hideMobileHeader();
      if (el.id === "ecosystem") revealEcosystemHub();
    };
    if (smoothScroll.lenis) {
      if (el.id === "ecosystem") {
        smoothScroll.lenis.scrollTo(ecosystemHubScrollY(), {
          duration,
          force: true,
          onComplete: finish,
        });
      } else {
        smoothScroll.lenis.scrollTo(el, {
          offset: navScrollOffset(el),
          duration,
          force: true,
          onComplete: finish,
        });
      }
    } else {
      if (el.id === "ecosystem") {
        window.scrollTo({ top: ecosystemHubScrollY(), behavior: "smooth" });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      finish();
    }
    return true;
  }
    function resetScroll(data) {
    if (window.location.hash !== "") {
            if ($(window.location.hash).length >= 1) {
                setTimeout(() => {
          if (window.location.hash === "#ecosystem") {
            scrollToEcosystemHub();
            } else {
            scrollToPageSection(window.location.hash);
          }
        }, 80);
      } else {
        scrollTop();
      }
    } else if (window.location.search !== "") {
      let searchObj = JSON.parse(
        '{"' +
          decodeURI(location.search.substring(1))
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}',
      );
            if (searchObj.sc) {
                if ($(`#${searchObj.sc}`).length >= 1) {
                    let target = `#${searchObj.sc}`;
                    setTimeout(() => {
                        smoothScroll.lenis.scrollTo(`#${searchObj.sc}`, {
              offset: -100,
            });
                    }, 500);
          barba.history.add(
            `${window.location.pathname + target}`,
            "barba",
            "replace",
          );
                } else {
          scrollTop();
                }
            }
        } else {
      scrollTop();
        }
    }
    function scrollTop(onComplete) {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
        }
        window.scrollTo(0, 0);
        smoothScroll.lenis.scrollTo("top", {
      duration: 0.0001,
      lock: true,
            onComplete: () => {
                onComplete?.();
                getAllScrollTrigger("refresh");
      },
        });
    }
    const formSubmitEvent = (function () {
    const init = ({ onlyWorkOnThisFormName, onSuccess, onFail }) => {
      let inputSubmit = $(
        `#${getIDFormName(onlyWorkOnThisFormName)} .input-submit-wrap .txt`,
      );

      $(document).on("ajaxSend", function (event, xhr, settings) {
                if (settings.url.includes("https://webflow.com/api/v1/form/")) {
          inputSubmit.text("Please wait...");
                }
            });
      $(document).on("ajaxComplete", function (event, xhr, settings) {
                if (settings.url.includes("https://webflow.com/api/v1/form/")) {
          const isSuccessful = xhr.status === 200;
          const isWorkOnAllForm = onlyWorkOnThisFormName == undefined;
          const isCorrectForm =
            !isWorkOnAllForm &&
            settings.data.includes(
              getSanitizedFormName(onlyWorkOnThisFormName),
            );

                    if (isWorkOnAllForm) {
                        if (isSuccessful) {
              onSuccess?.();
              inputSubmit.text("Sent");
                        } else {
              onFail?.();
                        }
                    } else if (isCorrectForm) {
                        if (isSuccessful) {
              onSuccess?.();
              inputSubmit.text("Sent");
                        } else {
              onFail?.();
                        }
                    }
                }
            });
    };
        function getIDFormName(name) {
            return name.toLowerCase().replaceAll(" ", "-");
        }
        function getSanitizedFormName(name) {
      return name.replaceAll(" ", "+");
        }
        return {
      init,
    };
    })();
    const GTMHandle = {
        init() {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
        event: "gtm.js",
        "gtm.start": new Date().getTime(),
            });
            this.pageView();
        },
        pageView() {
            window.dataLayer.push({
        event: "pageview",
                page_path: window.location.pathname + window.location.search,
                page_title: document.title,
                page_location: window.location.href,
        page_hash: window.location.hash,
            });
    },
  };

    class Mouse {
        constructor() {
      this.mousePos = { x: 0, y: 0 };
      this.cacheMousePos = { ...this.mousePos };
      this.lastMousePos = { ...this.mousePos };
            this.normalizeMousePos = {
        current: { x: 0.5, y: 0.5 },
        target: { x: 0.5, y: 0.5 },
            };
            this.cursorRaf = null;
            this.init();

            // Add mouse move event listener
      window.addEventListener("mousemove", (e) => {
                this.mousePos = this.getPointerPos(e);
            });
      window.addEventListener("touchmove", () => {
                this.mousePos = this.getPointerPos(e);
            });
        }

        init() {
            if (viewport.w > 991) {
                requestAnimationFrame(this.update.bind(this));
            }
        }

        update() {
            this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
            this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

            this.normalizeMousePos.target.x = this.mousePos.x / window.innerWidth;
            this.normalizeMousePos.target.y = this.mousePos.y / window.innerHeight;
            if (!this.cursorRaf) {
                this.cursorRaf = requestAnimationFrame(this.lerpCursorPos.bind(this));
            }
            this.toggleCursor();
            requestAnimationFrame(this.update.bind(this));
        }

        getPointerPos(ev) {
            if (ev.touches) {
                return {
                    x: ev.touches[0].clientX,
          y: ev.touches[0].clientY,
                };
            }
            return {
                x: ev.clientX,
        y: ev.clientY,
            };
        }

        lerpCursorPos = () => {
      this.normalizeMousePos.current.x = lerp(
        this.normalizeMousePos.current.x,
        this.normalizeMousePos.target.x,
        0.1,
      );
      this.normalizeMousePos.current.y = lerp(
        this.normalizeMousePos.current.y,
        this.normalizeMousePos.target.y,
        0.1,
      );

            const delta = distance(
                this.normalizeMousePos.target.x,
                this.normalizeMousePos.current.x,
                this.normalizeMousePos.target.y,
        this.normalizeMousePos.current.y,
            );

            if (delta < 0.001 && this.cursorRaf) {
                cancelAnimationFrame(this.cursorRaf);
                this.cursorRaf = null;
                this.resetCursor();
                return;
      } else {
                this.cursorRaf = requestAnimationFrame(this.lerpCursorPos.bind(this));
                this.toggleCursor();
            }
    };

        reachedThreshold(threshold) {
            if (!threshold) return false;
      const dist = distance(
        this.mousePos.x,
        this.mousePos.y,
        this.lastMousePos.x,
        this.lastMousePos.y,
      );
            if (dist > threshold) {
                this.lastMousePos = { ...this.mousePos };
                return true;
            }
            return false;
        }
        toggleCursor() {
      const hoverElements = $("[data-cursor]:hover");
      const cursor = $(".cursor-main");

            if (hoverElements.length) {
                xSetter(cursor)(this.normalizeMousePos.current.x * window.innerWidth);
                ySetter(cursor)(this.normalizeMousePos.current.y * window.innerHeight);

                // Get the last hovered element's cursor type (topmost element)
        const type = $(hoverElements[hoverElements.length - 1]).attr(
          "data-cursor",
        );
                switch (type) {
          case "drag":
                        // Add drag cursor styling
            cursor.removeClass("hidden");
            $(".cursor-drag").addClass("active");
                        break;
          case "hidden":
            cursor.addClass("hidden");
                        break;
                    default:
                        // Reset cursor to default
            cursor.removeClass("hidden");
            $(".cursor-drag").removeClass("active");
                        break;
                }
      } else {
                this.resetCursor();
            }
        }

        resetCursor() {
            // Reset cursor styles
      $(".cursor-drag").removeClass("active");
        }
    }
    const mouse = new Mouse();

    class SmoothScroll {
        constructor() {
            this.lenis = null;
            this.scroller = {
                scrollX: window.scrollX,
                scrollY: window.scrollY,
                velocity: 0,
        direction: 0,
      };

            this.lastScroller = {
                scrollX: window.scrollX,
                scrollY: window.scrollY,
                velocity: 0,
        direction: 0,
      };
        }
        init(data) {
            this.reInit(data);
            gsap.ticker.add((time) => {
                if (this.lenis) {
                    this.lenis.raf(time * 1000);
                }
            });
            gsap.ticker.lagSmoothing(0);
        }
        reInit(data) {
      let namespace = data
        ? data.next.namespace
        : $('[data-barba="container"]').attr("data-barba-namespace");
            this.lenis = new Lenis({
                content:
          viewport.w > 767
            ? document.documentElement
            : document.querySelector(".main"),
                wrapper:
          viewport.w > 767
            ? document.documentElement
            : document.querySelector(".body-inner"),
                smoothTouch: false,
                infinite: false,
      });
      this.lenis.on("scroll", ScrollTrigger.update);

      this.lenis.on("scroll", (e) => {
                this.updateOnScroll(e);
            });
        }
        toggleInfinite() {
      if (this.lenis) {
        this.lenis.options.infinite = false;
            }
        }
        start() {
            this.lenis.start();
      $(".body").css("overflow", "initial");
        }
        stop() {
            this.lenis.stop();
      $(".body").css("overflow", "hidden");
        }
        destroy() {
            gsap.ticker.remove((time) => {
                this.lenis.raf(time * 1000);
            });
            this.lenis.destroy();
            this.lenis = null;
        }
        reachedThreshold(threshold) {
            if (!threshold) return false;
      const dist = distance(
        this.scroller.scrollX,
        this.scroller.scrollY,
        this.lastScroller.scrollX,
        this.lastScroller.scrollY,
      );

            if (dist > threshold) {
        this.lastScroller = { ...this.scroller };
                return true;
            }
        }
        updateOnScroll = (e) => {
      this.scroller.scrollX = e.scroll;
      this.scroller.scrollY = e.scroll;

      this.scroller.velocity = e.velocity * 0.2;
            this.scroller.direction = e.direction;
            if (header) {
                header.updateOnScroll(smoothScroll.lenis);
      }
            };
    }
    const smoothScroll = new SmoothScroll();

    class Loader {
        constructor() {
      this.isLoaded =
        sessionStorage.getItem("isLoaded") === "true" ? true : false;
            this.tlLoadDone = null;
            this.tlLoadMaster = null;
        }
        init(data) {
      const $loader = $(".loader");
      const $count = $(".loader-count-num");
      const $fill = $(".loader-fill");
      const $wave = $(".loader-wave-path");
      const $mark = $(".loader-mark");
      const $core = $(".loader-core");
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const isHome = data.next.namespace === "home";

            this.tlLoading = gsap.timeline({
                    paused: true,
      });

      if ($loader.length) {
        gsap.set($loader, { autoAlpha: 1, pointerEvents: "auto" });
      }

      if (isHome) {
        const heroText = document.querySelector(".home-hero-text");
        const heroImg = document.querySelector(".home-hero-bg-item-inner img");
        const nav = document.querySelector(".header.glass-nav .glass-nav-bar");
        if (heroText) gsap.set(heroText, { autoAlpha: 0 });
        if (heroImg)
          gsap.set(heroImg, { scale: 1.22, transformOrigin: "50% 62%" });
        if (nav) gsap.set(nav, { autoAlpha: 0, y: -36 });
      }

      if (isHome && $loader.length && !reduceMotion) {
        const progress = { n: 0 };
        const waveEl = $wave.get(0);
        if (waveEl && typeof waveEl.getTotalLength === "function") {
          const len = waveEl.getTotalLength();
          gsap.set($wave, { strokeDasharray: len, strokeDashoffset: len });
        }
        gsap.set($fill, { scaleY: 0, transformOrigin: "50% 100%" });
        gsap.set($mark, { autoAlpha: 0, scale: 0.85 });
        gsap.set($loader, { clipPath: "circle(150% at 50% 46%)" });

                this.tlLoading
          .to($mark, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
          })
          .to(
            $fill,
            { scaleY: 1, duration: 1.85, ease: "power2.inOut" },
            "-=0.2",
          )
          .to(
            progress,
            {
              n: 100,
              duration: 1.85,
              ease: "power2.inOut",
              onUpdate: () => {
                const value = String(Math.round(progress.n)).padStart(2, "0");
                $count.text(value);
              },
            },
            "<",
          )
          .to(
            $wave,
            { strokeDashoffset: 0, duration: 1.65, ease: "power1.inOut" },
            "<",
          )
          .to(
            $core,
            { scale: 1.06, duration: 0.28, ease: "power2.out" },
            "+=0.08",
          )
          .to(
            $loader,
            {
              clipPath: "circle(0% at 50% 46%)",
              duration: 0.85,
              ease: "power3.in",
              onStart: () => this.oncePlay(data),
            },
            "-=0.05",
          )
          .to($loader, { autoAlpha: 0, duration: 0.2 }, "-=0.2");
      } else if ($loader.length) {
        this.tlLoading
          .to(".loader-fill", {
            scaleY: 1,
            transformOrigin: "50% 100%",
            duration: 0.35,
            ease: "power2.out",
          })
          .to(
            $loader,
            { autoAlpha: 0, duration: 0.4, ease: "power2.out" },
            "+=0.15",
          );
            }

            this.tlLoadMaster = gsap.timeline({
                paused: true,
                onStart: () => {
                    this.onceSetup(data);
                },
                onComplete: () => {
                    this.oncePlay(data);
          $(".loader").remove();
        },
      });
      this.tlLoadMaster.to(this.tlLoading, {
        duration: Math.max(this.tlLoading.totalDuration(), 0.35),
        progress: 1,
        ease: "none",
      });
        }
        play(data) {
            // requestAnimationFrame(() => {
            //     this.devMode(data);
            // })
            // return;
            this.tlLoadMaster.play();
        }
        devMode(data) {
            this.onceSetup(data);
            this.oncePlay(data);
      $(".loader").remove();
        }
        onceSetup(data) {
            globalHooks.triggerOnceSetup(data);
        }
        oncePlay(data) {
      if (this._didOncePlay) return;
      this._didOncePlay = true;
            globalHooks.triggerOncePlay(data);
      $(".loader").css("pointer-events", "none");
      sessionStorage.setItem("isLoaded", true);
            if (viewport.w > 767) {
        $(".body").css({
          overflow: "initial",
          position: "relative",
          "max-height": "none",
          inset: "auto",
        });
            }
        }
    }
    const loader = new Loader();

    class Marquee {
        constructor(list, duration = 40) {
            this.list = list;
            this.duration = duration;
        }
        setup(isReverse) {
            const cloneAmount = Math.ceil(viewport.w / this.list.width()) + 1;
            let itemClone = this.list.find('[data-marquee="item"]').clone();
            let itemWidth = this.list.find('[data-marquee="item"]').width();
      this.list.html("");
            new Array(cloneAmount).fill().forEach(() => {
        let html = itemClone.clone();
        html.css(
          "animation-duration",
          `${Math.ceil(itemWidth / this.duration)}s`,
        );
                if (isReverse) {
          html.css("animation-direction", "reverse");
                }
        html.addClass("anim-marquee");
                this.list.append(html);
            });
        }
    }

    class ParallaxImage {
    constructor({ el, scaleOffset = 0.3, direction = "vertical" }) {
            this.el = el;
            this.elWrap = null;
            this.scaleOffset = scaleOffset;
            this.direction = direction;
            this.init();
        }
        init() {
            this.elWrap = this.el.parentElement;
            this.setup();
        }
        setup() {
      gsap.set(this.el, { height: "120%" });
            this.scrub();
        }
        scrub() {
      let dist =
        this.direction === "vertical"
                ? this.el.offsetHeight - this.elWrap.offsetHeight
                : this.el.offsetWidth - this.elWrap.offsetWidth;

      let total =
        this.direction === "vertical"
                ? this.elWrap.getBoundingClientRect().height + window.innerHeight
                : this.elWrap.getBoundingClientRect().width + window.innerWidth;
      this.updateOnScroll(dist, total);
      smoothScroll.lenis.on("scroll", () => {
                this.updateOnScroll(dist, total);
            });
        }
        updateOnScroll(dist, total) {
            if (this.el && isInViewport(this.elWrap, this.direction)) {
        let percent =
          this.direction === "vertical"
                    ? this.elWrap.getBoundingClientRect().bottom / total
                    : this.elWrap.getBoundingClientRect().right / total;

        if (this.direction === "vertical") {
                    ySetter(this.el)(-dist * percent * 1.2);
                } else {
                    xSetter(this.el)(-dist * percent * 1.2);
                }

        gsap.set(this.el, { scale: 1 + percent * this.scaleOffset });
            }
        }
    }
    class GlobalChange {
        constructor() {
            this.namespace = null;
        }
        init(data) {
            this.namespace = data.next.namespace;
            GTMHandle.init();
            this.refreshOnBreakpoint();
            this.updateLink(data);
        }
        update(data) {
            this.updateLink(data);
            header.update(data);
        }
        updateLink(data) {
            $("a").each(function (index, link) {
        if (
          $(this).attr("data-sub-link") &&
          !$(this).attr("href").includes("#") &&
          !$(this).attr("href").includes("?sc=")
        ) {
          $(this).attr(
            "href",
            `${$(this).attr("href")}#${$(this).attr("data-sub-link")}`,
          );
          $(this).attr("data-barba-history", "replace");
        }

        const [urlPath, anchor] = $(this).attr("href").includes("#")
          ? $(this).attr("href").split("#")
          : $(this).attr("href").includes("?sc=")
            ? $(this).attr("href").split("?sc=")
            : [$(this).attr("href"), ""];

        $(this).toggleClass(
          "w--current",
          $(this).attr("href") ==
            `${window.location.pathname}${window.location.hash}`,
        );
                if (!anchor) {
                    return;
        } else {
          if (urlPath === `${window.location.pathname}` || urlPath === "") {
            $(this).attr("href", `${window.location.pathname}#${anchor}`);
          } else {
            $(this).attr("href", `${urlPath}?sc=${anchor}`);
                    }
                }
            });
      $("a").on("click", function (e) {
        if ($(this).attr("data-sub-link")) {
          barba.history.add(
            `${window.location.pathname + `#${$(this).attr("data-sub-link")}`}`,
            "barba",
            "replace",
          );

                    requestAnimationFrame(() => {
            setTimeout(
              () => {
                $(`#${$(this).attr("data-sub-link")}`).trigger("click");
              },
              $(this).hasClass("w--current") ? 0 : 1000,
            );

                        $("a").each(function (index, link) {
              $(link).toggleClass(
                "w--current",
                $(link).attr("href") ==
                  `${window.location.pathname}${window.location.hash}`,
              );
            });
          });
        }
      });
        }
        refreshOnBreakpoint() {
            const breakpoints = [479, 767, 991];
      const initialViewportWidth =
        viewport.w || document.documentElement.clientWidth;
      const breakpoint =
        breakpoints.find((bp) => initialViewportWidth < bp) ||
        breakpoints[breakpoints.length - 1];
      window.addEventListener(
        "resize",
        debounce(function () {
          const newViewportWidth =
            viewport.w || document.documentElement.clientWidth;
          if (
            (initialViewportWidth < breakpoint &&
              newViewportWidth >= breakpoint) ||
            (initialViewportWidth >= breakpoint &&
              newViewportWidth < breakpoint)
          ) {
                    location.reload();
                }
        }),
      );
        }
    }
    const globalChange = new GlobalChange();

    class GlobalHooks {
    constructor() {}
        triggerEvent(eventName, data) {
            const event = new CustomEvent(eventName, { detail: data });
            data.next.container.dispatchEvent(event);
        }
        triggerOnceSetup(data) {
      console.log("Global Hooks: onceSetup");
            this.triggerEvent("onceSetup", data);
        }
        triggerOncePlay(data) {
      console.log("Global Hooks: oncePlay");
            this.triggerEvent("oncePlay", data);
      requestAnimationFrame(
        () => window.scrollY === 0 && window.scrollTo(0, 1),
      );
        }
        triggerEnterSetup(data) {
      console.log("Global Hooks: enterSetup");
            this.triggerEvent("enterSetup", data);
      requestAnimationFrame(
        () => window.scrollY === 0 && window.scrollTo(0, 1),
      );
        }
        triggerEnterPlay(data) {
      console.log("Global Hooks: enterPlay");
            this.triggerEvent("enterPlay", data);
        }
    }
    const globalHooks = new GlobalHooks();

    class PageTrans {
        constructor() {
            this.tlLeave = null;
            this.tlEnter = null;
      this.el = document.querySelector(".trans");
        }
        leaveAnim(data) {
            this.tlLeave = gsap.timeline({
                onStart: () => {
                    this.updateBeforeTrans.bind(this)(data);
                },
                onComplete: () => {
                    this.updateAfterTrans.bind(this)(data);
        },
      });
      this.tlLeave.fromTo(
        data.current.container,
        { opacity: 1 },
        { duration: 0.6, opacity: 0 },
      );

            return this.tlLeave;
        }
        enterAnim(data) {
            this.tlEnter = gsap.timeline({
        delay: 0.5,
                onStart: () => {
                    this.enterSetup(data);
                    setTimeout(() => {
                        this.enterPlay(data);
                    }, 100);
                },
      });

      this.tlEnter.fromTo(
        data.next.container,
        { opacity: 0 },
        { duration: 0.6, opacity: 1, clearProps: "all" },
        0,
      );
            return this.tlEnter;
        }
        async play(data) {
            await pageTrans.leaveAnim(data).then(() => {
        pageTrans.enterAnim(data);
      });
        }
        enterSetup(data) {
            reinitializeWebflow(data);
            globalHooks.triggerEnterSetup(data);
        }
        enterPlay(data) {
            globalHooks.triggerEnterPlay(data);
        }
        updateBeforeTrans(data) {
      gsap.set(data.next.container, {
        opacity: 0,
        "pointer-events": "none",
        zIndex: 1,
      });
            smoothScroll.stop();
            smoothScroll.destroy();
      documentHeightObserver("disconnect");
            if (data.current.container) {
        $(data.current.container).css("z-index", 2);
            }
        }
        updateAfterTrans(data) {
      smoothScroll.reInit(data);
            scrollTop();
            resetScroll();
            smoothScroll.start();
            globalChange.update(data);

      documentHeightObserver("init", data);
            window.FinsweetAttributes.modules.list.restart();
            if (data.current.container) {
                data.current.container.remove();
            }
            GTMHandle.pageView();
        }
    }
    const pageTrans = new PageTrans();

    class TriggerSetup {
        constructor() {
            this.tlTrigger = null;
            this.once = true;
        }
        setTrigger(triggerEl, onTrigger) {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerEl,
          start: "clamp(top bottom+=50%)",
          end: "bottom top-=50%",
                    onEnter: () => {
                        if (this.once) {
                            this.once = false;
                            this.onTrigger();
                        }
                    },
                    onEnterBack: () => {
                        if (this.once) {
                            this.once = false;
                            onTrigger();
                        }
                    },
        },
      });
        }
        cleanTrigger() {
            if (this.isPlayed) {
                this.isPlayed = false;
            }
            if (!this.once) {
                this.once = true;
            }
            if (this.tlTrigger) {
                this.tlTrigger.kill();
                this.tlTrigger = null;
            }
        }
    }
    class Header {
        constructor() {
            this.el = null;
            this.isOpen = false;
      this.tlNav = null;
        }
        init(data) {
      this.el = document.querySelector(".header");
      this.bindSectionLinks();
            if (viewport.w <= 991) {
                this.toggleNav();
            }
        }
    bindSectionLinks() {
      const onSectionClick = (e) => {
        const link = e.target.closest?.("a[href*='#']");
        if (!link) return;
        const href = link.getAttribute("href") || "";
        if (href.startsWith("http") && !href.startsWith(window.location.origin))
          return;
        const hash = `#${href.split("#")[1] || ""}`.replace(/[?].*$/, "");
        if (hash.length < 2) return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === "function") {
          e.stopImmediatePropagation();
        }
        const go = () => {
          hideMobileHeader();
          if (hash === "#ecosystem") {
            scrollToEcosystemHub();
          } else {
            scrollToPageSection(target);
          }
          history.replaceState(null, "", hash);
        };
        if (this.isOpen) {
          this.close();
          requestAnimationFrame(() => requestAnimationFrame(go));
        } else {
          go();
        }
      };
      document.removeEventListener("click", this._onSectionClick, true);
      this._onSectionClick = onSectionClick;
      document.addEventListener("click", this._onSectionClick, true);
      $(document).off("click.sectionNav");
    }
        update(data) {
            this.updateMode(data);
        }
        updateOnScroll(inst) {
            this.toggleHide(inst);
            this.toggleScroll(inst);
        }
        toggleScroll(inst) {
            if (inst.scroll > $(this.el).height() * 1) {
                $(this.el).addClass("on-scroll");
      } else {
                $(this.el).removeClass("on-scroll");
      }
        }
        toggleHide(inst) {
      sollusHeaderHide.apply(
        Number.isFinite(inst?.scroll) ? inst.scroll : sollusHeaderHide.readY(),
      );
        }
        toggleNav() {
      $(this.el)
        .find(".header-ham")
        .off("click.kudanilNav")
        .on("click.kudanilNav", this.handleClick.bind(this));
      $(this.el)
        .find(".header-logo")
        .off("click.kudanilNavClose")
        .on("click.kudanilNavClose", () => this.close());
      $(window)
        .off("click.kudanilNavOutside")
        .on("click.kudanilNavOutside", (e) => {
          if (!$(e.target).closest(".header-ham, .mobile-nav").length) {
                        this.close();
          }
        });
        }
        handleClick(e) {
            e.preventDefault();
      e.stopPropagation();
            this.isOpen ? this.close() : this.open();
        }
        open() {
            if (this.isOpen) return;
      $(this.el).removeClass("on-hide");
      $(".header").addClass("on-open-nav");
      $(".header-ham").addClass("active").attr("aria-expanded", "true");
      $(".header-ham").attr("aria-label", "Close menu");
      $(".mobile-nav").attr("aria-hidden", "false");
            this.isOpen = true;
      if (viewport.w > 991) return;
      if (smoothScroll.lenis) smoothScroll.lenis.stop();
      this.playMobileNav();
        }
        close() {
            if (!this.isOpen) return;
      $(".header").removeClass("on-open-nav");
      $(".header-ham").removeClass("active").attr("aria-expanded", "false");
      $(".header-ham").attr("aria-label", "Open menu");
      $(".mobile-nav").attr("aria-hidden", "true");
            this.isOpen = false;
      if (this.tlNav) {
        this.tlNav.kill();
        this.tlNav = null;
      }
      if (viewport.w <= 991 && smoothScroll.lenis) {
        smoothScroll.lenis.start();
      }
    }
    playMobileNav() {
      const nodes = this.el.querySelectorAll(
        ".mobile-nav-kicker, .mobile-nav-link, .mobile-nav-cta, .mobile-nav-tagline",
      );
      if (!nodes.length) return;
      if (this.tlNav) this.tlNav.kill();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(nodes, { y: 0, autoAlpha: 1 });
        return;
      }
      gsap.set(nodes, { y: 36, autoAlpha: 0 });
      this.tlNav = gsap.to(nodes, {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.07,
        delay: 0.16,
        ease: "power3.out",
      });
        }
        updateMode(data) {
      $(this.el).removeClass("on-light on-dark on-mix");
      $(this.el).addClass(
        `on-${$(data.next.container).attr("data-header") || "light"}`,
      );
        }
    }
    const header = new Header();
    class Footer extends TriggerSetup {
        constructor() {
            super();
            this.el = null;
            this.tlOverlap = null;
        }
        trigger(data) {
      this.el = data.next.container.querySelector(".footer");
      if (!this.el) return;
            super.setTrigger(this.el, this.onTrigger.bind(this));
        }
        onTrigger() {
            this.animationReveal();
            this.animationScrub();
            this.interact();
        }
    animationReveal() {}
        animationScrub() {
      switch ($(this.el).attr("data-wf--footer--variant")) {
        case "overlap":
                    if (viewport.w <= 767) return;
                    this.tlOverlap = gsap.timeline({
                        scrollTrigger: {
                            trigger: this.el,
              start: "top top",
                            end: `bottom bottom`,
                            scrub: 1,
                            onToggle: (self) => {
                                if (self.isActive) {
                  gsap.set($(this.el).parent(), { backgroundColor: "#003357" });
                } else {
                  gsap.set($(this.el).parent(), { clearProps: "all" });
                }
              },
            },
          });
          gsap.set($(this.el), { "mask-size": "0% 0%" });
                    this.tlOverlap
            .fromTo(
              $(this.el),
              { "mask-size": "0% 0%" },
              { "mask-size": "800% 400%" },
              "<=0",
            )
            .fromTo(
              $(this.el).find(".footer-bg"),
              { autoAlpha: 0, y: cvUnit(20, "rem") },
              { autoAlpha: 0.5, y: 0 },
              "<=0.3",
            )
            .fromTo(
              $(this.el).find(".footer-cta"),
              { autoAlpha: 0, y: cvUnit(20, "rem") },
              { autoAlpha: 1, y: 0 },
              "<=0.2",
            )
            .fromTo(
              $(this.el).find(".footer-main"),
              { autoAlpha: 0, y: cvUnit(20, "rem") },
              { autoAlpha: 1, y: 0 },
              "<=0.2",
            )
            .fromTo(
              $(this.el).find(".footer-bot"),
              { autoAlpha: 0, y: cvUnit(20, "rem") },
              { autoAlpha: 1, y: 0 },
              "<=0.2",
            );
                    break;
        case "loop":
                    if (viewport.w <= 991) return;
                    this.tlOverlap = gsap.timeline({
                        scrollTrigger: {
                            trigger: this.el,
              start: `bottom-=${viewport.h * 0.5} bottom`,
                            end: `bottom+=${viewport.h} bottom`,
              scrub: 1,
            },
          });
                    this.tlOverlap
            .fromTo(
              $(this.el).find(".footer-loop-bg"),
              { autoAlpha: 0 },
              { autoAlpha: 1 },
            )
            .fromTo(
              $(this.el).find(".footer-content-inner"),
              { autoAlpha: 1, y: 0, scale: 1 },
              { autoAlpha: 0, y: 50, scale: 1.03 },
            );
                    break;
        default:
          break;
            }
        }
        interact() {
            new Marquee($(this.el).find('[data-marquee="list"]'), 40).setup();
      $(this.el)
        .find(".footer-marquee-item")
        .on("click", (e) => {
          $(this.el).find(".footer-zoom").addClass("active");
          let cloneEl = $(e.target).find("img").clone();
          $(this.el).find(".footer-zoom-img-inner").html("");
          $(this.el).find(".footer-zoom-img-inner").append(cloneEl);
          $(this.el)
            .find(".footer-zoom-txt .txt")
            .text($(e.target).find(".txt").text());
                smoothScroll.lenis.stop();
        });
      $(this.el)
        .find(".footer-zoom-close")
        .on("click", () => {
          $(this.el).find(".footer-zoom").removeClass("active");
                smoothScroll.lenis.start();
        });
        }
        destroy() {
            if (this.tlOverlap) {
                this.tlOverlap.kill();
            }
        }
    }

    const HomePage = {
        Hero: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
                this.tlOverlap = null;
            }
            setup(data, mode) {
        this.el = data.next.container.querySelector(".home-hero-wrap");
        if (mode === "once") {
                    this.setupOnce(data);
        } else if (mode === "enter") {
                    this.setupEnter(data);
        } else return;

                this.animationScrub();
            }
            setupOnce(data) {
        const $hero = $(this.el);
        const img = $hero.find(".home-hero-bg-item-inner img").get(0);
        const title = $hero.find(".home-hero-title .heading").get(0);
        const desc = $hero.find(".home-hero-desc .heading").get(0);
        const actions = $hero.find(".home-hero-actions").get(0);
        const nav =
          document.querySelector(".header.glass-nav .glass-nav-bar") ||
          document.querySelector(".header");
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

                this.tlOnce = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });

        if (reduceMotion) return;

        gsap.set($hero.find(".home-hero-bg-item"), { overflow: "hidden" });
        gsap.set($hero.find(".home-hero-text"), { autoAlpha: 0 });
        if (title) gsap.set(title, { overflow: "hidden" });
        if (desc) gsap.set(desc, { overflow: "hidden" });
        if (img) gsap.set(img, { scale: 1.22, transformOrigin: "50% 62%" });
        if (nav) gsap.set(nav, { autoAlpha: 0, y: -36 });

        const wordTargets = [];
        try {
          if (title && typeof SplitText !== "undefined") {
            this.splitTitle = SplitText.create(title, {
              type: "lines words",
              wordsClass: "word",
              mask: viewport.w <= 767 ? false : "lines",
            });
            if (this.splitTitle?.words?.length) {
              gsap.set(this.splitTitle.words, { yPercent: 130, autoAlpha: 0 });
              wordTargets.push({ words: this.splitTitle.words, stagger: 0.05 });
            }
          }
          if (desc && typeof SplitText !== "undefined") {
            this.splitDesc = SplitText.create(desc, {
              type: "lines words",
              wordsClass: "word",
              mask: "lines",
            });
            if (this.splitDesc?.words?.length) {
              gsap.set(this.splitDesc.words, { yPercent: 130, autoAlpha: 0 });
              wordTargets.push({ words: this.splitDesc.words, stagger: 0.025 });
            }
          }
        } catch (err) {
          this.splitTitle = null;
          this.splitDesc = null;
        }

        this.tlOnce.set($hero.find(".home-hero-text"), { autoAlpha: 1 }, 0);

        if (!wordTargets.length) {
          const text = $hero.find(".home-hero-text").get(0);
          if (text) gsap.set(text, { autoAlpha: 0, y: 36 });
          this.tlOnce.to(
            text,
            { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" },
            0.15,
          );
        } else {
          if (actions) gsap.set(actions, { autoAlpha: 0, y: 20 });
          wordTargets.forEach((item, i) => {
            this.tlOnce.to(
              item.words,
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 1.05,
                stagger: item.stagger,
                ease: "power3.out",
              },
              i === 0 ? 0.05 : 0.32,
            );
          });
          if (actions) {
            this.tlOnce.to(
              actions,
              { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" },
              0.68,
            );
          }
        }

        if (img) {
          this.tlOnce.to(
            img,
            { scale: 1, duration: 1.7, ease: "power2.out" },
            0,
          );
        }
        if (nav) {
          this.tlOnce.to(
            nav,
            { autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out" },
            0.08,
          );
        }
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });

                this.tlTriggerEnter = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
            start: "top bottom+=50%",
            end: "bottom top-=50%",
                        once: true,
                        onEnter: () => this.tlEnter.play(),
                        onEnterBack: () => this.tlEnter.play(),
            onStart: () =>
              $("[data-init-hidden]").removeAttr("data-init-hidden"),
          },
        });

                // this.animationReveal(this.tlEnter);
            }
            playOnce() {
        if (this.tlOnce) this.tlOnce.play();
            }
            playEnter() {
                // if (isInViewport(this.el)) {
                //     this.tlEnter.play();
                // }
            }
      animationReveal(timeline) {}
            animationScrub() {
                this.tlOverlap = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
            start: "top top",
            end: "bottom 85%",
            scrub: true,
          },
        });
        gsap.set($(this.el).select(".home-hero-backdrop"), {
          backdropFilter: "blur(0px)",
        });
                this.tlOverlap
          .fromTo(
            $(this.el).select(".home-hero-backdrop"),
            { backdropFilter: "blur(0px)" },
            { backdropFilter: `blur(${cvUnit(16, "rem")}px)` },
          )
          .fromTo(
            $(this.el).select(".home-hero-bg-item-inner"),
            { scale: 1 },
            { scale: 1.02 },
            "<=0",
          )
          .fromTo(
            $(this.el).select(".home-hero-text"),
            { autoAlpha: 1, y: 0, scale: 1 },
            { autoAlpha: 0, y: -cvUnit(5, "rem"), scale: 0.96 },
            "<=.2",
          );
            }
            destroy() {
        if (this.splitTitle?.revert) this.splitTitle.revert();
        if (this.splitDesc?.revert) this.splitDesc.revert();
                if (this.tlOnce) {
                    this.tlOnce.kill();
                }
                if (this.tlEnter) {
                    this.tlEnter.kill();
                }
                if (this.tlTriggerEnter) {
                    this.tlTriggerEnter.kill();
                }
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
                }
            }
        },
        HeroClone: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlLoop = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".home-hero-clone-wrap");
        if (!this.el) return;
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.interact();
            }
      animationReveal() {}
            animationScrub() {
                if (viewport.w <= 991) return;
                this.tlOverlap = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
                        start: `top bottom`,
            end: "bottom bottom",
            scrub: true,
          },
        });

                this.tlOverlap
          .fromTo(
            $(this.el).select(".home-hero-clone-bg"),
            { scale: 1.1, transformOrigin: "top" },
            { scale: 1, transformOrigin: "top" },
          )
          .fromTo(
            $(this.el).select(".home-hero-clone-main"),
            { autoAlpha: 0, yPercent: -30, scale: 0.9 },
            { autoAlpha: 1, yPercent: 0, scale: 1 },
            "<=.2",
          );
      }
      interact() {}
            destroy() {
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
                }
            }
        },
        Gallery: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
                this.tlChangeBG = null;
                this.tlShowText = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".home-gallery-wrap");
        if (!this.el || this.el.hidden) return;
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
                this.interact();
            }
      animationReveal() {}
            animationScrub() {
                this.tlFlipCard = gsap.timeline({
                    scrollTrigger: {
            trigger: $(this.el).select(".home-gallery"),
            start: "top-=10px bottom",
            end: "top-=10px 50%",
                        scrub: true,
          },
        });

        $(this.el)
          .selectAll(".home-gallery-main.start .home-gallery-item")
          .each((idx, item) => {
                    let firstState = {
              x:
                (idx + 1) % 2 === 0
                  ? gsap.utils.random(10, 20)
                  : gsap.utils.random(-20, -10),
              y: 0,
              rotation:
                (idx + 1) % 2 === 0
                  ? gsap.utils.random(5, 10)
                  : gsap.utils.random(-10, -5),
            };
                    let midState = {
              x:
                $(this.el)
                  .selectAll(".home-gallery-main.end .home-gallery-item")
                  .eq(idx)
                  .get(0).offsetLeft -
                $(this.el).find(".home-gallery-main.end").width() / 2 +
                $(item).width() / 2,
              y:
                $(this.el)
                  .selectAll(".home-gallery-main.end .home-gallery-item")
                  .eq(idx)
                  .get(0).offsetTop -
                viewport.h * 0.5,
              rotation: 0,
            };

                    gsap.set(item, { zIndex: idx, ...firstState });

                    let randomY = gsap.utils.random(0, 20);
            this.tlFlipCard.fromTo(
              item,
              { ...firstState },
              { ...midState },
              "<=.015",
            );

            gsap
              .timeline()
              .to(
                $(item).select("img"),
                {
                  scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    end: "top top",
                    scrub: true,
                  },
                  yPercent: randomY,
                  ease: "none",
                },
                0,
              )
              .to(
                $(item).select(".home-gallery-item-img-inner"),
                {
                  scrollTrigger: {
                    trigger: item,
                    start: "top bottom+=10%",
                    end: "top top",
                    scrub: true,
                  },
                  yPercent: -randomY,
                  ease: "none",
                  scale: 0.75,
                },
                0,
              );
          });

                this.tlShowText = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this.el).prev(),
            start: "bottom 85%",
            end: "bottom bottom+=100%",
                        endTrigger: this.el,
            scrub: true,
          },
        });

        $(this.el)
          .selectAll(".home-gallery-text-item")
          .each((idx, item) => {
            if (
              idx <
              $(this.el).selectAll(".home-gallery-text-item").length - 1
            ) {
                        this.tlShowText
                .fromTo(
                  item,
                  { autoAlpha: 0, y: cvUnit(3, "rem"), scale: 1.04 },
                  { autoAlpha: 1, y: 0, scale: 1 },
                  ">=0",
                )
                .fromTo(
                  item,
                  { autoAlpha: 1, y: 0, scale: 1 },
                  { autoAlpha: 0, y: -cvUnit(3, "rem"), scale: 0.96 },
                  ">=.5",
                );
                    } else {
              this.tlShowText.fromTo(
                item,
                { autoAlpha: 0, y: cvUnit(3, "rem"), scale: 1.04 },
                { autoAlpha: 1, y: 0, scale: 1 },
                ">=0",
              );
                    }
                    gsap.set(item, { autoAlpha: 0 });
          });

                this.tlOverlap = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
                        start: `bottom-=${viewport.h * 1.5} 50%`,
                        end: `bottom-=${viewport.h * 1} 50%`,
                        scrub: true,
          },
        });
        this.tlOverlap.fromTo(
          $(this.el).select(".home-gallery-text-inner"),
          { autoAlpha: 1, scale: 1 },
          { autoAlpha: 0, scale: 0.96 },
        );
            }
            interact() {
        $(this.el)
          .find(".home-gallery-item")
          .on("click", (e) => {
            $(this.el).find(".home-gallery-zoom").addClass("active");
            $(this.el).find(".home-gallery-stick").addClass("on-zoom");
            let cloneEl = $(e.target).find("img").clone().addClass("img-h");
            gsap.set(cloneEl, { clearProps: "all" });
            $(this.el).find(".home-gallery-zoom-img-inner img").remove();
            $(this.el).find(".home-gallery-zoom-img-inner").append(cloneEl);
            $(this.el)
              .find(".home-gallery-zoom-txt .txt")
              .text($(e.target).attr("data-content"));
                    smoothScroll.lenis.stop();
          });
        $(this.el)
          .find(".home-gallery-zoom-close")
          .on("click", () => {
            $(this.el).find(".home-gallery-zoom").removeClass("active");
            $(this.el).find(".home-gallery-stick").removeClass("on-zoom");
                    smoothScroll.lenis.start();
          });
            }
            destroy() {
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
                }
                if (this.tlChangeBG) {
                    this.tlChangeBG.kill();
                }
                if (this.tlShowText) {
                    this.tlShowText.kill();
                }
            }
        },
        Map: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".home-map-wrap");
        if (!this.el) return;
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
                this.interact();
            }
            animationScrub() {
                this.tlOverlap = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
            start: "top bottom",
                        end: `top top`,
            scrub: true,
          },
        });

        this.tlOverlap.fromTo(
          $(this.el).select(".home-map-img"),
          { autoAlpha: 0, scale: 1.4 },
          { autoAlpha: 1, scale: 1 },
        );
            }

            animationReveal() {
        $(".home-yacth-bg img").removeAttr("loading");
            }
            interact() {
                const activeIndex = (idx) => {
          $(this.el)
            .find(".home-map-destin-item")
            .eq(idx)
            .addClass("active")
            .siblings()
            .removeClass("active");
          $(this.el)
            .find(".home-map-location-item")
            .eq(idx)
            .addClass("active")
            .siblings()
            .removeClass("active");
        };

                if (viewport.w > 991) {
          $(this.el)
            .find(".home-map-destin-item, .home-map-location-item")
            .on("mouseenter", function (e) {
                        activeIndex($(this).index());
            });

          $(this.el)
            .find(".home-map-destin-item, .home-map-location-item")
            .on("mouseleave", (e) => {
              $(this.el).find(".home-map-destin-item").removeClass("active");
              $(this.el).find(".home-map-location-item").removeClass("active");
            });
        } else {
                    // $(this.el).find('.home-map-destin-item, .home-map-location-item').on('click', function(e) {
                    //     activeIndex($(this).index());
                    // })
                }

                if (viewport.w <= 991) {
                    if (viewport.w <= 767) {
            $(this.el)
              .find(".home-map-location-list")
              .prepend($(this.el).find(".home-map-location-item.full-map"));
            $(this.el)
              .find(".home-map-destin-list")
              .prepend($(this.el).find(".home-map-destin-item.full-map"));
            $(this.el)
              .find(".home-map-location-item.full-map")
              .removeClass("full-map");
            $(this.el)
              .find(".home-map-destin-item.full-map")
              .removeClass("full-map");
          }
          $(this.el).find(".home-map-destin-cms").addClass("swiper");
          $(this.el).find(".home-map-destin-list").addClass("swiper-wrapper");
          $(this.el).find(".home-map-destin-item").addClass("swiper-slide");
          $(this.el).find(".home-map-destin-list").css("column-gap", 0);
          let swiper = new Swiper($(this.el).select(".home-map-destin-cms"), {
            slidesPerView: "auto",
            spaceBetween: cvUnit(viewport.w > 767 ? 20 : 16, "rem"),
                        on: {
                            init: () => viewport.w <= 767 && activeIndex(0),
                            slideChange: (slide) => {
                                let index = slide.activeIndex;
                                viewport.w <= 767 && activeIndex(index);
              },
            },
          });
                }
            }
            destroy() {
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
                }
            }
        },
        Yacth: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
                this.tlForceScroll = null;
                this.currentIndex = 0;
                this.clicked = false;
                this.raqID = [];
                this.mouse = {
                    xMove: 0,
                    yMove: 0,
                    xCurr: 0,
          yCurr: 0,
        };
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".home-yacth-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.interact();
                this.animationScrub();
                this.animationReveal();
            }
            animationScrub() {
        let progressToggle = viewport.w > 991 ? 0.2 : 0.5;
                this.tlOverlap = gsap.timeline({
                    scrollTrigger: {
            trigger: $(this.el).find(".home-yacth-main-slide"),
            start: "top top",
            end: "bottom top",
                        scrub: 1,
                        snap: [1],
                        onEnter: () => {
                            // $('.home-yacth-main-slide-text').eq(0).addClass('active');
                            // $('.home-yacth-main-slide-gallery').eq(0).addClass('active');
                        },
                        onUpdate: (self) => {
              if (!self.isActive) return;
              const $root = $(this.el);
              if (self.progress < progressToggle) {
                $root.find(".home-yacth-main-slide-text").removeClass("active");
                $root
                  .find(".home-yacth-main-slide-gallery")
                  .removeClass("active");
              } else if (this.currentIndex === 0) {
                $root
                  .find(".home-yacth-main-slide-text")
                  .eq(0)
                  .addClass("active");
                $root
                  .find(".home-yacth-main-slide-gallery")
                  .eq(0)
                  .addClass("active");
                            }
                        },
                        onToggle: (self) => {
                            if (self.isActive) {
                $(this.el)
                  .find(".home-yacth-main-bar-item")
                  .removeClass("active");
                $(this.el)
                  .find(".home-yacth-main-slide-item")
                  .removeClass("active");
              } else {
                                if (self.progress === 0) {
                  $(".home-yacth-main-slide-text").removeClass("active");
                  $(".home-yacth-main-slide-gallery").removeClass("active");
                }
              }
            },
          },
        });

        gsap.set($(this.el).select(".home-yacth-bg-blur"), {
          filter: "brightness(100%)",
          backdropFilter: "blur(0px)",
        });
                this.tlOverlap
          .fromTo(
            $(this.el).selectAll(".home-yacth-main-bar-item"),
            { autoAlpha: 0, xPercent: -10 },
            { autoAlpha: 1, xPercent: 0, duration: 0.8 },
          )
          .fromTo(
            $(this.el).select(".home-yacth-bg-blur"),
            { filter: "brightness(100%)", backdropFilter: "blur(0px)" },
            {
              filter: "brightness(90%)",
              backdropFilter: `blur(${cvUnit(16, "rem")}px)`,
            },
          )
          .fromTo(
            $(this.el).selectAll(".home-yacth-main-slide-thumb-inner").eq(0),
            { autoAlpha: 0, scale: 1.1, transition: "none" },
            {
              autoAlpha: 1,
              scale: 1,
              transition: "none",
              duration: 1.2,
              clearProps: "transition",
            },
            "<=.5",
          )
          .fromTo(
            $(this.el).selectAll(".home-yacth-main-slide-thumb-overlay").eq(0),
            { autoAlpha: 0, transition: "none" },
            {
              autoAlpha: 1,
              transition: "none",
              duration: 1.2,
              clearProps: "transition",
            },
            "<=0",
          );

                this.tlForceScroll = gsap.timeline({
                    scrollTrigger: {
            trigger: $(this.el).find(".home-yacth-main-slide"),
            start: "bottom top",
            end: "bottom bottom",
                        endTrigger: this.el,
            scrub: 1,
          },
        });
        $(this.el)
          .selectAll(".home-yacth-main-bar-item")
          .each((idx, el) => {
                    const fromAnimationConfig = {
                        scaleX: 1,
              ease: "none",
              duration: 0.8,
                        onReverseComplete: () => {
                            this.currentIndex = idx;
                $(this.el)
                  .selectAll(".home-yacth-main-bar-item")
                  .each((idx, el) => {
                                if (this.currentIndex <= idx) {
                      $(el).removeClass("active");
                                }
                  });
                            if (this.currentIndex !== 0) {
                                this.currentIndex = this.currentIndex - 1;
                                this.updateSlideActive();
                            }
                        },
                        onStart: () => {
                            this.currentIndex = idx;
                            if (this.clicked) {
                                setTimeout(() => {
                    $(el).addClass("active");
                                    this.updateSlideActive();
                                }, 400);
                } else {
                  $(el).addClass("active");
                                this.updateSlideActive();
                            }
              },
            };
            this.tlForceScroll.fromTo(
              $(el).find(".home-yacth-main-bar-item-prog-inner"),
              { scaleX: 0 },
              fromAnimationConfig,
            );

                    if (viewport.w > 767) {
              const rectTop =
                $(this.el).find(".home-yacth-main-slide").offset().top +
                viewport.h * (idx + 1);
              $(el).on("click", () => {
                            this.clicked = true;
                setTimeout(() => (this.clicked = false), 400);
                smoothScroll.lenis.scrollTo(rectTop + 5, {
                  duration: 0.4,
                  force: true,
                });
              });
            }
          });

                this.tlParallax = gsap.timeline({
                    scrollTrigger: {
            trigger: $(this.el).find(".home-yacth-bg"),
            start: "top bottom",
                        end: `bottom+=${viewport.h > 991 ? 80 : 0}% top`,
            endTrigger: $(this.el).find(".home-yacth-empty-block"),
            scrub: 1,
          },
        });
        this.tlParallax.fromTo(
          $(this.el).select(".home-yacth-bg-img-inner img"),
          {
            yPercent: viewport.w > 991 ? -25 : 0,
            scale: viewport.w > 991 ? 1 : 1.2,
          },
          {
            yPercent: 2,
            scale: 1.18,
            transformOrigin: viewport.w > 991 ? "55% top" : "center bottom",
            duration: 1,
          },
        );
      }
      animationReveal() {}
            updateSlideActive() {
        let slideEl = [
          ".home-yacth-main-slide-thumb",
          ".home-yacth-main-slide-text",
          ".home-yacth-main-slide-gallery",
        ];
                slideEl.forEach((el) => {
          $(this.el).find(el).removeClass("active");
          $(this.el)
            .find(".home-yacth-main-slide-item")
            .eq(this.currentIndex)
            .find(el)
            .addClass("active");
        });
        $(this.el)
          .find(".home-yacth-main-slide-item")
          .eq(this.currentIndex)
          .addClass("active")
          .siblings()
          .removeClass("active");
                if (viewport.w <= 767) {
          let listRect = $(this.el)
            .select(".home-yacth-main-bar-cms")
            .getBoundingClientRect();
          let spacingMove =
            (listRect.width / 2 - cvUnit(16, "rem") + listRect.left) *
            this.currentIndex;
          if (
            this.currentIndex >=
            $(this.el).find(".home-yacth-main-bar-item").length - 1
          )
            return;
          gsap.to($(this.el).find(".home-yacth-main-bar-list"), {
            x: -spacingMove,
            duration: 0.6,
            ease: "power2.inOut",
          });
                }
            }
            interact() {
        $(this.el)
          .selectAll(".home-yacth-main-slide-item")
          .each((_, item) => {
            let title = $(item).find(".home-yacth-main-slide-title");
            let desc = $(item).find(".home-yacth-main-slide-desc");

            SplitText.create(title, {
              type: "lines words",
              wordsClass: "word",
              mask: "lines",
              autoSplit: true,
            }).words.forEach((word, index) =>
              gsap.set(word, { "--trans-delay": `${(index + 1) * 0.02}s` }),
            );
            SplitText.create(desc, {
              type: "lines words",
              wordsClass: "word",
              mask: "lines",
              autoSplit: true,
            }).words.forEach((word, index) =>
              gsap.set(word, { "--trans-delay": `${(index + 1) * 0.01}s` }),
            );
          });

        $(this.el)
          .selectAll(".home-yacth-main-slide-gallery.is-stack")
          .each((_, gallery) => {
            const $gallery = $(gallery);
            const hidePreview = () => {
              gallery.querySelectorAll(".eco-preview-img").forEach((el) => {
                el.classList.remove("is-on");
              });
            };
            const layersFor = (featured) => {
              const inner = featured.querySelector(
                ".home-yacth-main-slide-gallery-item-inner",
              );
              if (!inner) return [];
              let layers = [
                ...inner.querySelectorAll(":scope > .eco-preview-img"),
              ];
              while (layers.length < 2) {
                const img = document.createElement("img");
                img.className = "eco-preview-img";
                img.alt = "";
                inner.appendChild(img);
                layers = [
                  ...inner.querySelectorAll(":scope > .eco-preview-img"),
                ];
              }
              return layers;
            };
            const showOnFeatured = (src) => {
              const featured = gallery.querySelector(
                ".home-yacth-main-slide-gallery-list > .home-yacth-main-slide-gallery-item:last-child",
              );
              if (!featured || !src) return;
              const layers = layersFor(featured);
              if (layers.length < 2) return;
              const incoming =
                layers.find((el) => !el.classList.contains("is-on")) ||
                layers[1];
              const outgoing = layers.find((el) => el !== incoming);
              const turnOn = () => {
                incoming.classList.add("is-on");
                if (outgoing) outgoing.classList.remove("is-on");
              };
              if (
                (incoming.getAttribute("src") || "") === src &&
                incoming.complete
              ) {
                turnOn();
                return;
              }
              incoming.onload = turnOn;
              incoming.src = src;
              if (incoming.complete) turnOn();
            };

            $gallery
              .off(".ecoGallery")
              .on(
                "mouseenter.ecoGallery",
                ".home-yacth-main-slide-gallery-item",
                function () {
                  if (window.matchMedia("(hover: hover)").matches === false)
                    return;
                  $gallery
                    .find(".home-yacth-main-slide-gallery-item")
                    .removeClass("is-eco-hot");
                  if (this === this.parentElement?.lastElementChild) {
                    hidePreview();
                    return;
                  }
                  $(this).addClass("is-eco-hot");
                  const src = this.querySelector(
                    ".home-yacth-main-slide-gallery-item-inner > img:not(.eco-preview-img)",
                  )?.getAttribute("src");
                  showOnFeatured(src);
                },
              )
              .on("mouseleave.ecoGallery", function () {
                hidePreview();
                $gallery
                  .find(".home-yacth-main-slide-gallery-item")
                  .removeClass("is-eco-hot");
              })
              .on(
                "click.ecoGallery",
                ".home-yacth-main-slide-gallery-item",
                function (e) {
                  e.preventDefault();
                  const list = this.parentElement;
                  if (!list) return;
                  hidePreview();
                  gallery
                    .querySelectorAll(".eco-preview-img")
                    .forEach((el) => el.remove());
                  if (this !== list.lastElementChild) {
                    list.appendChild(this);
                  }
                },
              );
          });
            }
            destroy() {
                this.currentIndex = 0;
                if (this.raqID.length !== 0) {
                    this.raqID.forEach((id) => cancelAnimationFrame(id));
                    this.raqID = [];
                }
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
                }
                if (this.tlForceScroll) {
                    this.tlForceScroll.kill();
                }
            }
        },
        Team: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
                this.tlScaleImage = null;
                this.stYachtFrames = null;
                this.onYachtResize = null;
                this.yachtReady = false;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".home-team-wrap");
        if (!this.el) return;
        requestAnimationFrame(() => this.animationScrub());
            }
            loadYachtFrames(canvas) {
        if (!canvas) return Promise.resolve([]);
        const count = Math.max(
          1,
          parseInt(canvas.getAttribute("data-frame-count"), 10) || 5,
        );
        const pattern =
          canvas.getAttribute("data-frame-src") ||
          "/images/Yacht_frames/frame_{n}.jpg";
        const urls = Array.from({ length: count }, (_, i) =>
          pattern.replace("{n}", String(i + 1).padStart(3, "0")),
        );
        return Promise.all(
          urls.map(
            (src) =>
              new Promise((resolve) => {
                const im = new Image();
                im.decoding = "async";
                im.onload = () => resolve(im);
                im.onerror = () => resolve(null);
                im.src = src;
              }),
          ),
        ).then((list) => list.filter(Boolean));
            }
            sizeYachtCanvas(canvas) {
        if (!canvas) return null;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.max(1, canvas.clientWidth);
        const h = Math.max(1, canvas.clientHeight);
        const nextW = Math.round(w * dpr);
        const nextH = Math.round(h * dpr);
        if (canvas.width !== nextW || canvas.height !== nextH) {
          canvas.width = nextW;
          canvas.height = nextH;
        }
        const ctx = canvas.getContext("2d");
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { ctx, w, h };
            }
            drawYachtFrame(canvas, img) {
        if (!canvas || !img || !img.width) return;
        const sized = this.sizeYachtCanvas(canvas);
        if (!sized) return;
        const { ctx, w, h } = sized;
        const ir = img.width / img.height;
        const cr = w / h;
        let dw;
        let dh;
        if (ir > cr) {
          dh = h;
          dw = dh * ir;
        } else {
          dw = w;
          dh = dw / ir;
        }
        const dx = (w - dw) * 0.5;
        const dy = (h - dh) * 0.5;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, dx, dy, dw, dh);
            }
            bindYachtFrames(thumb, canvas, images, scroller, reduceMotion) {
        if (!thumb || !canvas || !images.length) return;
        const state = { i: 0 };
        const paint = (progress) => {
          const i = Math.round(
            gsap.utils.clamp(0, 1, progress) * (images.length - 1),
          );
          if (i === state.i && canvas.dataset.painted === "1") return;
          state.i = i;
          this.drawYachtFrame(canvas, images[i]);
          canvas.dataset.painted = "1";
        };
        this.drawYachtFrame(canvas, images[0]);
        canvas.dataset.painted = "1";
        if (this.onYachtResize) {
          window.removeEventListener("resize", this.onYachtResize);
        }
        this.onYachtResize = () =>
          this.drawYachtFrame(canvas, images[state.i]);
        window.addEventListener("resize", this.onYachtResize);
        if (reduceMotion) {
          paint(0);
          return;
        }
        const pinLen = () =>
          Math.round(
            viewport.h * (images.length <= 8 ? 2.2 : 3.2),
          );
        this.stYachtFrames = ScrollTrigger.create({
          trigger: thumb,
          start: "top top",
          end: () => `+=${pinLen()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          ...(scroller ? { scroller } : {}),
          onUpdate: (self) => paint(self.progress),
          onRefresh: (self) => paint(self.progress),
        });
            }
            animationScrub() {
        if (!this.el || this.yachtReady) return;
        this.yachtReady = true;
        this.el
          .querySelectorAll(".home-team-item-img")
          .forEach((el) => new ParallaxImage({ el: el.querySelector("img") }));
        const thumb = $(this.el).select(".home-team-thumb");
        const inner = $(this.el).select(".home-team-thumb-inner");
        const canvas = $(this.el).select(".yacht-frame-canvas");
        const media = inner.querySelectorAll("canvas, img, video");
        const copy = $(this.el).select(".yacht-copy");
        if (!thumb || !inner) return;

        const radius = `${cvUnit(8, "rem")}px`;
        const clipFrom =
          viewport.w > 991
            ? `inset(14% 26% 14% 26% round ${radius})`
            : `inset(16% 12% 16% 12% round ${radius})`;
        const clipTo = "inset(0% 0% 0% 0% round 0px)";
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        gsap.set(inner, { clipPath: clipFrom, webkitClipPath: clipFrom });
        if (media.length) gsap.set(media, { scale: 1.18, transformOrigin: "50% 70%" });
        if (copy) gsap.set(copy, { autoAlpha: 0, y: 28 });

        this.loadYachtFrames(canvas).then((images) => {
          if (!this.el) return;
          this.bindYachtFrames(
            thumb,
            canvas,
            images,
            viewport.w <= 767 ? document.querySelector(".body-inner") : null,
            reduceMotion,
          );
          if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
        });

        if (reduceMotion) {
          gsap.set(inner, { clipPath: clipTo, webkitClipPath: clipTo });
          if (media.length) gsap.set(media, { scale: 1 });
          if (copy) gsap.set(copy, { autoAlpha: 1, y: 0 });
          return;
        }

        const scroller =
          viewport.w <= 767 ? document.querySelector(".body-inner") : null;
        this.tlScaleImage = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: thumb,
            ...(scroller ? { scroller } : {}),
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        this.tlScaleImage.fromTo(
          inner,
          { clipPath: clipFrom, webkitClipPath: clipFrom },
          { clipPath: clipTo, webkitClipPath: clipTo, duration: 1 },
        );
        if (media.length) {
          this.tlScaleImage.fromTo(
            media,
            { scale: 1.18, transformOrigin: "50% 70%" },
            { scale: 1, transformOrigin: "50% 70%", duration: 1 },
            0,
          );
        }
        if (copy) {
          this.tlScaleImage.fromTo(
            copy,
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            0.45,
          );
        }
      }
      animationReveal() {}
      interact() {}
            destroy() {
                this.yachtReady = false;
                if (this.onYachtResize) {
                    window.removeEventListener("resize", this.onYachtResize);
                    this.onYachtResize = null;
                }
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
                }
                if (this.tlScaleImage) {
                    this.tlScaleImage.kill();
                    this.tlScaleImage = null;
                }
                if (this.stYachtFrames) {
                    this.stYachtFrames.kill();
                    this.stYachtFrames = null;
                }
            }
        },
    Lookbook: class extends TriggerSetup {
      constructor() {
        super();
        this.el = null;
        this.st = null;
      }
      trigger(data) {
        this.el = data.next.container.querySelector(".lookbook-wrap");
        if (!this.el) return;
        requestAnimationFrame(() => this.animationScrub());
      }
      animationScrub() {
        if (!this.el || this.st) return;
        const stage = this.el.querySelector(".lookbook-stage");
        const copy = this.el.querySelector(".lookbook-copy");
        const shots = [...this.el.querySelectorAll(".lookbook-shot")];
        if (!stage || shots.length < 2) return;

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const n = shots.length;
        const easeSettle = gsap.parseEase("power2.inOut");
        const easeTitle = gsap.parseEase("power3.out");
        const scroller =
          viewport.w <= 767 ? document.querySelector(".body-inner") : null;
        const titleEl = copy?.querySelector(".lookbook-title");
        const tagEl = copy?.querySelector(".lookbook-tag");

        const paint = (p) => {
          const w = stage.clientWidth;
          const h = stage.clientHeight;
          const phone = w <= 767;
          const u = Math.min(w, h);
          const titleIn = easeTitle(gsap.utils.clamp(0, 1, p / 0.24));
          const tagIn = easeTitle(gsap.utils.clamp(0, 1, (p - 0.18) / 0.14));
          const photoP = gsap.utils.clamp(0, 1, (p - 0.4) / 0.6);
          const rx = phone ? u * 0.4 : u * 0.42;
          const ry = phone ? u * 0.34 : u * 0.36;
          const joinSpan = 0.48;
          const orbitHold = 0.68;
          const spin = Math.min(photoP / orbitHold, 1) * Math.PI * 2;
          const settle = easeSettle(
            gsap.utils.clamp(0, 1, (photoP - orbitHold) / 0.3),
          );

          if (titleEl) {
            gsap.set(titleEl, {
              y: gsap.utils.interpolate(Math.min(160, h * 0.22), 0, titleIn),
              autoAlpha: titleIn,
            });
          }
          if (tagEl) {
            gsap.set(tagEl, {
              y: gsap.utils.interpolate(36, 0, tagIn),
              autoAlpha: tagIn,
            });
          }
          if (copy) {
            gsap.set(copy, {
              autoAlpha: gsap.utils.interpolate(1, 0.18, settle),
              scale: gsap.utils.interpolate(1, 0.94, settle),
            });
          }

          shots.forEach((shot, i) => {
            const joinAt = (i / n) * joinSpan;
            const joined =
              photoP <= 0
                ? 0
                : gsap.utils.clamp(0, 1, (photoP - joinAt) / 0.14);
            const angle = (i / n) * Math.PI * 2 + spin;
            const ox = Math.cos(angle) * rx;
            const oy = Math.sin(angle) * ry;
            const stackX = (i - (n - 1) / 2) * (phone ? 2 : 4);
            const stackY = (i - (n - 1) / 2) * (phone ? 1.5 : 3);
            const stackR = (i - (n - 1) / 2) * 1.8;
            const x = gsap.utils.interpolate(ox, stackX, settle);
            const y = gsap.utils.interpolate(oy, stackY, settle);
            const rot = gsap.utils.interpolate(
              Math.sin(angle) * 8,
              stackR,
              settle,
            );
            const scale = gsap.utils.interpolate(
              phone ? 0.58 : 0.52,
              1,
              settle,
            );
            gsap.set(shot, {
              x,
              y,
              rotation: rot,
              scale,
              autoAlpha: joined,
              zIndex: 10 + i,
              force3D: true,
            });
          });
        };

        if (reduceMotion) {
          paint(1);
          return;
        }

        gsap.set(shots, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
        if (titleEl) gsap.set(titleEl, { y: 160, autoAlpha: 0 });
        if (tagEl) gsap.set(tagEl, { y: 36, autoAlpha: 0 });
        paint(0);

        this.st = ScrollTrigger.create({
          trigger: this.el.querySelector(".lookbook"),
          start: "top top",
          end: () =>
            `+=${Math.round(window.innerHeight * (viewport.w <= 767 ? 3.6 : 4.4))}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          ...(scroller ? { scroller } : {}),
          onUpdate: (self) => paint(self.progress),
          onRefresh: (self) => paint(self.progress),
        });
      }
      destroy() {
        if (this.st) {
          this.st.kill();
          this.st = null;
        }
      }
    },
        Journal: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
                this.tlHorizontal = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".home-journal-wrap");
        if (!this.el) return;
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
                this.interact();
            }
            animationScrub() {
                if (viewport.w > 991) {
          $(".home-journal-inner").addClass("swiper");
          $(".home-journal-sc-wrap").addClass("swiper-wrapper");
          $(".home-journal-sc").addClass("swiper-slide");

          $(this.el).select(".home-journal-bg.sc-4").remove();
          $(this.el)
            .find(".home-journal-img-inner")
            .each((_, el) => {
              $(el).find("img").attr("loading") === "lazy" &&
                $(el).find("img").removeAttr("loading");
              if ($(el).find("img").attr("data-swiper-parallax-x")) {
                let scaleOffset =
                  $(el).find("img").attr("data-swiper-parallax-x").slice(0, 2) /
                    100 +
                  1.1;
                            gsap.set($(el), { scale: scaleOffset });
                        }
            });
          new Swiper($(this.el).select(".home-journal-inner"), {
            slidesPerView: "auto",
                        spaceBetween: 0,
                        freeMode: true,
                        parallax: true,
                        mousewheel: {
              forceToAxis: true,
            },
          });
        } else {
          $(this.el)
            .selectAll(".home-journal-img-inner")
            .each((idx, el) => {
              new ParallaxImage({
                el: el.querySelector("img"),
                scaleOffset: 0.2,
              });
            });
        }
      }
      animationReveal() {}
      interact() {}
            destroy() {
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
                }
                if (this.tlHorizontal) {
                    this.tlHorizontal.kill();
                }
            }
        },
        Article: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
        this.tlReveal = null;
        this.stReveal = null;
        this.splitHeading = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".home-article-wrap");
        if (!this.el) return;
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.interact();
      }
      animationScrub() {}
      animationReveal() {
        if (!this.el || this.tlReveal) return;
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const heading = this.el.querySelector(".seen-in-heading");
        const tabs = this.el.querySelectorAll(".seen-in-tab");
        const carousel = this.el.querySelector(".seen-in-carousel");
        let visibleCards = this.el.querySelectorAll(
          ".swiper-slide-visible .seen-in-card",
        );
        if (!visibleCards.length) {
          visibleCards = [
            ...this.el.querySelectorAll(
              ".home-article-main-item:not(.is-hidden) .seen-in-card",
            ),
          ].slice(0, 5);
        }
        const media = [...visibleCards]
          .map((card) => card.querySelector(".seen-in-card-media img"))
          .filter(Boolean);

        if (reduceMotion) return;

        let headingWords = heading ? [heading] : [];
        try {
          if (heading && typeof SplitText !== "undefined") {
            this.splitHeading = SplitText.create(heading, {
              type: "lines words",
              wordsClass: "word",
              mask: "lines",
            });
            if (this.splitHeading?.words?.length) {
              headingWords = this.splitHeading.words;
            }
          }
        } catch (err) {
          this.splitHeading = null;
        }

        if (headingWords.length) {
          gsap.set(headingWords, { yPercent: 120, autoAlpha: 0 });
        }
        gsap.set(tabs, { autoAlpha: 0, y: cvUnit(16, "rem") });
        if (visibleCards.length) {
          gsap.set(visibleCards, {
            y: cvUnit(32, "rem"),
            autoAlpha: 0,
            scale: 0.94,
          });
        }
        if (media.length) {
          gsap.set(media, { scale: 1.18, transformOrigin: "50% 58%" });
        }

        this.tlReveal = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
          onComplete: () => {
            if (visibleCards.length) {
              gsap.set(visibleCards, {
                clearProps: "transform,opacity,visibility",
              });
            }
          },
        });

        if (headingWords.length) {
          this.tlReveal.to(
            headingWords,
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.95,
              stagger: 0.045,
            },
            0,
          );
        }
        this.tlReveal.to(
          tabs,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.055,
          },
          0.22,
        );

        if (visibleCards.length) {
          this.tlReveal.to(
            visibleCards,
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
            },
            0.38,
          );
        }
        if (media.length) {
          this.tlReveal.to(
            media,
            {
              scale: 1,
              duration: 1.45,
              ease: "power2.out",
              stagger: 0.08,
            },
            0.42,
          );
        }

        this.stReveal = ScrollTrigger.create({
          trigger: this.el,
          start: "top 90%",
          once: true,
          onEnter: () => this.tlReveal && this.tlReveal.play(),
        });
        this.tlReveal.play();
            }
            interact() {
        if (!this.el) return;
        const $wrap = $(this.el);
        $wrap.find(".home-article-main-cms").addClass("swiper");
        $wrap.find(".home-article-main-list").addClass("swiper-wrapper");
        $wrap.find(".home-article-main-item").addClass("swiper-slide");
        $wrap.find(".home-article-main-list").css("column-gap", 0);
        const list = $wrap.select(".home-article-main-list");
        const park = $wrap.select(".seen-in-slide-park");
        const pager = $wrap.select(".seen-in-pagination");
        let swiper;
        $wrap.find(".home-article-main-item").each(function (i) {
          this.dataset.slideIndex = String(i);
        });
        const allItems = () => {
          const inList = list
            ? [...list.querySelectorAll(".home-article-main-item")]
            : [];
          const inPark = park
            ? [...park.querySelectorAll(".home-article-main-item")]
            : [];
          return [...inList, ...inPark].sort(
            (a, b) =>
              Number(a.dataset.slideIndex) - Number(b.dataset.slideIndex),
          );
        };
        const applyFilter = (filter) => {
          allItems().forEach((el) => {
            const show = (el.getAttribute("data-category") || "") === filter;
            el.classList.toggle("is-hidden", !show);
            if (show) {
              list && list.appendChild(el);
            } else if (park) {
              park.appendChild(el);
            }
          });
        };
        applyFilter("experiences");
        const renderPager = () => {
          if (!pager || !swiper) return;
          const n = swiper.slides.length;
          const visIndex = swiper.activeIndex;
          const buttons = pager.querySelectorAll(".seen-in-bullet");
          if (buttons.length !== n) {
            pager.innerHTML = Array.from({ length: n }, (_, idx) => {
              return `<button type="button" class="seen-in-bullet" data-index="${idx}" aria-label="Go to slide ${idx + 1}"></button>`;
            }).join("");
          }
          pager.querySelectorAll(".seen-in-bullet").forEach((btn, i) => {
            btn.classList.toggle("is-active", i === visIndex);
          });
        };
        swiper = new Swiper($wrap.select(".home-article-main-cms"), {
          slidesPerView: 1.15,
          spaceBetween: cvUnit(16, "rem"),
          centeredSlides: true,
          initialSlide: 1,
          slideToClickedSlide: true,
          watchSlidesProgress: true,
          observer: true,
          observeSlideChildren: true,
                    navigation: {
            nextEl: $wrap.select(".home-article-control-item.next"),
            prevEl: $wrap.select(".home-article-control-item.prev"),
            disabledClass: "disabled",
          },
          breakpoints: {
            768: { slidesPerView: 2.15, spaceBetween: cvUnit(20, "rem") },
            1100: { slidesPerView: 3, spaceBetween: cvUnit(24, "rem") },
          },
          on: {
            slideChange: () => renderPager(),
            transitionEnd: () => renderPager(),
          },
        });
        if (pager) {
          pager.addEventListener("click", (e) => {
            const btn = e.target.closest(".seen-in-bullet");
            if (!btn || !swiper) return;
            swiper.slideTo(Number(btn.dataset.index), 400);
          });
        }
        renderPager();
        requestAnimationFrame(() => {
          swiper.update();
          this.animationReveal();
        });
        $wrap.find(".seen-in-tab").on("click", function () {
          const filter = $(this).attr("data-filter");
          $wrap.find(".seen-in-tab").removeClass("is-active");
          $(this).addClass("is-active");
          applyFilter(filter);
          swiper.update();
          swiper.slideTo(Math.min(1, Math.max(0, swiper.slides.length - 1)), 0);
          renderPager();
        });
            }
            destroy() {
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
          this.tlOverlap = null;
        }
        if (this.tlReveal) {
          if (this.tlReveal.scrollTrigger) {
            this.tlReveal.scrollTrigger.kill();
          }
          this.tlReveal.kill();
          this.tlReveal = null;
        }
        if (this.stReveal) {
          this.stReveal.kill();
          this.stReveal = null;
        }
        if (this.splitHeading?.revert) {
          this.splitHeading.revert();
          this.splitHeading = null;
        }
      }
    },
    Wellness: class extends TriggerSetup {
      constructor() {
        super();
        this.el = null;
        this.observer = null;
        this.tlIntro = null;
        this.stReveals = [];
      }
      trigger(data) {
        this.el = data.next.container.querySelector(".wellness-wrap");
        if (!this.el) return;
        this.animationReveal();
      }
      animationReveal() {
        if (!this.el || this.stReveals.length) return;
        const q = gsap.utils.selector(this.el);
        const isMobile = viewport.w <= 991;
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const intro = this.el.querySelector(".wellness-intro");
        const headingLines = q(".wellness-heading-line");
        const sub = q(".wellness-sub");
        const cta = this.el.querySelector(".wellness-cta");
        const cards = [...this.el.querySelectorAll(".wellness-card")];
        const phone = this.el.querySelector(".wellness-phone");
        const lines = this.el.querySelector(".wellness-lines");
        const bodies = q(".wellness-card-body");
        const vh = () => window.innerHeight;
        const vw = () => window.innerWidth;
        const scroller =
          viewport.w <= 767 ? document.querySelector(".body-inner") : null;

        const showAll = () => {
          gsap.set(intro, { autoAlpha: 1 });
          gsap.set([headingLines, sub, cta, cards, phone, lines, bodies], {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: 0,
          });
        };

        if (reduceMotion) {
          showAll();
          return;
        }

        const playIntro = () => {
          const rise = Math.min(88, vh() * 0.1);
          if (this.tlIntro) {
            this.tlIntro.kill();
            this.tlIntro = null;
          }
          gsap.set(intro, { autoAlpha: 1 });
          this.tlIntro = gsap.timeline({ defaults: { ease: "power3.out" } });
          this.tlIntro
            .fromTo(
              headingLines,
              { autoAlpha: 0, y: rise },
              { y: 0, autoAlpha: 1, duration: 1.05, stagger: 0.14 },
              0,
            )
            .fromTo(
              sub,
              { autoAlpha: 0, y: rise * 0.4 },
              { y: 0, autoAlpha: 1, duration: 0.8 },
              0.2,
            )
            .fromTo(
              cta,
              { autoAlpha: 0, y: 24 },
              { y: 0, autoAlpha: 1, duration: 0.65 },
              0.32,
            );
        };

        const playCard = (card) => {
          const flyX = isMobile ? 0 : Math.min(160, vw() * 0.12);
          const flyY = Math.min(100, vh() * 0.11);
          const from = card.classList.contains("is-tl")
            ? {
                x: -flyX,
                y: isMobile ? flyY : -flyY * 0.65,
                rotation: isMobile ? 0 : -8,
              }
            : card.classList.contains("is-tr")
              ? {
                  x: flyX,
                  y: isMobile ? flyY : -flyY * 0.5,
                  rotation: isMobile ? 0 : 8,
                }
              : card.classList.contains("is-bl")
                ? { x: -flyX, y: flyY, rotation: isMobile ? 0 : -6 }
                : { x: flyX, y: flyY, rotation: isMobile ? 0 : 6 };
          const body = card.querySelector(".wellness-card-body");
          gsap.fromTo(
            card,
            { ...from, autoAlpha: 0 },
            {
              x: 0,
              y: 0,
              rotation: 0,
              autoAlpha: 1,
              duration: 1.1,
              ease: "power3.out",
              overwrite: "auto",
            },
          );
          if (
            body &&
            (card.classList.contains("is-bl") ||
              card.classList.contains("is-br"))
          ) {
            gsap.fromTo(
              body,
              {
                x: isMobile ? 0 : card.classList.contains("is-br") ? 32 : -32,
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                duration: 0.6,
                delay: 0.35,
                ease: "power3.out",
                overwrite: "auto",
              },
            );
          }
        };

        const playPhone = () => {
          gsap.fromTo(
            phone,
            { y: Math.min(130, vh() * 0.15), autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.2,
              ease: "power3.out",
              overwrite: "auto",
            },
          );
        };

        const playLines = () => {
          gsap.fromTo(
            lines,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 0.85,
              ease: "power2.out",
              overwrite: "auto",
            },
          );
        };

        const rise = Math.min(88, vh() * 0.1);
        gsap.set(headingLines, { autoAlpha: 0, y: rise });
        gsap.set(sub, { autoAlpha: 0, y: rise * 0.4 });
        gsap.set(cta, { autoAlpha: 0, y: 24 });

        const watch = (trigger, play) => {
          if (!trigger) return;
          this.stReveals.push(
            ScrollTrigger.create({
              trigger,
              start: "top 86%",
              ...(scroller ? { scroller } : {}),
              invalidateOnRefresh: true,
              onEnter: play,
              onEnterBack: play,
            }),
          );
        };

        watch(intro, playIntro);
        cards.forEach((card) => watch(card, () => playCard(card)));
        watch(phone, playPhone);
        watch(lines, playLines);
      }
      destroy() {
        this.stReveals.forEach((st) => st.kill());
        this.stReveals = [];
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
        if (this.tlIntro) {
          this.tlIntro.kill();
          this.tlIntro = null;
        }
      }
    },
    StackCards: class {
      constructor() {
        this.el = null;
        this.tlStack = null;
        this.tlReveal = null;
        this.stReveal = null;
        this._onTick = null;
        this.playing = false;
        this.revealed = false;
      }
      trigger(data) {
        this.el = data.next.container.querySelector(".stack-wrap");
        if (!this.el || this.tlStack) return;
        this.animationScrub();
        this.animationReveal();
      }
      animationScrub() {
        const panels = gsap.utils.toArray(
          this.el.querySelectorAll(".stack-panel"),
        );
        if (panels.length < 3) return;
        const isMobile = viewport.w <= 991;
        const isPhone = viewport.w <= 767;
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        gsap.set(panels[0], {
          yPercent: 0,
          y: 0,
          autoAlpha: 1,
          scale: 1,
          xPercent: 0,
        });
        const firstInner = panels[0].querySelector(".stack-panel-inner");
        gsap.set(firstInner, {
          y: reduceMotion
            ? 0
            : Math.min(
                isPhone ? 36 : 160,
                window.innerHeight * (isPhone ? 0.04 : 0.18),
              ),
        });
        gsap.set(panels.slice(1), {
          yPercent: 102,
          autoAlpha: 1,
          scale: 1,
          xPercent: 0,
        });
        gsap.set(panels[0].querySelectorAll(".stack-photo"), {
          y: reduceMotion ? 0 : Math.min(72, window.innerHeight * 0.08),
          autoAlpha: reduceMotion ? 1 : 0,
        });
        gsap.set(
          this.el.querySelectorAll(
            ".stack-panel.is-navy .stack-photo, .stack-panel.is-teal .stack-photo",
          ),
          {
            y: cvUnit(64, "rem"),
            autoAlpha: 0,
          },
        );

        const stage = this.el.querySelector(".stack-stage");
        if (isPhone && stage) {
          stage.style.height = "";
        }
        gsap.set(panels, { force3D: true, filter: "blur(0px)" });
        const stackDistance = () =>
          Math.round(viewport.h * (isPhone ? 4.5 : isMobile ? 4.2 : 3.9));
        const pinStart = () => {
          const el = stage || this.el;
          const h = el?.getBoundingClientRect().height || viewport.h;
          const gap = Math.max(0, Math.round((window.innerHeight - h) / 2));
          return `top ${gap}px`;
        };
        this.tlStack = gsap.timeline({
          defaults: { ease: "none", autoRound: false },
          scrollTrigger: {
            trigger: stage || this.el,
            start: pinStart,
            end: () => `+=${stackDistance()}`,
            pin: !isPhone,
            pinSpacing: !isPhone,
            pinType: "fixed",
            scrub: isPhone ? 0.25 : isMobile ? 0.45 : 0.65,
            anticipatePin: isPhone ? 0 : 1,
            invalidateOnRefresh: true,
            fastScrollEnd: false,
            snap: isMobile
              ? {
                  snapTo: [0, 1 / 3, 2 / 3],
                  duration: { min: 0.2, max: 0.45 },
                  delay: 0.04,
                  ease: "power1.inOut",
                }
              : false,
            onEnter: () => this.settleFirstCard(),
          },
        });

        const fadeCard = (panel, at) => {
          if (isMobile) {
            this.tlStack.to(
              panel,
              {
                autoAlpha: 0,
                scale: 0.94,
                filter: "blur(8px)",
                duration: 0.42,
              },
              at,
            );
            return;
          }
          this.tlStack.fromTo(
            panel,
            {
              autoAlpha: 1,
              scale: 1,
              yPercent: 0,
              filter: "blur(0px)",
            },
            {
              autoAlpha: 0,
              scale: 0.88,
              yPercent: -10,
              filter: "blur(10px)",
              duration: 0.8,
              immediateRender: false,
            },
            at,
          );
        };

        if (isMobile) {
          this.tlStack
            .to(panels[1], { yPercent: 0, duration: 1 }, 0)
            .to(
              panels[1].querySelectorAll(".stack-photo"),
              { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.05 },
              0.12,
            )
            .to(panels[2], { yPercent: 0, duration: 1 }, 1)
            .to(
              panels[2].querySelectorAll(".stack-photo"),
              { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.05 },
              1.12,
            );
          fadeCard(panels[0], 0);
          fadeCard(panels[1], 1);
          fadeCard(panels[2], 2);
        } else {
          this.tlStack
            .to(panels[1], { yPercent: 0, duration: 1 }, 0)
            .to(
              panels[1].querySelectorAll(".stack-photo"),
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.55,
                stagger: 0.08,
              },
              0.22,
            )
            .to(panels[2], { yPercent: 0, duration: 1 }, 1.05)
            .to(
              panels[2].querySelectorAll(".stack-photo"),
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.55,
                stagger: 0.08,
              },
              1.28,
            );
          fadeCard(panels[0], 0.08);
          fadeCard(panels[1], 1.12);
          fadeCard(panels[2], 2.15);
        }
      }
      animationReveal() {
        if (!this.el || this._onTick || this.stReveal) return;
        const first = this.el.querySelector(".stack-panel.is-gold");
        const stage = this.el.querySelector(".stack-stage") || this.el;
        if (!first) return;
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reduceMotion) {
          this.showFirstCard();
          return;
        }

        this.resetFirstCard(true);
        if (viewport.w <= 991) {
          this.stReveal = ScrollTrigger.create({
            trigger: stage,
            start: "top 78%",
            end: "top top",
            onEnter: () => this.playFirstCard(),
            onEnterBack: () => this.playFirstCard(),
            onLeaveBack: () => {
              if (viewport.w <= 767) return;
              this.resetFirstCard(true);
            },
          });
          return;
        }

        this._onTick = () => {
          if (!this.el) return;
          if (this.tlStack?.scrollTrigger?.isActive) return;
          const rect = stage.getBoundingClientRect();
          const vh = viewport.h;
          if (rect.top > vh * 0.72 || rect.bottom < 64) {
            if (this.revealed || this.playing || this.tlReveal) {
              this.resetFirstCard(true);
            }
            return;
          }
          if (rect.top < vh * 0.58 && rect.top > -vh * 0.15) {
            this.playFirstCard();
          }
        };
        gsap.ticker.add(this._onTick);
      }
      firstCardNodes() {
        const first = this.el?.querySelector(".stack-panel.is-gold");
        if (!first) return null;
        return {
          first,
          inner: first.querySelector(".stack-panel-inner"),
          heading: first.querySelector(".stack-heading"),
          cta: first.querySelector(".stack-cta"),
          body: first.querySelector(".stack-body"),
          photos: first.querySelectorAll(".stack-photo"),
        };
      }
      showFirstCard() {
        const nodes = this.firstCardNodes();
        if (!nodes) return;
        gsap.set(nodes.first, { y: 0, autoAlpha: 1, scale: 1 });
        gsap.set(nodes.inner, { y: 0 });
        gsap.set([nodes.heading, nodes.cta, nodes.body], {
          y: 0,
          autoAlpha: 1,
        });
        gsap.set(nodes.photos, { y: 0, autoAlpha: 1 });
      }
      resetFirstCard(force = false) {
        if (!this.el) return;
        if (!force) {
          const rect = this.el.getBoundingClientRect();
          const vh = window.innerHeight;
          if (rect.bottom > 120 && rect.top < vh - 80) return;
          if (this.tlStack?.scrollTrigger?.isActive) return;
        }
        if (this.tlReveal) {
          this.tlReveal.kill();
          this.tlReveal = null;
        }
        this.playing = false;
        this.revealed = false;
        const nodes = this.firstCardNodes();
        if (!nodes) return;
        gsap.set(nodes.inner, {
          y: Math.min(160, window.innerHeight * 0.18),
        });
        gsap.set([nodes.heading, nodes.cta, nodes.body], {
          autoAlpha: 0,
          y: 36,
        });
        gsap.set(nodes.photos, {
          y: Math.min(72, window.innerHeight * 0.08),
          autoAlpha: 0,
        });
      }
      playFirstCard() {
        if (!this.el || this.playing || this.revealed) return;
        const nodes = this.firstCardNodes();
        if (!nodes) return;
        if (this.tlReveal) {
          this.tlReveal.kill();
          this.tlReveal = null;
        }
        this.resetFirstCard(true);
        this.playing = true;
        this.revealed = true;
        this.tlReveal = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            this.playing = false;
          },
        });
        this.tlReveal
          .to(nodes.inner, { y: 0, duration: 1.15, overwrite: false }, 0)
          .to(nodes.heading, { y: 0, autoAlpha: 1, duration: 0.85 }, 0.16)
          .to(nodes.cta, { y: 0, autoAlpha: 1, duration: 0.6 }, 0.3)
          .to(
            nodes.photos,
            { y: 0, autoAlpha: 1, duration: 0.95, stagger: 0.1 },
            0.2,
          )
          .to(nodes.body, { y: 0, autoAlpha: 1, duration: 0.75 }, 0.38);
      }
      settleFirstCard() {
        if (!this.el) return;
        if (this.playing && this.tlReveal) {
          this.tlReveal.progress(1);
          this.playing = false;
          return;
        }
        if (this.revealed) return;
        const stage = this.el.querySelector(".stack-stage") || this.el;
        if (stage.getBoundingClientRect().top > viewport.h * 0.4) return;
        this.playFirstCard();
      }
      destroy() {
        if (this._onTick) {
          gsap.ticker.remove(this._onTick);
          this._onTick = null;
        }
        if (this.stReveal) {
          this.stReveal.kill();
          this.stReveal = null;
        }
        if (this.tlReveal) {
          this.tlReveal.kill();
          this.tlReveal = null;
        }
        if (this.tlStack) {
          if (this.tlStack.scrollTrigger) {
            this.tlStack.scrollTrigger.kill();
          }
          this.tlStack.kill();
          this.tlStack = null;
        }
      }
    },
    Register: class {
      constructor() {
        this.el = null;
        this.observer = null;
        this.tls = [];
      }
      trigger(data) {
        this.el = data.next.container.querySelector(".register-wrap");
        if (!this.el) return;
        this.animationReveal();
      }
      animationReveal() {
        if (!this.el || this.observer) return;
        const heading = this.el.querySelector(".register-heading");
        const sub = this.el.querySelector(".register-sub");
        const media = this.el.querySelector(".register-media");
        const mediaImg = media?.querySelector("img");
        const form = this.el.querySelector(".register-form");
        const fields = [...this.el.querySelectorAll(".register-field")];
        const submit = this.el.querySelector(".register-submit");
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const showAll = () => {
          gsap.set([heading, sub, media, ...fields, submit].filter(Boolean), {
            autoAlpha: 1,
            y: 0,
          });
          if (mediaImg) gsap.set(mediaImg, { scale: 1 });
        };
        if (reduceMotion) {
          showAll();
          return;
        }
        const rise = Math.min(72, window.innerHeight * 0.08);
        gsap.set(heading, { autoAlpha: 0, y: rise });
        gsap.set(sub, { autoAlpha: 0, y: rise * 0.45 });
        gsap.set(media, { autoAlpha: 0, y: rise });
        if (mediaImg) {
          gsap.set(mediaImg, { scale: 1.12, transformOrigin: "50% 50%" });
        }
        gsap.set(fields, { autoAlpha: 0, y: 28 });
        if (submit) gsap.set(submit, { autoAlpha: 0, y: 20 });

        const playCopy = () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.to(heading, { y: 0, autoAlpha: 1, duration: 0.95 }, 0).to(
            sub,
            { y: 0, autoAlpha: 1, duration: 0.75 },
            0.12,
          );
          this.tls.push(tl);
        };
        const playMedia = () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.to(media, { y: 0, autoAlpha: 1, duration: 1.05 }, 0).to(
            mediaImg || [],
            { scale: 1, duration: 1.2, ease: "power2.out" },
            0,
          );
          this.tls.push(tl);
        };
        const playForm = () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.to(
            fields,
            { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 },
            0,
          ).to(submit, { y: 0, autoAlpha: 1, duration: 0.6 }, 0.24);
          this.tls.push(tl);
        };

        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const node = entry.target;
              if (node.dataset.revealed === "1") return;
              node.dataset.revealed = "1";
              this.observer.unobserve(node);
              if (node === heading) playCopy();
              else if (node === media) playMedia();
              else if (node === form) playForm();
            });
          },
          { threshold: [0.08, 0.16, 0.28], rootMargin: "0px 0px -10% 0px" },
        );
        [heading, media, form].filter(Boolean).forEach((node) => {
          this.observer.observe(node);
        });
      }
      destroy() {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
        this.tls.forEach((tl) => tl.kill());
        this.tls = [];
      }
    },
    Footer: class {
      constructor() {
        this.el = null;
        this.observer = null;
        this.tls = [];
      }
      trigger(data) {
        this.el = data.next.container.querySelector(".site-footer");
        if (!this.el) return;
        this.animationReveal();
      }
      animationReveal() {
        if (!this.el || this.observer) return;
        const brand = this.el.querySelector(".site-footer-brand");
        const cols = [...this.el.querySelectorAll(".site-footer-col")];
        const media = this.el.querySelector(".site-footer-media");
        const mediaImg = media?.querySelector("img");
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const showAll = () => {
          gsap.set([brand, ...cols, media].filter(Boolean), {
            autoAlpha: 1,
            y: 0,
          });
          if (mediaImg) gsap.set(mediaImg, { y: 0, scale: 1 });
        };
        if (reduceMotion) {
          showAll();
          return;
        }
        const rise = Math.min(64, window.innerHeight * 0.07);
        gsap.set(brand, { autoAlpha: 0, y: rise });
        gsap.set(cols, { autoAlpha: 0, y: rise * 0.7 });
        gsap.set(media, { autoAlpha: 0 });
        if (mediaImg) {
          gsap.set(mediaImg, {
            y: 48,
            scale: 1.08,
            transformOrigin: "50% 80%",
          });
        }

        const playBrand = () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.to(brand, { y: 0, autoAlpha: 1, duration: 0.9 }, 0);
          this.tls.push(tl);
        };
        const playCol = (col) => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.to(col, { y: 0, autoAlpha: 1, duration: 0.75 }, 0);
          this.tls.push(tl);
        };
        const playMedia = () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.to(media, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 0);
          if (mediaImg) {
            tl.to(
              mediaImg,
              { y: 0, scale: 1, duration: 1.15, ease: "power3.out" },
              0,
            );
          }
          this.tls.push(tl);
        };

        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const node = entry.target;
              if (node.dataset.revealed === "1") return;
              node.dataset.revealed = "1";
              this.observer.unobserve(node);
              if (node === brand) playBrand();
              else if (node.classList.contains("site-footer-col"))
                playCol(node);
              else if (node === media) playMedia();
            });
          },
          { threshold: [0.08, 0.18, 0.28], rootMargin: "0px 0px -8% 0px" },
        );
        [brand, ...cols, media].filter(Boolean).forEach((node) => {
          this.observer.observe(node);
        });
      }
      destroy() {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
        this.tls.forEach((tl) => tl.kill());
        this.tls = [];
      }
    },
  };
    const BespokePage = {
        Hero: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
                this.tlOverlap = null;
            }
            setup(data, mode) {
        this.el = data.next.container.querySelector(".bes-hero-wrap");
        if (mode === "once") {
                    this.setupOnce(data);
        } else if (mode === "enter") {
                    this.setupEnter(data);
        } else return;

                this.animationScrub();
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });

                this.tlTriggerEnter = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
            start: "top bottom+=50%",
            end: "bottom top-=50%",
                        once: true,
                        onEnter: () => this.tlEnter.play(),
                        onEnterBack: () => this.tlEnter.play(),
            onStart: () =>
              $("[data-init-hidden]").removeAttr("data-init-hidden"),
          },
        });
            }
            playOnce() {
                this.tlOnce.play();
            }
      playEnter() {}
      animationReveal(timeline) {}
            animationScrub() {
        new ParallaxImage({ el: $(this.el).select(".bes-hero-main-img img") });
        new ParallaxImage({ el: $(this.el).select(".bes-hero-sub-img img") });
            }
            destroy() {
                if (this.tlOnce) {
                    this.tlOnce.kill();
                }
                if (this.tlEnter) {
                    this.tlEnter.kill();
                }
                if (this.tlTriggerEnter) {
                    this.tlTriggerEnter.kill();
                }
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
                }
            }
        },
        Nav: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".bes-nav.mix");
        this.allNav = data.next.container.querySelectorAll(".bes-nav");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
                this.interact();
            }
            interact() {
                this.scrollActive();
                if (viewport.w <= 767) {
                    this.interactMobile();
                }
            }
            scrollActive() {
        let currentID = "";
        let prevID = "";
        let allSection = $(this.el)
          .nextUntil(".bes-destin-sc")
          .selectAll(".bes-destin-sc");

                const updateActive = (id, isActive) => {
                    $(this.allNav).each((_, nav) => {
            let allLink = $(nav).selectAll(".bes-nav-item-link");
                        if (viewport.w > 991) {
                            allLink.each((idx, el) => {
                if ($(el).attr("data-sub-link") === id && currentID === id) {
                                    if (isActive) {
                                        if (prevID !== currentID) {
                                            $(this.allNav).each((_, nav) => {
                        $(nav)
                          .find(".bes-nav-active-inner")
                          .css(
                            "grid-template-rows",
                            `${idx}fr 1fr ${allLink.length - idx - 1}fr`,
                          );
                      });
                                            prevID = currentID;
                                        }
                    if (!$(nav).hasClass("expand")) {
                      $(nav).addClass("expand");
                    }
                    gsap.set($(nav).find(".bes-nav-active"), { autoAlpha: 1 });
                  } else {
                    if (
                      idx === 0 &&
                      $(nav).hasClass("expand") &&
                      smoothScroll.scroller.scrollY < viewport.h
                    ) {
                      gsap.set($(nav).find(".bes-nav-active"), {
                        autoAlpha: 0,
                      });
                      $(nav).removeClass("expand");
                    }
                  }
                }
              });
            } else {
                            allLink.each((idx, el) => {
                if ($(el).attr("data-sub-link") === id && currentID === id) {
                                    if (isActive) {
                                        if (prevID !== currentID) {
                                            prevID = currentID;
                                        }
                    if (!$(nav).hasClass("expand")) {
                      $(nav).addClass("expand");
                      $(nav).find(".bes-nav-active").slideDown();
                    }
                    $(nav)
                      .find(".bes-nav-active-text .txt")
                      .text(
                        $(nav)
                          .find(".bes-nav-item-link.w--current .txt")
                          .eq(0)
                          .text(),
                      );
                  } else {
                    if (
                      idx === 0 &&
                      $(nav).hasClass("expand") &&
                      smoothScroll.scroller.scrollY < viewport.h * 2.8
                    ) {
                      $(nav).find(".bes-nav-active").hide();
                      $(nav).find(".bes-nav-cms").slideUp();
                      $(nav).removeClass("expand");
                    }
                  }
                }
              });
            }
            $(nav)
              .find(`.bes-nav-item-link[data-sub-link='${id}']`)
              .toggleClass("w--current", isActive);
          });
        };
        smoothScroll.lenis.on("scroll", function (e) {
                    let currScroll = e.scroll;
                    const updateTOC = () => {
                        allSection.each((idx, heading) => {
                            let rect = $(heading).get(0).getBoundingClientRect();
              let id = $(heading).attr("id");
              let isActive =
                isInViewport(heading) &&
                rect.top <= window.innerHeight / 2 &&
                rect.bottom >= window.innerHeight / 2;
                            if (isActive) {
                                currentID = id;
                            }
                            updateActive(id, isActive);
                        });
          };
                    updateTOC();
                });
            }
            interactMobile() {
        $(this.allNav)
          .eq(0)
          .find(".bes-nav-active")
          .on("click", function (e) {
                    e.preventDefault();
            $(e.target).toggleClass("active");
                    $(e.target).siblings().slideToggle();
          });
        $(this.allNav)
          .eq(0)
          .find(".bes-nav-item-link")
          .on("click", (e) => {
                    e.preventDefault();
            smoothScroll.lenis.scrollTo(
              `#${$(e.currentTarget).attr("data-sub-link")}`,
              { force: true },
            );
            $(this.allNav).eq(0).find(".bes-nav-cms").slideUp();
            $(this.allNav).eq(0).find(".bes-nav-active").removeClass("active");
          });
      }
      animationScrub() {}
      animationReveal() {}
      destroy() {}
        },
        Map: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".bes-map-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.interact();
            }
      animationScrub() {}
            interact() {
                const activeIndex = (idx) => {
          $(this.el)
            .find(".bes-map-destin-item")
            .eq(idx)
            .addClass("active")
            .siblings()
            .removeClass("active");
          $(this.el)
            .find(".bes-map-location-item")
            .eq(idx)
            .addClass("active")
            .siblings()
            .removeClass("active");
        };

                if (viewport.w > 991) {
          $(this.el)
            .find(".bes-map-destin-item, .bes-map-location-item")
            .on("mouseenter", function (e) {
                        activeIndex($(this).index());
            });

          $(this.el)
            .find(".bes-map-destin-item, .bes-map-location-item")
            .on("mouseleave", (e) => {
              $(this.el).find(".bes-map-destin-item").removeClass("active");
              $(this.el).find(".bes-map-location-item").removeClass("active");
            });
        } else {
                    // $(this.el).find('.home-map-destin-item, .home-map-location-item').on('click', function(e) {
                    //     activeIndex($(this).index());
                    // })
                }

                if (viewport.w <= 991) {
                    if (viewport.w <= 767) {
            $(this.el)
              .find(".bes-map-location-list")
              .prepend($(this.el).find(".bes-map-location-item.full-map"));
            $(this.el)
              .find(".bes-map-destin-list")
              .prepend($(this.el).find(".bes-map-destin-item.full-map"));
            $(this.el)
              .find(".bes-map-location-item.full-map")
              .removeClass("full-map");
            $(this.el)
              .find(".bes-map-destin-item.full-map")
              .removeClass("full-map");
          }
          $(this.el).find(".bes-map-destin-cms").addClass("swiper");
          $(this.el).find(".bes-map-destin-list").addClass("swiper-wrapper");
          $(this.el).find(".bes-map-destin-item").addClass("swiper-slide");
          $(this.el).find(".bes-map-destin-list").css("column-gap", 0);
          let swiper = new Swiper($(this.el).select(".bes-map-destin-cms"), {
            slidesPerView: "auto",
            spaceBetween: cvUnit(viewport.w > 767 ? 20 : 16, "rem"),
                        on: {
                            init: () => viewport.w <= 767 && activeIndex(0),
                            slideChange: (slide) => {
                                let index = slide.activeIndex;
                                viewport.w <= 767 && activeIndex(index);
              },
            },
          });
                }
            }
            destroy() {
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
                }
            }
        },
        Destination: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
                this.tlScaleThumb = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".bes-destin-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
                this.tlScaleThumb = [];
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
                this.interact();
            }
            animationScrub() {
        $(this.el)
          .selectAll(".bes-destin-sc")
          .each((idx, el) => {
            new ParallaxImage({
              el: el.querySelector(".bes-destin-main-img img"),
              scaleOffset: 0.2,
            });
            new ParallaxImage({
              el: el.querySelector(".bes-destin-sub-img img"),
              scaleOffset: 0.2,
            });
            new ParallaxImage({
              el: el.querySelector(".bes-destin-cta-img img"),
              scaleOffset: 0.2,
            });
            new ParallaxImage({
              el: el.querySelector(".bes-destin-thumb img"),
            });
            this.tlScaleThumb.push(
              gsap
                        .timeline({
                            scrollTrigger: {
                    trigger: $(el).find(".bes-destin-thumb"),
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                            },
                            defaults: {
                    ease: "none",
                  },
                })
                .fromTo(
                  $(el).select(".bes-destin-thumb-inner"),
                  {
                    clipPath: `inset(14% 37.35% 14% 37.35% round ${cvUnit(12, "rem")}px)`,
                  },
                  {
                    clipPath: `inset(0% 0% 0% 0% round ${cvUnit(0, "rem")}px)`,
                  },
                )
                .fromTo(
                  $(el).select(".bes-destin-thumb-txt"),
                  { scale: 0.6, transformOrigin: "top" },
                  { scale: 1, transformOrigin: "top" },
                  "<=0.1",
                ),
            );
                    // this.tlOverlap.push(
                    //     gsap
                    //         .timeline({
                    //             scrollTrigger: {
                    //                 trigger: $(el).find('.bes-destin-thumb'),
                    //                 start: 'bottom-=50% bottom',
                    //                 end: `bottom top`,
                    //                 scrub: 1
                    //             },
                    //             defaults: {
                    //                 ease: 'none'
                    //             }
                    //         })
                    //         .to($(el).find('.bes-destin-thumb-inner'), { yPercent: -30, scale: 1.2, transformOrigin: 'top', duration: 1 }))
                    //         // .to($(el).select('.bes-destin-thumb-txt'), { scale: 1.5, duration: 1, ease: 'power2.out'  }, "<=0.1"))
            $(el)
              .find(".bes-destin-explore-item")
              .each((idx, item) => {
                let text = $(item).find("img").attr("alt");
                $(item).find(".bes-destin-explore-item-txt .txt").text(text);
              });
            $(el).find(".bes-destin-explore-cms").addClass("swiper");
            $(el).find(".bes-destin-explore-list").addClass("swiper-wrapper");
            $(el).find(".bes-destin-explore-item").addClass("swiper-slide");
            $(el).find(".bes-destin-explore-list").css("column-gap", 0);
            new Swiper($(el).select(".bes-destin-explore-cms"), {
              slidesPerView: "auto",
              spaceBetween: cvUnit(viewport.w > 767 ? 20 : 16, "rem"),
                        navigation: {
                nextEl: $(el).select(".bes-destin-explore-control-item.next"),
                prevEl: $(el).select(".bes-destin-explore-control-item.prev"),
                disabledClass: "disabled",
              },
            });
                });
                if (viewport.w > 767) {
          gsap.set($(this.el).find(".bes-destin-sc:last-child"), {
            filter: "brightness(100%) blur(0px)",
            perspective: "2000px",
            transformOrigin: "bottom",
          });
          gsap.set($(this.el).prevAll(".bes-nav"), {
            filter: "blur(0px)",
            transformOrigin: "bottom",
          });
          this.tlOverlap = gsap
            .timeline({
                        scrollTrigger: {
                            trigger: this.el,
                start: `bottom-=${cvUnit(110, "vh")} bottom`,
                            end: `bottom bottom`,
                scrub: 1,
              },
            })
            .to($(this.el).find(".bes-destin-sc:last-child"), {
              rotationX: -20,
              scale: 0.9,
              filter: `brightness(150%) blur(${cvUnit(5, "rem")}px)`,
              duration: 1,
            })
            .to(
              $(this.el).prevAll(".bes-nav"),
              {
                scale: 0.98,
                rotationX: -10,
                filter: `blur(${cvUnit(5, "rem")}px)`,
                duration: 1,
              },
              "<=0",
            );
        }
      }
      animationReveal() {}
      interact() {}
            destroy() {
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
                }
                if (this.tlScaleThumb.length > 0) {
          this.tlScaleThumb.forEach((tl) => tl.kill());
                }
            }
        },
        Fact: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".bes-fact-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
                this.interact();
            }
            animationScrub() {
                if (viewport.w > 767) {
                    this.tlStick = gsap.timeline({
                        scrollTrigger: {
                            trigger: this.el,
              start: `top+=${$(this.el).find(".bes-fact-item").height()} top`,
              end: `bottom-=${$(this.el).find(".bes-fact-item").height()} bottom`,
              scrub: 1,
            },
          });

          let heightThumb = $(this.el).find(".bes-fact-thumb-item").height();
          let cloneDesc = $(this.el)
            .find(".bes-fact-thumb-txt-inner")
            .clone()
            .removeClass("active");
          $(this.el).find(".bes-fact-thumb-txt").html("");
          $(this.el)
            .selectAll(".bes-fact-item")
            .each((idx, el) => {
              gsap.set($(this.el).selectAll(".bes-fact-thumb-item").eq(idx), {
                yPercent: idx === 0 ? 0 : 100,
              });
              gsap.set(
                $(this.el)
                  .selectAll(".bes-fact-thumb-item")
                  .eq(idx)
                  .find("img"),
                { yPercent: idx === 0 ? 0 : -30 },
                "<=0",
              );
              let desc = $(el).find(".bes-fact-item-desc .txt").html();
                        let descHTML = cloneDesc.clone().html(desc);
                        if (idx === 0) {
                descHTML.addClass("active");
                $(el).addClass("active");
                        }
              $(this.el).find(".bes-fact-thumb-txt").append(descHTML);
              if (idx < $(this.el).selectAll(".bes-fact-item").length - 1) {
                            this.tlStick
                  .to($(this.el).selectAll(".bes-fact-thumb-item").eq(idx), {
                    yPercent: -100,
                    duration: 1,
                    onUpdate: function () {
                                        if (this.ratio >= 0.5) {
                        $(el)
                          .next()
                          .addClass("active")
                          .siblings()
                          .removeClass("active");
                        descHTML
                          .next()
                          .addClass("active")
                          .siblings()
                          .removeClass("active");
                                        }
                                        if (this.ratio < 0.5) {
                        $(el)
                          .addClass("active")
                          .siblings()
                          .removeClass("active");
                        descHTML
                          .addClass("active")
                          .siblings()
                          .removeClass("active");
                                        }
                                    },
                                })
                  .to(
                    $(this.el)
                      .selectAll(".bes-fact-thumb-item")
                      .eq(idx)
                      .find("img"),
                    { yPercent: 30, duration: 1 },
                    "<=0",
                  )
                  .to(
                    $(this.el)
                      .selectAll(".bes-fact-thumb-item")
                      .eq(idx + 1),
                    { yPercent: 0, duration: 1 },
                    "<=0",
                  )
                  .to(
                    $(this.el)
                      .selectAll(".bes-fact-thumb-item")
                      .eq(idx + 1)
                      .find("img"),
                    { yPercent: 0, duration: 1 },
                    "<=0",
                  );
                        }

                        requestAnimationFrame(() => {
                const rectTop =
                  $(this.el).find(".bes-fact-main").offset().top +
                  ((this.tlStick.scrollTrigger.end -
                    this.tlStick.scrollTrigger.start) /
                    ($(this.el).selectAll(".bes-fact-item").length - 1)) *
                    idx;
                $(el).on("click", () => {
                  smoothScroll.lenis.scrollTo(rectTop, { force: true });
                });
              });
            });
        }
      }
      animationReveal() {}
            interact() {
                if (viewport.w <= 767) {
          $(this.el).find(".bes-fact-item-img img").removeAttr("loading");
                    const DOM = {
            accordion: $(this.el).find(".bes-fact-item"),
            accordionTitle: $(this.el).find(".bes-fact-item-head"),
            accordionContent: $(this.el).find(".bes-fact-item-content"),
          };
                    const activeAccordion = (index) => {
                        DOM.accordionContent.eq(index).slideToggle("slow");
                        DOM.accordion.eq(index).toggleClass("active");

            DOM.accordionContent
              .not(DOM.accordionContent.eq(index))
              .slideUp("slow");
                        DOM.accordion.not(DOM.accordion.eq(index)).removeClass("active");
          };
                    DOM.accordionTitle.on("click", function () {
                        let index = $(this).parent().index();
                        activeAccordion(index);
          });
                }
            }
      destroy() {}
        },
        Footer: class extends Footer {
      constructor() {
        super();
        }
    },
  };
    const YacthPage = {
        Hero: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
                this.tlChangeBG = null;
            }
            setup(data, mode) {
        this.el = data.next.container.querySelector(".yacth-hero-wrap");
        if (mode === "once") {
                    this.setupOnce(data);
        } else if (mode === "enter") {
                    this.setupEnter(data);
        } else return;

                this.animationScrub();
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });

                this.tlTriggerEnter = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
            start: "top bottom+=50%",
            end: "bottom top-=50%",
                        once: true,
                        onEnter: () => this.tlEnter.play(),
                        onEnterBack: () => this.tlEnter.play(),
            onStart: () =>
              $("[data-init-hidden]").removeAttr("data-init-hidden"),
          },
        });
            }
            playOnce() {
                this.tlOnce.play();
            }
      playEnter() {}
      animationReveal(timeline) {}
            animationScrub() {
        new ParallaxImage({ el: $(this.el).select(".yacth-hero-thumb img") });
                if (viewport.w > 767) {
                    this.tlChangeBG = gsap.timeline({
                        scrollTrigger: {
                            trigger: this.el,
              start: "top top",
              end: "bottom 40%",
              scrub: true,
            },
          });
                    this.tlChangeBG
            .fromTo(
              $(this.el).select(".yacth-hero"),
              { color: "#fff" },
              { color: "#003357", duration: 0.8 },
            )
            .fromTo(
              $(this.el).next(),
              { color: "#fff" },
              { color: "#000", duration: 0.5, ease: "none" },
              "<=0",
            )
                        // .fromTo($(this.el).next().next(), { color: '#000' }, { color: '#fff', duration: .5, ease: 'none' }, "<=0")
            .fromTo(
              $(this.el).select(".yacth-hero-bg"),
              { autoAlpha: 1 },
              { autoAlpha: 0, duration: 0.8 },
              "<=0.2",
            )
            .fromTo(
              $(this.el).select(".yacth-hero-sub"),
              { yPercent: 0, scale: 0.9, transformOrigin: "bottom" },
              { yPercent: 60, scale: 1, duration: 1.2 },
              "<=0.1",
            )
            .fromTo(
              $(this.el).select(".yacth-hero-thumb"),
              { yPercent: 0, scale: 1, transformOrigin: "bottom" },
              { scale: 0.95, yPercent: 12, duration: 1.2 },
              "<=0",
            );
                }
            }
            destroy() {
                if (this.tlOnce) {
                    this.tlOnce.kill();
                }
                if (this.tlEnter) {
                    this.tlEnter.kill();
                }
                if (this.tlTriggerEnter) {
                    this.tlTriggerEnter.kill();
                }
                if (this.tlChangeBG) {
                    this.tlChangeBG.kill();
                }
            }
        },
        Nav: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".yacth-nav.mix");
        this.allNav = data.next.container.querySelectorAll(".yacth-nav");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
                this.interact();
            }
            interact() {
                this.scrollActive();
                if (viewport.w <= 767) {
                    this.interactMobile();
                }
            }
            scrollActive() {
        let currentID = "";
        let prevID = "";
        let allSection = $(this.el).nextAll().selectAll("section");

                const updateActive = (id, isActive) => {
                    $(this.allNav).each((_, nav) => {
            let allLink = $(nav).selectAll(".yacth-nav-item-link");
                        if (viewport.w > 991) {
                            allLink.each((idx, el) => {
                if ($(el).attr("data-sub-link") === id && currentID === id) {
                                    if (isActive) {
                                        if (prevID !== currentID) {
                                            $(this.allNav).each((_, nav) => {
                        $(nav)
                          .find(".yacth-nav-active-inner")
                          .css(
                            "grid-template-rows",
                            `${idx}fr 1fr ${allLink.length - idx - 1}fr`,
                          );
                      });
                                            prevID = currentID;
                                        }
                    if (!$(nav).hasClass("expand")) {
                      $(nav).addClass("expand");
                    }
                    gsap.set($(nav).find(".yacth-nav-active"), {
                      autoAlpha: 1,
                    });
                  } else {
                    if (idx === 0 && $(nav).hasClass("expand")) {
                      gsap.set($(nav).find(".yacth-nav-active"), {
                        autoAlpha: 0,
                      });
                      $(nav).removeClass("expand");
                    }
                  }
                }
              });
            } else {
                            allLink.each((idx, el) => {
                if ($(el).attr("data-sub-link") === id && currentID === id) {
                                    if (isActive) {
                                        if (prevID !== currentID) {
                                            prevID = currentID;
                                        }
                    if (!$(nav).hasClass("expand")) {
                      $(nav).addClass("expand");
                      $(nav).find(".yacth-nav-active").slideDown();
                    }
                    $(nav)
                      .find(".yacth-nav-active-text .txt")
                      .text(
                        $(nav)
                          .find(".yacth-nav-item-link.w--current .txt")
                          .eq(0)
                          .text(),
                      );
                  } else {
                    if (
                      idx === 0 &&
                      $(nav).hasClass("expand") &&
                      smoothScroll.scroller.scrollY < viewport.h * 2.8
                    ) {
                      $(nav).find(".yacth-nav-active").hide();
                      $(nav).find(".yacth-nav-wrap").slideUp();
                      $(nav).removeClass("expand");
                    }
                  }
                }
              });
            }
            $(nav)
              .find(`.yacth-nav-item-link[data-sub-link='${id}']`)
              .toggleClass("w--current", isActive);
          });
        };
        smoothScroll.lenis.on("scroll", function (e) {
                    let currScroll = e.scroll;
                    const updateTOC = () => {
                        allSection.each((idx, heading) => {
                            let rect = $(heading).get(0).getBoundingClientRect();
              let id = $(heading).attr("id");
              let isActive =
                isInViewport(heading) &&
                rect.top <= window.innerHeight / 2 &&
                rect.bottom >= window.innerHeight / 2;
                            if (isActive) {
                                currentID = id;
                            }
                            updateActive(id, isActive);
                        });
          };
                    updateTOC();
                });
            }
            interactMobile() {
        $(this.allNav)
          .eq(0)
          .find(".yacth-nav-active")
          .on("click", (e) => {
                    e.preventDefault();
            $(e.target).toggleClass("active");
                    $(e.target).siblings().slideToggle();
          });
        $(this.allNav)
          .eq(0)
          .find(".yacth-nav-item-link")
          .on("click", (e) => {
                    e.preventDefault();
            smoothScroll.lenis.scrollTo(
              `#${$(e.currentTarget).attr("data-sub-link")}`,
              { force: true },
            );
            $(this.allNav).eq(0).find(".yacth-nav-wrap").slideUp();
            $(this.allNav)
              .eq(0)
              .find(".yacth-nav-active")
              .removeClass("active");
          });
      }
      animationScrub() {}
      animationReveal() {}
      destroy() {}
        },
        Intro: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
                this.tlScaleThumb = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".yacth-intro-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
                this.tlScaleThumb = [];
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
                this.interact();
            }
            animationScrub() {
        $(this.el)
          .selectAll(".yacth-intro-sc")
          .each((idx, el) => {
            new ParallaxImage({
              el: el.querySelector(".yacth-intro-main-img img"),
              scaleOffset: 0.2,
            });
            new ParallaxImage({
              el: el.querySelector(".yacth-intro-sub-img img"),
              scaleOffset: 0.2,
            });
            new ParallaxImage({
              el: el.querySelector(".yacth-intro-cta-img img"),
              scaleOffset: 0.2,
            });
            new ParallaxImage({
              el: el.querySelector(".yacth-intro-thumb img"),
            });
            this.tlScaleThumb.push(
              gsap
                        .timeline({
                            scrollTrigger: {
                    trigger: $(el).find(".yacth-intro-thumb"),
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                            },
                            defaults: {
                    ease: "none",
                  },
                })
                .fromTo(
                  $(el).select(".yacth-intro-thumb-inner"),
                  {
                    clipPath: `inset(14% 37.35% 14% 37.35% round ${cvUnit(12, "rem")}px)`,
                  },
                  {
                    clipPath: `inset(0% 0% 0% 0% round ${cvUnit(0, "rem")}px)`,
                  },
                ),
            );
            $(el)
              .find(".yacth-intro-explore-item")
              .each((idx, item) => {
                let text = $(item).find("img").attr("alt");
                $(item).find(".yacth-intro-explore-item-txt .txt").text(text);
              });
            $(el).find(".yacth-intro-explore-cms").addClass("swiper");
            $(el).find(".yacth-intro-explore-list").addClass("swiper-wrapper");
            $(el).find(".yacth-intro-explore-item").addClass("swiper-slide");
            $(el).find(".yacth-intro-explore-list").css("column-gap", 0);
            new Swiper($(el).select(".yacth-intro-explore-cms"), {
              slidesPerView: "auto",
              spaceBetween: cvUnit(viewport.w > 767 ? 20 : 16, "rem"),
                        navigation: {
                nextEl: $(el).select(".yacth-intro-explore-control-item.next"),
                prevEl: $(el).select(".yacth-intro-explore-control-item.prev"),
                disabledClass: "disabled",
              },
            });
          });
      }
      animationReveal() {}
      interact() {}
            destroy() {
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
                }
                if (this.tlScaleThumb.length > 0) {
          this.tlScaleThumb.forEach((tl) => tl.kill());
                }
            }
        },
        Design: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.rafID = null;
                this.currentIdx = 0;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".yacth-design-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
                this.interact();
            }
      animationScrub() {}
      animationReveal() {}
            interact() {
                if (viewport.w > 767) {
                    const updateActive = () => {
            let left = $(this.el)
              .find(".yacth-design-detail-tab-item")
              .eq(this.currentIdx)
              .position().left;
            let width = $(this.el)
              .find(".yacth-design-detail-tab-item")
              .eq(this.currentIdx)
              .outerWidth();
            gsap.set($(this.el).find(".yacth-design-detail-tab-active"), {
              autoAlpha: 0.5,
            });
            gsap.to($(this.el).find(".yacth-design-detail-tab-active"), {
              autoAlpha: 1,
              x: left,
              width: width,
              duration: 0.8,
              ease: "power2.inOut",
              delay: 0.1,
            });
            $(this.el)
              .find(".yacth-design-detail-tab-item")
              .removeClass("active");
            $(this.el)
              .find(".yacth-design-detail-tab-item")
              .eq(this.currentIdx)
              .addClass("active");
            $(this.el)
              .find(".yacth-design-detail-main-item")
              .removeClass("active");
            $(this.el)
              .find(".yacth-design-detail-main-item")
              .eq(this.currentIdx)
              .addClass("active");
                        if (this.currentIdx === 0) {
              $(this.el).find(".yacth-design-detail-scan").addClass("active");
                        } else {
              $(this.el)
                .find(".yacth-design-detail-scan")
                .removeClass("active");
            }

            $(this.el)
              .find(".yacth-design-detail-main-arrow.next")
              .toggleClass(
                "disabled",
                this.currentIdx ===
                  $(this.el).find(".yacth-design-detail-main-item").length - 1,
              );
            $(this.el)
              .find(".yacth-design-detail-main-arrow.prev")
              .toggleClass("disabled", this.currentIdx === 0);
          };
          $(this.el)
            .find(".yacth-design-detail-tab-item")
            .on("click", (e) => {
                        let index = $(e.target).index();
                        this.currentIdx = index;
                        updateActive();
            });
                    // $(this.el).find('.yacth-design-detail-main-item').eq(0).addClass('comparing');
          $(this.el)
            .find(".yacth-design-detail-tab-item")
            .eq(0)
            .trigger("click");
                    // this.dragTransform();
                    if (viewport.w > 767) {
            $(this.el)
              .find(".yacth-design-detail-main-tooltip-main")
              .on("pointerenter", (e) => {
                $(e.target)
                  .closest(".yacth-design-detail-main-tooltip")
                  .addClass("active")
                  .siblings()
                  .removeClass("active");
              });
            $(window).on("click", (e) => {
              if (
                !$(this.el).find(".yacth-design-detail-main-tooltip:hover")
                  .length
              )
                if (
                  $(this.el).find(".yacth-design-detail-main-tooltip.active")
                    .length
                )
                  $(this.el)
                    .find(".yacth-design-detail-main-tooltip")
                    .removeClass("active");
            });

            let zoomClone = $(this.el).find(".yacth-design-zoom").clone();
            $(this.el).find(".yacth-design-zoom").remove();

            $(".main-inner").append(zoomClone);

            $(this.el)
              .find(".yacth-design-detail-main-img")
              .on("click", (e) => {
                $(header.el).addClass("on-hide");
                $(zoomClone).addClass("active");
                let cloneEl = $(e.target).find("img").clone();
                gsap.set(cloneEl, { clearProps: "all" });
                $(zoomClone).find(".yacth-design-zoom-img-inner img").remove();
                $(zoomClone)
                  .find(".yacth-design-zoom-img-inner")
                  .append(cloneEl);
                $(zoomClone)
                  .find(".yacth-design-zoom-txt .txt")
                  .text(
                    $(e.target)
                      .parent()
                      .find(".yacth-design-detail-main-title .heading")
                      .text(),
                  );
                            smoothScroll.lenis.stop();
              });
            $(zoomClone)
              .find(".yacth-design-zoom-close")
              .on("click", () => {
                $(zoomClone).removeClass("active");
                            smoothScroll.lenis.start();
              });

                        if (viewport.w <= 991) {
              $(this.el)
                .find(".yacth-design-detail-main-close")
                .on("click", (e) => {
                  $(this.el)
                    .find(".yacth-design-detail-main-tooltip")
                    .removeClass("active");
                });
            } else {
              $(this.el)
                .find(".yacth-design-detail-main-arrow")
                .on("click", (e) => {
                  if ($(e.target).hasClass("next")) {
                                    this.currentIdx++;
                                    updateActive();
                  } else if ($(e.target).hasClass("prev")) {
                                    this.currentIdx--;
                                    updateActive();
                  } else return;
                });
                                }
                        }
        } else {
                    const DOM = {
            accordion: $(this.el).find(".yacth-design-detail-main-item"),
            accordionTitle: $(this.el).find(
              ".yacth-design-detail-main-item-title",
            ),
            accordionContent: $(this.el).find(
              ".yacth-design-detail-main-item-content",
            ),
          };
                    const activeAccordion = (index) => {
                        DOM.accordionContent.eq(index).slideToggle("slow");
                        DOM.accordion.eq(index).toggleClass("active");

            DOM.accordionContent
              .not(DOM.accordionContent.eq(index))
              .slideUp("slow");
                        DOM.accordion.not(DOM.accordion.eq(index)).removeClass("active");
          };
                    DOM.accordionTitle.on("click", function () {
                        let index = $(this).parent().index();
                        activeAccordion(index);
          });
                    activeAccordion(0);

          DOM.accordionContent
            .find(".yacth-design-detail-main-item-img-draw img")
            .removeAttr("loading");
                }
            }
            dragTransform() {
        const scanInner = $(this.el).find(".yacth-design-detail-scan").get(0);
        const track = $(this.el).find(".yacth-design-detail-scan-inner").get(0);
        const maskItem = $(this.el)
          .find(".yacth-design-detail-main-item.comparing")
          .get(0);

        $(this.el)
          .find(".yacth-design-detail-scan-inner")
          .attr({
            "data-mouse-down-at": scanInner.getBoundingClientRect().width / 2,
            "data-percentage": -50,
            "data-prev-percentage": -50,
                });

                let isOnDown = false;
                let isOnMove = false;
                let targetPercentage = -50;
                let currentPercentage = -50;
                const MOVEMENT_THRESHOLD = 2;

                const handleOnDown = (e) => {
          if (
            viewport.w > 991 &&
            !$(this.el).find(".yacth-design-detail-scan-drag-inner:hover")
              .length
          )
            return;
          const clientX = e.type.includes("touch")
            ? e.touches[0].clientX
            : e.clientX;
          track.dataset.mouseDownAt =
            clientX - scanInner.getBoundingClientRect().left;
                    track.dataset.prevPercentage = track.dataset.percentage || -50;
                    track.dataset.initialX = track.dataset.mouseDownAt;
                    isOnDown = true;
          scanInner.classList.add("is-drag");
                    if (viewport.w > 776 && viewport.w <= 991) {
            if (
              $(this.el).find(".yacth-design-detail-main-tooltip.active").length
            ) {
              $(this.el)
                .find(".yacth-design-detail-main-tooltip")
                .removeClass("active");
                        }
                    }
                };

                const handleOnUp = () => {
                    track.dataset.mouseDownAt = "0";
                    track.dataset.prevPercentage = currentPercentage;
                    isOnDown = false;
                    isOnMove = false;
          scanInner.classList.remove("is-drag");
                };

                const animate = () => {
                    if (isOnMove && track.dataset.mouseDownAt !== "0") {
            const mouseDelta =
              parseFloat(track.dataset.mouseDownAt) -
              (track.dataset.currentX || 0);
                        const maxDelta = scanInner.getBoundingClientRect().width;
                        const percentage = (mouseDelta / maxDelta) * -100;
            const nextPercentageUnconstrained =
              parseFloat(track.dataset.prevPercentage) - percentage;
            targetPercentage = Math.max(
              Math.min(nextPercentageUnconstrained, 0),
              -100,
            );
                    }

                    currentPercentage = lerp(currentPercentage, targetPercentage, 0.1);
                    track.dataset.percentage = currentPercentage;

          gsap.set([track, maskItem], {
            "--hidden-mask": `${currentPercentage * -1}%`,
          });

                    this.rafID = requestAnimationFrame(animate);
                };

                const handleOnMove = (e) => {
                    if (!isOnDown) return;

          const clientX = e.type.includes("touch")
            ? e.touches[0].clientX
            : e.clientX;
          track.dataset.currentX =
            clientX - scanInner.getBoundingClientRect().left;

          const movement = Math.abs(
            parseFloat(track.dataset.currentX) -
              parseFloat(track.dataset.initialX),
          );
                    if (movement > MOVEMENT_THRESHOLD) {
                        isOnMove = true;
                        track.dataset.mouseDownAt = track.dataset.initialX;
                    }
                };

                scanInner.onmousedown = (e) => handleOnDown(e);
                scanInner.ontouchstart = (e) => handleOnDown(e);

                scanInner.onmouseup = () => handleOnUp(e);
                scanInner.ontouchend = () => handleOnUp(e);

                scanInner.onmousemove = (e) => handleOnMove(e);
                scanInner.ontouchmove = (e) => handleOnMove(e);

                this.rafID = requestAnimationFrame(animate);
            }
            destroy() {
                cancelAnimationFrame(this.rafID);
                this.rafID = null;
            }
        },
        Footer: class extends Footer {
      constructor() {
        super();
        }
    },
  };
    const StoryPage = {
        Hero: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
            }
            setup(data, mode) {
        this.el = data.next.container.querySelector(".story-hero-wrap");
        if (mode === "once") {
                    this.setupOnce(data);
        } else if (mode === "enter") {
                    this.setupEnter(data);
        } else return;

                this.animationScrub();
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });

                this.tlTriggerEnter = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
            start: "top bottom+=50%",
            end: "bottom top-=50%",
                        once: true,
                        onEnter: () => this.tlEnter.play(),
                        onEnterBack: () => this.tlEnter.play(),
            onStart: () =>
              $("[data-init-hidden]").removeAttr("data-init-hidden"),
          },
        });
            }
            playOnce() {
                this.tlOnce.play();
            }
      playEnter() {}
      animationReveal(timeline) {}
            animationScrub() {
        new ParallaxImage({ el: $(this.el).select(".story-hero-sub-img img") });
            }
            destroy() {
                if (this.tlOnce) {
                    this.tlOnce.kill();
                }
                if (this.tlEnter) {
                    this.tlEnter.kill();
                }
                if (this.tlTriggerEnter) {
                    this.tlTriggerEnter.kill();
                }
            }
        },
        Main: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlProg = null;
                this.tlScaleThumb = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".story-main-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
                this.tlScaleThumb = [];
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
                this.interact();
            }
            animationScrub() {
                if (viewport.w > 767) {
          $(this.el)
            .selectAll(".story-main-item")
            .each((idx, el) => {
                        let isInitMainImg = false;
              if (idx < $(this.el).selectAll(".story-main-item").length - 1) {
                const clipPathFrom =
                  idx % 2 === 1
                    ? `inset(0% 100% 100% 0% round ${cvUnit(4, "rem")}px)`
                    : `inset(0% 0% 100% 100% round ${cvUnit(4, "rem")}px)`;
                const transformFrom =
                  idx % 2 === 1
                    ? { xPercent: -25, yPercent: -25 }
                    : { xPercent: 25, yPercent: -25 };
                this.tlScaleThumb.push(
                  gsap
                                .timeline({
                                    scrollTrigger: {
                                        trigger: el,
                        start: "top 90%",
                        end: "bottom 0%",
                        scrub: 0.5,
                                    },
                                    onComplete: () => {
                                        if (isInitMainImg) return;
                        if (
                          idx === 0 &&
                          $(this.el)
                            .find(".story-main-item-img img")
                            .attr("loading") === "lazy"
                        ) {
                          $(this.el)
                            .find(".story-main-item-img img")
                            .removeAttr("loading");
                                            isInitMainImg = true;
                                        }
                      },
                                })
                    .fromTo(
                      $(el).find(".story-main-item-img"),
                                    { clipPath: clipPathFrom },
                      {
                        clipPath: `inset(0% 0% 0% 0% round ${cvUnit(4, "rem")}px)`,
                        ease: "power1.inOut",
                        duration: 1,
                      },
                    )
                    .fromTo(
                      $(el).find(".story-main-item-img img"),
                                    { ...transformFrom, scale: 1.2 },
                      {
                        xPercent: 0,
                        yPercent: 0,
                        scale: 1,
                        ease: "power1.inOut",
                        duration: 1,
                      },
                      "<=0",
                    )
                    .fromTo(
                      $(el).find(".story-main-item-content"),
                      {
                        y: cvUnit(viewport.w > 991 ? 100 : 30, "rem"),
                        ease: "power1.inOut",
                      },
                      {
                        y: -cvUnit(viewport.w > 991 ? 120 : 50, "rem"),
                        ease: "power1.inOut",
                        duration: 2,
                      },
                      "<=0",
                    ),
                );
              } else {
                this.tlScaleThumb.push(
                  gsap
                                .timeline({
                                    scrollTrigger: {
                        trigger: $(el).find(".story-main-item-content"),
                                        start: `bottom 90%`,
                        end: `bottom-=${viewport.h * (viewport.w > 991 ? 0.5 : 0.3)} bottom`,
                                        endTrigger: el,
                                        scrub: 1,
                      },
                    })
                    .fromTo(
                      $(el).select(".story-main-item-img"),
                      { y: cvUnit(30, "rem") },
                      { y: 0, ease: "power1.inOut", duration: 1.2 },
                    )
                    .fromTo(
                      $(el).select(".story-main-item-content"),
                                    { y: 0 },
                      {
                        y: cvUnit(70, "rem"),
                        ease: "power1.inOut",
                        duration: 1.5,
                      },
                      "<=0",
                    )
                    .fromTo(
                      $(el).select(".story-main-item-img-inner"),
                      {
                        clipPath: `inset(${viewport.w > 991 ? "15% 25% 15% 25%" : "5% 5% 5% 5%"})`,
                      },
                      {
                        clipPath: `inset(-10% -10% -10% -10%)`,
                        ease: "power1.inOut",
                        duration: 1,
                      },
                      "<=.75",
                    )
                    .fromTo(
                      $(el).select(".story-main-item-img-inner img"),
                      { scale: 1.1 },
                      { scale: 1, ease: "power1.inOut", duration: 1.5 },
                      "<=0",
                    ),
                );
                        }
                    });
                    this.tlProg = gsap.timeline({
                        scrollTrigger: {
              trigger: $(this.el).select(".story-main-prog"),
              start: "top 60%",
              end: "bottom 15%",
              scrub: true,
            },
          });
          this.tlProg.fromTo(
            $(this.el).find(".story-main-prog-inner"),
            { scaleY: 0 },
            { scaleY: 1, ease: "none" },
          );
        } else {
          this.el
            .querySelectorAll(".story-main-item-img")
            .forEach(
              (el, idx) => new ParallaxImage({ el: el.querySelector("img") }),
            );
        }
      }
      animationReveal() {}
      interact() {}
            destroy() {
                if (this.tlProg) {
                    this.tlProg.kill();
                }
                if (this.tlScaleThumb.length > 0) {
          this.tlScaleThumb.forEach((tl) => tl.kill());
                }
            }
        },
        Today: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".story-today-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
                this.interact();
            }
            animationScrub() {
                if (viewport.w > 991) {
                    this.tlOverlap = gsap.timeline({
                        scrollTrigger: {
              trigger: $(this.el).select(".story-today-title"),
              start: "top bottom",
              end: "top top",
              scrub: 1,
            },
          });
                    this.tlOverlap
            .fromTo(
              $(this.el).select(".story-today-title"),
              { y: 0 },
              { y: -cvUnit(100, "rem"), ease: "power1.inOut", duration: 1 },
            )
            .fromTo(
              $(this.el).prev().find(".story-main-item.main"),
              { scale: 1, transformOrigin: "bottom" },
              {
                scale: 1.03,
                transformOrigin: "bottom",
                ease: "power1.inOut",
                duration: 1,
              },
              "<=0",
            )
            .to(
              $(this.el).prev().find(".story-main-grad"),
              { height: "200%", ease: "power1.inOut", duration: 1 },
              "<=0",
            );
        }

        new ParallaxImage({
          el: $(this.el).select(".story-today-main-img img"),
        });
        this.el
          .querySelectorAll(".story-today-sub-img")
          .forEach(
            (el, idx) => new ParallaxImage({ el: el.querySelector("img") }),
          );
      }
      animationReveal() {}
            interact() {
        $(this.el).find(".story-today-explore-cms").addClass("swiper");
        $(this.el).find(".story-today-explore-list").addClass("swiper-wrapper");
        $(this.el).find(".story-today-explore-item").addClass("swiper-slide");
        $(this.el).find(".story-today-explore-list").css("column-gap", 0);
        new Swiper($(this.el).select(".story-today-explore-cms"), {
          slidesPerView: "auto",
          spaceBetween: cvUnit(viewport.w > 767 ? 20 : 16, "rem"),
                    navigation: {
            nextEl: $(this.el).select(".story-today-explore-control-item.next"),
            prevEl: $(this.el).select(".story-today-explore-control-item.prev"),
            disabledClass: "disabled",
          },
        });
            }
            destroy() {
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
                }
            }
        },
        Footer: class extends Footer {
      constructor() {
        super();
        }
    },
  };
    const SchedulePage = {
        Hero: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
            }
            setup(data, mode) {
        this.el = data.next.container.querySelector(".sr-hero-wrap");
        if (mode === "once") {
                    this.setupOnce(data);
        } else if (mode === "enter") {
                    this.setupEnter(data);
        } else return;

                this.animationScrub();
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });

                this.tlTriggerEnter = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
            start: "top bottom+=50%",
            end: "bottom top-=50%",
                        once: true,
                        onEnter: () => this.tlEnter.play(),
                        onEnterBack: () => this.tlEnter.play(),
            onStart: () =>
              $("[data-init-hidden]").removeAttr("data-init-hidden"),
          },
        });
            }
            playOnce() {
                this.tlOnce.play();
            }
      playEnter() {}
      animationReveal(timeline) {}
      animationScrub() {}
            destroy() {
                if (this.tlOnce) {
                    this.tlOnce.kill();
                }
                if (this.tlEnter) {
                    this.tlEnter.kill();
                }
                if (this.tlTriggerEnter) {
                    this.tlTriggerEnter.kill();
                }
            }
        },
        Nav: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".sr-nav.mix");
        this.allNav = data.next.container.querySelectorAll(".sr-nav");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.interact();
            }
            interact() {
                if (viewport.w > 991) {
                    this.scrollActive();
                }
            }
            scrollActive() {
        let currentID = "";
        let prevID = "";
        let allSection = $(this.el).nextAll().selectAll("section");

                const updateActive = (id, isActive) => {
                    $(this.allNav).each((_, nav) => {
            let allLink = $(nav).selectAll(".sr-nav-item-link");
                        allLink.each((idx, el) => {
              if ($(el).attr("data-sub-link") === id && currentID === id) {
                                if (isActive) {
                                    if (prevID !== currentID) {
                                        $(this.allNav).each((_, nav) => {
                      $(nav)
                        .find(".sr-nav-active-inner")
                        .css(
                          "grid-template-rows",
                          `${idx}fr 1fr ${allLink.length - idx - 1}fr`,
                        );
                    });
                                        prevID = currentID;
                                    }
                  if (!$(nav).hasClass("expand")) {
                    $(nav).addClass("expand");
                  }
                  gsap.set($(nav).find(".sr-nav-active"), { autoAlpha: 1 });
                } else {
                  if (idx === 0 && $(nav).hasClass("expand")) {
                    gsap.set($(nav).find(".sr-nav-active"), {
                      autoAlpha: 0,
                    });
                    $(nav).removeClass("expand");
                  }
                }
              }
            });
            $(nav)
              .find(`.sr-nav-item-link[data-sub-link='${id}']`)
              .toggleClass("w--current", isActive);
          });
        };
        smoothScroll.lenis.on("scroll", function (e) {
                    let currScroll = e.scroll;
                    const updateTOC = () => {
                        allSection.each((idx, heading) => {
                            let rect = $(heading).get(0).getBoundingClientRect();
              let id = $(heading).attr("id");
              let isActive =
                isInViewport(heading) &&
                rect.top <= window.innerHeight / 2 &&
                rect.bottom >= window.innerHeight / 2;
                            if (isActive) {
                                currentID = id;
                            }
                            updateActive(id, isActive);
                        });
          };
                    updateTOC();
                });
            }
        },
        Main: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlScaleThumb = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".sr-main-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.setup();
                this.filter();
            }
            animationScrub() {
                if (viewport.w > 991) {
          new ParallaxImage({
            el: $(this.el).select(".sr-main-thumb-inner.inset img"),
            scaleOffset: 0.2,
          });
                    this.tlScaleThumb = gsap
                            .timeline({
                                scrollTrigger: {
                trigger: $(this.el).select(".sr-main-thumb-inner.inset"),
                start: `top ${$(this.el).find(".sr-main-thumb-inner.inset").offset().top}`,
                end: "bottom bottom",
                scrub: true,
                                },
                                defaults: {
                ease: "none",
              },
            })
            .to($(this.el).select(".sr-main-thumb-inner.inset"), {
              clipPath: `inset(0px 0px 0px 0px)`,
            })
            .fromTo(
              $(this.el).select(
                ".sr-main-thumb-inner.inset ~ .sr-main-thumb-txt",
              ),
              { scale: 0.9, transformOrigin: "top", autoAlpha: 0 },
              { scale: 1, transformOrigin: "top", autoAlpha: 1 },
              "<=0",
            );
        } else {
          $(this.el)
            .find(".sr-main-thumb img")
            .each((idx, img) => {
              new ParallaxImage({ el: $(img).get(0), scaleOffset: 0.2 });
            });
          $(this.el)
            .find(".sr-main-pricing-img img")
            .each((idx, img) => {
              new ParallaxImage({ el: $(img).get(0), scaleOffset: 0.2 });
                    });
                }
            }
            setup() {
                let getCurrentYear = new Date().getFullYear();
        let dropdownYearClone = $(this.el)
          .find("[data-filter=year] .select-dropdown-opt")
          .eq(0)
          .clone();
        $(this.el).find("[data-filter=year] .select-dropdown-opts").empty();

        [...Array(3).keys()]
          .map((i) => getCurrentYear + i)
          .forEach((year) => {
                    let html = dropdownYearClone.clone();
            html.find(".txt").text(year);
            html.find("input").attr({
              value: year,
              id: year,
              "fs-list-value": year,
            });
            $(this.el)
              .find("[data-filter=year] .select-dropdown-opts")
              .append(html);
          });
            }
            filter() {
                const dropdownAction = {
                    open: (parent) => {
            const selector = (child) => (parent ? parent(child) : $(child));
            selector().addClass("active");
            selector(".select-dropdown-opts").addClass("active");
            selector(".select-dropdown-toggle").addClass("active");
                        // selector('.dropdown-select').slideDown();
                    },
                    close: (parent) => {
            const selector = (child) => (parent ? parent(child) : $(child));
            selector().removeClass("active");
            selector(".select-dropdown-opts").removeClass("active");
            selector(".select-dropdown-toggle").removeClass("active");
                    },
                    toggle: (parent) => {
            parent().toggleClass("active");
                        // $(this.el).find(`.select-field-grp`).not(parent()).removeClass('active');

            parent(".select-dropdown-opts").toggleClass("active");
            $(this.el)
              .find(`.select-dropdown-opts`)
              .not(parent(".select-dropdown-opts"))
              .removeClass("active");

            parent(".select-dropdown-toggle").toggleClass("active");
            $(this.el)
              .find(`.select-dropdown-toggle`)
              .not(parent(".select-dropdown-toggle"))
              .removeClass("active");
          },
        };

        $(`.input-field-grp .input-field.type-select`).attr(
          "readonly",
          "readonly",
        );
        $(this.el)
          .find(".select-dropdown-opt")
          .on("click", function (e) {
            const parent = childSelect($(this).parents(".select-field-grp"));
            $(this).addClass("active").siblings().removeClass("active");
                    let valText = $(this).text();
            parent(".input-field.type-select").val(valText);
                    // dropdownAction.close(parent);
          });
        $(this.el)
          .find(".input-field-grp .input-field")
          .bind("change keydown keyup", function (e) {
            $(this)
              .closest(".input-field-grp")
              .toggleClass("filled", $(this).val() != "");
          });
        $(this.el)
          .find(".input-field-grp .select-dropdown-toggle")
          .on("click", function (e) {
            const parent = childSelect($(this).parents(".input-field-grp"));
                    dropdownAction.toggle(parent);
          });
        $(this.el)
          .find(".input-field-grp .input-field")
          .on("blur", function (e) {
            const parent = childSelect($(this).parents(".input-field-grp"));

            $(this).closest(".input-field-grp").removeClass("active");
            $(this)
              .closest(".input-field-grp")
              .toggleClass("filled", $(this).val() != "");
            if ($(this).hasClass("type-select")) {
                        // setTimeout(() => dropdownAction.close(parent), 100);
                    }
          });
        $(window).on("click", function (e) {
          if (!$(e.target).closest(".input-field-grp").length) {
                        dropdownAction.close();
                    }
        });

                window.FinsweetAttributes ||= [];
                window.FinsweetAttributes.push([
          "list",
                    (listInstances) => {
                        listInstances.forEach((listInstance, index) => {
                            let instance = listInstance.instance;
              listInstance.addHook("afterRender", () => {
                                const totalPages = listInstance.totalPages.value;
                const paginationElement = $(this.el).find(
                  `[fs-list-instance="${instance}"] .w-pagination-wrapper`,
                );
                $(paginationElement).toggleClass("hidden", totalPages === 1);
                            });
                        });
                    },
                ]);
            }
            destroy() {
                if (this.tlScaleThumb) {
                    this.tlScaleThumb.kill();
                }
            }
        },
        Footer: class extends Footer {
      constructor() {
        super();
        }
    },
  };
    const AdvisorPage = {
        Hero: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
            }
            setup(data, mode) {
        this.el = data.next.container.querySelector(".advisor-hero-wrap");
        if (mode === "once") {
                    this.setupOnce(data);
        } else if (mode === "enter") {
                    this.setupEnter(data);
        } else return;

                this.animationScrub();
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });

                this.tlTriggerEnter = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
            start: "top bottom+=50%",
            end: "bottom top-=50%",
                        once: true,
                        onEnter: () => this.tlEnter.play(),
                        onEnterBack: () => this.tlEnter.play(),
            onStart: () =>
              $("[data-init-hidden]").removeAttr("data-init-hidden"),
          },
        });
            }
            playOnce() {
                this.tlOnce.play();
            }
      playEnter() {}
      animationReveal(timeline) {}
            animationScrub() {
        $(this.el)
          .find(".advisor-hero-thumb img")
          .each((idx, img) => {
            new ParallaxImage({ el: $(img).get(0), scaleOffset: 0.2 });
                });
            }
            destroy() {
                if (this.tlOnce) {
                    this.tlOnce.kill();
                }
                if (this.tlEnter) {
                    this.tlEnter.kill();
                }
                if (this.tlTriggerEnter) {
                    this.tlTriggerEnter.kill();
                }
            }
        },
        Library: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".advisor-lib-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
            }
            animationScrub() {
        $(this.el)
          .find(".advisor-lib-main-img img")
          .each((idx, img) => {
            new ParallaxImage({ el: $(img).get(0), scaleOffset: 0.15 });
          });
      }
      destroy() {}
        },
        Main: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".advisor-schedule-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.filter();
            }
      animationScrub() {}
            filter() {
                const dropdownAction = {
                    open: (parent) => {
            const selector = (child) => (parent ? parent(child) : $(child));
            selector().addClass("active");
            selector(".select-dropdown-opts").addClass("active");
            selector(".select-dropdown-toggle").addClass("active");
                        // selector('.dropdown-select').slideDown();
                    },
                    close: (parent) => {
            const selector = (child) => (parent ? parent(child) : $(child));
            selector().removeClass("active");
            selector(".select-dropdown-opts").removeClass("active");
            selector(".select-dropdown-toggle").removeClass("active");
                    },
                    toggle: (parent) => {
            parent().toggleClass("active");
                        // $(this.el).find(`.select-field-grp`).not(parent()).removeClass('active');

            parent(".select-dropdown-opts").toggleClass("active");
            $(this.el)
              .find(`.select-dropdown-opts`)
              .not(parent(".select-dropdown-opts"))
              .removeClass("active");

            parent(".select-dropdown-toggle").toggleClass("active");
            $(this.el)
              .find(`.select-dropdown-toggle`)
              .not(parent(".select-dropdown-toggle"))
              .removeClass("active");
          },
        };

        $(`.input-field-grp .input-field.type-select`).attr(
          "readonly",
          "readonly",
        );
        $(this.el)
          .find(".select-dropdown-opt")
          .on("click", function (e) {
            const parent = childSelect($(this).parents(".select-field-grp"));
            $(this).addClass("active").siblings().removeClass("active");
                    let valText = $(this).text();
            parent(".input-field.type-select").val(valText);
                    dropdownAction.close(parent);
          });
        $(this.el)
          .find(".input-field-grp .input-field")
          .bind("change keydown keyup", function (e) {
            $(this)
              .closest(".input-field-grp")
              .toggleClass("filled", $(this).val() != "");
          });
        $(this.el)
          .find(".input-field-grp .input-field")
          .on("focus", function (e) {
            const parent = childSelect($(this).parents(".input-field-grp"));
            $(this).closest(".input-field-grp").addClass("active");
            if ($(this).hasClass("type-select")) {
                        dropdownAction.open(parent);
                    }
          });
        $(this.el)
          .find(".input-field-grp .input-field")
          .on("blur", function (e) {
            const parent = childSelect($(this).parents(".input-field-grp"));

            $(this).closest(".input-field-grp").removeClass("active");
            $(this)
              .closest(".input-field-grp")
              .toggleClass("filled", $(this).val() != "");
            if ($(this).hasClass("type-select")) {
                        setTimeout(() => dropdownAction.close(parent), 100);
                    }
          });

                window.FinsweetAttributes ||= [];
                window.FinsweetAttributes.push([
          "list",
                    (listInstances) => {
                        listInstances.forEach((listInstance, index) => {
                            let instance = listInstance.instance;
              listInstance.addHook("afterRender", () => {
                                const totalPages = listInstance.totalPages.value;
                const paginationElement = $(this.el).find(
                  `[fs-list-instance="${instance}"] .w-pagination-wrapper`,
                );
                $(paginationElement).toggleClass("hidden", totalPages === 1);
                            });
                        });
                    },
                ]);
            }
      destroy() {}
        },
        Footer: class extends Footer {
      constructor() {
        super();
        }
    },
  };
    const JournalsPage = {
        Hero: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
            }
            setup(data, mode) {
        this.el = data.next.container.querySelector(".journal-hero-wrap");
        if (mode === "once") {
                    this.setupOnce(data);
        } else if (mode === "enter") {
                    this.setupEnter(data);
        } else return;

                this.animationScrub();
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });

                this.tlTriggerEnter = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
            start: "top bottom+=50%",
            end: "bottom top-=50%",
                        once: true,
                        onEnter: () => this.tlEnter.play(),
                        onEnterBack: () => this.tlEnter.play(),
            onStart: () =>
              $("[data-init-hidden]").removeAttr("data-init-hidden"),
          },
        });
            }
            playOnce() {
                this.tlOnce.play();
            }
      playEnter() {}
      animationReveal(timeline) {}
      animationScrub() {}
            destroy() {
                if (this.tlOnce) {
                    this.tlOnce.kill();
                }
                if (this.tlEnter) {
                    this.tlEnter.kill();
                }
                if (this.tlTriggerEnter) {
                    this.tlTriggerEnter.kill();
                }
            }
        },
        Main: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".journal-main-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
            }
            animationScrub() {
        new ParallaxImage({
          el: $(this.el).select(".journal-main-popular-thumb img"),
        });
        $(this.el)
          .find(".journal-main-other-img img")
          .each((idx, img) => {
            new ParallaxImage({ el: $(img).get(0), scaleOffset: 0.2 });
          });
      }
      destroy() {}
        },
        Article: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".journal-article-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
                this.interact();
            }
      animationScrub() {}
      animationReveal() {}
            interact() {
        $(this.el).find(".journal-article-main-cms").addClass("swiper");
        $(this.el)
          .find(".journal-article-main-list")
          .addClass("swiper-wrapper");
        $(this.el).find(".journal-article-main-item").addClass("swiper-slide");
        $(this.el).find(".journal-article-main-list").css("column-gap", 0);
        let swiper = new Swiper(
          $(this.el).select(".journal-article-main-cms"),
          {
            slidesPerView: "auto",
            spaceBetween: cvUnit(viewport.w > 767 ? 20 : 16, "rem"),
                    navigation: {
              nextEl: $(this.el).select(".journal-article-control-item.next"),
              prevEl: $(this.el).select(".journal-article-control-item.prev"),
              disabledClass: "disabled",
            },
          },
        );
      }
      destroy() {}
        },
        Footer: class extends Footer {
      constructor() {
        super();
        }
    },
  };
    const JournalPage = {
        Content: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".journal-content-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
            }
            animationScrub() {
        $(this.el)
          .find(".journal-content-richtext img")
          .each((idx, img) => {
            new ParallaxImage({ el: $(img).get(0), scaleOffset: 0.2 });
          });
      }
      destroy() {}
        },
        Article: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
        this.el = data.next.container.querySelector(".journal-article-wrap");
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
                this.interact();
            }
      animationScrub() {}
      animationReveal() {}
            interact() {
        $(this.el).find(".journal-article-main-cms").addClass("swiper");
        $(this.el)
          .find(".journal-article-main-list")
          .addClass("swiper-wrapper");
        $(this.el).find(".journal-article-main-item").addClass("swiper-slide");
        $(this.el).find(".journal-article-main-list").css("column-gap", 0);
        let swiper = new Swiper(
          $(this.el).select(".journal-article-main-cms"),
          {
            slidesPerView: "auto",
            spaceBetween: cvUnit(viewport.w > 767 ? 20 : 16, "rem"),
                    navigation: {
              nextEl: $(this.el).select(".journal-article-control-item.next"),
              prevEl: $(this.el).select(".journal-article-control-item.prev"),
              disabledClass: "disabled",
            },
          },
        );
      }
      destroy() {}
        },
        Footer: class extends Footer {
      constructor() {
        super();
        }
    },
  };
    const ContactPage = {
        Main: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
            }
            setup(data, mode) {
        this.el = data.next.container.querySelector(".contact-main-wrap");
        if (mode === "once") {
                    this.setupOnce(data);
        } else if (mode === "enter") {
                    this.setupEnter(data);
        } else return;

                this.interact();
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });

                this.tlTriggerEnter = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
            start: "top bottom+=50%",
            end: "bottom top-=50%",
                        once: true,
                        onEnter: () => this.tlEnter.play(),
                        onEnterBack: () => this.tlEnter.play(),
            onStart: () =>
              $("[data-init-hidden]").removeAttr("data-init-hidden"),
          },
        });
            }
            playOnce() {
                this.tlOnce.play();
            }
      playEnter() {}
      animationReveal(timeline) {}
      animationScrub() {}
            interact() {
                const dropdownAction = {
                    open: (parent) => {
            const selector = (child) => (parent ? parent(child) : $(child));
            selector().addClass("active");
            selector(".select-dropdown-opts").addClass("active");
            selector(".select-dropdown-toggle").addClass("active");
                        // selector('.dropdown-select').slideDown();
                    },
                    close: (parent) => {
            const selector = (child) => (parent ? parent(child) : $(child));
            selector().removeClass("active");
            selector(".select-dropdown-opts").removeClass("active");
            selector(".select-dropdown-toggle").removeClass("active");
                    },
                    toggle: (parent) => {
            parent().toggleClass("active");
                        // $(this.el).find(`.select-field-grp`).not(parent()).removeClass('active');

            parent(".select-dropdown-opts").toggleClass("active");
            $(this.el)
              .find(`.select-dropdown-opts`)
              .not(parent(".select-dropdown-opts"))
              .removeClass("active");

            parent(".select-dropdown-toggle").toggleClass("active");
            $(this.el)
              .find(`.select-dropdown-toggle`)
              .not(parent(".select-dropdown-toggle"))
              .removeClass("active");
          },
        };
        $(`.input-field-grp .input-field.type-select`).attr(
          "readonly",
          "readonly",
        );

        $(this.el)
          .find(".select-dropdown-opt")
          .on("click", function (e) {
            const parent = childSelect($(this).parents(".select-field-grp"));
            $(this).addClass("active").siblings().removeClass("active");
                    let valText = $(this).text();
            parent(".input-field.type-select").val(valText);
                    dropdownAction.close(parent);
          });
        $(this.el)
          .find(".input-field-grp .input-field")
          .bind("change keydown keyup", function (e) {
            $(this)
              .closest(".input-field-grp")
              .toggleClass("filled", $(this).val() != "");
          });
        $(this.el)
          .find(".input-field-grp .input-field")
          .on("focus", function (e) {
            const parent = childSelect($(this).parents(".input-field-grp"));
            $(this).closest(".input-field-grp").addClass("active");
            if ($(this).hasAttr("ms-code-phone-number")) {
              if (
                !$(this)
                  .closest(".input-field-grp")
                  .hasAttr("data-lenis-prevent")
              ) {
                $(this)
                  .closest(".input-field-grp")
                  .attr("data-lenis-prevent", "");
              }
              parent(".iti__country-list").css("width", parent().width());
            } else if ($(this).hasClass("type-select")) {
                        dropdownAction.open(parent);
                    }
          });
        $(this.el)
          .find(".input-field-grp .input-field")
          .on("blur", function (e) {
            const parent = childSelect($(this).parents(".input-field-grp"));

            if ($(this).hasAttr("ms-code-phone-number")) {
              if (!$(this).parent().find(".iti__flag-container:hover").length) {
                $(this).closest(".input-field-grp").removeClass("active");
                $(this)
                  .closest(".input-field-grp")
                  .toggleClass("filled", $(this).val() != "");
              }
            } else {
              $(this).closest(".input-field-grp").removeClass("active");
              $(this)
                .closest(".input-field-grp")
                .toggleClass("filled", $(this).val() != "");
              if ($(this).hasClass("type-select")) {
                            setTimeout(() => dropdownAction.close(parent), 100);
                        }
                    }
          });

        $(this.el)
          .find(`.input-field-grp [ms-code-phone-number]`)
          .each(function () {
                    let input = this;
                    let preferredCountries = ["sg"];

                    let iti = window.intlTelInput(input, {
                        preferredCountries: preferredCountries,
              utilsScript:
                "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                    });

            $.get(
              "https://ipinfo.io",
              function (response) {
                        var countryCode = response.country;
                        iti.setCountry(countryCode);
              },
              "jsonp",
            );

            input.addEventListener("change", formatPhoneNumber);
            input.addEventListener("keyup", formatPhoneNumber);

                    // Restrict input to digits and the plus sign
            input.addEventListener("input", function () {
              this.value = this.value.replace(/[^\d+]/g, "");
                    });

                    function formatPhoneNumber() {
              let formattedNumber = iti.getNumber(
                intlTelInputUtils.numberFormat.INTERNATIONAL,
              );
                        input.value = formattedNumber;
                    }

                    // var form = $(input).closest('form');
                    // form.submit(function() {
                    //     var formattedNumber = iti.getNumber(intlTelInputUtils.numberFormat.INTERNATIONAL);
                    //     input.value = formattedNumber;
                    // });
                });

                setTimeout(() => {
          $(this.el)
            .find(".iti__country-list")
            .css(
              "width",
              $(this.el)
                .find(".iti__country-list")
                .closest(".input-field-grp")
                .width(),
            );
          $(this.el)
            .find(".input-field-grp .input-field[ms-code-phone-number]")
            .parent()
            .attr("data-lenis-prevent", "");
                }, 1000);

        let arr = [];
        $(this.el)
          .find(".multiple-opt")
          .on("click", function () {
            const parent = childSelect($(this).parents(".input-field-grp"));

                    let valText = $(this).text();
            if (!$(this).hasClass("active")) {
              $(this).addClass("active");
                        arr.push(valText);
              parent(".input-field.type-select").val(valText);
            } else {
              $(this).removeClass("active");
              arr.splice(arr.indexOf(valText), 1);
            }
            parent(".input-field").val(arr.join(", "));
          });

                const onSuccessForm = (formID) => {
                    setTimeout(() => {
            $(this.el).find(formID).trigger("reset");
            $(this.el).find(".input-field-grp").removeClass("filled");
            $(this.el).find(".select-dropdown-opt").removeClass("active");
            $(this.el).find(".multiple-opt").removeClass("active");
                    }, 1000);
        };

                formSubmitEvent.init({
          onlyWorkOnThisFormName: "Contact form",
          onSuccess: () => onSuccessForm("#contact-form"),
        });
        $('input[type="submit"]').on("pointerenter", function () {
          if ($(this).prop("disabled")) {
            $(this).prop("disabled", false);
                    }
                });
            }
            destroy() {
                if (this.tlOnce) {
                    this.tlOnce.kill();
                }
                if (this.tlEnter) {
                    this.tlEnter.kill();
                }
                if (this.tlTriggerEnter) {
                    this.tlTriggerEnter.kill();
                }
            }
        },
  };

    const ThanksPage = {
        Main: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
            }
            setup(data, mode) {
        this.el = data.next.container.querySelector(".contact-main-wrap");
        if (mode === "once") {
                    this.setupOnce(data);
        } else if (mode === "enter") {
                    this.setupEnter(data);
        } else return;
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });

                this.tlTriggerEnter = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
            start: "top bottom+=50%",
            end: "bottom top-=50%",
                        once: true,
                        onEnter: () => this.tlEnter.play(),
                        onEnterBack: () => this.tlEnter.play(),
            onStart: () =>
              $("[data-init-hidden]").removeAttr("data-init-hidden"),
          },
        });
            }
            playOnce() {
                this.tlOnce.play();
            }
      playEnter() {}
      animationReveal(timeline) {}
      animationScrub() {}
            destroy() {
                if (this.tlOnce) {
                    this.tlOnce.kill();
                }
                if (this.tlEnter) {
                    this.tlEnter.kill();
                }
                if (this.tlTriggerEnter) {
                    this.tlTriggerEnter.kill();
                }
            }
        },
  };
    const TermPage = {
        Main: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
                this.tlChangeBG = null;
            }
            setup(data, mode) {
        this.el = data.next.container.querySelector(".term-main-wrap");
        if (mode === "once") {
                    this.setupOnce(data);
        } else if (mode === "enter") {
                    this.setupEnter(data);
        } else return;

                this.interact();
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
          onStart: () => $("[data-init-hidden]").removeAttr("data-init-hidden"),
        });

                this.tlTriggerEnter = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
            start: "top bottom+=50%",
            end: "bottom top-=50%",
                        once: true,
                        onEnter: () => this.tlEnter.play(),
                        onEnterBack: () => this.tlEnter.play(),
            onStart: () =>
              $("[data-init-hidden]").removeAttr("data-init-hidden"),
          },
        });
            }
            playOnce() {
                this.tlOnce.play();
            }
      playEnter() {}
      animationReveal(timeline) {}
      animationScrub() {}
            interact() {
                if (viewport.w > 991) {
                    this.handleTOC();
                }
            }
            handleTOC() {
        let tocClone = $(this.el)
          .find(".term-main-content-toc-item")
          .eq(0)
          .clone()
          .removeClass("active");
        let headings = $(this.el).find(".term-main-content-richtext h2");
        $(this.el).find(".term-main-content-toc-list").html("");
                if (headings.length === 1) {
          $(this.el).find(".term-main-content-toc").remove();
                    // $(this.el).find('.term-main-title').css('grid-area', '1/3/3/9');
        } else {
          $(this.el)
            .find(".term-main-content-toc-active")
            .css("--count-item", headings.length);
                    // $(this.el).find('.term-main-content-toc-active-inner').css('grid-template-rows', `${0}fr 1fr ${headings.length - 1}fr`)
                    headings.each((idx, heading) => {
            let text = $(heading)
              .text()
              .replace(/^\d+\.\s*/, "")
              .replace(/\s*\([^)]*\)/g, "");
            let id = text
              .toLowerCase()
              .trim()
              .replace(/[\s\W-]+/g, "-")
              .replace(/^-+|-+$/g, "");
                        let link = tocClone.clone();

            $(heading).attr("id", id);
            link.attr("href", `#${id}`);
            link.attr("data-sub-link", id);
            link.find(".text-flip-txt").text(text);
            $(this.el).find(".term-main-content-toc-list").append(link);
          });
                    const updateActive = (id) => {
            let activeItem = $(this.el).find(
              `.term-main-content-toc-item[data-sub-link='${id}']`,
            );
            activeItem.addClass("w--current");
            $(this.el)
              .find(`.term-main-content-toc-item`)
              .not(activeItem)
              .removeClass("w--current");
                        let idx = activeItem.index();
            $(this.el)
              .find(".term-main-content-toc-active-inner")
              .css(
                "grid-template-rows",
                `${idx}fr 1fr ${headings.length - idx - 1}fr`,
              );
          };
          smoothScroll.lenis.on("scroll", function (e) {
                        let currScroll = e.scroll;
                        const updateHeadings = debounce(() => {
                            headings.each(function (idx, heading) {
                                let top = $(this).get(0).getBoundingClientRect().top;
                let id = $(this).attr("id");
                if (top > 0 && top < viewport.h / 5) {
                                    updateActive(id);
                                }
                            });
                        }, 600);

                        updateHeadings();
                    });
          updateActive(headings.eq(0).attr("id"));
                }
            }
            destroy() {
                if (this.tlOnce) {
                    this.tlOnce.kill();
                }
                if (this.tlEnter) {
                    this.tlEnter.kill();
                }
                if (this.tlTriggerEnter) {
                    this.tlTriggerEnter.kill();
                }
                if (this.tlChangeBG) {
                    this.tlChangeBG.kill();
                }
            }
        },
        Footer: class extends Footer {
      constructor() {
        super();
        }
    },
  };

    class PageManager {
        constructor(page) {
      this.sections = Object.values(page).map((section) => new section());

            // Bind event handlers
            this.boundSetupHandler = this.setupHandler.bind(this);
            this.boundOncePlayHandler = this.oncePlayHandler.bind(this);
            this.boundEnterPlayHandler = this.enterPlayHandler.bind(this);
        }

        initOnce(data) {
            const container = data.next.container;
            container.addEventListener("onceSetup", (event) => {
        this.boundSetupHandler({ detail: event.detail, mode: "once" });
            });
            container.addEventListener("oncePlay", this.boundOncePlayHandler);
        }

        initEnter(data) {
            const container = data.next.container;
            container.addEventListener("enterSetup", (event) => {
        this.boundSetupHandler({ detail: event.detail, mode: "enter" });
            });
            container.addEventListener("enterPlay", this.boundEnterPlayHandler);
        }

        oncePlayHandler(event) {
      this.sections.forEach((section) => {
                if (section.playOnce) {
                    section.playOnce(event.detail);
                }
            });
        }

        enterPlayHandler(event) {
      this.sections.forEach((section) => {
                if (section.playEnter) {
                    section.playEnter(event.detail);
                }
            });
        }

        setupHandler(event) {
            const data = event.detail;
            const mode = event.mode;
      this.sections.forEach((section) => {
                if (section.trigger) {
                    section.trigger(data);
                }
                if (section.setup) {
                    section.setup(data, mode);
                }
            });
      if (typeof ScrollTrigger !== "undefined") {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
        }

        destroy(data) {
            const container = data.next.container;
            container.removeEventListener("onceSetup", this.boundSetupHandler);
            container.removeEventListener("oncePlay", this.boundOncePlayHandler);
            container.removeEventListener("enterSetup", this.boundSetupHandler);
            container.removeEventListener("enterPlay", this.boundEnterPlayHandler);

      this.sections.forEach((section) => {
                if (section.destroy) {
                    section.destroy();
                }
                if (section.cleanTrigger) {
                    section.cleanTrigger();
                }
            });
        }
    }
    class HomePageManager extends PageManager {
    constructor(page) {
      super(page);
    }
    }
    class BespokePageManager extends PageManager {
    constructor(page) {
      super(page);
    }
    }
    class YacthPageManager extends PageManager {
    constructor(page) {
      super(page);
    }
    }
    class StoryPageManager extends PageManager {
    constructor(page) {
      super(page);
    }
    }
    class SchedulePageManager extends PageManager {
    constructor(page) {
      super(page);
    }
    }
    class AdvisorPageManager extends PageManager {
    constructor(page) {
      super(page);
    }
    }
    class JournalsPageManager extends PageManager {
    constructor(page) {
      super(page);
    }
    }
    class JournalPageManager extends PageManager {
    constructor(page) {
      super(page);
    }
    }
    class ContactPageManager extends PageManager {
    constructor(page) {
      super(page);
    }
    }
    class ThanksPageManager extends PageManager {
    constructor(page) {
      super(page);
    }
    }
    class TermPageManager extends PageManager {
    constructor(page) {
      super(page);
    }
    }
    const PageManagerRegistry = {
        home: new HomePageManager(HomePage),
        bespoke: new BespokePageManager(BespokePage),
        yacth: new YacthPageManager(YacthPage),
        story: new StoryPageManager(StoryPage),
        schedule: new SchedulePageManager(SchedulePage),
        advisor: new AdvisorPageManager(AdvisorPage),
        journals: new JournalsPageManager(JournalsPage),
        journal: new JournalPageManager(JournalPage),
        contact: new ContactPageManager(ContactPage),
        thanks: new ThanksPageManager(ThanksPage),
    term: new TermPageManager(TermPage),
    };
    const SCRIPT = {
        home: {
      namespace: "home",
            afterEnter(data) {
                PageManagerRegistry.home.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.home.destroy(data);
      },
        },
        bespoke: {
      namespace: "bespoke",
            afterEnter(data) {
                PageManagerRegistry.bespoke.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.bespoke.destroy(data);
      },
        },
        yacth: {
      namespace: "yacth",
            afterEnter(data) {
                PageManagerRegistry.yacth.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.yacth.destroy(data);
      },
        },
        story: {
      namespace: "story",
            afterEnter(data) {
                PageManagerRegistry.story.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.story.destroy(data);
      },
        },
        schedule: {
      namespace: "schedule",
            afterEnter(data) {
                PageManagerRegistry.schedule.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.schedule.destroy(data);
      },
        },
        advisor: {
      namespace: "advisor",
            afterEnter(data) {
                PageManagerRegistry.advisor.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.advisor.destroy(data);
      },
        },
        journals: {
      namespace: "journals",
            afterEnter(data) {
                PageManagerRegistry.journals.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.journals.destroy(data);
      },
        },
        journal: {
      namespace: "journal",
            afterEnter(data) {
                PageManagerRegistry.journal.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.journal.destroy(data);
      },
        },
        contact: {
      namespace: "contact",
            afterEnter(data) {
                PageManagerRegistry.contact.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.contact.destroy(data);
      },
        },
        thanks: {
      namespace: "thanks",
            afterEnter(data) {
                PageManagerRegistry.thanks.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.thanks.destroy(data);
      },
        },
        term: {
      namespace: "term",
            afterEnter(data) {
                PageManagerRegistry.term.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.term.destroy(data);
      },
    },
  };
    const VIEWS = Object.values(SCRIPT);

  let namespace = $(".main-inner").attr("data-barba-namespace");

    barba.init({
        preventRunning: true,
        timeout: 5000,
        debug: true,
    prevent: ({ href }) => {
      try {
        const url = new URL(href, window.location.origin);
        return url.pathname === window.location.pathname && !!url.hash;
      } catch (err) {
        return typeof href === "string" && href.includes("#");
      }
    },
    transitions: [
      {
        name: "default-transition",
            sync: true,
            beforeOnce(data) {
                smoothScroll.init(data);
                globalChange.init(data);
          documentHeightObserver("init", data);
            },
            once(data) {
          reinitializeWebflow(data);
          PageManagerRegistry[namespace]?.initOnce?.(data);
                loader.init(data);
                loader.play(data);
          scrollTop();
                resetScroll(data);
                header.init(data);
            },
            async leave(data) {
                await pageTrans.play(data);
            },
      },
    ],
    views: VIEWS,
  });
};

window.initKudanilApp = function initKudanilApp() {
  if (window.__kudanilAppStarted) return true;
  if (
    !document.querySelector('[data-barba="wrapper"]') ||
    !document.querySelector(".main-inner")
  ) {
    return false;
  }
  window.__kudanilAppStarted = true;
  try {
    script();
  } catch (err) {
    window.__kudanilAppStarted = false;
    console.error("Kudanil init failed:", err);
    return false;
  }
  return true;
};

sollusHeaderHide.bind();
