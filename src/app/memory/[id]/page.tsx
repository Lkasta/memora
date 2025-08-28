"use client";

import { useEffect, useState, useCallback, use } from "react";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useMemorie, useUpdateMemorie } from "@/service/memories/memories.hook";
import { MemoryHeader } from "../components/MemoryHeader";
import { MemoGhost404 } from "@/components/MemoGhost404";
import { Loader2Icon } from "lucide-react";

interface MemoriePageProps {
  params: Promise<{ id: string }>;
}

export default function Memory({ params }: MemoriePageProps) {
  const { id } = use(params);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const updateMemorie = useUpdateMemorie();
  const { data: memorie, isLoading, error } = useMemorie(Number(id));

  console.log(error);

  useEffect(() => {
    if (memorie) {
      setTitle(memorie.title || "");
      setContent(memorie.content || "");
    }
  }, [memorie]);

  const handleUpdate = useCallback(
    (title: string, content: string) => {
      const payload = {
        title,
        content,
      };
      updateMemorie.mutate({ id: Number(id), payload });
    },
    [id, updateMemorie],
  );

  useEffect(() => {
    if (!memorie) return;

    if (title !== memorie.title || content !== memorie.content) {
      setIsSaving(true);

      const timeout = setTimeout(() => {
        handleUpdate(title, content);
        setIsSaving(false);
      }, 2000);

      return () => clearTimeout(timeout);
    } else {
      setIsSaving(false);
    }
  }, [title, content, memorie, handleUpdate]);

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <MemoGhost404 />
        <div className="text-center select-none">
          <p className="max-w-52 text-sm text-gray-300">
            Crie uma nova memória ou selecione uma para continuar.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading || !memorie) {
    return (
      <div className="flex h-screen w-full items-center justify-center gap-2">
        <p className="text-sm">Carregando Memória</p>
        <Loader2Icon className="animate-spin" size={16} />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col text-gray-800">
      <MemoryHeader
        eventDate={new Date(memorie.event_date)}
        isSaving={isSaving}
        title={title}
      />
      <div className="w-full flex-1 overflow-y-auto">
        <SimpleEditor
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
        />
      </div>
    </div>
  );
}
