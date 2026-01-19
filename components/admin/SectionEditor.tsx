"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Save, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";

type FieldType = "text" | "textarea" | "image" | "list";

export interface FieldSchema {
    key: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    helpText?: string;
}

interface SectionEditorProps {
    sectionKey: string;
    title: string;
    schema: FieldSchema[];
}

export const SectionEditor = ({ sectionKey, title, schema }: SectionEditorProps) => {
    const [content, setContent] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetchContent();
    }, [sectionKey]);

    const fetchContent = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("site_content")
            .select("content")
            .eq("section_key", sectionKey)
            .single();

        if (error) {
            // If not found, we just start empty. 
            // In a real app we might want to distinguish between "error" and "not found"
            console.log("No content found or error:", error.message);
        }

        if (data?.content) {
            setContent(data.content);
        } else {
            // Initialize with empty keys based on schema if new
            const initial: any = {};
            schema.forEach(f => initial[f.key] = "");
            setContent(initial);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);

        // Check if exists
        const { data: existing } = await supabase
            .from("site_content")
            .select("id")
            .eq("section_key", sectionKey)
            .single();

        let error;

        if (existing) {
            const result = await supabase
                .from("site_content")
                .update({ content, updated_at: new Date().toISOString() })
                .eq("section_key", sectionKey);
            error = result.error;
        } else {
            const result = await supabase
                .from("site_content")
                .insert([{ section_key: sectionKey, content }]);
            error = result.error;
        }

        if (error) {
            setMessage({ type: "error", text: "Failed to save: " + error.message });
        } else {
            setMessage({ type: "success", text: "Content saved successfully!" });
            setTimeout(() => setMessage(null), 3000);
        }
        setSaving(false);
    };

    const handleChange = (key: string, value: any) => {
        setContent((prev: any) => ({ ...prev, [key]: value }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? (
                        <RefreshCw className="animate-spin" size={18} />
                    ) : (
                        <Save size={18} />
                    )}
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === "success"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }`}
                    >
                        {message.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        {message.text}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-6">
                {schema.map((field) => (
                    <div key={field.key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-400">
                            {field.label}
                        </label>

                        {field.type === "textarea" ? (
                            <textarea
                                value={content[field.key] || ""}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                rows={5}
                                className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-gray-600"
                                placeholder={field.placeholder}
                            />
                        ) : field.type === "text" || field.type === "image" ? (
                            <input
                                type="text"
                                value={content[field.key] || ""}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-gray-600"
                                placeholder={field.placeholder || (field.type === "image" ? "Image URL" : "")}
                            />
                        ) : null}

                        {field.helpText && (
                            <p className="text-xs text-gray-500">{field.helpText}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
