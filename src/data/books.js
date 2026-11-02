/**
 * Book library.
 * FREE titles match the free “IELTS Library” resources listed on bezo.uz
 * (checked 18 Oct 2026); the short texts below are starter content you can
 * replace with the full books.
 * PREMIUM titles are SAMPLE PLACEHOLDERS — replace them with the real paid
 * catalogue. Access follows the PREMIUM plan listed on bezo.uz (“all books”).
 * Body blocks use the same format as lessons ({ h }, { p }, { list }, { tip }, { example }).
 */

export const premiumPlan = { name: 'PREMIUM', price: '199K', period: 'month', currency: "so'm" }

export const books = [
  {
    id: 'reading-strategy',
    title: 'Reading Strategy',
    subtitle: 'Read faster, answer smarter',
    access: 'free',
    color: '#E63946',
    body: [
      { h: 'Chapter 1 — Read the questions first' },
      { p: 'Before you read the passage, look at the question types for that passage. Knowing whether you need headings, True/False/Not Given or gap-fills tells you how to read.' },
      { h: 'Chapter 2 — Paraphrase is everything' },
      { p: 'The questions almost never repeat the passage word for word. “Rose sharply” may appear as “increased dramatically”. Train yourself to look for meaning, not matching words.' },
      { list: ['buy → purchase', 'start → launch / begin', 'important → significant / essential'] },
      { h: 'Chapter 3 — Manage the clock' },
      { p: 'Give each passage about 20 minutes. If a question takes more than 2 minutes, mark it, move on, and return at the end.' },
      { tip: 'Never leave a gap empty. There is no penalty for a wrong answer.' },
    ],
  },
  {
    id: 'academic-vocabulary',
    title: 'Academic Vocabulary',
    subtitle: 'Words that lift your band',
    access: 'free',
    color: '#171717',
    body: [
      { h: 'Learn words in groups' },
      { p: 'Words are easier to remember and use when you learn them by topic and with the words they often go with (collocations).' },
      { h: 'Environment' },
      { list: ['reduce carbon emissions', 'renewable energy sources', 'a serious threat to wildlife'] },
      { h: 'Education' },
      { list: ['acquire practical skills', 'compulsory education', 'access to higher education'] },
      { h: 'Technology' },
      { list: ['rapid technological advances', 'rely heavily on smartphones', 'a double-edged sword'] },
      { tip: 'For each new word, write one sentence about your own life. Personal sentences are easier to recall in Speaking.' },
    ],
  },
  {
    id: 'writing-task-2',
    title: 'Writing Task 2',
    subtitle: 'Plan, write, check',
    access: 'free',
    color: '#C82032',
    body: [
      { h: 'Know the question type' },
      { list: [
        'Opinion: “To what extent do you agree or disagree?”',
        'Discussion: “Discuss both views and give your opinion.”',
        'Problem/solution: “What are the causes? What can be done?”',
        'Advantages/disadvantages: “Do the advantages outweigh the disadvantages?”',
      ] },
      { p: 'Each type needs a slightly different plan, but all of them need a clear position and well-developed paragraphs.' },
      { h: 'Check in the last 3 minutes' },
      { list: ['Subject–verb agreement', 'Articles: a / an / the', 'Plural -s endings', 'Repeated words you could replace'] },
    ],
  },
  {
    id: 'speaking-master',
    title: 'Speaking Master',
    subtitle: 'Parts 1, 2 and 3',
    access: 'free',
    color: '#E63946',
    body: [
      { h: 'Part 1 — Everyday topics' },
      { p: 'Questions about your home, work, studies and hobbies. Answer directly, then add a reason or example.' },
      { h: 'Part 2 — The long turn' },
      { p: 'One minute to prepare, then speak for up to two minutes. Use your notes as signposts, not a script.' },
      { h: 'Part 3 — Discussion' },
      { p: 'More abstract questions linked to the Part 2 topic. Give opinions, compare past and present, and think about society, not only yourself.' },
      { tip: 'It is fine to ask the examiner to repeat a question: “Could you say that again, please?”' },
    ],
  },
  // ── PREMIUM — sample placeholders, replace with the real catalogue ──
  { id: 'listening-practice-pack', title: 'Listening Practice Pack', subtitle: 'Sections 1–4', access: 'premium', color: '#171717' },
  { id: 'writing-model-answers', title: 'Writing Model Answers', subtitle: 'Task 1 & Task 2', access: 'premium', color: '#C82032' },
  { id: 'grammar-for-ielts', title: 'Grammar for IELTS', subtitle: 'Accuracy for Writing & Speaking', access: 'premium', color: '#E63946' },
  { id: 'full-mock-book', title: 'Full Mock Test Book', subtitle: 'All four skills', access: 'premium', color: '#171717' },
]
