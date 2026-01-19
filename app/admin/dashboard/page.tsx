"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, LogOut, LayoutDashboard, Search, Github, Globe, Layers, Briefcase, Share2, GraduationCap, Award, Database } from "lucide-react";
import { ProjectModal } from "@/components/admin/ProjectModal";
import { ExperienceModal } from "@/components/admin/ExperienceModal";
import { SocialsEditor } from "@/components/admin/SocialsEditor";
import { SectionEditor, FieldSchema } from "@/components/admin/SectionEditor";
import { Project, ExperienceItem } from "@/types";

const LEGACY_PROJECTS = [
    {
        title: "Pharmacy Chat Bot",
        description: "High-performance pharmacy assistant integrated with Gemini AI.",
        long_description: "An intelligent pharmacy ecosystem designed to deliver accurate medication insights, dosage interaction guidance, and real-time health support. Built with a robust Node.js architecture and powered by Google's Gemini 2.5 Flash. This project reflects my commitment to building secure, AI-driven solutions for critical healthcare challenges.",
        image: "/projects/pharmacy-bot.png",
        category: "Web",
        tags: ["JavaScript", "Node.js", "Gemini AI", "Healthcare"],
        github_link: "https://github.com/Tchris-Hub/pharmacy-chat-bot",
        featured: true,
        images: [],
    },
    {
        title: "Pharmacy Admin Dashboard",
        description: "Scaleable admin ecosystem for pharmaceutical inventory management.",
        long_description: "A professional-grade administrative dashboard designed for comprehensive pharmacy operations. This system manages inventory lifecycles, order tracking, and customer analytics through an intuitive, high-performance interface. Built with TypeScript for absolute reliability and type safety.",
        image: "/projects/pharmacy-admin.png",
        category: "Web",
        tags: ["TypeScript", "React", "Dashboard", "Healthcare"],
        github_link: "https://github.com/Tchris-Hub/pharmacy-frontend-admin-dashboard",
        featured: true,
        images: [],
    },
    {
        title: "Metabolic Health App",
        description: "Track and improve your metabolic health",
        long_description: "A health-focused application designed to help users monitor and improve their metabolic health through tracking, insights, and personalized recommendations. Features comprehensive health metrics and progress visualization.",
        image: "/assets/projects/healthapp/WhatsApp Image 2025-12-04 at 05.53.48_c4e18e6c.jpg",
        images: [
            "/assets/projects/healthapp/WhatsApp Image 2025-12-04 at 05.53.48_c4e18e6c.jpg",
            "/assets/projects/healthapp/WhatsApp Image 2025-12-04 at 05.53.48_df29b390.jpg",
            "/assets/projects/healthapp/WhatsApp Image 2025-12-04 at 05.53.49_8a22809a.jpg",
            "/assets/projects/healthapp/WhatsApp Image 2025-12-04 at 05.53.49_ee65310a.jpg",
        ],
        category: "Mobile",
        tags: ["TypeScript", "Health", "Fitness", "Analytics"],
        featured: true,
    },
    {
        title: "True-North",
        description: "Offline compass app built on native smartphone features",
        long_description: "A React Native mobile application that leverages native smartphone sensors and features to deliver a reliable offline compass experience. Built entirely on device capabilities like the magnetometer and accelerometer, True-North works without internet connectivity. This project showcases my expertise in React Native mobile development and my ability to work directly with native device APIs.",
        image: "/assets/projects/truenorth/WhatsApp Image 2025-12-03 at 04.37.58_48a5cc15.jpg",
        images: [
            "/assets/projects/truenorth/WhatsApp Image 2025-12-03 at 04.37.58_48a5cc15.jpg",
            "/assets/projects/truenorth/WhatsApp Image 2025-12-03 at 04.37.58_a882e570.jpg",
            "/assets/projects/truenorth/WhatsApp Image 2025-12-03 at 04.37.59_eb777bb6.jpg",
            "/assets/projects/truenorth/chatscreen.JPG",
        ],
        category: "Mobile",
        tags: ["React Native", "TypeScript", "Native APIs", "Mobile"],
        github_link: "https://github.com/Tchris-Hub/True-North",
    },
    {
        title: "Perfumexcella",
        description: "Premium fragrance e-commerce architecture.",
        long_description: "A high-performance e-commerce platform dedicated to premium fragrances. Features a sophisticated product catalog, seamless cart transitions, and an optimized checkout flow. Developed with a focus on elegant UI/UX and rapid server-side rendering for a premium shopping experience.",
        image: "/projects/perfumexcella.png",
        category: "Web",
        tags: ["TypeScript", "E-commerce", "React", "Shopping"],
        github_link: "https://github.com/Tchris-Hub/perfumexcella",
        images: [],
    },
    {
        title: "Quant",
        description: "Autonomous AI trading system powered by live market data.",
        long_description: "A sophisticated quantitative trading bot that leverages continuous live market data to execute complex trading strategies. Features regime-aware algorithms that adapt to market conditions, managing risk and capital allocation autonomously. Built to understand the nuances of financial markets better than humanly possible in real-time.",
        image: "placeholder-quant",
        category: "AI",
        tags: ["Python", "Machine Learning", "Live Trading", "FinTech"],
        featured: true,
        images: [],
    },
    {
        title: "Too Sabi",
        description: "Terminal-based AI code auditor and security analyst.",
        long_description: "An advanced AI agent that lives in your terminal, diving deep into your codebase to find logic errors, security vulnerabilities, and subtle bugs that standard linters miss. It understands code patterns and context, providing 'vibe-check' reviews to elevate code quality and security.",
        image: "placeholder-toosabi",
        category: "AI",
        tags: ["AI Agent", "Security", "Code Analysis", "Terminal"],
        featured: true,
        images: [],
    },
    {
        title: "My Rights",
        description: "AI legal advisor and automated contract generator.",
        long_description: "Democratizing access to justice with an AI companion that explains your legal rights in plain English. It reviews contracts to flag dangerous clauses before you sign and can generate legally binding agreements on demand, removing the barrier of expensive legal counsel.",
        image: "placeholder-myrights",
        category: "Mobile",
        tags: ["Legal Tech", "AI", "React Native", "Contract Analysis"],
        featured: true,
        images: [],
    },
];

const SECTION_SCHEMAS: Record<string, FieldSchema[]> = {
    about: [
        { key: "badge", label: "Header Badge", type: "text", placeholder: "e.g., Get to know me" },
        { key: "title", label: "Main Title", type: "text", placeholder: "e.g., About Me" },
        { key: "description", label: "Short Description", type: "textarea", placeholder: "Intro paragraph..." },
        { key: "journey_title", label: "Journey Section Title", type: "text", placeholder: "e.g., My Journey" },
        { key: "journey_text", label: "Journey Content", type: "textarea", placeholder: "Full Bio in HTML or Text", helpText: "Use <p> tags for paragraphs." },
        { key: "image", label: "Profile Image URL", type: "image" }
    ],
    hero: [
        { key: "badge", label: "Badge", type: "text", placeholder: "e.g., Hello, I'm" },
        { key: "name", label: "Name", type: "text", placeholder: "Your Name" },
        { key: "title_1", label: "Job Title 1", type: "text", placeholder: "Full Stack Developer" },
        { key: "title_2", label: "Job Title 2", type: "text", placeholder: "& UI/UX Designer" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "cta_primary", label: "Primary CTA Text", type: "text", placeholder: "View Projects" },
        { key: "cta_secondary", label: "Secondary CTA Text", type: "text", placeholder: "Contact Me" },
    ]
};

export default function AdminDashboard() {
    const router = useRouter();
    const [session, setSession] = useState<any>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [migrating, setMigrating] = useState(false);

    // Modals
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);

    const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
    const [editingExperience, setEditingExperience] = useState<ExperienceItem | undefined>(undefined);

    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<"projects" | "experience" | "socials" | "content">("projects");
    const [selectedSection, setSelectedSection] = useState("about");

    // Check auth
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                router.push("/admin/login");
            } else {
                setSession(session);
                fetchData();
            }
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (!session) router.push("/admin/login");
        });

        return () => subscription.unsubscribe();
    }, [router]);

    const fetchData = async () => {
        setLoading(true);
        await Promise.all([fetchProjects(), fetchExperiences()]);
        setLoading(false);
    };

    const fetchProjects = async () => {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) setProjects(data);
    };

    const fetchExperiences = async () => {
        const { data, error } = await supabase
            .from("experience")
            .select("*")
            .order("year", { ascending: false }); // Rough sort

        if (!error && data) setExperiences(data);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    const handleDeleteProject = async (id?: number) => {
        if (!id) return;
        if (confirm("Are you sure you want to delete this project?")) {
            const { error } = await supabase.from("projects").delete().eq("id", id);
            if (!error) fetchProjects();
        }
    };

    const handleDeleteExperience = async (id?: number) => {
        if (!id) return;
        if (confirm("Are you sure you want to delete this experience?")) {
            const { error } = await supabase.from("experience").delete().eq("id", id);
            if (!error) fetchExperiences();
        }
    };

    const handleMigration = async () => {
        if (!confirm("This will import default projects into your database. Continue?")) return;
        setMigrating(true);
        try {
            for (const p of LEGACY_PROJECTS) {
                await supabase.from("projects").insert(p);
            }
            alert("Migration successful! Projects imported.");
            fetchProjects();
        } catch (error) {
            console.error(error);
            alert("Migration failed. Check console for details.");
        } finally {
            setMigrating(false);
        }
    };

    // Project Modal
    const openAddProject = () => {
        setEditingProject(undefined);
        setIsProjectModalOpen(true);
    };
    const openEditProject = (project: Project) => {
        setEditingProject(project);
        setIsProjectModalOpen(true);
    };

    // Experience Modal
    const openAddExperience = () => {
        setEditingExperience(undefined);
        setIsExperienceModalOpen(true);
    };
    const openEditExperience = (exp: ExperienceItem) => {
        setEditingExperience(exp);
        setIsExperienceModalOpen(true);
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!session) return null;

    return (
        <div className="min-h-screen bg-background text-white flex">
            {/* Visual background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.05),transparent_70%)]" />
            </div>

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 hidden md:flex flex-col z-10 sticky top-0 h-screen">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        Admin Panel
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${activeTab === 'projects' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'text-gray-400 border-transparent hover:bg-white/5'}`}
                    >
                        <LayoutDashboard size={20} />
                        Projects
                    </button>
                    <button
                        onClick={() => setActiveTab("experience")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${activeTab === 'experience' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'text-gray-400 border-transparent hover:bg-white/5'}`}
                    >
                        <Briefcase size={20} />
                        Experience
                    </button>
                    <button
                        onClick={() => setActiveTab("socials")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${activeTab === 'socials' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'text-gray-400 border-transparent hover:bg-white/5'}`}
                    >
                        <Share2 size={20} />
                        Socials
                    </button>
                    <button
                        onClick={() => setActiveTab("content")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${activeTab === 'content' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'text-gray-400 border-transparent hover:bg-white/5'}`}
                    >
                        <Layers size={20} />
                        Site Content
                    </button>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 z-10 w-full overflow-x-hidden">

                {/* PROJECTS TAB */}
                {activeTab === "projects" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                            <div>
                                <h2 className="text-3xl font-bold">Projects</h2>
                                <p className="text-gray-400 mt-1">Manage your portfolio showcase</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-emerald-500/50 w-64"
                                    />
                                </div>

                                {projects.length === 0 && !loading && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleMigration}
                                        disabled={migrating}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
                                    >
                                        <Database size={18} /> {migrating ? "Importing..." : "Import Legacy Projects"}
                                    </motion.button>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={openAddProject}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
                                >
                                    <Plus size={18} /> Add Project
                                </motion.button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group relative bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300"
                                    >
                                        <div className="h-48 w-full relative overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />

                                            <div className="absolute top-4 right-4 flex gap-2">
                                                <button onClick={() => openEditProject(project)} className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg text-white hover:text-emerald-400 hover:bg-slate-800 transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => handleDeleteProject(project.id)} className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg text-white hover:text-red-400 hover:bg-slate-800 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-sm">
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">{project.title}</h3>
                                            <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5">{tag}</span>
                                                ))}
                                                {project.tags.length > 3 && <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300">+{project.tags.length - 3}</span>}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-white/5">
                                                {project.github_link && <a href={project.github_link} target="_blank" className="flex items-center gap-1 hover:text-white transition-colors"><Github size={14} /> Github</a>}
                                                {project.live_link && <a href={project.live_link} target="_blank" className="flex items-center gap-1 hover:text-white transition-colors"><Globe size={14} /> Live</a>}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {filteredProjects.length === 0 && (
                                    <div className="col-span-full text-center py-20 text-gray-500">
                                        No projects found. {projects.length === 0 && "Use the 'Import Legacy Projects' button to seed your database."}
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* EXPERIENCE TAB */}
                {activeTab === "experience" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-3xl font-bold">Experience</h2>
                                <p className="text-gray-400 mt-1">Manage your professional timeline</p>
                            </div>
                            <button
                                onClick={openAddExperience}
                                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold flex items-center gap-2 transition-all"
                            >
                                <Plus size={18} /> Add Experience
                            </button>
                        </div>

                        <div className="space-y-4">
                            {experiences.map((exp) => (
                                <div key={exp.id} className="p-5 rounded-xl bg-slate-900/50 border border-white/10 flex items-start justify-between group hover:border-emerald-500/30 transition-all">
                                    <div className="flex gap-4">
                                        <div className={`p-3 rounded-lg h-fit ${exp.type === 'work' ? 'bg-emerald-500/10 text-emerald-400' : exp.type === 'education' ? 'bg-blue-500/10 text-blue-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                            {exp.type === 'work' && <Briefcase size={24} />}
                                            {exp.type === 'education' && <GraduationCap size={24} />}
                                            {exp.type === 'achievement' && <Award size={24} />}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-emerald-400 mb-2">
                                                <span>{exp.company}</span>
                                                <span>•</span>
                                                <span className="text-gray-400">{exp.year}</span>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-3 max-w-2xl">{exp.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {exp.skills.map(s => (
                                                    <span key={s} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-400">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openEditExperience(exp)} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDeleteExperience(exp.id!)} className="p-2 text-gray-400 hover:text-red-400 bg-white/5 rounded-lg"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* SOCIALS TAB */}
                {activeTab === "socials" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
                        <SocialsEditor />
                    </motion.div>
                )}

                {/* SITE CONTENT TAB */}
                {activeTab === "content" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold">Site Content</h2>
                            <p className="text-gray-400 mt-1">Manage text and images across your portfolio sections</p>
                        </div>

                        {/* Section Selector */}
                        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                            {Object.keys(SECTION_SCHEMAS).map(key => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedSection(key)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${selectedSection === key
                                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                        : "bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-800"
                                        }`}
                                >
                                    {key.charAt(0).toUpperCase() + key.slice(1)} Section
                                </button>
                            ))}
                        </div>

                        {/* Editor */}
                        <SectionEditor
                            key={selectedSection}
                            sectionKey={selectedSection}
                            title={`${selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)} Content`}
                            schema={SECTION_SCHEMAS[selectedSection]}
                        />
                    </motion.div>
                )}

            </main>

            {/* Modals */}
            <ProjectModal
                isOpen={isProjectModalOpen}
                onClose={() => setIsProjectModalOpen(false)}
                project={editingProject}
                onSave={fetchProjects}
            />

            <ExperienceModal
                isOpen={isExperienceModalOpen}
                onClose={() => setIsExperienceModalOpen(false)}
                experience={editingExperience}
                onSave={fetchExperiences}
            />
        </div>
    );
}
