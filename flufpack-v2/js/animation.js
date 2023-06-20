function welcomAnimation() {
  const introContainer = document.querySelector(".welcome");
  const wrapperContainer = document.querySelector(".wrapper");
  const list = document.querySelector(".welcome__list");
  const logoLine = document.querySelector(".welcome__logo-line rect");

  gsap.set(wrapperContainer, { opacity: 0, visibility: "hidden" });

  const welcomeTimeLine = gsap.timeline();

  welcomeTimeLine.to(introContainer, { opacity: 1, duration: 2 })
    .fromTo(
      logoLine,
      { strokeDasharray: "0 318", strokeDashoffset: "318" },
      {
        strokeDasharray: "318 0",
        strokeDashoffset: "0 318",
        duration: 1.5,
        ease: "power0.out",
        onComplete: function () {
          gsap.to(logoLine, { opacity: 0, duration: 0.5 });
        },
      },
      "-=2"
    )
    .to(list, { visibility: "visible", width: "auto", duration: 0.5 })
    .to(introContainer, { opacity: 0, duration: 1, delay: 6.5 })
    .to(wrapperContainer, { opacity: 1, visibility: "visible", duration: 1 })
    .call(platfortmAnimation)
    .call(paralaxAnimation)
    .call(petsPhrasesAnimation)
    .call(bannerAnimation);

  return welcomeTimeLine;
}

function platfortmAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  let mm = gsap.matchMedia();

  mm.add("(min-width: 992px)", () => {
    const allAnimations = gsap.utils.toArray(".animated-section");

    allAnimations.forEach((item) => {
      const sectionImg = item.querySelector('.animated-section__img');
      const sectionFullImg = item.querySelector('.full-image');
      const sectionInner = item.querySelector('.animated-section__box');
      const sectionTitle = item.querySelector('.animated-section__title');
      const sectionBody = item.querySelector('.animated-section__body');
      const sectionBodyInner = item.querySelector('.animated-section__body-inner');
      const sectionItems = item.querySelector('.animated-section__items');

      const platformTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top top",
          end: "top top-=2500",
          once: true,
          // markers: true,
          scrub: 1,
          pin: item,
          anticipatePin: 1,
          onLeave: function (self) {
            let start = self.start;
            self.scroll(self.start);
            self.disable();
            self.animation.progress(1, true);
            ScrollTrigger.refresh();
            window.scrollTo(0, start);
          }
        },
      });

      platformTimeline
        .to(sectionImg, { left: '50%', xPercent: -50, duration: 0.8, delay: 0.5 })
        .to(sectionInner, { width: '100vw', height: '100vh', duration: 0.8, delay: 0.5 }, 0)
        .to(sectionImg, { scale: 5, ease: ExpoScaleEase.config(1, 7), duration: 0.8 }, "+=0.2")
        .to(sectionImg, { autoAlpha: 0, duration: 0.7 }, "-=0.5")
        .to(sectionFullImg, { width: '100%', x: '0%', autoAlpha: 1, duration: 0.7, delay: 2.7 }, 0)
        .to(sectionTitle, { opacity: 0, duration: 0.7 }, "-=0.8")
        .to(sectionInner, { opacity: 0, duration: 0.3, delay: 2.7 }, 0)
        .to(sectionFullImg, { width: '55%', x: '41%', ease: "power0.out", duration: 0.7, delay: 2.7 }, 0)
        .to(sectionBody, { left: 0, duration: 0.7, ease: "power1.out", delay: 2.5 }, "-=3.4")
        .to(sectionBodyInner, { duration: 0.4, opacity: 1 }, "+=0.7")
      .to(sectionItems, { duration: 0.4, autoAlpha: 1 }, "-=0.4")
      .to(".page-body", { overflow: 'auto' })
    });
  });
}


function paralaxAnimation() {
  gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

  mm.add("(min-width: 992px)", () => {

  gsap.utils.toArray(".feature-item-scroll").forEach((sectionGS, index) => {
    ScrollTrigger.create({
      trigger: sectionGS,
      start: 'top top',
      ...(index === 3 && { end: 'bottom bottom' }),
      pin: true,
      pinSpacing: false,
      // markers: true,
    });
  });
  });
}


function petsPhrasesAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".pets-item").forEach((sectionGS, index) => {
    gsap.fromTo(sectionGS, {
      xPercent: index % 2 === 0 ? -150 : 150,
      autoAlpha: 0
    }, {
      xPercent: 0,
      autoAlpha: 1,
      duration: 2,
      ease: "power0.out",
      scrollTrigger: {
        trigger: sectionGS,
        start: "top 80%",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
        once: true,
      },
    })
  });
}

function bannerAnimation() {
  gsap.registerPlugin(ScrollTrigger);
  const bannerTopClip = document.querySelector('.banner-clip.top');
  const bannerBottomClip = document.querySelector('.banner-clip.bottom');
  const bannerImage = document.querySelector('.banner img');

  const bannerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.banner',
      start: "top center",
      end: "bottom bottom",
      scrub: 1,
      // markers: true,
      once: true,
    },
  });

  bannerTimeline
    .to(bannerTopClip, { xPercent: -100, duration: 1.5 })
    .to(bannerBottomClip, { xPercent: 100, duration: 1.5 }, 0)
    .to(bannerImage, { scale: 1, duration: 1 }, 0)
}



document.addEventListener("DOMContentLoaded", function () {
  const animation = welcomAnimation();

  animation.play();


});
