"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Save, Trash2, Globe, Github, Linkedin, Twitter, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { SocialItem } from "@/types";

const COMMON_ICONS = [
    { name: "Github", icon: Github },
    { name: "Linkedin", icon: Linkedin },
    { name: "Twitter", icon: Twitter },
    { name: "Mail", icon: Mail },
    { name: "Globe", icon: Globe },
    { name: "Facebook", icon: Facebook },
    { name: "Instagram", icon: Instagram },
    { name: "Youtube", icon: Youtube },
];

export const SocialsEditor = () => {
    const [socials, setSocials] = useState<SocialItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState<SocialItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch socials
    const fetchSocials = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("socials")
            .select("*")
            .order("created_at", { ascending: true });

        if (!error && data) {
            setSocials(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSocials();
    }, []);

    const handleDelete = async (id?: number) => {
        if (!id) return;
        if (!confirm("Are you sure you want to delete this link?")) return;

        const { error } = await supabase.from("socials").delete().eq("id", id);
        if (!error) {
            fetchSocials();
        }
    };

    const handleEdit = (item: SocialItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingItem({
            platform: "",
            url: "",
            icon_name: "Globe",
        });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Social Links</h2>
                <button
                    onClick={handleAddNew}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold flex items-center gap-2 transition-all"
                >
                    <Plus size={18} /> Add Link
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading socials...</div>
            ) : (
                <div className="grid gap-4">
                    {socials.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl bg-slate-900/50 border border-white/10 flex items-center justify-between group hover:border-emerald-500/30 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-white/5 text-emerald-400">
                                    {COMMON_ICONS.find(i => i.name === item.icon_name)?.icon({ size: 20 }) || <Globe size={20} />}
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">{item.platform}</h3>
                                    <p className="text-sm text-gray-400 truncate max-w-xs">{item.url}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    Saved
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id!)}
                                    className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    {socials.length === 0 && (
                        <div className="text-center py-12 text-gray-500 bg-slate-900/30 rounded-xl border border-white/5 border-dashed">
                            No social links found. Add one to get started.
                        </div>
                    )}
                </div>
            )}

            {/* Edit/Add Modal */}
            <SocialModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={editingItem}
                onSave={fetchSocials}
            />
        </div>
    );
};

// Internal Modal Component
const SocialModal = ({
    isOpen,
    onClose,
    item,
    onSave,
}: {
    isOpen: boolean;
    onClose: () => void;
    item: SocialItem | null;
    onSave: () => void;
}) => {
    const [formData, setFormData] = useState<SocialItem>({
        platform: "",
        url: "",
        icon_name: "Globe",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (item) setFormData(item);
    }, [item]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (item?.id) {
                await supabase.from("socials").update(formData).eq("id", item.id);
            } else {
                await supabase.from("socials").insert([formData]);
            }
            onSave();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-xl overflow-hidden"
                    >
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white">
                                {item?.id ? "Edit Link" : "Add Link"}
                            </h3>
                            <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Platform Name</label>
                                <input
                                    value={formData.platform}
                                    onChange={e => setFormData({ ...formData, platform: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-950 border border-white/10 rounded-lg text-white focus:border-emerald-500 outline-none"
                                    placeholder="GitHub"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">URL</label>
                                <input
                                    value={formData.url}
                                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-950 border border-white/10 rounded-lg text-white focus:border-emerald-500 outline-none"
                                    placeholder="https://..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Icon</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {COMMON_ICONS.map(({ name, icon: Icon }) => (
                                        <button
                                            key={name}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, icon_name: name })}
                                            className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-all ${formData.icon_name === name
                                                ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400"
                                                : "bg-slate-950 border border-white/10 text-gray-400 hover:bg-white/5"
                                                }`}
                                        >
                                            <Icon size={20} />
                                            <span className="text-[10px]">{name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-emerald-500 rounded-lg text-white font-semibold hover:bg-emerald-400 disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
