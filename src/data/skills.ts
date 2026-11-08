export interface Skill {
  name: string
  level: number // 0..100
}

export interface SkillGroup {
  title: string
  accent: 'cyan' | 'violet' | 'pink' | 'lime'
  skills: Skill[]
}

export const skills: SkillGroup[] = [
  {
    title: 'Languages',
    accent: 'cyan',
    skills: [
      { name: 'TypeScript', level: 92 },
      { name: 'JavaScript', level: 95 },
      { name: 'Python', level: 80 },
      { name: 'Go', level: 70 },
      { name: 'SQL', level: 85 },
    ],
  },
  {
    title: 'Frontend',
    accent: 'violet',
    skills: [
      { name: 'Vue 3', level: 94 },
      { name: 'React', level: 82 },
      { name: 'Vite', level: 90 },
      { name: 'CSS / Animations', level: 92 },
    ],
  },
  {
    title: 'Backend & Infra',
    accent: 'pink',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'Docker / K8s', level: 78 },
      { name: 'CI/CD (GitHub Actions)', level: 88 },
    ],
  },
  {
    title: 'Practices',
    accent: 'lime',
    skills: [
      { name: 'System Design', level: 84 },
      { name: 'Testing (Vitest / Jest)', level: 86 },
      { name: 'Code Review & Mentoring', level: 90 },
      { name: 'Agile / Scrum', level: 80 },
    ],
  },
]
