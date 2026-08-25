import React, { useEffect } from "react";
import sollusLogo from "./assets/sollus-logo.png";

const NAV_LINKS = [
  { href: "#ecosystem", label: "Ecosystem" },
  { href: "#elara", label: "Elara AI" },
  { href: "#experience", label: "Experience" },
  { href: "#explore", label: "Explore" },
];

const YACHT_FRAME_COUNT = 5;

const LOOKBOOK_PHOTOS = [
  "/images/hero.jpg",
  "/images/register-yacht.png",
  "/images/689eb59b898d833188934edf_Cabin.jpg",
  "/images/691d6e82f831c5a9f59dc481_kudanil-explorer-expedition-yacht-top-deck-7.jpg",
  "/images/689eb59b898d833188934ee0_Guest%20Areas.jpg",
  "/images/691d6f1d5dc2a44005aff730_kudanil-explorer-expedition-yacht-monkey-island-jacuzzi-4.jpg",
];

const ECOSYSTEM_SLIDES = [
  {
    title: "Hub",
    desc: "St. George's waterfront for movement, recovery and wellness. Wearables, coaching and nutrition, distinct from clinical care.",
    thumb: "/images/ecosystem-hub.png",
    images: [
      "/images/hub1.png",
      "/images/hub2.png",
      "/images/hub3.png",
      "/images/hub1.png",
      "/images/hub5.png",
    ],
  },
  {
    title: "Snowy",
    desc: "SOLLUS' signature conveyance, an electric Rolls-Royce Corniche connecting the waterfront and Yacht in silent, low-carbon luxury.",
    theme: "snowy",
    thumb: "/images/ecosystem-snowy.jpg",
    images: [
      "/images/snoxy1.png",
      "/images/snoxy2.png",
      "/images/snoxy3.png",
      "/images/snoxy1.png",
    ],
  },
  {
    title: "The Water",
    desc: "The Silent Yachts, a 62-foot solar-electric catamaran, home-ported at St. George's Harbour, offered through fractional co-ownership.",
    thumb: "/images/The-water.jpg",
    images: [
      "/images/ecosystem-water-3.png",
      "/images/ecosystem-water-2.png",
      "/images/ecosystem-water.png",
      "/images/ecosystem-water-1.png",
    ],
  },
  {
    title: "Platform",
    desc: "Connect your wearables. Elara reads the data and distils it into a single Wellness Score — precision measurement, made simple.",
    thumb: "/images/platformbg.png",
    images: [
      "/images/platform.png",
      "/images/platform1.png",
      "/images/platform2.png",
      "/images/platform3.png",
    ],
  },
  {
    title: "Experience",
    desc: "Hotels, golf, diving, and coastal wellness across Bermuda. From St. Regis and Five Forts to reefs, shipwrecks and retreats.",
    thumb: "/images/ecosystem-experience.jpg",
    images: [
      "/images/ex1.png",
      "/images/ex2.png",
      "/images/ex3.png",
      "/images/ex4.png",
      "/images/ex5.png",
    ],
  },
  {
    title: "Protection",
    desc: "Sollus Re explores how consented, continuous data could enable faster, fairer protection.",
    thumb: "/images/689eb59b898d833188934edf_Cabin.jpg",
    images: [
      "/images/691d382da4701e13c6f4b552_Kudanil%20Komodo%20_21_JJ_13342.jpg",
      "/images/691d383c1a96bc25b90527b3_ATLAS_Kudanil_LR-87-7409.jpg",
      "/images/689eb59b898d833188934ede_Rectangle%2042175.jpg",
      "/images/691d6e70a84ced857264c149_Kudanil_JackJohns_LR_549_JJ_13325.jpg",
      "/images/689eb59b898d833188934eb9_3.jpg",
    ],
  },
];

function EcosystemSlide({ title, desc, thumb, images, theme }) {
  return (
    <div
      id="w-node-_4180a05b-96be-9cf7-8efb-556ff9d225ec-88934dca"
      role="listitem"
      className={`home-yacth-main-slide-item w-dyn-item${theme ? ` is-${theme}` : ""}`}
    >
      <div className="w-layout-blockcontainer container grid full-h w-container">
        <div
          id="w-node-_2814a445-fce8-c865-b7fd-564fba048d5c-88934dca"
          className="home-yacth-main-slide-text"
        >
          <div className="home-yacth-main-slide-title">
            <h3 className="heading h3">{title}</h3>
          </div>
          <div className="home-yacth-main-slide-desc">
            <div className="txt fs-18">{desc}</div>
          </div>
        </div>
        <div
          id="w-node-a997a4ca-3ea4-3bf2-9395-3e2f6e760e11-88934dca"
          className="home-yacth-main-slide-gallery is-stack"
        >
          <div
            id="w-node-_722ab55a-b28c-994e-02e7-285928389082-88934dca"
            className="home-yacth-main-slide-gallery-cms w-dyn-list"
          >
            <div
              role="list"
              className="home-yacth-main-slide-gallery-list w-dyn-items"
            >
              {images.slice(0, 4).map((src, i) => (
                <div
                  key={`${title}-${i}`}
                  role="listitem"
                  className="home-yacth-main-slide-gallery-item w-dyn-item w-dyn-repeater-item"
                >
                  <div className="home-yacth-main-slide-gallery-item-inner">
                    <img
                      src={src}
                      loading="lazy"
                      alt=""
                      className="img-default img-fill"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="home-yacth-main-slide-thumb">
        <div className="home-yacth-main-slide-thumb-overlay"></div>
        <div className="home-yacth-main-slide-thumb-inner">
          <img
            src={thumb}
            loading="lazy"
            alt=""
            className="img-default img-fill"
          />
        </div>
      </div>
    </div>
  );
}

function EcosystemBarItem({ index, title }) {
  return (
    <div role="listitem" className="home-yacth-main-bar-item w-dyn-item">
      <div className="home-yacth-main-bar-item-inner">
        <div className="home-yacth-main-bar-item-order">
          <div className="txt fs-16">0</div>
          <div className="txt fs-16">{index}</div>
        </div>
        <div className="line large home-yacth-main-bar-item-prog">
          <div className="line-inner home-yacth-main-bar-item-prog-inner"></div>
        </div>
        <div className="home-yacth-main-bar-item-name">
          <div className="heading h5">{title}</div>
        </div>
      </div>
    </div>
  );
}

function HeaderNavLink({ href, label }) {
  return (
    <div className="header-menu-item">
      <a href={href} className="header-menu-link w-inline-block">
        <div className="text-flip">
          <div className="text-flip-inner">
            <div className="txt fs-18 fw-med text-flip-txt">{label}</div>
            <div className="txt fs-18 fw-med text-flip-txt">{label}</div>
          </div>
        </div>
      </a>
    </div>
  );
}

const STACK_PANELS = {
  gold: {
    heading: ["On the Waterfront,", "Restoration Begins."],
    body: "At St. George's, the Hub unites movement, recovery, nutrition and coaching, shaped by your wearable-informed baseline. A non-medical wellbeing experience, distinct from clinical care.",
    photos: {
      a: "/images/stack-gold-1.png?v=3",
      b: "/images/stack-gold-2.png?v=3",
      c: "/images/stack-gold-3.png?v=3",
    },
  },
  navy: {
    heading: ["Under solar sail,", "silence at sea"],
    body: "Step ashore for championship golf, guided reef and shipwreck diving, or a restorative retreat. From St. Regis and Five Forts to BIOS, every experience flows naturally from the yacht.",
    photos: {
      a: "/images/stack-navy-1.png?v=1",
      b: "/images/stack-navy-2.png?v=1",
      c: "/images/stack-navy-3.png?v=1",
    },
  },
  teal: {
    heading: ["Bermuda,", "Beyond the Season"],
    body: "Sollus extends Bermuda beyond its May - August peak, connecting its waterfronts, reefs and premium experience through low - carbon land and marine mobility, year - round and with respect for the island's natural environment.",
    photos: {
      a: "/images/stack-teal-1.png?v=1",
      b: "/images/stack-teal-2.png?v=1",
      c: "/images/stack-teal-3.png?v=1",
    },
  },
};

function DanubeStackPanel({ theme }) {
  const copy = STACK_PANELS[theme];
  return (
    <article className={`stack-panel is-${theme}`}>
      <div className="stack-panel-inner">
        <div className="stack-copy">
          <h2 className="stack-heading">
            {copy.heading[0]}
            <br />
            {copy.heading[1]}
          </h2>
          <a href="/contact" className="stack-cta">
            Get Your Free Quote
          </a>
        </div>
        <div className="stack-photos" aria-hidden="true">
          <figure className="stack-photo is-a">
            <img src={copy.photos.a} alt="" />
          </figure>
          <figure className="stack-photo is-b">
            <img src={copy.photos.b} alt="" />
          </figure>
          <figure className="stack-photo is-c">
            <img src={copy.photos.c} alt="" />
          </figure>
        </div>
        <p className="stack-body">{copy.body}</p>
      </div>
    </article>
  );
}

export default function App() {
  useEffect(() => {
    let cancelled = false;
    let tries = 0;

    const boot = () => {
      if (cancelled) return;
      const started =
        typeof window.initKudanilApp === "function" && window.initKudanilApp();
      if (!started && tries++ < 60) {
        requestAnimationFrame(boot);
      }
    };

    const onReady = () => requestAnimationFrame(boot);

    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady);
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", onReady);
    };
  }, []);

  return (
    <div className="react-kudanil-wrapper">
      <div className="body-inner">
        <div className="global-comp">
          <div className="css-layout css-embed w-embed">
            <style>{`
 html {
 	 	--fs-global: 0.5208333333vw;
   
   	font-size: var(--fs-global);
   	height: auto;
    min-height: -webkit-fill-available;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-kerning: none;
		-webkit-text-size-adjust: 100%;
    touch-action: manipulation;
   	overflow-y: overlay;
    /*scrollbar-gutter: stable;*/
    
 }
  @media only screen and (min-width: 1920px) { html { --fs-global: 10px; } }
  @media only screen and (max-width: 991px) { html { --fs-global: 1.1990407674vw; }}
  @media only screen and (max-width: 767px) { html { --fs-global: 2.3255813953vw; }}
  .custom-scroll {
  	overflow-y: overlay;
    scrollbar-gutter: stable;
  }
	html::-webkit-scrollbar,
	.custom-scroll::-webkit-scrollbar {
    width: .8rem;
  }
  html::-webkit-scrollbar-track,
  .custom-scroll::-webkit-scrollbar-track {
    width: .8rem;
  }
	html::-webkit-scrollbar-track,
	.custom-scroll::-webkit-scrollbar-track {
    border: solid .2rem transparent;
  }
	html::-webkit-scrollbar-thumb,
  .custom-scroll::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 1rem 1rem #003357;
    transition: all .4s;
    border: solid .2rem transparent;
  }
  html::-webkit-scrollbar-thumb:hover,
  .custom-scroll::-webkit-scrollbar-thumb:hover {
    box-shadow: inset 0 0 1rem 1rem #3D424D;
  }
  html::-webkit-scrollbar-corner,
  .custom-scroll::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  body, .body {
  	position: relative;
  }
  #root,
  .react-kudanil-wrapper {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  @media only screen and (max-width: 767px) {
    html,
    body,
    .body,
    #root,
    .react-kudanil-wrapper {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
    html,
    body,
    .body,
    #root,
    .react-kudanil-wrapper {
      overflow: hidden;
    }
    body, .body {
      overscroll-behavior-y: none;
      overscroll-behavior-x: none;
      position: fixed;
      inset: 0;
    }
    .body-inner {
      overscroll-behavior: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
  }
  main, .main {
    flex-grow: 1;
  }
  .w-container:before,
  .w-container:after {
      display: none;
  }
  .w-embed:before,
  .w-embed:after {
    display: none;
  }
  .w-richtext:before,
  .w-richtext:after {
  	display: none;
  }
   .w-richtext a,
   .w-richtext button {
     position: relative;
     overflow: hidden;
     display: inline-block;
     vertical-align: bottom;
     color: var(--decor--primary);
  }
  .w-richtext a::before,
  .w-richtext button:before {
  	content: '';
    position: absolute;
    display: block;
    bottom: 0.15em;
    width: 100%;
    height: 1px;
    left: 0;
    transform: scaleX(0);
    transform-origin: right;
    background-color: currentColor;
    -webkit-transition: 0.6s transform cubic-bezier(0.66, 0, 0.15, 1);
    transition: 0.6s transform cubic-bezier(0.66, 0, 0.15, 1);
  }
  .w-richtext > *:first-child{
  	margin-top: 0 !important;
  }
  .w-richtext > *:last-child {
  	margin-bottom: 0 !important;
  }
  .w-richtext li:has(strong)::marker {
    font-weight: bold;
	}
  .w-richtext ol:has(ul, ol) > li > *:not(ul, ol) {
    font-size: 1.8rem;
  }
  .w-richtext li:last-child {
  	margin-bottom: 0;
  }
  .w--current {
  	pointer-events: none;
  }
  .w-input,
  .w-select {
    height: auto;
    padding: 1rem 1.4rem;
    background-color: transparent;
  }
  .w-radio,
  .w-checkbox {
  	margin-bottom: 0;
  }
  .w-radio-input {
  	accent-color: var(--decor--primary);
  }
  .w-richtext figure {
  	width: 100% !important;
    max-width: 100% !important;
    display: block;
  }
  .w-richtext figure > div {
  	border-radius: 1.6rem;
		overflow: hidden;
    width: 100%;
  }
  .w-richtext figure img {
  	width: 100% !important;
    max-width: 100%;
    object-fit: cover;
    height: auto;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
    pointer-events: none;
    display: block;
    outline: 0;
  }
  
  button {
  	background-color: initial;
    color: currentColor;
    padding: 0;
  }
  button > * {
  	pointer-events: none;
  }
  a {
    text-decoration: none;
    color: currentColor;
    outline: 0;
    cursor: pointer;
  }
  textarea {
  	resize: vertical;
  }
	.input-default {
  	border: none;
    padding: 0;
    margin: 0;
    background-color: transparent;
  }
  .swiper, .swiper-wrapper {
  	width: 100%;
  }
  .swiper-pagination {
  	position: relative;
		bottom: 0;
  }
  :root {
		--swiper-pagination-bullet-size: .6rem;
    --swiper-pagination-bullet-horizontal-gap: .2rem;
  	--swiper-theme-color: var(--decor--primary);
    --swiper-pagination-bullet-inactive-opacity: .1;
  }
  [data-pagination-mode="dark"] {
  	--swiper-pagination-bullet-inactive-color: #fff;
  }
  html.lenis,
  html.lenis body {
    height: auto;
  }

  /*.lenis:not(.lenis-autoToggle).lenis-stopped {
    overflow: clip;
  }*/
  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }
  .lenis.lenis-smooth iframe {
    pointer-events: none;
  }
  .lenis.lenis-autoToggle {
    transition-property: overflow;
    transition-duration: 1ms;
    transition-behavior: allow-discrete;
  }
  @media (hover: hover) {
    .w-richtext a:hover::before,
    .w-richtext button:hover::before {
    	-webkit-transform: scaleX(1);
  		transform: scaleX(1);
      transform-origin: left;
    }
	}
	@media only screen and (max-width: 767px) {
    .w-richtext figure > div {
      border-radius: .8rem;
    }
  }
`}</style>
          </div>
          <div className="css-global css-embed w-embed">
            <style>{`
	@keyframes marquee { 
  	0% { transform: translateX(0%); }
  	100% { transform: translateX(-100%); }
  }
  @keyframes rotation {
	 0% { transform: rotate(0deg); }
   100% { transform: rotate(360deg); }
  }
  .anim-rotation {
  	animation: rotation 400s linear infinite;
  }
  .anim-marquee {
  	animation: marquee 30s linear infinite;
  }
	.hover-un .line-inner {
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.65s cubic-bezier(.785, .135, .15, .86);
  }
  .ic-embed svg {
  	width: 100%;
    height: auto;
  }
  .ic-embed-h svg {
  	height: 100%;
    width: auto;
  }
  .trim-textbox {
    display: flow-root;
    --trim-top: calc(-0.5lh + 0.45em);
    --trim-bot: calc(-0.5lh + 0.45em);
  }
  .trim-textbox::before {
    content: "";
    display: table;
    margin-bottom: var(--trim-top);
  }
  .trim-textbox::after {
    content: "";
    display: table;
    margin-bottom: var(--trim-bot);
  }
  .hover-line {
   --line-spacing: 1rem;

   position: relative;
   overflow: hidden;
   display: inline-block;
   vertical-align: bottom;
  }
 .hover-line::before,
 .hover-line::after {
    content: '';
    position: absolute;
    display: block;
    bottom: 0.2em;
    width: 100%;
    height: max(2px, .2rem);
    background-color: currentColor;
 }
 .hover-line::before {
    left: 0;
 }
 .hover-line::after {
    left: calc(-1 * var(--line-spacing));
    transform: translateX(-100%);    
 }
 .img-default {
    height: auto;
    user-select: none;
		pointer-events: none;
    display: block;
    outline: 0;
  }
  .arrows {
  	display: grid;
    grid-template-columns: 1fr;
    overflow: hidden;
  }
  .arrows path {
  	grid-area: 1/1/2/2;
    transition: transform .65s cubic-bezier(.785,.135,.15,.86); 
  }
  .arrows path:first-child {
    transition-delay: .1s;
  }
  .arrows path:last-child {
  	transform: translateX(-100%);
    transition-delay: 0;
  }
  @keyframes wave {
   0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0%); /* Di chuyển toàn bộ chiều rộng của phần tử cha */
    }
  }
  .btn-wave-ic {
	  animation: wave 5s linear infinite;
  }
  .btn .btn-wave .btn-wave-ic:last-child {
		margin-left: -.1rem;
  }
  .btn .btn-wave:last-child .btn-wave-ic {
    animation-delay: .3s;
  }
	.hover-un.filled .line-inner {
  	transform: scaleX(1);
    transform-origin: left;
  }
  .hover-un.filled .textarea-placeholder {
  	opacity: 0;
  }
  .input-field-grp.hover-un.active .input-line .input-line-inner {
  	transform: scaleX(1);
    transform-origin: left;
  }
  .select-dropdown-ic {
  	transition-delay: .1s;
  }
  .select-field-grp.active .select-dropdown-ic {
  	transform: rotate(180deg);
  }
  .text-flip .txt:last-child {
  	position: absolute;
    bottom: -100%;
  }
  @media only screen and (min-width: 992px) {
    .select-field-grp:hover .ic-dropdown-main {
      transform: translateY(100%);
      transition: transform 600ms ease;
    }
    .select-field-grp:hover .ic-dropdown-clone {
      transform: none;
      transition: transform 600ms ease;
    }
  }
  [data-hidden] { display: none; }
  .enable-hidden [data-hidden] {display: flex;}
  @media (hover: hover) {
  	.btn:hover .btn-txt {
    	transform: translateY(-100%);
    }
    .text-flip:hover .txt {
      transform: translateY(-100%);
    }
    .header.glass-nav .text-flip:hover .txt {
      transform: none !important;
    }
    .hover-un:hover .line-inner {
      transform: scaleX(1);
      transform-origin: left;
    }
    .hover-un:hover .link-ic-item {
      transform: translateX(100%);
    }
    .hover-line:hover::before {
  		transform: translateX(calc(100% + var(--line-spacing))) rotate(.01deg);
    	transition: transform .65s cubic-bezier(.6,0,.3,1);
    }
    .hover-line:hover::after {
      transform: translateX(var(--line-spacing)) rotate(.01deg);
    	transition: transform .65s cubic-bezier(.6,0,.3,1) .15s;
    }
    .hover-arrow:hover .arrows path:first-child {
      transform: translateX(100%);
      transition-delay: 0s;
    }
    .hover-arrow:hover .arrows path:last-child {
      transform: translateX(0);
      transition-delay: .1s;
    }
  }
`}</style>
          </div>
          <div className="css-container css-embed w-embed">
            <style>{`
:root {
	--padding-container: max((100vw - var(--container--max-width)) / 2, 0px);
}
.container.grid,
.full-width {
	--padding-inline: calc(var(--container--padding) - var(--container--column-gap));
  --content-max-width: calc(var(--container--max-width) - (var(--container--padding) * 2));
  
  padding: 0;
	display: grid;
  grid-template-columns:
    [full-width-start] 
    minmax(var(--padding-inline), 1fr)
    [content-start]
     repeat(var(--container--column), minmax(0, calc(min(
      100% - (var(--padding-inline) * 2) - (var(--container--column-gap) * (var(--container--column) - 1)),
      var(--content-max-width) - (var(--container--column-gap) * (var(--container--column) - 1))
    ) / var(--container--column))))
    [content-end]
    minmax(var(--padding-inline), 1fr) 
    [full-width-end];
    gap: 0 var(--container--column-gap);
}

.container.grid > :not(.full-width),
.full-width > :not(.full-width) {
  grid-column: content;
}
/*@media only screen and (min-width: 1920px) {
	.container.grid,
  .full-width {
		--padding-inline: calc(var(--container--padding) - var(--column-gap));
	}
}*/

.container.grid > .full-width,
.container.grid > .full-width-wrap {
	grid-column: full-width;
  
  display: grid;
  grid-template-columns: minmax(0px, 1fr);
}
`}</style>
          </div>
          <div className="cursor">
            <div className="cursor-main">
              <div className="cursor-drag">
                <div className="cursor-drag-ic">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 18 18"
                    fill="none"
                    className="svg"
                  >
                    <g clip-path="url(#clip0_4593_13306)">
                      <path
                        d="M7.875 3.9375L2.8125 9L7.875 14.0625M15.1875 9H3.5"
                        stroke="currentColor"
                        stroke-width="1.3"
                        stroke-linecap="square"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className="txt fs-20 fw-med">Drag</div>
                <div className="cursor-drag-ic">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 18 18"
                    fill="none"
                    className="svg"
                  >
                    <g clip-path="url(#clip0_4593_13310)">
                      <path
                        d="M11 3.9375L16.0625 9L11 14.0625M15.1875 9H3.5"
                        stroke="currentColor"
                        stroke-width="1.3"
                        stroke-linecap="square"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <header data-wf--header--variant="base" className="header glass-nav">
          <div className="css-header w-embed">
            <style>{`
.header:has(.on-dark):not(.on-scroll) .btn {
	background-color: #fff;
  color: var(--color--content--perssian-blue);
  border-color: #ffffff1a;
}
.header:before, .header:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgb(0 0 0 / 35%), rgb(0 0 0 / 0%));
	opacity: 0;
  transition: opacity .65s cubic-bezier(.785, .135, .15, .86);
}
.header:before {
  filter: blur(1.4rem);
  z-index: -1;
}
.header:after {
  filter: blur(0px);
  z-index: -2;
}
.header.on-scroll:before {
	opacity: .8;
}
.header.on-scroll:after {
	opacity: 1;
}
.header.glass-nav:before,
.header.glass-nav:after,
.header.glass-nav.on-scroll:before,
.header.glass-nav.on-scroll:after {
  content: none !important;
  display: none !important;
  opacity: 0 !important;
  background: none !important;
}
.header.on-light .header-btn-light,
.header.on-dark .header-btn-dark {
	opacity: 1;
}
.header.on-light .header-btn-dark,
.header.on-dark .header-btn-light{
	opacity: 0;
}
.header.on-scroll .header-btn-dark {
	opacity: 1 !important;
}
.header.on-scroll .header-btn-light {
	opacity: 0 !important;
}
.header-ham.active .header-ham-inner {
	transform: rotate(135deg);
  transition-delay: .2s;
}
.header-ham.active .header-ham-line:first-child {
	transform: rotate(90deg) translate(50%);
	opacity: 1;
}
.header-ham.active .header-ham-line:nth-child(2) {
	transform: translateY(calc(100% + .2rem));
  transition-delay: .1s;
}
.header-ham.active .header-ham-line:last-child {
	transform: translateX(-100%);
  opacity: 0;
}
@media only screen and (max-width: 991px) {
	.header.on-light .header-ham {
  	border-color: rgba(0, 51, 87, 0.3);
  }
	.header-btn .btn-bg {
  	background-color: transparent;
  }
	.header-btn .btn-inner {
  	padding-block: 1.95rem;
	  color: #fff;
  }
  .header.on-open-nav .header-menu, 
  .header.on-open-nav .header-menu-list, 
  .header.on-open-nav .header-btn {
    opacity: 1;
    transform: translate(0, 0);
    pointer-events: auto;	
  }
  .header.on-open-nav .header-menu-link {
  	pointer-events: auto;
  }
  .header.on-open-nav {
  	color: var(--color--content--white) !important;
  }
  .header.on-open-nav .header-ham {
  	border-color: rgba(255, 255, 255, 0.3) !important;
  }
}
@media only screen and (max-width: 991px) {
  .header.on-scroll .header-ham {
  	border-color: var(--color--content--white);
  } 
}
@media only screen and (max-width: 767px) {
	.header-btn .btn-inner {
  	padding-block: 1.2rem 1.1rem;
  }
}
`}</style>
          </div>
          <div className="header-inner">
            <div className="w-layout-blockcontainer container grid w-container glass-nav-bar">
              <div className="glass-nav-frost" aria-hidden="true"></div>
              <a
                id="w-node-_9b5b44cc-0d37-d08d-1d20-eebbd8e4eb4a-d8e4eb46"
                href="/"
                aria-current="page"
                className="header-logo w-inline-block w--current"
              >
                <div className="header-logo-ic">
                  <img
                    src={sollusLogo}
                    alt="Sollus Global"
                    className="header-logo-img"
                  />
                </div>
              </a>
              <div
                id="w-node-_9b5b44cc-0d37-d08d-1d20-eebbd8e4eb4e-d8e4eb46"
                className="header-menu"
              >
                <div className="header-menu-list">
                  {NAV_LINKS.map((item) => (
                    <HeaderNavLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                    />
                  ))}
                </div>
              </div>
              <a
                id="w-node-_9b5b44cc-0d37-d08d-1d20-eebbd8e4eb80-d8e4eb46"
                href="/contact"
                className="header-btn only-desk glass-nav-cta w-inline-block"
              >
                <span className="glass-nav-cta-label">Start Your Journey</span>
                <div
                  id="w-node-cdac694a-dd2f-8274-737d-feafb7381b46-d8e4eb46"
                  className="header-btn-dark"
                >
                  <div
                    data-wf--button--styles-type="fill"
                    className="btn w-variant-354517c4-e84d-0cf0-e0da-7037e6d43588"
                  >
                    <div
                      data-wf--button-size--variant="s"
                      className="btn-inner w-variant-aa7a10eb-cb7f-63e9-01f0-d4ff2d91d494"
                    >
                      <div className="btn-txt-wrap">
                        <div className="txt btn-txt w-variant-aa7a10eb-cb7f-63e9-01f0-d4ff2d91d494 top">
                          GET IN TOUCH
                        </div>
                        <div className="txt btn-txt w-variant-aa7a10eb-cb7f-63e9-01f0-d4ff2d91d494 bot">
                          GET IN TOUCH
                        </div>
                      </div>
                    </div>
                    <div className="btn-bg w-variant-354517c4-e84d-0cf0-e0da-7037e6d43588"></div>
                  </div>
                </div>
                <div
                  id="w-node-_1dc0f767-014b-7615-3dc6-4383c205bccf-d8e4eb46"
                  className="header-btn-light"
                >
                  <div
                    data-wf--button--styles-type="dark-mode-blue"
                    className="btn w-variant-d842f340-6b34-1873-adf9-cc6a8f22d94d"
                  >
                    <div
                      data-wf--button-size--variant="s"
                      className="btn-inner w-variant-aa7a10eb-cb7f-63e9-01f0-d4ff2d91d494"
                    >
                      <div className="btn-txt-wrap">
                        <div className="txt btn-txt w-variant-aa7a10eb-cb7f-63e9-01f0-d4ff2d91d494 top">
                          GET IN TOUCH
                        </div>
                        <div className="txt btn-txt w-variant-aa7a10eb-cb7f-63e9-01f0-d4ff2d91d494 bot">
                          GET IN TOUCH
                        </div>
                      </div>
                    </div>
                    <div className="btn-bg w-variant-d842f340-6b34-1873-adf9-cc6a8f22d94d"></div>
                  </div>
                </div>
              </a>
              <button
                type="button"
                id="w-node-_3536a5b5-51e9-50eb-28e0-5b232f7eea61-d8e4eb46"
                className="header-ham"
                aria-label="Open menu"
                aria-controls="mobile-nav"
                aria-expanded="false"
              >
                <div className="header-ham-inner">
                  <div className="header-ham-line ver"></div>
                  <div className="header-ham-line"></div>
                  <div className="header-ham-line"></div>
                </div>
              </button>
            </div>
          </div>
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Menu"
            aria-hidden="true"
          >
            <p className="mobile-nav-kicker">Navigate</p>
            <ul className="mobile-nav-list">
              {NAV_LINKS.map((item) => (
                <li key={item.href} className="mobile-nav-item">
                  <a href={item.href} className="mobile-nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="/contact" className="mobile-nav-cta">
              Start Your Journey
            </a>
            <p className="mobile-nav-tagline">Your shell of comfort</p>
          </nav>
        </header>
        <div
          className="loader sollus-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading Sollus Global"
        >
          <div className="loader-aurora" aria-hidden="true"></div>
          <div className="loader-stage">
            <div className="loader-core">
              <div className="loader-well">
                <div className="loader-fill"></div>
                <img src={sollusLogo} alt="" className="loader-mark" />
              </div>
            </div>
            <svg
              className="loader-wave"
              viewBox="0 0 320 56"
              aria-hidden="true"
            >
              <path
                className="loader-wave-path"
                d="M0 28 C 20 28, 20 8, 40 8 S 60 48, 80 48 S 100 18, 120 18 S 140 40, 160 28 S 180 8, 200 16 S 220 48, 240 40 S 260 12, 280 20 S 300 36, 320 28"
              />
            </svg>
            <p className="loader-count">
              <span className="loader-count-num">00</span>
              <span className="loader-count-pct">%</span>
            </p>
          </div>
        </div>
        <main data-barba="wrapper" className="main">
          <div
            data-header="dark"
            data-barba="container"
            data-barba-namespace="home"
            className="main-inner"
          >
            <div className="css-home css-embed w-embed">
              <style>{`
.home-gallery-main .home-gallery-item:nth-child(1) {
  width: 54rem;
  height: 40.5rem;
}
.home-gallery-main .home-gallery-item:nth-child(2) {
 	width: 77rem;
  height: 57.6rem;
}
.home-gallery-main .home-gallery-item:nth-child(3) {
  width: 43.2rem;
  height: 52.3rem;
}
.home-gallery-main .home-gallery-item:nth-child(4) {
  width: 58.7rem;
  height: 42rem;
}
.home-gallery-main .home-gallery-item:nth-child(5) {
  width: 62.4rem;
  height: 75.6rem;
}
.home-gallery-item.end:nth-child(1) {
	grid-column: 1/6;
  grid-row: 1/1;
  justify-self: end;
}
.home-gallery-item.end:nth-child(2) {
	margin-top: -12.3rem;
  grid-column: 11/14;
  grid-row: 1/1;
}
.home-gallery-item.end:nth-child(3) {
	margin-top: 76.4rem;
  grid-column: 1/4;
  grid-row: 1/1;
  justify-self: end;
}
.home-gallery-item.end:nth-child(4) {
	margin-top: 79rem;
  grid-column: 13 / 16;
  grid-row: 1 / 1;
  margin-left: 4rem;
}
.home-gallery-item.end:nth-child(5) {
	margin-top: 100rem;
  grid-column: 6 / 12;
  grid-row: 1 / 1;
  justify-self: center;
}

.home-gallery-item.start:nth-child(1) {
	transform: translate(-22.2rem, 6.2rem) rotate(-5deg);
}
.home-gallery-item.start:nth-child(2) {
	transform: translate(11.5rem, 3rem) rotate(5deg);
}
.home-gallery-item.start:nth-child(3) {
	transform: translate(-22.7rem, 21.3rem) rotate(-5deg);
}
.home-gallery-item.start:nth-child(4) {
	transform: translate(20.3rem, 19.3rem) rotate(5deg);
}
.home-gallery-item.start:nth-child(5) {
	transform: translate(-10.5rem, 29.5rem) rotate(-5deg);
}
.home-map-location-ic-bg {
  clip-path: circle(2% at 50% 50%);
  transition: clip-path .65s cubic-bezier(.785, .135, .15, .86);
}
.hover-location.active .home-map-location-ic-bg {
  clip-path: circle(100% at 50% 50%);
  opacity: 1;
}
.hover-location.active .home-map-location-ic-inner {
  transform: scale(1);
}
.hover-location.active .home-map-location-ic {
  color: var(--background--brown-10);
  border-color: var(--background--brown-80);
  background-color: var(--background--brown-80);
	box-shadow: 0 1.5rem 2rem #84684580;
}
.home-map-location-item.active .home-map-location-map {
	opacity: 1;
}
.home-yacth-main-bar-item.active .home-yacth-main-bar-item-order,
.home-yacth-main-bar-item.active .home-yacth-main-bar-item-name { 
	opacity: 1; 
}
@keyframes activeOnZoom { 
	0% {
  	opacity: 1;
    mix-blend-mode: overlay;
    backdrop-filter: blur(0);
  }
  50% {
    backdrop-filter: blur(1.6rem);
  }
  99% {
  	opacity: 0;
    mix-blend-mode: overlay;
    backdrop-filter: blur(0);
  }
  100% {
  	opacity: 0;
    mix-blend-mode: normal;
    backdrop-filter: blur(1.6rem);
  }
}
.home-gallery-stick.on-zoom {
	animation: .2s cubic-bezier(.445, .05, .55, .95) 0s forwards activeOnZoom;
}
.home-yacth-main-slide-title .word,
.home-yacth-main-slide-desc .word {
	opacity: 0;
  transition-delay: 0s;
  transform: translateY(100%);
  transition: all .6s cubic-bezier(.445, .05, .55, .95);
}
.home-yacth-main-slide-text.active .home-yacth-main-slide-title .word,
.home-yacth-main-slide-text.active .home-yacth-main-slide-desc .word {
	opacity: 1;
  transform: translateY(0%);
  transition-delay: var(--trans-delay);
}
.home-yacth-main-slide-thumb.active .home-yacth-main-slide-thumb-inner {
	opacity: 1;
  transform: scale(1);
  filter: blur(0rem);
}
.home-yacth-main-slide-thumb.active .home-yacth-main-slide-thumb-overlay {
	opacity: 1;
}

/*.detail-toc .detail-toc-main-title .bp-line,
.detail-toc .detail-toc-main-item-txt .bp-line {
	line-height: inherit;
}*/
.home-yacth-main-slide-gallery:not(.is-stack).active .home-yacth-main-slide-gallery-item {
	transform: translateY(0%);
}
.home-yacth-main-slide-gallery:not(.is-stack) .home-yacth-main-slide-gallery-list .home-yacth-main-slide-gallery-item:nth-child(1) {
	transition-duration: .6s;
}
.home-yacth-main-slide-gallery:not(.is-stack) .home-yacth-main-slide-gallery-list .home-yacth-main-slide-gallery-item:nth-child(2) {
	transition-duration: .7s;
}
.home-yacth-main-slide-gallery:not(.is-stack) .home-yacth-main-slide-gallery-list .home-yacth-main-slide-gallery-item:nth-child(3) {
	transition-duration: .8s;
}
.home-yacth-main-slide-gallery:not(.is-stack) .home-yacth-main-slide-gallery-list .home-yacth-main-slide-gallery-item:nth-child(4) {
  transition-duration: .9s;
}
.home-yacth-main-slide-gallery:not(.is-stack) .home-yacth-main-slide-gallery-list .home-yacth-main-slide-gallery-item:nth-child(5) {
	transition-duration: 1s;
}
.home-article-main-item-bg {
  transition-delay: 0s, .15s, .15s;
}
.home-yacth-main-slide-gallery.active .home-yacth-main-slide-gallery-zoom-cms {
	opacity: 1;
}
@media (hover:hover) {
  .hover-location:hover .home-map-location-ic-bg {
    clip-path: circle(100% at 50% 50%);
    opacity: 1;
  }
  .hover-location:hover .home-map-location-ic-inner {
    transform: scale(1);
  }
  .hover-location:hover .home-map-location-ic {
    color: var(--background--brown-10);
    border-color: var(--background--brown-80);
    background-color: var(--background--brown-80);
  }
	.home-map-destin-item:hover .home-map-destin-item-thumb {
    transform: scale(1.1);
    filter: contrast(120%);
  }
  .home-yacth-main-slide-gallery:hover .home-yacth-main-slide-gallery-active {
  	opacity: 1;
  }
  .home-article-main-item:hover .home-article-main-item-bg {
  	transform: scale(1.1);
    filter: contrast(120%);
  }
}

@media only screen and (max-width: 991px) {
	.home-gallery-main .home-gallery-item:nth-child(1) {
    width: 27.3rem;
    height: 19.5rem;
  }
  .home-gallery-main .home-gallery-item:nth-child(2) {
    width: 17.4rem;
    height: 12.5rem;
  }
  .home-gallery-main .home-gallery-item:nth-child(3) {
    width: 17.4rem;
    height: 21rem;
  }
  .home-gallery-main .home-gallery-item:nth-child(4) {
    width: 27.4rem;
    height: 19.6rem;
  }
  .home-gallery-main .home-gallery-item:nth-child(5) {
    width: 17.5rem;
    height: 21.2rem;
  }
  .home-gallery-item.end:nth-child(2) {
    margin-top: 15.6rem;
  }
  .home-gallery-item.end:nth-child(3) {
    margin-top: 44.6rem;
  }
  .home-gallery-item.end:nth-child(4) {
    margin-top: 57.7rem;
  }
  .home-gallery-item.end:nth-child(5) {
    margin-top: 69.5rem;
  }
	.home-yacth-main-bar-item-name .heading.h5 { 
  	font-size: 1.8rem; 
  }
} 
.home-hero-bg-overlay-top {
  display: none;
}

/* Hiển thị item khi tỉ lệ màn hình <= 3840 / 3168 (~1.21) */
@media (max-aspect-ratio: 40/33) {
  .home-hero-bg-overlay-top {
    display: block;
  }
}
@media only screen and (max-width: 767px) {
	.home-gallery-main .home-gallery-item:nth-child(1) {
    width: 16rem;
    height: 11.3rem;
  }
  .home-gallery-main .home-gallery-item:nth-child(2) {
    width: 18.3rem;
    height: 13.2rem;
  }
  .home-gallery-main .home-gallery-item:nth-child(3) {
    width: 13.5rem;
    height: 16.5rem;
  }
  .home-gallery-main .home-gallery-item:nth-child(4) {
    width: 20.8rem;
    height: 15rem;
  }
  .home-gallery-main .home-gallery-item:nth-child(5) {
    width: 15.1rem;
    height: 17.5rem;
  }
  .home-gallery-item.end:nth-child(1) {
		grid-column: 1/2;
    grid-row: 1/1;
  }
  .home-gallery-item.end:nth-child(2) {
    margin-top: -7.7rem;
    grid-column: 3/4;
    grid-row: 1/1;
  }
  .home-gallery-item.end:nth-child(3) {
    margin-top: 25rem;
    grid-column: 1/1;
    grid-row: 1/1;
    justify-self: end;
  }
  .home-gallery-item.end:nth-child(4) {
    margin-top: 18.3rem;
    grid-column: 4/4;
    grid-row: 1/1;
    justify-self: start;
    margin-left: 0;
  }
  .home-gallery-item.end:nth-child(5) {
    margin-top: 47.4rem;
    grid-column: 2/3;
    grid-row: 1/1;
    justify-self: center;
  }
} 
@media only screen and (max-width: 767px) {
  .home-yacth {
    min-height: 100dvh;
    height: 100dvh;
    contain: none;
  }
  .home-yacth > .w-layout-blockcontainer {
    height: 100dvh;
    min-height: 100dvh;
  }
}
`}</style>
            </div>
            <div className="main-content">
              <div className="home-hero-wrap">
                <section className="home-hero">
                  <div className="home-hero-inner">
                    <div
                      id="w-node-c7e15d38-38c0-faee-22d8-2a34e445ae45-88934dca"
                      className="home-hero-bg"
                    >
                      <div className="home-hero-bg-item">
                        <div className="home-hero-bg-item-inner">
                          <img
                            src="/images/hero.jpg"
                            alt=""
                            loading="eager"
                            className="img-default img-fill"
                          />
                        </div>
                      </div>
                      <div className="home-hero-bg-overlay">
                        <div className="home-hero-bg-overlay-top"></div>
                        <div className="home-hero-clone-bg-overlay-inner">
                          <div className="home-hero-clone-bg-overlay"></div>
                        </div>
                      </div>
                      <div className="home-hero-backdrop"></div>
                    </div>
                    <div className="home-hero-main">
                      <div className="w-layout-blockcontainer container grid full-h w-container">
                        <div
                          id="w-node-ba6964a1-04e4-6f0f-4054-831205041ec2-88934dca"
                          className="home-hero-text"
                        >
                          <div className="home-hero-title">
                            <h2 className="heading h1">
                              <span className="home-hero-title-line">
                                One Island.
                              </span>
                              <span className="home-hero-title-line">
                                One System.
                              </span>
                            </h2>
                          </div>
                          <div className="home-hero-desc">
                            <div className="heading h4">
                              SOLLUS is a Bermuda-rooted ecosystem connecting
                              low-carbon conveyance, waterfront wellness,
                              precision measurement and protection, one
                              integrated system for how people arrive, restore
                              and thrive.
                            </div>
                          </div>
                          <div className="home-hero-actions">
                            <a
                              className="home-hero-btn is-fill"
                              href="#explore"
                            >
                              Explore the Journey
                            </a>
                            <a
                              className="home-hero-btn is-ghost"
                              href="#register"
                            >
                              Register Interest
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="home-home-inner-empty-block"></div>
                </section>
                <div className="home-home-empty-block"></div>
              </div>
              <div id="ecosystem" className="home-yacth-wrap">
                <div className="home-yacth-empty-block"></div>
                <div className="home-yacth-main-empty-block"></div>
                <section className="home-yacth">
                  <div className="w-layout-blockcontainer container grid w-container">
                    <div
                      id="w-node-_6f7b4e4c-56fb-efdb-8ae2-e257dd7d83db-88934dca"
                      className="home-yacth-bg-blur"
                    ></div>
                    <div
                      id="w-node-_0b09353c-af0b-7307-a982-bf623e3a79eb-88934dca"
                      className="home-yacth-bg-overlay"
                    ></div>
                    <div
                      id="w-node-_020c8131-2cf6-0ce1-3309-469330ac37c5-88934dca"
                      className="home-yacth-bg"
                    >
                      <div className="home-yacth-bg-img">
                        <div className="home-yacth-bg-img-inner">
                          <img
                            src="/images/ecosystem-hub.png"
                            loading="lazy"
                            alt=""
                            className="img-default"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="w-node-_10a17bf3-f263-419d-246b-d9c7b1478cb6-88934dca"
                    className="home-yacth-main"
                  >
                    <div className="home-yacth-main-slide">
                      <div className="home-yacth-main-slide-cms w-dyn-list">
                        <div
                          role="list"
                          className="home-yacth-main-slide-list w-dyn-items"
                        >
                          {ECOSYSTEM_SLIDES.map((slide) => (
                            <EcosystemSlide key={slide.title} {...slide} />
                          ))}
                        </div>
                      </div>
                      <div className="home-yacth-main-bar">
                        <div className="w-layout-blockcontainer container grid w-container">
                          <div className="home-yacth-main-bar-cms w-dyn-list">
                            <div
                              role="list"
                              className="home-yacth-main-bar-list w-dyn-items"
                            >
                              {ECOSYSTEM_SLIDES.map((slide, i) => (
                                <EcosystemBarItem
                                  key={slide.title}
                                  index={i + 1}
                                  title={slide.title}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              {/* <div id="experience" className="home-article-wrap seen-in">
                <section className="home-article">
                  <div className="seen-in-inner">
                    <h2 className="seen-in-heading">
                      Set Sail On A Journey Of Indulgence
                    </h2>
                    <nav
                      className="seen-in-tabs"
                      aria-label="Journey categories"
                    >
                      <button
                        type="button"
                        className="seen-in-tab is-active"
                        data-filter="experiences"
                      >
                        Experiences
                      </button>
                      <button
                        type="button"
                        className="seen-in-tab"
                        data-filter="destinations"
                      >
                        Destinations
                      </button>
                      <button
                        type="button"
                        className="seen-in-tab"
                        data-filter="gastronomy"
                      >
                        Gastronomy
                      </button>
                      <button
                        type="button"
                        className="seen-in-tab"
                        data-filter="superyacht"
                      >
                        Superyacht
                      </button>
                      <button
                        type="button"
                        className="seen-in-tab"
                        data-filter="crew"
                      >
                        Crew
                      </button>
                    </nav>
                    <div className="seen-in-carousel">
                      <div className="home-article-main-cms">
                        <div role="list" className="home-article-main-list">
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="experiences"
                          >
                            <article className="seen-in-card is-text">
                              <div>
                                <h3 className="seen-in-card-title">
                                  A Treasure Trove Of Fun
                                </h3>
                                <p className="seen-in-card-desc">
                                  Phuket and the surrounding islands are a
                                  treasure trove of exciting activities, from
                                  thrilling water sports like surfing, diving,
                                  and kayaking, to exploring stunning national
                                  parks, hiking trails, and cultural landmarks,
                                  all set against the backdrop of beautiful
                                  beaches and crystal clear waters.
                                </p>
                              </div>
                              <div className="seen-in-card-url">
                                WWW.MYMIAKAI.COM
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="experiences"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/03/DSC02407-scaled.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  Remote Beaches
                                </h3>
                                <p className="seen-in-card-desc">
                                  Crystal-clear waters, soft sand, and stunning
                                  scenery
                                </p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="experiences"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/03/DSC01954-scaled.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  National Parks
                                </h3>
                                <p className="seen-in-card-desc">
                                  Lush tropical rainforests and coral reefs
                                </p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="experiences"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/03/DSC01390-scaled.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  Snorkelling and Diving
                                </h3>
                                <p className="seen-in-card-desc">
                                  An unforgettable aquatic adventure
                                </p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="experiences"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/03/AdobeStock_256523192-scaled.jpeg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  Cave Exploring
                                </h3>
                                <p className="seen-in-card-desc">
                                  Caves steeped in myth and legend
                                </p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="destinations"
                          >
                            <article className="seen-in-card is-text">
                              <div>
                                <h3 className="seen-in-card-title">
                                  Paradise Awaits
                                </h3>
                                <p className="seen-in-card-desc">
                                  Possibilities are endless when you charter MIA
                                  KAI's superyacht. Experience the true freedom
                                  of exploring destinations from a new
                                  perspective.
                                </p>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="destinations"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/03/Koh-Muk-Monkey.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  Monkey Bay
                                </h3>
                                <p className="seen-in-card-desc">
                                  Amazing fun for the kids
                                </p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="destinations"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/01/Koh-Ha-Racha-Aerial.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  Koh ha &amp; Racha
                                </h3>
                                <p className="seen-in-card-desc">
                                  Unspoiled natural beauty
                                </p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="destinations"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/01/Similan-Island-Shore.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  Similan Island
                                </h3>
                                <p className="seen-in-card-desc">
                                  Tropical paradise
                                </p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="destinations"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/03/James-Bond-Island-Green-View.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  James Bond Island
                                </h3>
                                <p className="seen-in-card-desc">
                                  Featured in the James Bond movie
                                </p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="gastronomy"
                          >
                            <article className="seen-in-card is-text">
                              <div>
                                <h3 className="seen-in-card-title">
                                  A Tantalising Gastronomic Adventure
                                </h3>
                                <p className="seen-in-card-desc">
                                  Embark on a tantalizing gastronomic adventure,
                                  where you can savor the finest cuisine, drinks
                                  and indulgences, using fresh local ingredients
                                  and an array of flavors that will delight your
                                  taste buds.
                                </p>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="gastronomy"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/03/interior_dining-1.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  Burrata with cherry tomatoes
                                </h3>
                                <p className="seen-in-card-desc">
                                  Bright and fresh flavours
                                </p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="gastronomy"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/07/waterlemon-orange-juice-drinking-glass.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  Mango Sticky Rice
                                </h3>
                                <p className="seen-in-card-desc">
                                  Juicy, sweet and creamy
                                </p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="gastronomy"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/03/exterior-dining-1.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  Tomahawk steak
                                </h3>
                                <p className="seen-in-card-desc">
                                  Mouthwatering and earthy
                                </p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="gastronomy"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/06/DSC02139.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  Creamy Tuscan Salmon
                                </h3>
                                <p className="seen-in-card-desc">
                                  Perfectly cooked salmon, creamy
                                  Tuscan-inspired sauce
                                </p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="superyacht"
                          >
                            <article className="seen-in-card is-text">
                              <div>
                                <h3 className="seen-in-card-title">
                                  Opulent Interiors and Spacious Decks
                                </h3>
                                <p className="seen-in-card-desc">
                                  Indulge in the luxurious features of Mia Kai,
                                  from its opulent interior and spacious decks
                                  to its state-of-the-art facilities and
                                  cutting-edge technology, providing an
                                  unparalleled super yacht experience in Phuket.
                                </p>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="superyacht"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/03/Interiors_Exteriors-107.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">Helm</h3>
                                <p className="seen-in-card-desc">
                                  Functionality and style at the helm
                                </p>
                                <span className="seen-in-btn">View</span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="superyacht"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/03/bar_rooftop.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  Rooftop Bar
                                </h3>
                                <p className="seen-in-card-desc">
                                  Cocktails, wines and unforgettable views
                                </p>
                                <span className="seen-in-btn">View</span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="superyacht"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/03/jacuzzi-outside.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  Rooftop Spa
                                </h3>
                                <p className="seen-in-card-desc">
                                  Unwind in the flybridge jacuzzi
                                </p>
                                <span className="seen-in-btn">View</span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="superyacht"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/03/Lounge.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">
                                  Lounge Area
                                </h3>
                                <p className="seen-in-card-desc">
                                  Cinema sound and effortless comfort
                                </p>
                                <span className="seen-in-btn">View</span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="crew"
                          >
                            <article className="seen-in-card is-text">
                              <div>
                                <h3 className="seen-in-card-title">
                                  Exceptional hospitality and personalized
                                  service
                                </h3>
                                <p className="seen-in-card-desc">
                                  Discover the exceptional hospitality and
                                  personalized service of Mia Kai's highly
                                  skilled and attentive crew, who strive to
                                  exceed your every expectation and create
                                  unforgettable memories while cruising the
                                  stunning waters of Phuket.
                                </p>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="crew"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/03/Ron1.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">Ron</h3>
                                <p className="seen-in-card-desc">
                                  Yacht Manager
                                </p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="crew"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/06/DSC01250-1.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">Ae</h3>
                                <p className="seen-in-card-desc">Captain</p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="crew"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/03/woody-scaled.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">Moo</h3>
                                <p className="seen-in-card-desc">Engineer</p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                          <div
                            role="listitem"
                            className="home-article-main-item"
                            data-category="crew"
                          >
                            <article className="seen-in-card">
                              <div className="seen-in-card-media">
                                <img
                                  src="https://mymiakai.com/wp-content/uploads/2023/06/DSC01194-2.jpg"
                                  alt=""
                                  className="img-default img-fill"
                                />
                              </div>
                              <div className="seen-in-card-copy">
                                <h3 className="seen-in-card-title">First</h3>
                                <p className="seen-in-card-desc">Chef</p>
                                <span className="seen-in-btn">
                                  Discover More
                                </span>
                              </div>
                            </article>
                          </div>
                        </div>
                      </div>
                      <div
                        className="seen-in-slide-park"
                        hidden
                        aria-hidden="true"
                      ></div>
                      <div className="seen-in-controls">
                        <button
                          type="button"
                          className="home-article-control-item prev seen-in-arrow"
                          aria-label="Previous"
                        >
                          <span className="seen-in-arrow-face">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                d="M11.25 3.375 5.625 9l5.625 5.625"
                                stroke="currentColor"
                                strokeWidth="1.35"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                        <div
                          className="seen-in-pagination"
                          role="tablist"
                          aria-label="Carousel slides"
                        ></div>
                        <button
                          type="button"
                          className="home-article-control-item next seen-in-arrow"
                          aria-label="Next"
                        >
                          <span className="seen-in-arrow-face">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                d="M6.75 3.375 12.375 9 6.75 14.625"
                                stroke="currentColor"
                                strokeWidth="1.35"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </div> */}
              <section id="elara" className="wellness-wrap">
                <div className="wellness">
                  <header className="wellness-intro">
                    <h2 className="wellness-heading">
                      <span className="wellness-heading-line">
                        Precision Wellness,
                      </span>
                      <span className="wellness-heading-line">
                        tailored to your <em>lifestyle</em>
                      </span>
                    </h2>
                    <p className="wellness-sub">
                      Sync your wearables in one quiet space. Elara reads the
                      pattern beneath the data and guides you at your own speed.
                    </p>
                  </header>
                  <div className="wellness-stage">
                    <a href="/contact" className="wellness-cta">
                      Get Your Free Score
                    </a>
                    <svg
                      className="wellness-lines"
                      viewBox="0 0 1200 780"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M280 150C390 170 500 290 600 360" />
                      <path d="M920 190C810 210 700 300 600 360" />
                      <path d="M250 500C380 470 510 420 600 410" />
                      <path d="M950 500C820 470 690 420 600 410" />
                    </svg>
                    <article id="health" className="wellness-card is-tl">
                      <span className="wellness-card-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M13.5 5.5 11 9.2l2.2 1.6-2.7 5.2"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="14.2"
                            cy="4.4"
                            r="1.4"
                            fill="currentColor"
                          />
                          <path
                            d="M8.2 13.2c-1.6 1.3-2.6 3-2.6 4.8"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <h3 className="wellness-card-title">
                        Connect your wearables
                      </h3>
                      <p className="wellness-card-desc">
                        Oura, WHOOP and Fitbit sync in read-only. Garmin is
                        coming soon - one quiet place for every reading.
                      </p>
                      <span className="wellness-card-more">Learn More</span>
                    </article>
                    <article className="wellness-card is-tr">
                      <span className="wellness-card-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 9.2c-1.2-2.2-4.2-1.9-4.9.5-.6 2 1.1 3.8 4.9 6.8 3.8-3 5.5-4.8 4.9-6.8-.7-2.4-3.7-2.7-4.9-.5z"
                            fill="currentColor"
                          />
                          <path
                            d="M5.2 16.8c1.6.9 3.6 1.5 6.8 1.5s5.2-.6 6.8-1.5"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <h3 className="wellness-card-title">
                        Connect · Analyse · Score
                      </h3>
                      <p className="wellness-card-desc">
                        Your signals resolve into a single Wellness Score,
                        updated daily and easy to act on.
                      </p>
                      <span className="wellness-card-more">Learn More</span>
                    </article>
                    <div className="wellness-phone">
                      <div
                        className="wellness-phone-ring"
                        aria-hidden="true"
                      ></div>
                      <div className="wellness-phone-frame">
                        <div className="wellness-phone-notch"></div>
                        <div className="wellness-phone-screen">
                          <div className="wellness-score-label">
                            Wellness Score
                          </div>
                          <div className="wellness-score">88</div>
                          <ul className="wellness-metrics">
                            <li>
                              <div className="wellness-metric-row">
                                <span>Sleep</span>
                                <span>7h 42m</span>
                              </div>
                              <div className="wellness-bar is-sleep">
                                <span></span>
                              </div>
                            </li>
                            <li>
                              <div className="wellness-metric-row">
                                <span>HRV</span>
                                <span>62 ms</span>
                              </div>
                              <div className="wellness-bar is-hrv">
                                <span></span>
                              </div>
                            </li>
                            <li>
                              <div className="wellness-metric-row">
                                <span>Resting HR</span>
                                <span>54 bpm</span>
                              </div>
                              <div className="wellness-bar is-hr">
                                <span></span>
                              </div>
                            </li>
                            <li>
                              <div className="wellness-metric-row">
                                <span>Recovery</span>
                                <span>86%</span>
                              </div>
                              <div className="wellness-bar is-rec">
                                <span></span>
                              </div>
                            </li>
                          </ul>
                          <p className="wellness-note">
                            Elara — Your recovery is trending above baseline.
                            HRV looks strong.
                          </p>
                        </div>
                      </div>
                    </div>
                    <article className="wellness-card is-bl">
                      <div className="wellness-card-body">
                        <span className="wellness-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path
                              d="M10 8.2a3.4 3.4 0 0 0-4.8 0l-1 1a3.4 3.4 0 0 0 0 4.8l1.2 1.2"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                            <path
                              d="M14 15.8a3.4 3.4 0 0 0 4.8 0l1-1a3.4 3.4 0 0 0 0-4.8l-1.2-1.2"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                            <path
                              d="M9.2 14.8 14.8 9.2"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="wellness-card-title">
                          Elara, your guide
                        </h3>
                        <p className="wellness-card-desc">
                          Wellness insight and coaching that reads the pattern
                          beneath the data. Clearly non-medical.
                        </p>
                        <span className="wellness-card-more">Learn More</span>
                      </div>
                    </article>
                    <article className="wellness-card is-br">
                      <div className="wellness-card-body">
                        <span className="wellness-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path
                              d="M5.5 16.4V8.8A3.3 3.3 0 0 1 8.8 5.5h6.4A3.3 3.3 0 0 1 18.5 8.8v4.2a3.3 3.3 0 0 1-3.3 3.3H9.2L5.5 19.4v-3z"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <h3 className="wellness-card-title">
                          Private by design
                        </h3>
                        <p className="wellness-card-desc">
                          Separate consent for wellness, clinical and research.
                          Nothing flows automatically between them.
                        </p>
                        <span className="wellness-card-more">Learn More</span>
                      </div>
                    </article>
                  </div>
                </div>
              </section>
              <section id="experience" className="stack-wrap">
                <div className="stack-stage">
                  <DanubeStackPanel theme="gold" />
                  <DanubeStackPanel theme="navy" />
                  <DanubeStackPanel theme="teal" />
                </div>
              </section>
              <div className="home-gallery-wrap" hidden>
                <section className="home-gallery">
                  <div className="w-layout-blockcontainer container grid w-container">
                    <div
                      id="w-node-bf15eeb2-dd51-7ee0-11a0-b93923d0ae0e-88934dca"
                      className="home-gallery-stick"
                    >
                      <div
                        id="w-node-_84e50959-86bb-34ab-a4d7-794912b03b11-88934dca"
                        className="home-gallery-text"
                      >
                        <div className="home-gallery-text-inner">
                          <div className="home-gallery-text-item">
                            <h3 className="heading h3">
                              where curated adventures await those who’ve seen
                              it all, done it all, and still crave more.
                            </h3>
                          </div>
                          <div className="home-gallery-text-item">
                            <h3 className="heading h3">
                              Encounters with nature, wildlife, and local
                              culture shape each journey, making no two days
                              ever the same.
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="w-node-_57aa5c42-c2e8-5c69-3d45-0db33258c14d-88934dca"
                      className="home-gallery-zoom"
                    >
                      <div className="home-gallery-zoom-inner">
                        <div className="home-gallery-zoom-img">
                          <div className="home-gallery-zoom-img-inner">
                            <img
                              src="/images/689eb59b898d833188934e13_footer-3.jpg"
                              loading="lazy"
                              sizes="100vw"
                              srcset="images/689eb59b898d833188934e13_54b5810328270823df01de565c53fba3_footer-3-p-500.jpg 500w, images/689eb59b898d833188934e13_54b5810328270823df01de565c53fba3_footer-3-p-800.jpg 800w, images/689eb59b898d833188934e13_54b5810328270823df01de565c53fba3_footer-3-p-1080.jpg 1080w, images/689eb59b898d833188934e13_54b5810328270823df01de565c53fba3_footer-3-p-1600.jpg 1600w, images/689eb59b898d833188934e13_footer-3.jpg 1824w"
                              alt=""
                              className="img-default img-h img-w-tb"
                            />
                          </div>
                          <button className="home-gallery-zoom-close">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              viewBox="0 0 32 32"
                              fill="none"
                              className="svg"
                            >
                              <path
                                d="M24.426 8.738 9.34 23.823m15.1 0L9.354 8.74"
                                stroke="#fff"
                                stroke-width="1.3"
                                stroke-linecap="square"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </button>
                        </div>
                        <div className="home-gallery-zoom-txt">
                          <div className="txt fs-18">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="w-node-f9b94508-7770-6014-9387-ee7b517f011d-88934dca"
                      className="home-gallery-main start"
                    >
                      <div className="home-gallery-cms w-dyn-list">
                        <div
                          role="list"
                          className="home-gallery-list start w-dyn-items"
                        >
                          <div
                            data-content="Swim with whale sharks, guided by local fishermen."
                            role="listitem"
                            className="home-gallery-item start w-dyn-item"
                          >
                            <div className="home-gallery-item-img">
                              <div className="home-gallery-item-img-inner">
                                <img
                                  src="/images/68c006738260a0c71096380e_689eb59b898d833188934de8_home-gallery-1.jpg"
                                  loading="lazy"
                                  alt=""
                                  sizes="100vw"
                                  srcset="images/68c006738260a0c71096380e_689eb59b898d833188934de8_home-gallery-1-p-500.jpg 500w, images/68c006738260a0c71096380e_689eb59b898d833188934de8_home-gallery-1-p-800.jpg 800w, images/68c006738260a0c71096380e_689eb59b898d833188934de8_home-gallery-1-p-1080.jpg 1080w, images/68c006738260a0c71096380e_689eb59b898d833188934de8_home-gallery-1.jpg 1766w"
                                  className="img-default img-fill border-r"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            data-content="Komodo Dragon, the world’s largest lizard in its natural habitat."
                            role="listitem"
                            className="home-gallery-item start w-dyn-item"
                          >
                            <div className="home-gallery-item-img">
                              <div className="home-gallery-item-img-inner">
                                <img
                                  src="/images/68c0069db4de1e11dfc203b6_689eb59b898d833188934deb_home-gallery-2.jpg"
                                  loading="lazy"
                                  alt=""
                                  sizes="100vw"
                                  srcset="images/68c0069db4de1e11dfc203b6_689eb59b898d833188934deb_home-gallery-2-p-500.jpg 500w, images/68c0069db4de1e11dfc203b6_689eb59b898d833188934deb_home-gallery-2-p-800.jpg 800w, images/68c0069db4de1e11dfc203b6_689eb59b898d833188934deb_home-gallery-2-p-1080.jpg 1080w, images/68c0069db4de1e11dfc203b6_689eb59b898d833188934deb_home-gallery-2-p-1600.jpg 1600w, images/68c0069db4de1e11dfc203b6_689eb59b898d833188934deb_home-gallery-2.jpg 1821w"
                                  className="img-default img-fill border-r"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            data-content="Experience a sacred tribal ceremony in Flores."
                            role="listitem"
                            className="home-gallery-item start w-dyn-item"
                          >
                            <div className="home-gallery-item-img">
                              <div className="home-gallery-item-img-inner">
                                <img
                                  src="/images/68c006bf943e639ad255e529_689eb59b898d833188934de9_home-gallery-3.jpg"
                                  loading="lazy"
                                  alt=""
                                  sizes="100vw"
                                  srcset="images/68c006bf943e639ad255e529_689eb59b898d833188934de9_home-gallery-3-p-500.jpg 500w, images/68c006bf943e639ad255e529_689eb59b898d833188934de9_home-gallery-3-p-800.jpg 800w, images/68c006bf943e639ad255e529_689eb59b898d833188934de9_home-gallery-3.jpg 1080w"
                                  className="img-default img-fill border-r"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            data-content="Explore jungle-clad islands and vibrant coral reefs."
                            role="listitem"
                            className="home-gallery-item start w-dyn-item"
                          >
                            <div className="home-gallery-item-img">
                              <div className="home-gallery-item-img-inner">
                                <img
                                  src="/images/68c007022358157eadfd0de2_689eb59b898d833188934dea_home-gallery-5.jpg"
                                  loading="lazy"
                                  alt=""
                                  sizes="100vw"
                                  srcset="images/68c007022358157eadfd0de2_689eb59b898d833188934dea_home-gallery-5-p-500.jpg 500w, images/68c007022358157eadfd0de2_689eb59b898d833188934dea_home-gallery-5-p-800.jpg 800w, images/68c007022358157eadfd0de2_689eb59b898d833188934dea_home-gallery-5-p-1080.jpg 1080w, images/68c007022358157eadfd0de2_689eb59b898d833188934dea_home-gallery-5-p-1600.jpg 1600w, images/68c007022358157eadfd0de2_689eb59b898d833188934dea_home-gallery-5.jpg 1826w"
                                  className="img-default img-fill border-r"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            data-content="Ride across crystal waters with speed and freedom."
                            role="listitem"
                            className="home-gallery-item start w-dyn-item"
                          >
                            <div className="home-gallery-item-img">
                              <div className="home-gallery-item-img-inner">
                                <img
                                  src="/images/68c006e8def74d5906a2d01f_689eb59b898d833188934de7_home-gallery-4.jpg"
                                  loading="lazy"
                                  alt=""
                                  sizes="100vw"
                                  srcset="images/68c006e8def74d5906a2d01f_689eb59b898d833188934de7_home-gallery-4-p-500.jpg 500w, images/68c006e8def74d5906a2d01f_689eb59b898d833188934de7_home-gallery-4-p-800.jpg 800w, images/68c006e8def74d5906a2d01f_689eb59b898d833188934de7_home-gallery-4.jpg 1076w"
                                  className="img-default img-fill border-r"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="w-node-ee1cc059-616e-0af4-5b61-899660554a95-88934dca"
                      className="home-gallery-main end"
                    >
                      <div className="home-gallery-cms w-dyn-list">
                        <div
                          role="list"
                          className="home-gallery-list w-dyn-items"
                        >
                          <div
                            role="listitem"
                            className="home-gallery-item end w-dyn-item"
                          >
                            <div className="home-gallery-item-img">
                              <div className="home-gallery-item-img-inner">
                                <img
                                  src="/images/68c006738260a0c71096380e_689eb59b898d833188934de8_home-gallery-1.jpg"
                                  loading="lazy"
                                  alt=""
                                  sizes="100vw"
                                  srcset="images/68c006738260a0c71096380e_689eb59b898d833188934de8_home-gallery-1-p-500.jpg 500w, images/68c006738260a0c71096380e_689eb59b898d833188934de8_home-gallery-1-p-800.jpg 800w, images/68c006738260a0c71096380e_689eb59b898d833188934de8_home-gallery-1-p-1080.jpg 1080w, images/68c006738260a0c71096380e_689eb59b898d833188934de8_home-gallery-1.jpg 1766w"
                                  className="img-default img-fill border-r"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            role="listitem"
                            className="home-gallery-item end w-dyn-item"
                          >
                            <div className="home-gallery-item-img">
                              <div className="home-gallery-item-img-inner">
                                <img
                                  src="/images/68c0069db4de1e11dfc203b6_689eb59b898d833188934deb_home-gallery-2.jpg"
                                  loading="lazy"
                                  alt=""
                                  sizes="100vw"
                                  srcset="images/68c0069db4de1e11dfc203b6_689eb59b898d833188934deb_home-gallery-2-p-500.jpg 500w, images/68c0069db4de1e11dfc203b6_689eb59b898d833188934deb_home-gallery-2-p-800.jpg 800w, images/68c0069db4de1e11dfc203b6_689eb59b898d833188934deb_home-gallery-2-p-1080.jpg 1080w, images/68c0069db4de1e11dfc203b6_689eb59b898d833188934deb_home-gallery-2-p-1600.jpg 1600w, images/68c0069db4de1e11dfc203b6_689eb59b898d833188934deb_home-gallery-2.jpg 1821w"
                                  className="img-default img-fill border-r"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            role="listitem"
                            className="home-gallery-item end w-dyn-item"
                          >
                            <div className="home-gallery-item-img">
                              <div className="home-gallery-item-img-inner">
                                <img
                                  src="/images/68c006bf943e639ad255e529_689eb59b898d833188934de9_home-gallery-3.jpg"
                                  loading="lazy"
                                  alt=""
                                  sizes="100vw"
                                  srcset="images/68c006bf943e639ad255e529_689eb59b898d833188934de9_home-gallery-3-p-500.jpg 500w, images/68c006bf943e639ad255e529_689eb59b898d833188934de9_home-gallery-3-p-800.jpg 800w, images/68c006bf943e639ad255e529_689eb59b898d833188934de9_home-gallery-3.jpg 1080w"
                                  className="img-default img-fill border-r"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            role="listitem"
                            className="home-gallery-item end w-dyn-item"
                          >
                            <div className="home-gallery-item-img">
                              <div className="home-gallery-item-img-inner">
                                <img
                                  src="/images/68c007022358157eadfd0de2_689eb59b898d833188934dea_home-gallery-5.jpg"
                                  loading="lazy"
                                  alt=""
                                  sizes="100vw"
                                  srcset="images/68c007022358157eadfd0de2_689eb59b898d833188934dea_home-gallery-5-p-500.jpg 500w, images/68c007022358157eadfd0de2_689eb59b898d833188934dea_home-gallery-5-p-800.jpg 800w, images/68c007022358157eadfd0de2_689eb59b898d833188934dea_home-gallery-5-p-1080.jpg 1080w, images/68c007022358157eadfd0de2_689eb59b898d833188934dea_home-gallery-5-p-1600.jpg 1600w, images/68c007022358157eadfd0de2_689eb59b898d833188934dea_home-gallery-5.jpg 1826w"
                                  className="img-default img-fill border-r"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            role="listitem"
                            className="home-gallery-item end w-dyn-item"
                          >
                            <div className="home-gallery-item-img">
                              <div className="home-gallery-item-img-inner">
                                <img
                                  src="/images/68c006e8def74d5906a2d01f_689eb59b898d833188934de7_home-gallery-4.jpg"
                                  loading="lazy"
                                  alt=""
                                  sizes="100vw"
                                  srcset="images/68c006e8def74d5906a2d01f_689eb59b898d833188934de7_home-gallery-4-p-500.jpg 500w, images/68c006e8def74d5906a2d01f_689eb59b898d833188934de7_home-gallery-4-p-800.jpg 800w, images/68c006e8def74d5906a2d01f_689eb59b898d833188934de7_home-gallery-4.jpg 1076w"
                                  className="img-default img-fill border-r"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="w-node-_4d0c231e-4f15-d2f0-9638-f511fc757348-88934dca"
                      className="home-gallery-empty-block"
                    ></div>
                  </div>
                </section>
              </div>
              <div id="explore" className="home-team-wrap">
                <section className="home-team">
                  <div className="home-team-thumb">
                    <div className="home-team-thumb-inner">
                      <img
                        className="img-default img-fill yacht-frame-fallback"
                        src="/images/Yacht_frames/ezgif-frame-001.jpg"
                        alt=""
                      />
                      <canvas
                        className="yacht-frame-canvas"
                        data-frame-count={YACHT_FRAME_COUNT}
                        data-frame-src="/images/Yacht_frames/ezgif-frame-{n}.jpg"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="yacht-copy">
                      <h2 className="yacht-copy-heading">
                        The Water. <br />
                        Silent Yachts
                      </h2>
                      <div className="yacht-copy-card">
                        <p>
                          Solar - electric catamarans built for silent, self -
                          sufficient cruising, combining effortless passages,
                          extended range and spacious living under sun and sail.
                          Ownership is shared through fractional co-ownership,
                          giving each partner meaningful time aboard without the
                          weight of sole stewardship. <br />
                          Registering now secures priority access and the first
                          opportunity to engage as the programme takes shape.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <section className="lookbook-wrap" aria-label="Sollus gallery">
                <div className="lookbook">
                  <div className="lookbook-stage">
                    <div className="lookbook-copy">
                      <h2 className="lookbook-title">Sollus</h2>
                      <p className="lookbook-tag">
                        A private world to share in comfort
                      </p>
                    </div>
                    <div className="lookbook-ring" aria-hidden="true">
                      {LOOKBOOK_PHOTOS.map((src, i) => (
                        <figure key={src} className={`lookbook-shot is-${i}`}>
                          <img src={src} alt="" />
                        </figure>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <section id="register" className="register-wrap">
                <div className="register">
                  <h2 className="register-heading">Register Your Interest</h2>
                  <p className="register-sub">
                    If you're interested in Sollus Digital, please fill out your
                    details to join the waitlist. We look forward to connecting
                    with you!
                  </p>
                  <div className="register-grid">
                    <div className="register-media">
                      <img
                        src="https://mymiakai.com/wp-content/uploads/2023/03/Interiors_Exteriors-107.jpg"
                        alt="On the yacht bridge"
                      />
                    </div>
                    <form
                      className="register-form"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="register-field">
                        <label htmlFor="register-name">Your Name *</label>
                        <input
                          id="register-name"
                          name="name"
                          type="text"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="register-field">
                        <label htmlFor="register-email">Your Email *</label>
                        <input
                          id="register-email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="register-field">
                        <label htmlFor="register-phone">
                          Your Phone Number *
                        </label>
                        <input
                          id="register-phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                      <div className="register-field is-message">
                        <label htmlFor="register-message">Message</label>
                        <textarea
                          id="register-message"
                          name="message"
                          rows="6"
                        />
                      </div>
                      <button type="submit" className="register-submit">
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </section>
            </div>
            <footer className="site-footer">
              <div className="site-footer-inner">
                <div className="site-footer-brand">
                  <a href="/" className="site-footer-logo">
                    <img src={sollusLogo} alt="" />
                    <span className="site-footer-wordmark">
                      <span className="site-footer-name">Sollus</span>
                      <span className="site-footer-global">Global</span>
                    </span>
                  </a>
                  <p className="site-footer-tagline">
                    Transformation. Restoration. Protection
                  </p>
                  <p className="site-footer-copy">
                    A Bermuda - rooted integrated ecosystem
                  </p>
                </div>
                <div className="site-footer-col">
                  {/* <h3>General</h3> */}
                  <a href="/">Journey </a>
                  <a href="#ecosystem">Elara</a>
                  <a href="#explore">Explore</a>
                  <a href="#experience">Experience</a>
                </div>
                <div className="site-footer-col">
                  {/* <h3>Legal</h3> */}
                  <a href="/terms-conditions">Legal</a>
                  <a href="/privacy-policy">Privacy Policy</a>
                  <a href="/privacy-policy">Terms</a>
                  <a href="/privacy-policy">FAQ</a>
                  <a href="/privacy-policy">Contact</a>
                </div>
                <div className="site-footer-col">
                  {/* <h3>Contacts</h3> */}
                  <a href="mailto:info@sollus-digital.com">
                    info@sollus-digital.com
                  </a>
                  <a href="tel:+123575987333">+123 575 987 333</a>
                </div>
              </div>
              <div className="site-footer-media">
                <img src="/images/footer-coast.png" alt="" />
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
