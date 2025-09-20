"use client";

import { useEffect, useState, useCallback, use } from "react";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useMemorie, useUpdateMemorie } from "@/service/memories/memories.hook";
import { MemoryHeader } from "../components/MemoryHeader";
import { Loader } from "@/components/Loader";
import { Memory404 } from "../components/Memory404";

export interface MemoriePageProps {
  params: Promise<{ id: string }>;
}

export default function Memory({ params }: MemoriePageProps) {
  const { id } = use(params);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const updateMemorie = useUpdateMemorie();
  const { data: memorie, isLoading, error } = useMemorie(Number(id));

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
    return <Memory404 />;
  }

  if (isLoading || !memorie) {
    return <Loader complement="memória" />;
  }

  return (
    <div className="flex h-screen w-full flex-col text-gray-800">
      <MemoryHeader
        image={memorie.image}
        eventDate={new Date(memorie.event_date)}
        isSaving={isSaving}
        title={title}
      />
      <div className="w-full flex-1 overflow-y-auto">
        <SimpleEditor
          image={memorie.image}
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
        />
      </div>
    </div>
  );
}
