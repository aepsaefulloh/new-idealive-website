<template>
 <div></div>
</template>

<script setup>
useHead({
  title: 'About Me | Aep Saefulloh - Digital Artisan',
  meta: [
    { name: 'description', content: 'Learn more about Aep Saefulloh, a Senior Frontend Developer with expertise in Vue.js, Nuxt, and Creative Development.' }
  ]
})
const header = ref()
const imageSection = ref()
const textSection = ref()
const skillsSection = ref()
const experienceSection = ref()
const skillCards = ref([])
const expCards = ref([])

const skills = [
  {
    category: 'Frontend Frameworks',
    items: ['Vue.js 3', 'Nuxt 3', 'React', 'Next.js'],
  },
  {
    category: 'Languages & Tools',
    items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5 & CSS3', 'Git & GitHub'],
  },
  {
    category: 'UI & Animation',
    items: ['Tailwind CSS', 'GSAP', 'Framer Motion', 'Responsive Design'],
  },
]

const experience = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Co.',
    period: '2022 - Present',
    description: 'Leading frontend architecture using Vue 3 and Nuxt 3. Built reusable component libraries and implemented complex UI interactions with GSAP. Mentoring junior developers and conducting code reviews.',
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Creative Agency',
    period: '2020 - 2022',
    description: 'Developed responsive web applications using React and Vue.js. Collaborated with designers to create pixel-perfect implementations. Improved website performance by 40% through optimization techniques.',
  },
  {
    title: 'Junior Frontend Developer',
    company: 'StartUp Studio',
    period: '2019 - 2020',
    description: 'Built responsive websites and landing pages. Worked with REST APIs and implemented modern JavaScript features. Learned best practices in frontend development and version control.',
  },
]

onMounted(() => {
})
</script>
