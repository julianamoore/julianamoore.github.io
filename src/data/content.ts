export const profile = {
  firstName: 'Juliana',
  lastName: 'Moore',
  fullName: 'Juliana Moore',
  legalName: 'Juliana Moore Camargo',
  role: 'Solution Engineer',
  company: 'Microsoft',
  headline: 'Solution Engineer Intern @ Microsoft · Computer Science @ Mackenzie',
  location: 'São Paulo, Brazil',
  email: 'juliana.moore.camargo@gmail.com',
  linkedin: 'https://www.linkedin.com/in/juliana-moore-095087319/',
  github: 'https://github.com/julianamoore',
  siteUrl: 'https://julianamoore.github.io',
  intro:
    'I help organisations turn AI from a demo into something their people actually use — translating business problems into Microsoft 365 Copilot solutions, agents and prompts that hold up in the real world.',
} as const;

export const stats = [
  { value: '10', label: 'Microsoft certifications', detail: 'Expert, Associate & Fundamentals' },
  { value: '9.47', label: 'Current CS average', detail: 'out of 10 · Mackenzie' },
  { value: '100+', label: 'Candidates assessed', detail: 'English proficiency evaluation' },
  { value: '3', label: 'Languages', detail: 'English · Spanish · Portuguese' },
] as const;

export const about = {
  lede: 'I came to engineering through people — and I never left them behind.',
  paragraphs: [
    'I spent two years studying Psychology at Universidad de Chile before moving to São Paulo to read Computer Science at Universidade Presbiteriana Mackenzie. That detour turned out to be the whole point: the hardest part of deploying AI is rarely the model, it is understanding what a person actually needs from it.',
    'Today I work as a Solution Engineer Intern at Microsoft, presenting Microsoft 365 Copilot solutions and building demonstrations shaped around each customer\u2019s real business challenges. I spend my days listening for the friction in someone\u2019s workflow, then showing them a version of it with the friction removed.',
    'Alongside that I am deep in the fundamentals — Python, Java and C, data structures, calculus — and I tutor other students in the maths that trips them up. I work across English, Spanish and Portuguese, which means I can read a room in three languages and present in all of them.',
  ],
  signature: 'Curious by training. Technical by choice. Relentless about clarity.',
} as const;

export type Experience = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  period: string;
  mode: string;
  location: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    id: 'microsoft',
    company: 'Microsoft',
    role: 'Solution Engineer Intern',
    start: '2026-03',
    end: 'Present',
    period: 'Mar 2026 — Present',
    mode: 'Hybrid',
    location: 'São Paulo, Brazil',
    summary:
      'Bringing Microsoft 365 Copilot to customers — from first discovery conversation to a demonstration built around their own business.',
    highlights: [
      'Present Microsoft 365 Copilot solutions and demonstrations tailored to each customer\u2019s needs.',
      'Support customer engagements by identifying business challenges and aligning AI-powered Microsoft 365 solutions to them.',
      'Coach clients through Prompt-a-thon and Agent-a-thon learning events on prompt engineering, generative AI and agent development.',
    ],
    tags: ['Microsoft 365 Copilot', 'Copilot Studio', 'AI agents', 'Prompt engineering', 'Customer engagement'],
  },
  {
    id: 'icb',
    company: 'ICB Idiomas',
    role: 'English Level Evaluator',
    start: '2023-04',
    end: '2026-03',
    period: 'Apr 2023 — Mar 2026',
    mode: 'Remote',
    location: 'Remote',
    summary:
      'Three years assessing language proficiency at scale — and learning how to give feedback people can actually act on.',
    highlights: [
      'Assessed 100+ applicants\u2019 English proficiency through oral and written tests.',
      'Provided detailed written feedback and corrections to support accurate, fair evaluation.',
      'Built the analytical rigour and communication precision that now shape how I run technical conversations.',
    ],
    tags: ['Assessment design', 'Written feedback', 'Communication', 'Analytical rigour'],
  },
];

export const skillGroups = [
  {
    id: 'ai',
    title: 'AI & Microsoft',
    caption: 'Where I spend most of my day',
    items: [
      'Microsoft 365 Copilot',
      'Copilot Studio',
      'AI agent development',
      'Prompt engineering',
      'Microsoft 365 solutions',
      'Solution demonstrations',
    ],
  },
  {
    id: 'eng',
    title: 'Programming',
    caption: 'Intermediate proficiency, academic and applied',
    items: ['Python', 'Java', 'C', 'Databases', 'Data structures', 'Problem solving'],
  },
  {
    id: 'human',
    title: 'How I work',
    caption: 'The part that is harder to certify',
    items: [
      'Customer discovery',
      'Technical storytelling',
      'Workshop coaching',
      'Peer teaching',
      'Multilingual presenting',
    ],
  },
] as const;

export const languages = [
  { name: 'English', level: 'Native / Bilingual', short: 'EN' },
  { name: 'Spanish', level: 'Native / Bilingual', short: 'ES' },
  { name: 'Portuguese', level: 'Full professional', short: 'PT' },
] as const;

export type Credential = { code: string; tier: 'Expert' | 'Associate' | 'Fundamentals' | 'Business AI' };

export const credentials: Credential[] = [
  { code: 'AB-100', tier: 'Expert' },
  { code: 'AB-620', tier: 'Associate' },
  { code: 'AB-730', tier: 'Business AI' },
  { code: 'AB-731', tier: 'Business AI' },
  { code: 'AZ-900', tier: 'Fundamentals' },
  { code: 'AI-901', tier: 'Fundamentals' },
  { code: 'SC-900', tier: 'Fundamentals' },
  { code: 'PL-900', tier: 'Fundamentals' },
  { code: 'AB-900', tier: 'Fundamentals' },
  { code: 'GH-900', tier: 'Fundamentals' },
];

export const education = [
  {
    id: 'mackenzie',
    school: 'Universidade Presbiteriana Mackenzie',
    degree: 'B.S. in Computer Science',
    period: '2024 — 2028',
    location: 'São Paulo, Brazil',
    note: 'Current average 9.47 / 10',
  },
  {
    id: 'uchile',
    school: 'Universidad de Chile',
    degree: 'B.S. in Psychology',
    period: '2021 — 2023',
    location: 'Santiago, Chile',
    note: 'Foundations in research, cognition and human behaviour',
  },
] as const;

export const projects = [
  {
    id: 'promptathon',
    title: 'Prompt-a-thon & Agent-a-thon Coach',
    org: 'Microsoft',
    kind: 'Enablement',
    blurb:
      'Coached Microsoft clients through hands-on AI learning events covering prompt engineering, generative AI and agent development — helping participants move from theory to applying AI concepts in their own real-world scenarios.',
    tags: ['Prompt engineering', 'Generative AI', 'AI agents', 'Workshop facilitation'],
  },
  {
    id: 'tutor',
    title: 'Mathematics Peer Tutor',
    org: 'Universidade Presbiteriana Mackenzie',
    kind: 'Volunteer',
    blurb:
      'Volunteered to lead peer tutoring sessions in Calculus and Discrete Mathematics, helping undergraduates strengthen their problem-solving and succeed in core computer science coursework.',
    tags: ['Calculus', 'Discrete mathematics', 'Teaching', 'Problem solving'],
  },
] as const;
