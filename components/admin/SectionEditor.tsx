"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Save, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";

type FieldType = "text" | "textarea" | "image" | "file" | "list";

export interface FieldSchema {
    key: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    helpText?: string;
    bucket?: string; // Optional: specify bucket for file/image uploads
}

interface SectionEditorProps {
    sectionKey: string;
    title: string;
    schema: FieldSchema[];
}

import { Upload, X as ClearIcon } from "lucide-react";

export const SectionEditor = ({ sectionKey, title, schema }: SectionEditorProps) => {
    const [content, setContent] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null); // Key of field being uploaded
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
            console.log("No content found or error:", error.message);
        }

        if (data?.content) {
            setContent(data.content);
        } else {
            const initial: any = {};
            schema.forEach(f => initial[f.key] = "");
            setContent(initial);
        }
        setLoading(false);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: FieldSchema) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const key = field.key;
        setUploading(key);
        setMessage(null);

        try {
            const bucket = field.bucket || 'personal-assets';
            const fileExt = file.name.split('.').pop();
            const fileName = `${key}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            handleChange(key, publicUrl);
            setMessage({ type: "success", text: "File uploaded! Remember to save changes." });
        } catch (error: any) {
            console.error('Error uploading:', error);
            setMessage({ type: "error", text: `Upload failed: ${error.message}` });
        } finally {
            setUploading(null);
            if (e.target) e.target.value = '';
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);

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
                        ) : field.type === "text" || field.type === "image" || field.type === "file" ? (
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={content[field.key] || ""}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                        className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-gray-600"
                                        placeholder={field.placeholder || (field.type === "image" ? "Image URL" : field.type === "file" ? "File URL" : "")}
                                    />
                                    {content[field.key] && (
                                        <button
                                            onClick={() => handleChange(field.key, "")}
                                            className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl border border-red-500/20 transition-all"
                                            title="Clear field"
                                        >
                                            <ClearIcon size={18} />
                                        </button>
                                    )}
                                </div>

                                {(field.type === "image" || field.type === "file") && (
                                    <div className="flex items-center gap-4">
                                        <label className={`flex items-center gap-2 px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:border-emerald-500/50 cursor-pointer transition-all ${uploading === field.key ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                            {uploading === field.key ? (
                                                <RefreshCw className="animate-spin" size={16} />
                                            ) : (
                                                <Upload size={16} />
                                            )}
                                            {uploading === field.key ? "Uploading..." : `Upload ${field.type === 'image' ? 'Image' : 'PDF/File'}`}
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept={field.type === 'image' ? "image/*" : "application/pdf,*/*"}
                                                onChange={(e) => handleFileUpload(e, field)}
                                                disabled={!!uploading}
                                            />
                                        </label>
                                        {content[field.key] && field.type === 'image' && (
                                            <div className="h-10 w-10 rounded border border-white/10 overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={content[field.key]} alt="Preview" className="h-full w-full object-cover" />
                                            </div>
                                        )}
                                        {content[field.key] && field.type === 'file' && (
                                            <a href={content[field.key]} target="_blank" className="text-xs text-emerald-400 hover:underline">View current file</a>
                                        )}
                                    </div>
                                )}
                            </div>
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
