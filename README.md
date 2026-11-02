# IELTS Academy — Landing Page

Premium landing page for an IELTS preparation platform.
React + Vite · Tailwind CSS v4 · Framer Motion · Lucide icons.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # preview the build
```

Requires Node.js 20.19+ (or 22.12+).

## Structure

```
src/
  components/
    Navbar.jsx           sticky nav, blur on scroll, accessible mobile menu
    Hero.jsx             headline, CTAs, pointer + scroll parallax
    OpenBook3D.jsx       CSS-3D open red book with turning pages
    SkillsSection.jsx    4 skills, hover animations, scroll drift
    LessonsSection.jsx   text lessons, skill filter, reader, progress (localStorage)
    TeachersSection.jsx  3 teachers (from bezo.uz), 3D tilt cards
    BooksSection.jsx     3D book shelf, Free / Premium tabs, book reader
    ScrollProgress.jsx   reading progress bar
    FeaturesSection.jsx  editorial features, "On Bezo.uz" vs "Proposed"
    MiniQuiz.jsx         working demo question with feedback + retry
    HowItWorks.jsx       3-step timeline drawn on scroll
    CallToAction.jsx     red CTA band + marquee
    FAQ.jsx              accessible accordion
    Footer.jsx
    ui/                  Button, Reveal, SectionHeading, ComingSoon notice, Reader
  data/site.js           copy, nav links, skills, teachers, FAQ, quiz
  data/lessons.js        lesson texts — add a lesson by adding an object
  data/books.js          free books (text) + premium books (sample titles)
  lib/useStoredSet.js    completed-lesson storage
  App.jsx
  index.css              design tokens (@theme) + utilities
```

## Notes

- **Content** lives in `src/data/site.js`. Brand name `IELTS Academy` is a placeholder.
- **Verified vs proposed:** features tagged "On Bezo.uz" were checked against https://bezo.uz/ on 18 Oct 2026; "Proposed" ones are ideas only.
- **Premium books:** titles in `data/books.js` are sample placeholders — replace with the real catalogue. Price shown is the PREMIUM plan listed on bezo.uz.
- **Logo:** `public/logo.png` (favicon: `public/favicon.png`).
- **Teacher photos:** `public/teachers/*.jpg` were cut from a screenshot, so they are low resolution — replace them with the original photos (same file names).
- **Telegram / Instagram:** set the links in `socials` in `src/data/site.js`. While empty, the icons show a "coming soon" notice. "Contact teacher" and "Message support" use the Telegram link.
- **Lesson progress** is saved in the browser (localStorage) until accounts exist.
- **No fake data:** no testimonials, success rates or invented prices. The progress chart is labelled as sample data.
- **Future phases:** Login, Start buttons, "View lessons", socials and Privacy Policy show a "coming in the next release" notice via `useComingSoon()`. Replace those `notify(...)` calls with routes when auth/lessons are added.
- **3D:** CSS 3D transforms (no Three.js) to keep the bundle small: open book, 3D book shelf, tilting teacher cards. Pointer parallax runs only with a mouse on ≥1024px; scroll-linked motion runs everywhere unless reduced motion is on.
- **Motion:** `MotionConfig reducedMotion="user"` + a CSS media query respect `prefers-reduced-motion`.
