"use client";

import api from "@/lib/api";

import { useEffect, useState, use, useCallback } from "react";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { MemorieType } from "@/types/Memorie";
import { MemoryHeader } from "../components/MemoryHeader";

interface MemoriePageProps {
  params: Promise<{ id: string }>;
}

export default function Memory({ params }: MemoriePageProps) {
  const { id } = use(params);
  const [memorie, setMemorie] = useState<MemorieType>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchMemories() {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/memories/${id}`);
        setMemorie(data);

        setTitle(data.title || "");
        setContent(data.content || "");
      } catch (error) {
        console.error("Erro ao buscar memória:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMemories();
  }, [id]);

  const updateMemory = useCallback(
    async (newContent: string, newTitle: string) => {
      try {
        setIsSaving(true);
        await api.put(`/memories/${id}`, {
          title: newTitle,
          content: newContent,
        });
        setMemorie((prev) =>
          prev
            ? {
                ...prev,
                title: newTitle,
                content: newContent,
              }
            : prev,
        );
      } catch (err) {
        console.error("Erro ao atualizar memória:", err);
      } finally {
        setIsSaving(false);
      }
    },
    [id],
  );

  useEffect(() => {
    if ((!title && !content) || isLoading) return;

    const timeoutId = setTimeout(() => {
      updateMemory(content, title);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [content, title, isLoading, updateMemory]);

  const handleEditorChange = useCallback(
    (newContent: string, newTitle: string) => {
      setContent(newContent);
      setTitle(newTitle);
    },
    [],
  );

  const handleTitleChange = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full max-w-[calc(100vw-290px)] flex-col items-center justify-center">
        <div>Carregando memória...</div>
      </div>
    );
  }
  if (memorie) {
    return (
      <div className="flex h-screen w-full max-w-[calc(100vw-290px)] flex-col text-gray-800">
        <MemoryHeader memorie={memorie} isSaving={isSaving} title={title} />

        <div className="w-full flex-1 overflow-y-auto">
          <SimpleEditor
            title={title}
            content={content}
            onTitleChange={handleTitleChange}
            onContentChange={handleEditorChange}
          />
        </div>
      </div>
    );
  }
}
