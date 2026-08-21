type StackCard = HTMLElement & { __dpClick?: (event: Event) => void };

const CARD_ORDER = ["CREATE", "BRAND", "GROW"];
const BAR_COLORS: Record<string, string> = {
  CREATE: "#00B7FF",
  BRAND: "#FF5FA2",
  GROW: "#C89B3C",
};

let activeIndex = 0;
let initialized = false;

function findSection(): HTMLElement | null {
  const heading = Array.from(document.querySelectorAll<HTMLElement>("h1,h2,h3,h4"))
    .find((el) => el.textContent?.trim().toLowerCase() === "the digital points way");
  if (!heading) return null;
  return heading.closest("section") ?? heading.parentElement;
}

function findCards(section: HTMLElement): StackCard[] {
  const candidates = Array.from(section.querySelectorAll<HTMLElement>("article"));
  return CARD_ORDER.map((title) => candidates.find((card) => card.querySelector("h3")?.textContent?.trim() === title) as StackCard | undefined)
    .filter(Boolean) as StackCard[];
}

function installStyles() {
  if (document.getElementById("dp-way-enhancer-styles")) return;
  const style = document.createElement("style");
  style.id = "dp-way-enhancer-styles";
  style.textContent = `
    .dp-way-section{display:grid!important;grid-template-columns:minmax(0,.92fr) minmax(380px,1.08fr)!important;align-items:center!important;column-gap:clamp(44px,7vw,110px)!important;}
    .dp-way-stack{position:relative!important;display:block!important;width:100%!important;height:330px;min-height:330px;transform:perspective(900px) rotateX(var(--dp-tilt-x,0deg)) rotateY(var(--dp-tilt-y,0deg));transform-style:preserve-3d;transition:transform 280ms ease;}
    .dp-way-stack.dp-way-float{animation:dpWayFloat 6.5s ease-in-out infinite;}
    .dp-way-card{backface-visibility:hidden;transform-style:preserve-3d;}
    .dp-way-card::after{content:"";position:absolute;left:0;right:0;bottom:0;height:4px;background:var(--dp-bar,#00B7FF);transform-origin:left center;pointer-events:none;}
    .dp-way-card.dp-way-sending{animation:dpWaySend 420ms cubic-bezier(.55,.08,.68,.53) both;}
    @keyframes dpWayFloat{0%,100%{margin-top:0}50%{margin-top:-7px}}
    @keyframes dpWaySend{0%{opacity:1;transform:translate(-50%,-50%) translate3d(0,0,36px) rotate(-5deg) scale(1)}45%{opacity:0;transform:translate(-50%,-50%) translate3d(-18px,-46px,90px) rotate(-12deg) scale(1.04)}100%{opacity:0;transform:translate(-50%,-50%) translate3d(18px,22px,-30px) rotate(14deg) scale(.86)}}
    @media (max-width:767px){
      .dp-way-section{grid-template-columns:1fr!important;row-gap:28px!important;justify-items:center!important;}
      .dp-way-stack{height:280px!important;min-height:280px!important;max-width:430px!important;}
    }
    @media (prefers-reduced-motion:reduce){.dp-way-stack.dp-way-float{animation:none!important}.dp-way-card.dp-way-sending{animation:none!important}}
  `;
  document.head.appendChild(style);
}

function setCardState(cards: StackCard[], index: number, animate = true) {
  activeIndex = (index + cards.length) % cards.length;
  const positions = [0, 1, 2].map((offset) => (activeIndex + offset) % cards.length);

  cards.forEach((card, cardIndex) => {
    const title = card.querySelector("h3")?.textContent?.trim() ?? "";
    const position = positions.indexOf(cardIndex);
    const isFront = position === 0;
    const isMiddle = position === 1;

    card.dataset.dpPosition = String(position);
    card.style.setProperty("--dp-bar", BAR_COLORS[title] ?? "#00B7FF");
    card.style.zIndex = String(isFront ? 30 : isMiddle ? 20 : 10);
    card.style.pointerEvents = isFront ? "auto" : "none";
    card.setAttribute("aria-hidden", isFront ? "false" : "true");
    card.tabIndex = isFront ? 0 : -1;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `${title} card. Click to show the next card.`);
    card.style.transition = animate
      ? "transform 560ms cubic-bezier(.22,.8,.2,1), opacity 420ms ease, filter 420ms ease"
      : "none";

    if (isFront) {
      card.style.transform = "translate(-50%, -50%) translate3d(0, 0, 36px) rotate(-5deg) scale(1)";
      card.style.opacity = "1";
      card.style.filter = "none";
    } else if (isMiddle) {
      card.style.transform = "translate(-50%, -50%) translate3d(26px, -18px, 0) rotate(4deg) scale(.96)";
      card.style.opacity = ".96";
      card.style.filter = "brightness(.92)";
    } else {
      card.style.transform = "translate(-50%, -50%) translate3d(58px, -40px, -22px) rotate(11deg) scale(.92)";
      card.style.opacity = ".82";
      card.style.filter = "brightness(.82)";
    }
  });
}

function attachIconBoxes(cards: StackCard[]) {
  cards.forEach((card) => {
    const icon = card.querySelector("svg");
    if (!icon || icon.parentElement?.dataset.dpIconBox === "true") return;
    const box = document.createElement("span");
    box.dataset.dpIconBox = "true";
    box.setAttribute("aria-hidden", "true");
    box.style.cssText = "display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,.10);color:#fff;flex:0 0 auto;";
    icon.classList.remove("h-20", "w-20", "sm:h-24", "sm:w-24", "lg:h-28", "lg:w-28");
    icon.style.width = "21px";
    icon.style.height = "21px";
    icon.parentElement?.insertBefore(box, icon);
    box.appendChild(icon);
  });
}

function addProgressBars(cards: StackCard[]) {
  cards.forEach((card) => {
    if (card.querySelector("[data-dp-progress]")) return;
    const bar = document.createElement("span");
    bar.dataset.dpProgress = "true";
    bar.setAttribute("aria-hidden", "true");
    bar.style.cssText = "position:absolute;left:0;right:0;bottom:0;height:4px;background:var(--dp-bar);transform-origin:left center;transform:scaleX(0);transition:transform 900ms cubic-bezier(.22,.8,.2,1);";
    card.appendChild(bar);
    requestAnimationFrame(() => { bar.style.transform = "scaleX(1)"; });
  });
}

function setupTilt(stack: HTMLElement) {
  let raf = 0;
  const move = (event: globalThis.PointerEvent) => {
    const rect = stack.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      stack.style.setProperty("--dp-tilt-x", `${(-y * 5).toFixed(2)}deg`);
      stack.style.setProperty("--dp-tilt-y", `${(x * 7).toFixed(2)}deg`);
    });
  };
  const leave = () => {
    stack.style.setProperty("--dp-tilt-x", "0deg");
    stack.style.setProperty("--dp-tilt-y", "0deg");
  };
  stack.addEventListener("pointermove", move);
  stack.addEventListener("pointerleave", leave);
  return () => {
    cancelAnimationFrame(raf);
    stack.removeEventListener("pointermove", move);
    stack.removeEventListener("pointerleave", leave);
  };
}

function init() {
  if (initialized) return;
  const section = findSection();
  if (!section) return;
  const cards = findCards(section);
  if (cards.length !== 3) return;

  installStyles();
  const heading = Array.from(section.querySelectorAll<HTMLElement>("h1,h2,h3,h4"))
    .find((el) => el.textContent?.trim().toLowerCase() === "the digital points way");
  const headingParent = heading?.closest("div") as HTMLElement | null;
  const introColumn = headingParent?.parentElement === section ? headingParent : headingParent?.parentElement ?? null;
  const desktopStack = cards[0].closest(".relative.hidden") as HTMLElement | null;
  const mobileStack = section.querySelector(".flex.snap-x") as HTMLElement | null;
  if (!desktopStack) return;

  const stackColumn = desktopStack.parentElement;
  if (stackColumn && stackColumn.parentElement === section) stackColumn.classList.add("dp-way-stack-column");
  section.classList.add("dp-way-section");
  if (introColumn && introColumn.parentElement === section) introColumn.classList.add("dp-way-intro-column");

  initialized = true;
  desktopStack.classList.add("dp-way-stack");
  desktopStack.classList.remove("hidden", "md:block");
  desktopStack.style.display = "block";
  desktopStack.style.overflow = "visible";
  desktopStack.style.perspective = "900px";
  desktopStack.style.transformStyle = "preserve-3d";
  desktopStack.style.setProperty("--dp-tilt-x", "0deg");
  desktopStack.style.setProperty("--dp-tilt-y", "0deg");
  desktopStack.addEventListener("pointerenter", (event) => event.stopPropagation());
  desktopStack.addEventListener("pointerleave", (event) => event.stopPropagation());

  if (mobileStack) {
    mobileStack.style.display = "none";
    const hint = mobileStack.nextElementSibling as HTMLElement | null;
    if (hint?.textContent?.includes("Swipe to explore")) hint.style.display = "none";
  }

  cards.forEach((card) => {
    card.classList.add("dp-way-card");
    card.style.left = "50%";
    card.style.top = "50%";
    card.style.width = "min(100%, 420px)";
    card.style.height = "min(300px, 72vw)";
    card.style.minWidth = "0";
    card.style.transformOrigin = "center center";
    card.style.willChange = "transform, opacity";
    card.style.cursor = "pointer";
    card.style.borderRadius = "18px";
    card.style.background = "linear-gradient(145deg,#171717 0%,#25211e 100%)";
    card.style.boxShadow = "0 28px 70px rgba(0,0,0,.22)";

    const description = card.querySelector("p") as HTMLElement | null;
    if (description) description.style.marginTop = "auto";

    const click = (event: Event) => {
      if (card.dataset.dpPosition !== "0") return;
      event.preventDefault();
      card.classList.add("dp-way-sending");
      window.setTimeout(() => {
        card.classList.remove("dp-way-sending");
        setCardState(cards, activeIndex + 1);
      }, 240);
    };
    card.__dpClick = click;
    card.addEventListener("click", click);

    card.addEventListener("keydown", (event) => {
      if (card.dataset.dpPosition !== "0") return;
      const keyEvent = event as KeyboardEvent;
      if (keyEvent.key === "Enter" || keyEvent.key === " ") {
        keyEvent.preventDefault();
        setCardState(cards, activeIndex + 1);
      }
    });
  });

  attachIconBoxes(cards);
  addProgressBars(cards);
  setCardState(cards, 0, false);
  setupTilt(desktopStack);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion) desktopStack.classList.add("dp-way-float");
}

const observer = new MutationObserver(() => init());
observer.observe(document.body, { childList: true, subtree: true });
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
else init();

export {};
