/**
 * Text lessons. Each lesson body is a list of blocks:
 *   { h: 'Heading' }            section heading
 *   { p: 'Paragraph' }          paragraph
 *   { list: ['…', '…'] }        bullet list
 *   { tip: 'Tip text' }         highlighted tip
 *   { example: { q, a } }       worked example
 * Add new lessons to this array — the Lessons section and reader pick them up
 * automatically. Later this can be replaced by an API call.
 */

export const lessons = [
  {
    id: 'listening-predict',
    skill: 'listening',
    title: 'Predict the answer before you hear it',
    level: 'Foundation',
    summary: 'Use the reading time before each section to guess what kind of word you are listening for.',
    body: [
      { p: 'Before every Listening section you get a short pause to read the questions. Many candidates spend it waiting. Strong candidates spend it predicting.' },
      { h: 'What to predict' },
      { list: [
        'Word type: is the gap a noun, a verb, an adjective or a number?',
        'Category: a name, a date, a price, a place, a time?',
        'Grammar: does the sentence need a plural (“two ___”) or an article (“an ___”)?',
      ] },
      { example: { q: 'The class starts at ______ on Tuesdays.', a: 'You need a time, such as “7.30” or “half past seven”. Listen for numbers, not for nouns.' } },
      { h: 'Spelling and numbers count' },
      { p: 'A correctly heard answer that is misspelled is marked wrong. Practise spelling common names, streets and months, and know how numbers are read aloud: “double three” means 33, and “oh” is often used for zero.' },
      { tip: 'Check the word limit in the instructions. If it says “NO MORE THAN TWO WORDS”, a three-word answer is wrong even if the meaning is right.' },
      { h: 'Practice routine' },
      { list: [
        'Take one recording and pause before each section.',
        'Write your prediction next to every gap.',
        'Listen, answer, then compare the answer with your prediction.',
      ] },
    ],
  },
  {
    id: 'listening-distractors',
    skill: 'listening',
    title: 'Spot distractors and corrections',
    level: 'Intermediate',
    summary: 'Speakers often change their mind. Learn the phrases that signal the real answer is coming.',
    body: [
      { p: 'IELTS recordings are designed to test careful listening. A speaker may mention one option and then correct it. The first thing you hear is not always the answer.' },
      { h: 'Signal phrases' },
      { list: [
        '“Actually…”, “Sorry, I mean…”, “No, wait…”',
        '“That was the old price, it’s now…”',
        '“We were going to…, but in the end…”',
      ] },
      { example: { q: 'The meeting will be held on ______.', a: '“Let’s meet on Monday… oh no, Monday’s a holiday, so Tuesday then.” The answer is Tuesday.' } },
      { tip: 'Do not write the first word that matches. Keep listening until the speaker has finished the idea, then write.' },
      { h: 'Multiple-choice traps' },
      { p: 'In multiple-choice questions you will often hear words from all three options. Ask yourself which option the speaker agrees with, not which words you recognise.' },
    ],
  },
  {
    id: 'reading-skim-scan',
    skill: 'reading',
    title: 'Skimming and scanning',
    level: 'Foundation',
    summary: 'Two reading speeds that save you time across three long passages.',
    body: [
      { p: 'IELTS Reading gives you 60 minutes for 3 passages and 40 questions — roughly 20 minutes per passage. You cannot read every word carefully. You need two different speeds.' },
      { h: 'Skimming: get the general idea' },
      { list: [
        'Read the title, any subheadings and the first sentence of each paragraph.',
        'Ask: what is this paragraph mainly about?',
        'Write a 2–3 word note next to each paragraph.',
      ] },
      { h: 'Scanning: find specific information' },
      { p: 'Scanning means moving your eyes quickly to find a name, number, date or keyword without reading around it. Capital letters and numbers are easy to spot, so use them as anchors.' },
      { example: { q: 'In which year was the first bridge completed?', a: 'Scan only for four-digit numbers. When you find one, read that sentence carefully.' } },
      { tip: 'Questions usually follow the order of the passage. Once you find answer 5, answer 6 is likely to be after it.' },
    ],
  },
  {
    id: 'reading-tfng',
    skill: 'reading',
    title: 'True, False or Not Given',
    level: 'Intermediate',
    summary: 'The difference between “False” and “Not Given” is where most marks are lost.',
    body: [
      { h: 'The three answers' },
      { list: [
        'TRUE — the statement agrees with the information in the passage.',
        'FALSE — the passage says the opposite.',
        'NOT GIVEN — the passage does not say whether it is true or false.',
      ] },
      { example: { q: 'Passage: “The museum opened in 1998 and now attracts thousands of tourists.” Statement: “The museum is the most popular attraction in the city.”', a: 'NOT GIVEN. The passage says it is popular, but never compares it with other attractions.' } },
      { h: 'How to decide' },
      { p: 'Find the part of the passage the statement is about. Then check each detail: who, what, when, how many. A single word such as “all”, “only” or “always” can change the answer.' },
      { tip: 'Do not use your own knowledge. If the passage does not say it, the answer is NOT GIVEN, even if you know it is true in real life.' },
    ],
  },
  {
    id: 'writing-task2-structure',
    skill: 'writing',
    title: 'A clear structure for Task 2',
    level: 'Foundation',
    summary: 'A four-paragraph plan you can use for most essay questions.',
    body: [
      { p: 'Task 2 asks for at least 250 words, and you should spend about 40 minutes on it. It is worth twice as much as Task 1, so plan your time accordingly.' },
      { h: 'The four-paragraph plan' },
      { list: [
        'Introduction: paraphrase the question and give your position.',
        'Body 1: your first main idea, explained and supported with an example.',
        'Body 2: your second main idea, explained and supported with an example.',
        'Conclusion: summarise your position. Do not add new ideas.',
      ] },
      { example: { q: 'Some people think children should start school at a very early age. To what extent do you agree?', a: 'Intro: “It is often argued that formal education should begin as early as possible. I partly agree, because…”' } },
      { h: 'Inside a body paragraph' },
      { p: 'Start with a topic sentence that states the idea. Explain why it is true, give a specific example, and link back to the question in the final sentence.' },
      { tip: 'Spend the first 5 minutes planning. A clear plan makes the essay faster to write and easier to read.' },
    ],
  },
  {
    id: 'writing-task1-overview',
    skill: 'writing',
    title: 'Writing a strong Task 1 overview',
    level: 'Intermediate',
    summary: 'In Academic Task 1, the overview is the paragraph examiners look for first.',
    body: [
      { p: 'Academic Task 1 asks you to describe a chart, table, diagram or process in at least 150 words, in about 20 minutes. You report what you see — you do not give opinions or reasons.' },
      { h: 'What is an overview?' },
      { p: 'An overview is two or three sentences describing the main trends or the biggest differences, without detailed numbers. It shows the examiner you understood the whole picture.' },
      { example: { q: 'A line graph shows car, bus and train use from 2000 to 2020.', a: '“Overall, car use rose steadily over the period, while bus travel declined. Train use remained the least common option throughout.”' } },
      { list: [
        'Look for the highest and lowest values.',
        'Look for the overall direction: up, down or stable.',
        'Look for the biggest change or contrast.',
      ] },
      { tip: 'Start the overview with “Overall,” so the examiner can find it immediately.' },
    ],
  },
  {
    id: 'speaking-part2',
    skill: 'speaking',
    title: 'Speak for two minutes in Part 2',
    level: 'Foundation',
    summary: 'Use your one minute of preparation to plan a talk that does not run out of ideas.',
    body: [
      { p: 'In Part 2 you receive a task card with a topic and a few prompts. You have 1 minute to prepare and then speak for 1–2 minutes. The examiner will stop you when time is up.' },
      { h: 'Plan with keywords, not sentences' },
      { list: [
        'Write one or two keywords for each prompt on the card.',
        'Add one extra detail: a feeling, a story, or a comparison.',
        'Decide your first sentence so you start confidently.',
      ] },
      { example: { q: 'Describe a book you enjoyed reading.', a: 'Notes: “Atomic Habits — last summer — friend recommended — small changes — started reading daily”.' } },
      { tip: 'If you finish early, continue with “What I also remember is…” and add a detail. It is better to be stopped by the examiner than to stop too soon.' },
    ],
  },
  {
    id: 'speaking-fluency',
    skill: 'speaking',
    title: 'Fluency without fillers',
    level: 'Intermediate',
    summary: 'Keep talking naturally when you cannot find the right word.',
    body: [
      { p: 'Speaking is assessed on four criteria: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation. Fluency is not speed — it is speaking without long pauses or lost ideas.' },
      { h: 'When you forget a word' },
      { p: 'Paraphrase instead of stopping. If you forget “umbrella”, say “the thing you carry when it rains”. This keeps you fluent and shows vocabulary range.' },
      { h: 'Useful linking phrases' },
      { list: [
        'To give a reason: “The main reason is…”',
        'To add an example: “For instance, last year I…”',
        'To buy time naturally: “That’s an interesting question. I’d say…”',
      ] },
      { tip: 'In Part 1, aim for two or three sentences per answer: a direct answer, a reason, and an example.' },
    ],
  },
]

/** Rough reading time in minutes (about 200 words per minute). */
export function readingMinutes(item) {
  const text = item.body
    .map((b) => b.p ?? b.h ?? b.tip ?? (b.list ? b.list.join(' ') : b.example ? b.example.q + ' ' + b.example.a : ''))
    .join(' ')
  return Math.max(2, Math.round(text.split(/\s+/).length / 200) + 1)
}
