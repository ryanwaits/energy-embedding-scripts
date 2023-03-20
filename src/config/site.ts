interface SiteConfig {
  name: string;
  description: string;
  links: {
    twitter: string;
    github: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'ryanwaits/node-template',
  description:
    'Basic Node.js template for running scripts with TypeScript, Supabase, and OpenAI.',
  links: {
    twitter: 'https://twitter.com/ryan_waits',
    github: 'https://github.com/ryanwaits/node-template',
  },
};
