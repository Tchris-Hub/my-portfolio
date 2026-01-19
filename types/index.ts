export interface Project {
    id?: number;
    title: string;
    description: string;
    long_description: string;
    image: string;
    images: string[];
    tags: string[];
    category: string;
    github_link: string;
    live_link: string;
    featured: boolean;
    created_at?: string;
}

export interface ExperienceItem {
    id?: number;
    year: string;
    title: string;
    company: string;
    type: "work" | "education" | "achievement";
    description: string;
    skills: string[];
    created_at?: string;
}

export interface SocialItem {
    id?: number;
    platform: string;
    url: string;
    icon_name: string;
    created_at?: string;
}
