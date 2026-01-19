import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useSiteContent(sectionKey: string, initialContent?: any) {
    const [content, setContent] = useState<any>(initialContent || {});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchContent() {
            try {
                const { data, error } = await supabase
                    .from("site_content")
                    .select("content")
                    .eq("section_key", sectionKey)
                    .single();

                if (data?.content) {
                    // Merge with initial content to fallback for missing keys
                    setContent((prev: any) => ({ ...prev, ...data.content }));
                }
            } catch (err) {
                console.error("Error fetching site content:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchContent();
    }, [sectionKey]);

    return { content, loading };
}
