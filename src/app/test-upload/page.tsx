"use client";

import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";

export default function TestUploadPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24 bg-zinc-950 text-white">
      <h1 className="text-4xl font-bold mb-8">Teste do UploadThing</h1>
      
      <div className="border border-zinc-800 bg-zinc-900 p-8 rounded-lg shadow-sm flex flex-col items-center gap-6">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            if (res && res.length > 0) {
              setImageUrl(res[0].url);
              alert("Upload concluído com sucesso!");
            }
          }}
          onUploadError={(error: Error) => {
            console.error("Erro:", error);
            alert(`Erro no upload: ${error.message}`);
          }}
        />

        {imageUrl && (
          <div className="mt-8 flex flex-col items-center">
            <h2 className="text-xl mb-4 font-semibold">Imagem Uploaded:</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={imageUrl} 
              alt="Uploaded" 
              className="max-w-md rounded-lg shadow-md border border-zinc-700"
            />
            <a 
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-blue-400 hover:underline"
            >
              Ver URL Direta
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
