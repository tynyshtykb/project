/**
 * Single source of truth for every fact shown on the site.
 *
 * Nothing here is inferred or embellished — if a detail is not in this file,
 * it does not appear on the page. Edit here, not in the components.
 */

export const SITE = {
  /** The masthead sets these as two lines, each at its own scale. */
  name: 'BEKTAY',
  surname: 'TYNYSHTYK',
  /** Running text, alt text and metadata — anywhere one line is wanted. */
  fullName: 'Bektay Tynyshtyk',
  /** Generated from this page by `npm run cv` (scripts/make-cv-pdf.mjs).
   *  Set to null to fall back to the browser print dialog instead. */
  cvPdfPath: '/bektay-tynyshtyk-cv.pdf' as string | null,
  /** Drop a portrait into /public and set this to e.g. '/portrait.jpg'.
   *  While null, the hero renders a clearly marked placeholder frame. */
  portraitSrc: '/portrait.jpg' as string | null,
  roles: [
    'Robotics Engineer',
    'Full-Stack Developer',
    'AI/ML Engineer',
    'Aspiring Startup Founder',
  ],
  intro:
    'I build robots, software and AI-powered systems — turning technical ideas into real-world projects and products.',
  secondary:
    'High school student at Nazarbayev Intellectual School in Aktobe, Kazakhstan, with 5 years of experience in robotics, 2 years in web development, and 1 year in AI/ML.',
  meta: [
    { label: 'Location', value: 'Based in Aktobe, Kazakhstan' },
    { label: 'School', value: 'NIS Aktobe — Grade 11' },
    { label: 'GPA', value: '4.8 / 5.0' },
  ],
} as const;

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'contact', label: 'Contact' },
] as const;

export const ABOUT_PARAGRAPHS = [
  "I'm Bektay Tynyshtyk, a Grade 11 student at Nazarbayev Intellectual School in Aktobe, Kazakhstan. My journey in technology started with robotics, which I have been studying and practicing for 5 years. Over time, I expanded into full-stack web development and artificial intelligence.",
  'Today, I combine robotics, software engineering and machine learning to build practical projects — from educational technology and healthcare AI to environmental monitoring and predictive systems.',
  "I'm also exploring entrepreneurship as the founder of OquBot, an educational startup focused on making AI and robotics more accessible.",
] as const;

export const STATS = [
  { value: '5+', unit: 'Years', label: 'Robotics' },
  { value: '2+', unit: 'Years', label: 'Web Development' },
  { value: '1+', unit: 'Year', label: 'AI / ML' },
  { value: '2', unit: 'Years', label: 'Robotics Teaching' },
] as const;

/**
 * A project photo. `w`/`h` are the real pixel dimensions of the optimized
 * file — they reserve the right box before the image loads and let each
 * figure keep its true proportions, so nothing is ever cropped.
 * Regenerate the files with `npm run images`.
 */
export type ProjectImage = {
  src: string;
  alt: string;
  /** Short mono label printed under the figure. */
  caption: string;
  w: number;
  h: number;
};

export type Project = {
  num: string;
  name: string;
  category: string;
  description: string;
  role?: string;
  highlights?: string[];
  achievement?: string[];
  tech?: string[];
  links?: { label: string; href: string }[];
  /** Real photography. Falls back to the generated plate when absent. */
  images?: ProjectImage[];
  /** 'flagship' = the startup, 'research' = competition/science work, 'client' = paid commercial work */
  kind: 'flagship' | 'research' | 'client';
  plate: 'network' | 'regression' | 'field' | 'signal' | 'aperture';
};

export const PROJECTS: Project[] = [
  {
    num: '01',
    name: 'OquBot',
    category: 'Educational Technology / Robotics / AI / Startup',
    description:
      'OquBot is an educational ecosystem designed to make learning AI and robotics more accessible to students.',
    role: 'Founder',
    highlights: [
      'Educational technology startup',
      'Focused on AI and robotics education',
      'Participated in competitions',
      'Won competitions and received approximately $1,000 in prize money / funding',
    ],
    links: [{ label: 'oqubot.asia', href: 'https://oqubot.asia' }],
    images: [
      {
        src: '/media/oqubot.webp',
        alt: 'OquBot setup: a laptop running the learning platform beside the assembled robot on its stand',
        caption: 'Robot and learning platform',
        w: 1448,
        h: 1086,
      },
    ],
    kind: 'flagship',
    plate: 'network',
  },
  {
    num: '02',
    name: 'Lipid AI',
    category: 'Machine Learning / Healthcare AI',
    description:
      'Lipid AI is a machine learning project designed to predict levels of LDL cholesterol using data-driven methods.',
    achievement: ['3rd Place — INFOMATRIX-ASIA 2026', 'Category: Applied Science'],
    tech: ['Python', 'Machine Learning', 'PyTorch', 'Scikit-learn'],
    links: [
      { label: 'Live Demo', href: 'https://lipidai.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/tynyshtykb/Lipid_AI' },
    ],
    images: [
      {
        src: '/media/lipidai.webp',
        alt: 'Lipid AI interface: cholesterol and triglyceride inputs on the left, predicted LDL values from four formulas on the right',
        caption: 'LDL prediction interface',
        w: 1400,
        h: 756,
      },
    ],
    kind: 'research',
    plate: 'regression',
  },
  {
    num: '03',
    name: 'EcoPolice',
    category: 'Environmental Technology / AI',
    description:
      'EcoPolice is a project focused on automating the identification of environmentally harmful vehicles.',
    achievement: [
      '2nd place at the network stage',
      'Advanced to the Republican stage of the Daryn Scientific Projects Competition',
      'Received copyright registration',
    ],
    images: [
      {
        src: '/media/ecopolice-hardware.webp',
        alt: 'EcoPolice hardware prototype: a green sensor enclosure mounted to a model police car',
        caption: 'Hardware prototype',
        w: 1280,
        h: 720,
      },
      {
        src: '/media/ecopolice-dashboard.webp',
        alt: 'EcoPolice control dashboard showing a map of Aktobe with eco-sensor coverage and a live feed of detected violations',
        caption: 'Eco-control dashboard',
        w: 1131,
        h: 616,
      },
    ],
    kind: 'research',
    plate: 'field',
  },
  {
    num: '04',
    name: 'QubyrFlow',
    category: 'Machine Learning / Predictive Maintenance',
    description:
      'QubyrFlow is a machine learning project designed to predict pipeline failures and help identify potential risks before major incidents occur.',
    achievement: ['Finalist at the Republican MirasProjects competition'],
    images: [
      {
        src: '/media/qubyrflow-dashboard.webp',
        alt: 'QubyrFlow dashboard for pipe PIPE-1001 showing years to failure, corrosion rate, current thickness and a real-time thickness-loss chart',
        caption: 'Monitoring dashboard',
        w: 1263,
        h: 707,
      },
      {
        src: '/media/qubyrflow-sensor.webp',
        alt: 'QubyrFlow sensor module held against a section of pipe on a cutting mat',
        caption: 'Sensor module on pipe',
        w: 960,
        h: 1280,
      },
    ],
    kind: 'research',
    plate: 'signal',
  },
  {
    num: '05',
    name: 'Rakurs Production',
    category: 'Commercial Web Development',
    description: 'A commercial website developed from scratch for a photography studio.',
    role: 'Full-Stack Web Developer',
    achievement: ['Completed as a paid commercial project', 'Project value: 100,000 KZT'],
    links: [{ label: 'rakursproduction.kz', href: 'https://rakursproduction.kz' }],
    images: [
      {
        src: '/media/rakurs.webp',
        alt: 'Rakurs Production homepage: the studio name over a photograph of its 2025 best-photo-studio award',
        caption: 'Delivered site — homepage',
        w: 1400,
        h: 756,
      },
    ],
    kind: 'client',
    plate: 'aperture',
  },
];

export type ExperienceItem = {
  role: string;
  org?: string;
  meta?: string;
  body: string[];
  facts?: { label: string; value: string }[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Founder',
    org: 'OquBot',
    meta: 'Educational Technology Startup',
    body: [
      'Founded and developed OquBot, an educational ecosystem focused on AI and robotics.',
    ],
    facts: [{ label: 'Building since', value: '≈ 6 months' }],
  },
  {
    role: 'Robotics Instructor',
    meta: '2 Years',
    body: [
      'Taught robotics to students for approximately two years.',
      'Focus on practical robotics education and helping students understand technical concepts through hands-on projects.',
    ],
  },
  {
    role: 'Freelance / Commercial Web Developer',
    meta: '≈ 2 Years',
    body: [
      'Approximately 2 years of web development experience.',
      'Developed commercial websites and digital products.',
    ],
    facts: [
      { label: 'Confirmed project', value: 'Rakurs Production' },
      { label: 'Earned from project', value: '≈ 100,000 KZT' },
      { label: 'Total web earnings', value: '< 1,000,000 KZT' },
    ],
  },
  {
    role: 'AI Video Creator',
    meta: 'Freelance',
    body: ['Created AI-generated video content for clients.'],
    facts: [{ label: 'Earned', value: '≈ 500,000 KZT' }],
  },
];

export const ACHIEVEMENTS = [
  { place: '3rd Place', title: 'INFOMATRIX-ASIA 2026', meta: 'Category: Applied Science' },
  { place: '1st Place', title: 'Republican NatRoboCom Competition', meta: 'Robotics · 2022' },
  {
    place: '2nd Place',
    title: 'Republican KazRoboproject Competition',
    meta: 'Organized by KazRobotics',
  },
  {
    // One progression, not two results: the network-stage win is what
    // qualified the project for the Republican final.
    place: '2nd Place',
    title: 'Daryn Scientific Projects Competition 2025',
    meta: 'Physics · network stage → final',
  },
  { place: '1st Place', title: 'Regional WRO Stage', meta: 'Robotics' },
  { place: 'Finalist', title: 'Solve for Tomorrow', meta: '' },
  { place: 'Finalist', title: 'International STEM Olympiad', meta: '' },
  { place: 'Finalist', title: 'Republican WRO Stage', meta: 'Robotics' },
  { place: 'Finalist', title: 'Republican MirasProjects Competition', meta: '' },
  { place: 'Finalist', title: 'Roboland Competition', meta: 'Robotics · 2023' },
  {
    place: 'Republican Stage',
    title: 'KazRobotics Sumo Competition',
    meta: 'Robotics · 2022',
  },
] as const;

export const TECH_STACK = [
  { category: 'Programming', items: ['C++', 'C#', 'Python', 'JavaScript', 'TypeScript', 'SQL'] },
  { category: 'Frontend', items: ['HTML', 'CSS', 'React'] },
  { category: 'Backend', items: ['FastAPI', 'Node.js'] },
  { category: 'AI / Machine Learning', items: ['PyTorch', 'YOLO', 'Scikit-learn', 'Hugging Face'] },
  {
    category: 'Robotics / Embedded',
    items: ['Arduino', 'ESP32', 'STM32', 'Raspberry Pi', 'Arduino IDE'],
  },
  {
    category: 'Robotics Platforms',
    items: ['LEGO EV3', 'LEGO Spike Prime', 'LEGO WeDo'],
  },
  { category: 'Engineering / Fabrication', items: ['Fusion 360', '3D Printing'] },
  { category: 'Tools / Deployment', items: ['Git', 'GitHub', 'Vercel'] },
] as const;

export const EDUCATION = {
  school: 'Nazarbayev Intellectual School',
  location: 'Aktobe, Kazakhstan',
  facts: [
    { label: 'Grade', value: '11' },
    { label: 'GPA', value: '4.8 / 5.0' },
  ],
  note: 'Currently developing skills in robotics, software engineering, AI/ML and entrepreneurship.',
} as const;

export const LANGUAGES = [
  { name: 'Kazakh', level: 'Native' },
  { name: 'Russian', level: 'C1' },
  { name: 'English', level: 'B2' },
] as const;

export const JOURNEY = [
  { span: '5 Years', label: 'Robotics' },
  { span: '2 Years', label: 'Web Development' },
  { span: '1 Year', label: 'AI / ML' },
  { span: '2 Years', label: 'Teaching Robotics' },
  { span: '6 Months', label: 'Startup Founder' },
] as const;

export const CONTACT = {
  headline: "LET'S BUILD SOMETHING.",
  sub: 'Interested in technology, robotics, AI or building something new?\nLet’s connect.',
  links: [
    { label: 'Email', value: 'bektailegenda@gmail.com', href: 'mailto:bektailegenda@gmail.com' },
    { label: 'GitHub', value: 'github.com/tynyshtykb', href: 'https://github.com/tynyshtykb' },
    { label: 'Telegram', value: 't.me/btynyshtyk', href: 'https://t.me/btynyshtyk' },
  ],
} as const;
