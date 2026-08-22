import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ImageMosaic from "../components/ImageMosaic";
import VideoShowcase from "../components/VideoShowcase";
import Partners from "../components/Partners";
import FinalCTA from "../components/FinalCTA";
import ScrollColorHeading from "../components/ScrollColorHeading";

const CreateIcon = () => (
  <svg viewBox="0 0 700 700" aria-hidden="true" className="h-[150px] w-[150px]">
    <g fill="white" fillRule="evenodd">
      <path d="M 296 515 L 290 560 L 400 561 L 395 516 Z" />
      <path d="M 345 236 L 260 381 L 258 390 L 267 405 L 290 454 L 295 470 L 297 492 L 395 493 L 396 476 L 403 454 L 421 416 L 436 391 L 436 387 L 352 236 L 351 248 L 355 355 L 363 363 L 366 375 L 363 383 L 357 389 L 348 392 L 339 390 L 330 381 L 329 368 L 332 362 L 339 356 L 345 265 Z" />
      <path d="M 121 145 L 119 150 L 120 160 L 125 166 L 131 169 L 141 168 L 150 159 L 265 160 L 275 162 L 241 177 L 210 198 L 182 224 L 166 244 L 146 279 L 136 306 L 129 336 L 127 355 L 125 357 L 121 357 L 121 380 L 143 380 L 143 357 L 139 357 L 138 354 L 142 326 L 151 296 L 162 272 L 173 254 L 185 238 L 207 215 L 236 193 L 277 173 L 318 163 L 353 161 L 388 165 L 430 178 L 450 188 L 470 201 L 485 213 L 504 232 L 530 268 L 540 288 L 549 313 L 556 351 L 556 361 L 551 362 L 551 384 L 573 385 L 574 363 L 567 360 L 565 335 L 557 302 L 549 281 L 529 245 L 515 227 L 483 197 L 453 177 L 424 163 L 541 163 L 549 164 L 555 171 L 566 174 L 574 171 L 580 162 L 579 152 L 573 145 L 569 143 L 560 143 L 547 153 L 150 148 L 143 140 L 138 138 L 128 139 Z" />
    </g>
  </svg>
);

const BrandIcon = () => (
  <svg viewBox="0 0 700 699" aria-hidden="true" className="h-[150px] w-[150px]">
    <g fill="white" fillRule="evenodd">
      <path d="M 227 192 L 213 205 L 205 219 L 201 235 L 195 505 L 199 520 L 205 531 L 214 541 L 224 548 L 246 555 L 443 560 L 455 558 L 473 550 L 490 532 L 495 521 L 498 507 L 504 238 L 500 223 L 494 212 L 477 196 L 456 188 L 412 187 L 407 189 L 402 194 L 400 199 L 401 209 L 406 215 L 413 218 L 442 218 L 456 220 L 468 229 L 473 240 L 467 504 L 461 519 L 454 525 L 442 529 L 249 524 L 238 520 L 230 512 L 226 502 L 232 238 L 237 225 L 243 219 L 251 215 L 293 215 L 301 212 L 306 206 L 307 195 L 302 187 L 296 184 L 251 183 L 236 187 Z" />
      <path d="M 360 139 L 350 139 L 344 142 L 340 147 L 338 156 L 337 235 L 334 240 L 329 242 L 321 249 L 314 261 L 312 269 L 312 283 L 319 299 L 331 310 L 343 315 L 351 316 L 366 313 L 377 307 L 385 299 L 392 279 L 391 265 L 387 255 L 371 240 L 369 236 L 371 151 L 369 146 Z" />
    </g>
  </svg>
);

const GrowIcon = () => (
  <svg viewBox="0 0 700 699" aria-hidden="true" className="h-[150px] w-[150px]">
    <g fill="white" fillRule="evenodd">
      <path d="M 160 476 L 157 480 L 158 554 L 165 556 L 170 550 L 170 489 L 224 488 L 225 551 L 230 556 L 235 555 L 238 551 L 237 478 L 232 475 Z" />
      <path d="M 262 408 L 259 413 L 259 550 L 265 556 L 272 550 L 272 421 L 326 420 L 328 422 L 327 549 L 330 555 L 338 555 L 340 552 L 339 409 L 334 407 Z" />
      <path d="M 367 339 L 362 343 L 361 550 L 366 556 L 372 555 L 374 551 L 374 357 L 378 352 L 429 352 L 430 552 L 432 555 L 438 556 L 442 553 L 443 548 L 442 342 L 437 339 Z" />
      <path d="M 469 271 L 464 276 L 464 551 L 466 554 L 471 556 L 477 550 L 477 286 L 528 285 L 529 550 L 536 556 L 542 550 L 542 275 L 537 271 Z" />
      <path d="M 482 190 L 477 187 L 473 188 L 445 223 L 403 267 L 369 297 L 323 331 L 286 353 L 259 366 L 221 380 L 168 391 L 164 393 L 163 399 L 169 405 L 205 398 L 241 387 L 279 371 L 327 344 L 365 317 L 405 283 L 443 245 L 481 199 L 483 195 Z" />
      <path d="M 510 142 L 503 143 L 445 170 L 442 173 L 443 180 L 450 182 L 499 160 L 500 163 L 495 215 L 499 220 L 504 220 L 508 215 L 514 147 Z" />
    </g>
  </svg>
);

const WayCard = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
  <article className="absolute origin-top-left scale-[0.65] flex h-[300px] w-[260px] flex-col items-center bg-[#211f20] px-7 pt-7 text-white shadow-none">
    <h3 className="font-display text-[30px] font-medium leading-none tracking-[-0.04em]">{title}</h3>
    <div className="mt-10 flex h-[170px] w-full items-center justify-center">{icon}</div>
  </article>
);

function DigitalPointsWayCards() {
  return (
    <div className="relative hidden h-[560px] w-[620px] lg:block" aria-label="Digital Points Way cards">
      <div className="absolute left-[20px] top-[10px]">
        <WayCard title="CREATE" icon={<CreateIcon />} />
      </div>
      <div className="absolute left-[215px] top-[15px] rotate-[9deg]">
        <WayCard title="BRAND" icon={<BrandIcon />} />
      </div>
      <div className="absolute left-[145px] top-[195px] rotate-[9deg]">
        <WayCard title="GROW" icon={<GrowIcon />} />
      </div>
    </div>
  );
}

function MobileDigitalPointsWayCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    { title: "CREATE", icon: <CreateIcon />, rotation: "rotate-0" },
    { title: "BRAND", icon: <BrandIcon />, rotation: "rotate-[9deg]" },
    { title: "GROW", icon: <GrowIcon />, rotation: "rotate-[9deg]" },
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % cards.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="mt-10 flex w-full justify-center overflow-hidden lg:hidden" aria-label="Digital Points Way cards">
      <div className="relative h-[205px] w-[180px] overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {cards.map((card) => (
            <div key={card.title} className="relative flex h-full min-w-full items-start justify-center">
              <div className={`relative h-[195px] w-[169px] ${card.rotation}`}>
                <WayCard title={card.title} icon={card.icon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <section
        id="digital-points-way"
        className="relative w-full overflow-hidden bg-[#fdfbf6] bg-dot-grid"
      >
        <div className="mx-auto grid min-h-[620px] w-full max-w-[1600px] grid-cols-1 items-start px-[clamp(24px,3.4vw,56px)] py-[clamp(72px,8vw,120px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(560px,1.08fr)] lg:gap-[clamp(40px,5vw,96px)] lg:px-[clamp(36px,4vw,64px)]">
          <div className="max-w-[760px] text-left">
            <ScrollColorHeading
              text="The Digital Points Way"
              className="whitespace-nowrap font-display text-[clamp(2.4rem,3.8vw,4rem)] font-semibold leading-[0.92] tracking-[-0.065em]"
            />

            <p className="mt-10 max-w-[760px] text-[clamp(1.05rem,1.45vw,1.5rem)] font-normal leading-[1.55] tracking-[-0.015em] text-graphite">
              <span className="block">
                At Digital Points, we believe that every great business starts with an idea, but an idea needs
              </span>
              <span className="block">
                the right creativity, identity, and strategy to become a successful brand. That is why our work
              </span>
              <span className="block">
                is built around three simple but powerful principles:
              </span>
            </p>
          </div>

          <DigitalPointsWayCards />
          <MobileDigitalPointsWayCards />
        </div>
      </section>

      <ImageMosaic />
      <VideoShowcase />
      <Partners />
      <FinalCTA />
    </>
  );
}
