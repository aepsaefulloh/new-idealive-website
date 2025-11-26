<template>
  <div>
    <div class="container-xl md:px-[2.646vw] md:pb-[6.614vw]">
      <div
        class="card bg-idealive md:px-[2.646vw] md:py-[7vw] py-[15.385vw] px-[20px]"
        ref="countingTrigger"
      >
        <div
          class="grid md:grid-cols-[45%,55%] text-white items-center md:gap-0 gap-[10.256vw] tot"
        >
          <div class="md:pe-20 md:order-1 order-2">
            <h5
              class="md:text-[3.968vw] leading-[110%] md:mb-[1.984vw] mb-[5.128vw] text-[6.667vw]"
              v-html="copy.title"
            ></h5>
            <p
              class="md:mb-[2.646vw] mb-[7.692vw] md:text-[1.323vw] text-[14px]"
            >
              {{ copy.description }}
            </p>
            <p class="mb-4 font-[600]">Get in Touch</p>
            <div
              class="flex md:text-[1.058vw] text-[12px] md:gap-6 items-center gap-3"
            >
              <NuxtLink
                :to="copy.emailLink"
                :title="copy.email"
                class="bg-white text-black py-2.5 px-5 rounded-full"
              >
                {{ copy.email }}
              </NuxtLink>
              <NuxtLink
                :to="copy.phoneLink"
                :title="copy.phone"
                class="bg-white text-black py-2.5 px-5 rounded-full"
              >
                {{ copy.phone }}
              </NuxtLink>
            </div>
          </div>
          <div class="md:order-2 order-1">
            <div
              v-for="(data, i) in statis"
              :key="i"
              class="grid md:grid-cols-2 grid-cols-2 border-b items-center md:mb-10 mb-[7.692vw] md:pb-0 pb-2.5"
            >
              <p
                class="statis-value md:text-[6.614vw] leading-[120%] text-[15.385vw]"
              >
                <span class="counter">0</span>+
              </p>
              <div class="flex flex-col">
                <h6 class="">
                  <span
                    class="reveal-masks md:text-[2.381vw] heading text-[5.667vw] md:mb-4 mb-2 leading-[110%]"
                  >
                    <span class="reveal-wordy py-1" v-html="data.title"></span>
                  </span>
                </h6>
                <span
                    class="reveal-masks md:text-[1.381vw] -mt-4 text-[3.667vw] mb-0 leading-[110%]"
                  >
                    <span class="reveal-wordy py-1" v-html="data.sub"></span>
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const countingTrigger = ref(null);
const animations = ref([]);
const scrollTriggers = ref([]);

const copy = {
  title: "Let's make your<br><span class='heading'>Idealive</span> with us",
  description: `Discover how our creative strategies can live your brand. We're here to help you stand out and make an impact.`,
  email: "hi@idealive.co.id",
  phone: "+62817823123",
  emailLink: "mailto:hi@idealive.co.id",
  phoneLink: "tel:+62817823123",
};

const statis = [
  { value: 100, title: "Clients", sub: "Trust us" },
  {
    value: 50,
    title: "Offline Activation",
    sub: "Instantly Connected Audiences",
  },
  { value: 40, title: "Project Insights", sub: "At Glance" },
];

// Thorough cleanup function
const cleanupAnimations = () => {
  if (process.client) {
    // Kill all animations we've tracked
    animations.value.forEach((animation) => {
      if (animation) animation.kill();
    });
    animations.value = [];

    // Kill all ScrollTriggers we've tracked
    scrollTriggers.value.forEach((trigger) => {
      if (trigger) trigger.kill();
    });
    scrollTriggers.value = [];

    // Safety measure: kill any remaining ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
};

onMounted(async () => {
  if (process.client) {
    // Wait for the DOM to be fully rendered
    await nextTick();
    // Add a small delay to ensure everything is ready
    setTimeout(() => {
      initAnimations();
    }, 200);
  }
});

// Use onBeforeUnmount instead of onUnmounted for earlier cleanup
onBeforeUnmount(() => {
  cleanupAnimations();
});

const initAnimations = () => {
  if (!process.client || !countingTrigger.value || !gsap || !ScrollTrigger)
    return;

  // Create a timeline for the entire section
  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: countingTrigger.value,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      // markers: false, // Set to true for debugging
    },
  });

  // Store the ScrollTrigger instance
  scrollTriggers.value.push(mainTimeline.scrollTrigger);
  animations.value.push(mainTimeline);

  // Get all counter elements
  const counterElements = countingTrigger.value.querySelectorAll(".counter");

  // Animate each counter
  counterElements.forEach((counter, index) => {
    const targetValue = statis[index].value;

    const countAnimation = gsap.to(counter, {
      innerHTML: targetValue,
      duration: 2,
      ease: "power2.out",
      snap: { innerHTML: 1 }, // Ensures whole numbers
      onUpdate: function () {
        counter.innerHTML = Math.round(this.targets()[0].innerHTML);
      },
    });

    mainTimeline.add(countAnimation, 0);
    animations.value.push(countAnimation);
  });

  // Animate the text reveals
  const revealElements =
    countingTrigger.value.querySelectorAll(".reveal-masks");

  revealElements.forEach((element, index) => {
    const wordElement = element.querySelector(".reveal-wordy");

    // Set initial state
    gsap.set(element, {
      overflow: "hidden",
      height: wordElement.offsetHeight,
    });

    gsap.set(wordElement, {
      y: "100%",
      opacity: 0,
    });

    // Create animation
    const textAnimation = gsap.to(wordElement, {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.2 + index * 0.1, // Stagger the animations
    });

    mainTimeline.add(textAnimation, 0.5);
    animations.value.push(textAnimation);
  });
};
</script>

<style scoped>
.reveal-masks {
  display: block;
  overflow: hidden;
  position: relative;
}

.reveal-wordy {
  display: block;
  transform: translateY(100%);
  opacity: 0;
}
</style>
