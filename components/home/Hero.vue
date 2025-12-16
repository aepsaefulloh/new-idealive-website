<template>
  <!-- Mobile -->
  <section class="container-xl h-dvh px-desktop pb-[40px] flex flex-col md:hidden">
    <div class="my-auto">
      <h1 class="md:text-[8.598vw] text-[12.308vw] leading-[100%] text-idealive home-head">
        <span class="reveal-mask animate-invisible">
          <span class="reveal-word py-2">Dream it</span>
        </span>
        <br>
        <span class="reveal-mask animate-invisible">
          <span class="reveal-word heading font-primary">Live it.</span>
        </span>
      </h1>
    </div>
    <div class="aspect-square bg-idealive flex flex-col items-center justify-center text-white p-3">
      <div class="">&nbsp;</div>
      <img src="/images/logo-idealive.svg" class="w-[38.718vw] my-auto" alt="Idealive logo" />
      <a @click.prevent="showVideo" href="#" class="text-[12px]">See Showreel</a>
    </div>

    <!-- Video Overlay -->
    <div ref="videoOverlay"
      class="fixed inset-x-0 bottom-0 h-full w-full bg-black z-50 overflow-hidden scale-y-0 origin-bottom">
      <div class="relative w-full h-full flex items-center justify-center">
        <button @click="hideVideo" class="absolute top-4 right-4 text-white z-10 p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <video ref="videoPlayer" class="w-full h-full object-cover" playsinline preload="metadata">
          <source src="/images/test.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </section>
  <!-- End Mobile -->

  <section id="section1" class="md:pt-[9.921vw] pb-[5.622vw] px-desktop md:flex hidden items-center min-h-[33vw]">
    <h1 class="md:text-[8.598vw] text-[12.308vw] leading-[100%] text-idealive">
      <span class="reveal-mask animate-invisible">
        <span class="reveal-word py-4">Dream it</span>
      </span>
      <br>
      <span class="reveal-mask animate-invisible">
        <span class="reveal-word heading font-primary">Live it.</span>
      </span>
    </h1>
  </section>

  <section id="section2"
    class="section2 md:flex hidden justify-center items-center w-full h-screen relative overflow-hidden">
    <div
      class="containerElement animate-invisible relative flex justify-center items-center bg-[#2054FA] w-full h-full text-white overflow-hidden revert">
      <!-- Solid background overlay that will fade out -->
      <div class="solid-bg absolute inset-0 bg-[#2054FA] z-[1]"></div>

      <img class="absolute image md:w-[65.675vw] z-[2]" src="/images/logo-idealive.svg" alt="Animated Image" />
      <div class="items relative justify-evenly items-center w-full flex z-[2]">
        <h1 class="md:text-[3.307vw] heading font-primary absolute">Agency</h1>
        <h1 class="md:text-[3.307vw] heading font-primary absolute">Laboratory</h1>
        <h1 class="md:text-[3.307vw] heading font-primary absolute">Engine</h1>
      </div>
      <div class="absolute z-[0] flex w-full h-full overflow-hidden background-images">
        <video v-for="(video, index) in backgroundImages" :key="index" 
          class="w-full h-full object-cover absolute opacity-0" 
          autoplay muted loop playsinline>
          <source :src="video" type="video/mp4">
        </video>
      </div>
      <div class="transition-overlay absolute inset-0 z-[10] pointer-events-none">
        <div class="absolute -top-[50vh] left-0 w-full h-[50vh] bg-gradient-to-t from-[#2054FA] via-[#2054FA]/80 to-transparent"></div>
        <div class="w-full h-full bg-[#2054FA]"></div>
      </div>
    </div>
  </section>

  <section id="section3" class="section3 relative bg-idealive revert">
    <HomeAbout />
  </section>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const videoOverlay = ref(null);
const videoPlayer = ref(null);
const backgroundImages = ref([
  '/images/hero.mp4'
]);

let ctx;

const showVideo = () => {
  if (!ctx) return;

  ctx.add(() => {
    gsap.killTweensOf(videoOverlay.value);

    document.body.style.overflow = 'hidden';

    gsap.to(videoOverlay.value, {
      scaleY: 1,
      duration: 0.6,
      ease: 'power3.out',
      onComplete: () => {
        if (videoPlayer.value) {
          videoPlayer.value.play();
        }
      }
    });
  });
};

const hideVideo = () => {
  if (!ctx) return;

  ctx.add(() => {

    if (videoPlayer.value) {
      videoPlayer.value.pause();
      videoPlayer.value.currentTime = 0;
    }

    document.body.style.overflow = '';

    gsap.to(videoOverlay.value, {
      scaleY: 0,
      duration: 0.5,
      ease: 'power3.in'
    });
  });
};

const header = () => {
  const words = document.querySelectorAll(".reveal-word");
  const masks = document.querySelectorAll(".reveal-mask.animate-invisible");
  const tl = gsap.timeline({
    defaults: { ease: "power4.out" },
    onStart: () => {
      masks.forEach((el) => el.classList.remove("animate-invisible"));
    }
  });
  gsap.set(words, { yPercent: 100, skewX: -2 });
  tl.to(words, {
    yPercent: 0,
    skewX: 0,
    duration: 1,
    stagger: 0.4,
    force3D: true,
    clearProps: "transform"
  });
};

const box = () => {
  const containerElement = document.querySelector(".containerElement");
  if (!containerElement) return;
  containerElement.classList.remove("animate-invisible");

  gsap.fromTo(
    containerElement,
    { clipPath: "inset(0% 50% 0% 50% round 5px)" },
    {
      clipPath: "inset(3% 3% 3% 3% round 5px)",
      duration: 1,
      force3D: true,
      ease: "power2.out"
    }
  );
};

const setupBackgroundImagesAnimation = () => {
  const video = document.querySelector(".background-images video");
  if (!video) return null;

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    paused: true
  });

  tl.to(video, {
    opacity: 1,
    duration: 0.8,
    force3D: true,
    onStart: () => {
      video.play().catch(() => {});
    }
  });

  return tl;
};

const setupDesktopAnimations = (imgTimeline) => {
  ScrollTrigger.create({
    trigger: ".section2",
    start: "top 70%",
    end: "bottom 70%",
    scrub: 1,
    id: "expand",
    animation: gsap.fromTo(
      ".containerElement",
      { clipPath: "inset(3% 3% 3% 3% round 5px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        force3D: true
      }
    )
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section2",
      start: "top top",
      end: "bottom",
      pin: true,
      scrub: 1,
      id: "pin-section2",
      onUpdate: (self) => {
        if (self.progress > 0.3 && imgTimeline && imgTimeline.paused()) {
          imgTimeline.play();
        }
      }
    }
  });

  tl.fromTo(".image", { scale: 1 }, { scale: 0.25, force3D: true }, "<")
    .to(
      [".solid-bg", ".image"],
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          if (imgTimeline && imgTimeline.paused()) {
            imgTimeline.play();
          }
        }
      },
      "+=0.2"
    )
    .fromTo(
      ".items h1",
      { opacity: 0, x: 0 },
      {
        opacity: 1,
        x: (index) => `${(index - 1) * 35}vw`,
        force3D: true
      }
    )
    .to("#section2", { backgroundColor: "#2054FA" })
    .fromTo(".transition-overlay", 
      { yPercent: 125 }, 
      { yPercent: 0, duration: 1.5, ease: "power1.inOut", force3D: true }
    );
};

const debounce = (fn, delay) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

const handleResize = debounce(() => {
  ScrollTrigger.refresh();
}, 250);

onMounted(() => {
  ctx = gsap.context(() => {
    header();
    if (window.innerWidth >= 1024) {
      setTimeout(box, 940);
      const imgTimeline = setupBackgroundImagesAnimation();
      setupDesktopAnimations(imgTimeline);
    }
  });

  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
  window.removeEventListener('resize', handleResize);

  document.body.style.overflow = '';
});
</script>

<style scoped>
.animate-invisible {
  visibility: hidden;
}

.reveal-mask {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
}

.reveal-word {
  display: inline-block;
  will-change: transform;
}

.containerElement {
  will-change: clip-path;
  clip-path: inset(0% 50% 0% 50% round 5px);
}

.image {
  will-change: transform, opacity;
}

.heading {
  will-change: transform, opacity;
}

.solid-bg {
  will-change: opacity;
}

.background-images img {
  will-change: opacity;
}

/* Helper class for scaleY animation */
.scale-y-0 {
  transform: scaleY(0);
}

.origin-bottom {
  transform-origin: bottom;
}
</style>
