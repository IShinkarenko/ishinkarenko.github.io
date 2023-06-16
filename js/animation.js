function welcomAnimation() {
  const introContainer = document.querySelector(".welcome");
  const wrapperContainer = document.querySelector(".wrapper");
  const list = document.querySelector(".welcome__list");
  const logoLine = document.querySelector(".welcome__logo-line rect");

  gsap.set(wrapperContainer, { opacity: 0 });

  const welcomeTimeLine = gsap.timeline();

  welcomeTimeLine.to(introContainer, { opacity: 1, duration: 2 })
    .fromTo(
      logoLine,
      { strokeDasharray: "0 318", strokeDashoffset: "318" },
      {
        strokeDasharray: "318 0",
        strokeDashoffset: "0 318",
        duration: 1.5,
        ease: "power1.inOut",
        onComplete: function () {
          gsap.to(logoLine, { opacity: 0, duration: 0.5 });
        },
      },
      "-=2"
    )
    .to(list, { visibility: "visible", width: "auto", duration: 0.5 })
    .to(introContainer, { opacity: 0, duration: 1, delay: 7 })
    .to(wrapperContainer, { opacity: 1, display: "block", duration: 1 })
    .call(platfortmAnimation);

  return welcomeTimeLine;
}

function platfortmAnimation() {
  gsap.registerPlugin(ScrollTrigger);
  const allAnimations = gsap.utils.toArray(".animated-section");

  allAnimations.forEach((item) => {
    const sectionImg = item.querySelector('.animated-section__img');
    const sectionFullImg = item.querySelector('.full-image');
    const sectionInner = item.querySelector('.animated-section__box');
    const sectionTitle = item.querySelector('.animated-section__title');
    const sectionBody = item.querySelector('.animated-section__body');
    const sectionBodyInner = item.querySelector('.animated-section__body-inner');
    const sectionItems = item.querySelector('.animated-section__items');
    const viewportHeight = window.innerHeight * 2.2;

    const platformTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top top",
        once: true,
        markers: true,
        onEnter: scrollToTop
      },
    });

    function scrollToTop() {
      const itemTop = item.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: itemTop, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
    }

    platformTimeline
      .to(sectionImg, { left: '50%', xPercent: -50, duration: 0.8, delay: 0.5 })
      .to(sectionInner, { width: '100vw', height: '100vh', duration: 0.8, delay: 0.5 }, 0)
      .to(sectionImg, { scale: 5, ease: ExpoScaleEase.config(1, 7), duration: 0.8 }, "+=0.2")
      .to(sectionImg, { autoAlpha: 0, duration: 0.7 }, "-=0.5")
      .to(sectionFullImg, { width: '100%', x: '0%', autoAlpha: 1, duration: 0.7, delay: 2.7 }, 0)
      .to(sectionTitle, { opacity: 0, duration: 0.7 }, "-=0.8")
      .to(sectionInner, { opacity: 0, duration: 0.3, delay: 2.7 }, 0)
      .to(sectionFullImg, { width: '50%', x: '50%', ease: "power0.out", duration: 0.7, delay: 2.7 }, 0)
      .to(sectionBody, { left: 0, duration: 0.7, ease: "power1.out", delay: 2.5 }, "-=3.4")
      .to(sectionBodyInner, { duration: 0.6, opacity: 1 }, "+=0.7")
      .to(sectionItems, { duration: 0.6, opacity: 1 }, "-=0.7")
      .to(".page-body", { overflow: 'auto' });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const animation = welcomAnimation();

  animation.play();
});
