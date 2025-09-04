"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Loader2Icon } from "lucide-react";

export function DeleteMemoryConfirm({
  onConfirm,
  isPending,
}: {
  onConfirm: () => void;
  isPending: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Excluir
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita. A memória será removida
            permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            variant="destructive"
            className="cursor-pointer bg-rose-500 hover:bg-rose-600"
            onClick={onConfirm}
          >
            {isPending ? <Loader2Icon className="animate-spin" /> : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
