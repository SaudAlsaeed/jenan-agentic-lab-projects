export interface Owner {
  name: string;
  title: string;
}

export interface WelcomeCopy {
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
}

export interface Agent {
  id: string;
  displayName: string;
  roleTitle: string;
  avatarInitials: string;
  responsibilities: string;
  greeting: string;
}

export interface ContentPayload {
  owner: Owner;
  welcome: WelcomeCopy;
  agents: Agent[];
}
