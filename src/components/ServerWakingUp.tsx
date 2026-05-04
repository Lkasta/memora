"use client";

import { Loader2Icon } from "lucide-react";
import { MemoGhost } from "./MemoGhost";

export function ServerWakingUp() {

  return (
    <div className="bg-background text-foreground animate-in fade-in fixed inset-0 z-[9999] flex flex-col items-center justify-center duration-500">
      <div className="relative mb-8">
        {/* Camadas de brilho para efeito premium */}
        <div className="bg-primary/10 absolute -inset-4 animate-pulse rounded-full blur-xl" />
        <div className="bg-card border-border shadow-primary/5 relative flex h-20 w-20 items-center justify-center rounded-2xl border shadow-2xl">
          <MemoGhost className="animate-bounce-slow tex h-10 w-10" fillColor="fill-violet-500" />
        </div>
      </div>

      <div className="space-y-2 px-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Preparando o ambiente
        </h1>
        <p className="text-muted-foreground mx-auto max-w-[280px] text-sm leading-relaxed">
          O servidor está acordando para buscar suas memórias. Isso pode levar
          alguns segundos.
        </p>
      </div>

      <div className="text-muted-foreground/60 mt-12 flex items-center gap-2 text-xs font-medium tracking-widest uppercase">
        <Loader2Icon className="h-3 w-3 animate-spin" />
        <span>Estabelecendo conexão</span>
      </div>

      {/* Detalhe estético no rodapé */}
      <div className="text-muted-foreground/40 absolute bottom-8 font-mono text-[10px]">
        MEMORA APP • BY LKASTA
      </div>
    </div>
  );
}
