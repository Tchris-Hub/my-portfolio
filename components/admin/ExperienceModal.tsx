"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Briefcase, GraduationCap, Award, Calendar, Building, FileText, Tag } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ExperienceItem } from "@/types";

interface ExperienceModalProps {
    isOpen: boolean;
    onClose: () => void;
    experience?: ExperienceItem;
    onSave: () => void;
}

export const ExperienceModal = ({ isOpen, onClose, experience, onSave }: ExperienceModalProps) => {
    const [formData, setFormData] = useState<ExperienceItem>({
        year: "",
        title: "",
        company: "",
        type: "work",
        description: "",
        skills: [],
    });

    const [skillsInput, setSkillsInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (experience) {
            setFormData(experience);
            setSkillsInput(experience.skills.join(", "));
        } else {
            setFormData({
                year: "",
                title: "",
                company: "",
                type: "work",
                description: "",
                skills: [],
            });
            setSkillsInput("");
        }
    }, [experience, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Process skills
        const processedSkills = skillsInput.split(",").map((s) => s.trim()).filter((s) => s !== "");
        const dataToSubmit = { ...formData, skills: processedSkills };

        try {
            if (experience?.id) {
                // Update
                const { error } = await supabase
                    .from("experience")
                    .update(dataToSubmit)
                    .eq("id", experience.id);
                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from("experience")
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
                                    {experience ? "Edit Experience" : "Add New Experience"}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">

                                {/* Type Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                                    <div className="flex gap-4">
                                        {(["work", "education", "achievement"] as const).map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, type })}
                                                className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${formData.type === type
                                                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                                                    : "bg-slate-950 border-white/10 text-gray-400 hover:bg-white/5"
                                                    }`}
                                            >
                                                {type === "work" && <Briefcase size={18} />}
                                                {type === "education" && <GraduationCap size={18} />}
                                                {type === "achievement" && <Award size={18} />}
                                                <span className="capitalize">{type}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Title & Company */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                            <Briefcase size={16} /> Title / Degree
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="Senior Developer"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                            <Building size={16} /> Company / Institution
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                            placeholder="Tech Corp"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Year */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                        <Calendar size={16} /> Duration / Year
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        placeholder="2024 - Present"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                        <FileText size={16} /> Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all h-32 resize-none"
                                        placeholder="What did you achieve?"
                                        required
                                    />
                                </div>

                                {/* Skills */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                                        <Tag size={16} /> Skills (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={skillsInput}
                                        onChange={(e) => setSkillsInput(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        placeholder="Leadership, React, System Design..."
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
                                        {error}
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-6 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                                    >
                                        {loading ? "Saving..." : <><Save size={18} /> Save</>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
