import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SkillsSection from './components/SkillsSection'
import LessonsSection from './components/LessonsSection'
import TeachersSection from './components/TeachersSection'
import BooksSection from './components/BooksSection'
import ScrollProgress from './components/ScrollProgress'
import FeaturesSection from './components/FeaturesSection'
import MiniQuiz from './components/MiniQuiz'
import HowItWorks from './components/HowItWorks'
import CallToAction from './components/CallToAction'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import { ComingSoonProvider } from './components/ui/ComingSoon'

export default function App() {
  return (
    // reducedMotion="user" makes Framer Motion honour prefers-reduced-motion
    <MotionConfig reducedMotion="user">
      <ComingSoonProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main">
          <Hero />
          <SkillsSection />
          <LessonsSection />
          <TeachersSection />
          <BooksSection />
          <FeaturesSection />
          <MiniQuiz />
          <HowItWorks />
          <CallToAction />
          <FAQ />
        </main>
        <Footer />
      </ComingSoonProvider>
    </MotionConfig>
  )
}
