export interface ExperienceItem {
  company: string
  position: string
  period: string
  description: string
  highlights: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: 'NovaTech Solutions',
    position: 'Senior Software Engineer',
    period: '2022 — Present',
    description:
      'Leading the platform team that powers the core product used by 200k+ users.',
    highlights: [
      'Designed and shipped a microservices platform on Kubernetes, cutting deploy time by 80%',
      'Led migration of the frontend to Vue 3 + TypeScript with a shared design system',
      'Mentoring a team of 5 engineers, running architecture reviews',
    ],
  },
  {
    company: 'Orbit Digital',
    position: 'Software Engineer',
    period: '2019 — 2022',
    description:
      'Full-stack development of e-commerce and analytics products.',
    highlights: [
      'Built a real-time analytics dashboard handling 1M+ events/day',
      'Introduced CI/CD pipelines and automated testing, raising coverage from 20% to 85%',
      'Optimized API performance, reducing p95 latency by 60%',
    ],
  },
  {
    company: 'PixelWorks Studio',
    position: 'Frontend Developer',
    period: '2017 — 2019',
    description:
      'Created interactive marketing sites and rich web animations for international brands.',
    highlights: [
      'Delivered 20+ award-nominated interactive landing pages',
      'Developed a reusable WebGL/Canvas animation toolkit',
      'Collaborated directly with designers on motion prototypes',
    ],
  },
  {
    company: 'Freelance',
    position: 'Web Developer',
    period: '2015 — 2017',
    description:
      'Built websites and web applications for small businesses and startups.',
    highlights: [
      'Delivered 30+ projects: from simple landing pages to custom CMS solutions',
      'Managed the full cycle: requirements, design, development, deployment',
    ],
  },
]
