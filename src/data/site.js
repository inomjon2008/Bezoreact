/**
 * Central content for the landing page.
 *
 * Anything marked `verified: true` was checked against the reference site
 * (https://bezo.uz/) on 18 Oct 2026. Items marked `verified: false` are
 * PROPOSED ideas for this platform and are labelled as such in the UI.
 * Replace the brand placeholder before launch.
 */

export const brand = {
  name: 'IELTS Academy', // placeholder — the reference site uses this name
  mark: 'IA',
}

export const REFERENCE_URL = 'https://bezo.uz/'

/**
 * Social / contact links. Leave a value empty until the account is ready —
 * the icon still shows and tells the visitor the link is coming soon.
 * Example: telegram: 'https://t.me/your_channel', instagram: 'https://instagram.com/your_page'
 */
export const socials = {
  telegram: '',
  instagram: '',
}
export const VERIFIED_ON = '18 Oct 2026'

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'IELTS Skills', href: '#skills' },
  { label: 'Lessons', href: '#lessons' },
  { label: 'Teachers', href: '#teachers' },
  { label: 'Books', href: '#books' },
  { label: 'Features', href: '#features' },
  { label: 'FAQ', href: '#faq' },
]

/** Support teachers as listed on bezo.uz (checked 18 Oct 2026). */
export const teachers = [
  { id: 'davrik', name: 'DAVRIK', focus: 'Listening • Reading', experience: '3+ years', band: '8.0', photo: '/teachers/davrik.jpg' },
  { id: 'sodu', name: 'SODU', focus: 'Writing • Grammar', experience: '4+ years', band: '7.5+', photo: '/teachers/sodu.jpg' },
  { id: 'batman', name: 'BATMAN', focus: 'Speaking • Fluency', experience: '3+ years', band: '7+', photo: '/teachers/batman.jpg' },
]

/** Skill descriptions follow the four skill tracks listed on bezo.uz. */
export const skills = [
  {
    id: 'listening',
    name: 'Listening',
    description: 'Audio strategies, keyword spotting and practice with real-format recordings.',
    tags: ['Strategies', 'Keywords', 'Practice'],
  },
  {
    id: 'reading',
    name: 'Reading',
    description: 'Skimming and scanning techniques that help you move through long passages with control.',
    tags: ['Skimming', 'Scanning', 'Passages'],
  },
  {
    id: 'writing',
    name: 'Writing',
    description: 'Task 1 and Task 2 structure, with the vocabulary and grammar to support your ideas.',
    tags: ['Task 1', 'Task 2', 'Grammar'],
  },
  {
    id: 'speaking',
    name: 'Speaking',
    description: 'Parts 1 to 3, topic vocabulary and fluency practice so you can speak with confidence.',
    tags: ['Parts 1–3', 'Vocabulary', 'Fluency'],
  },
]

export const steps = [
  {
    n: '01',
    title: 'Set your learning goal.',
    body: 'Choose the band you are aiming for and the skills you want to focus on first.',
  },
  {
    n: '02',
    title: 'Practise your IELTS skills.',
    body: 'Work through lessons and test-format tasks for Listening, Reading, Writing and Speaking.',
  },
  {
    n: '03',
    title: 'Review your progress.',
    body: 'See where you are improving and decide what to practise next.',
  },
]

export const faqs = [
  {
    q: 'Which parts of the IELTS test can I practise?',
    a: 'All four skills: Listening, Reading, Writing and Speaking. Each skill has its own track so you can focus on the areas that need the most work.',
  },
  {
    q: 'Are these official IELTS tests?',
    a: 'No. Practice tasks follow the IELTS format, but official IELTS tests are only delivered by the test owners and their authorised centres. Use practice here to prepare, then book your real test through an official provider.',
  },
  {
    q: 'Can practising here guarantee a specific band score?',
    a: 'No platform can guarantee a band score. Your result depends on your starting level, how regularly you practise and how you perform on test day. Our aim is to make consistent, focused practice easier.',
  },
  {
    q: 'Can I use it on my phone?',
    a: 'Yes. The platform is designed to work on phones, tablets and desktop computers, so you can practise wherever you are.',
  },
  {
    q: 'Is there a free option?',
    a: 'The current platform at bezo.uz lists a free starting plan. Full plan details will be shown on the pricing page when sign-up opens here.',
  },
]

export const quiz = {
  label: 'Reading · Multiple choice',
  passage:
    'Urban beekeeping has grown quickly over the past decade, with hives now common on rooftops and in community gardens. City bees often produce generous honey yields because parks and balconies offer a wide variety of flowers. However, researchers caution that adding too many hives to one neighbourhood can put pressure on the limited flowers available, leaving less food for wild pollinators.',
  question: 'What concern do researchers raise about urban beekeeping?',
  options: [
    {
      id: 'A',
      text: 'Honey produced in cities is of lower quality.',
      feedback: 'The passage never compares honey quality. Watch out for options that sound reasonable but are not stated.',
    },
    {
      id: 'B',
      text: 'Too many hives can reduce the food available to other pollinators.',
      feedback: 'The passage’s “put pressure on the limited flowers” is paraphrased as “reduce the food available”.',
    },
    {
      id: 'C',
      text: 'Rooftop hives are difficult for beekeepers to reach.',
      feedback: 'Rooftops are mentioned only as a location, not as a problem.',
    },
    {
      id: 'D',
      text: 'City bees make less honey than bees in the countryside.',
      feedback: 'The passage says yields are “generous”, so this contradicts the text.',
    },
  ],
  correctId: 'B',
}
