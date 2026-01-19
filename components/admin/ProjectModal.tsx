"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Image as ImageIcon, Github, Link as LinkIcon, Tag, Type, FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Project } from "@/types";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project?: Project;
    onSave: () => void;
}

export const ProjectModal = ({ isOpen, onClose, project, onSave }: ProjectModalProps) => {
    const [formData, setFormData] = useState<Project>({
        title: "",
        description: "",
        long_description: "",
        image: "",
        images: [],
        tags: [],
        category: "Web",
        github_link: "",
        live_link: "",
        featured: false,
    });

    const [tagsInput, setTagsInput] = useState("");
    const [imagesInput, setImagesInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (project) {
            setFormData({
                ...project,
                images: project.images || [],
            });
            setTagsInput(project.tags ? project.tags.join(", ") : "");
            setImagesInput(project.images ? project.images.join("\n") : "");
        } else {
            setFormData({
                title: "",
                description: "",
                long_description: "",
                image: "",
                images: [],
                tags: [],
                category: "Web",
                github_link: "",
                live_link: "",
                featured: false,
            });
            setTagsInput("");
            setImagesInput("");
        }
    }, [project, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Process tags
        const processedTags = tagsInput.split(",").map((t) => t.trim()).filter((t) => t !== "");

        // Process images (split by new lines)
        const processedImages = imagesInput.split("\n").map((i) => i.trim()).filter((i) => i !== "");

        const dataToSubmit = {
            ...formData,
            tags: processedTags,
            images: processedImages
        };

        try {
            if (project?.id) {
                // Update
                const { error } = await supabase
                    .from("projects")
                    .update(dataToSubmit)
                    .eq("id", project.id);
                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from("projects")
                    .insert([dataToSubmit]);
                if (error) throw error;
            }
            onSave();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-emerald-500/10 overflow-hidden my-8"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-800/50">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    {project ? "Edit Project" : "Add New Project"}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">

                                {/* Title & Category */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                            <Type size={16} /> Title
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="Project Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                            Category
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        >
                                            <option value="Web">Web Development</option>
                                            <option value="Mobile">Mobile App</option>
                                            <option value="AI">AI & ML</option>
                                            <option value="Cybersecurity">Cybersecurity</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Short Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                        <FileText size={16} /> Short Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all h-24 resize-none"
                                        placeholder="Brief summary for the card..."
                                        required
                                    />
                                </div>

                                {/* Long Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                        <FileText size={16} /> Detailed Description
                                    </label>
                                    <textarea
                                        value={formData.long_description}
                                        onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all h-32 resize-none"
                                        placeholder="Full project details..."
                                    />
                                </div>

                                {/* Main Image URL */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                        <ImageIcon size={16} /> Main Image URL
                                    </label>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="https://..."
                                            required
                                        />
                                        {formData.image && (
                                            <div className="w-16 h-12 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Additional Images */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                        <ImageIcon size={16} /> Additional Images (One URL per line)
                                    </label>
                                    <textarea
                                        value={imagesInput}
                                        onChange={(e) => setImagesInput(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all h-32 resize-none font-mono text-sm"
                                        placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">These images will be shown in the project detail modal.</p>
                                </div>

                                {/* Links */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                            <Github size={16} /> GitHub Link
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.github_link}
                                            onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                            <LinkIcon size={16} /> Live Demo Link
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.live_link}
                                            onChange={(e) => setFormData({ ...formData, live_link: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                        <Tag size={16} /> Tags (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={tagsInput}
                                        onChange={(e) => setTagsInput(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        placeholder="React, Node.js, AI..."
                                    />
                                </div>

                                {/* Featured Toggle */}
                                <div className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-xl border border-white/5">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-600 text-emerald-500 focus:ring-emerald-500 bg-slate-800"
                                    />
                                    <label htmlFor="featured" className="text-white font-medium cursor-pointer">
                                        Feature this project on the homepage
                                    </label>
                                </div>

                                {error && (
                                    <div className="p-3 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
                                        {error}
                                    </div>
                                )}

                            </form>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/10 bg-slate-800/50 flex justify-end gap-4">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : <><Save size={18} /> Save Project</>}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
