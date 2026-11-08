export interface SocialLink {
  label: string
  url: string
  icon: 'github' | 'linkedin' | 'telegram' | 'email' | 'twitter'
}

export interface Profile {
  name: string
  role: string
  tagline: string
  about: string[]
  location: string
  email: string
  avatarInitials: string
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Paolo Fernetti',
  role: 'Software Engineer',
  tagline:
    'I build fast, elegant and reliable software — from low-level systems to modern web applications.',
  about: [
    'I am a software engineer with a passion for crafting clean, maintainable code and delightful user experiences. Over the years I have worked across the stack — from designing robust backends and infrastructure to building polished, animated frontends.',
    'I enjoy solving complex problems, automating everything that can be automated, and constantly learning new technologies. When I am not coding, I write about engineering topics, contribute to open source and experiment with creative coding.',
  ],
  location: 'Europe · Remote',
  email: 'paolo.fernetti@example.com',
  avatarInitials: 'PF',
  socials: [
    {
      label: 'GitHub',
      url: 'https://github.com/paolofernetti',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/paolofernetti',
      icon: 'linkedin',
    },
    {
      label: 'Telegram',
      url: 'https://t.me/paolofernetti',
      icon: 'telegram',
    },
    {
      label: 'Email',
      url: 'mailto:paolo.fernetti@example.com',
      icon: 'email',
    },
  ],
}
