import { ChangeEvent } from "react";
import { Input } from "@/components/tiptap-ui-primitive/input";
import { User } from "lucide-react";

type Props = {
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function UserImageInput({ onChange, disabled }: Props) {
  return (
    <div className="relative w-full">
      <Input
        id="cover"
        type="file"
        accept="image/*"
        className="!hidden"
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor="cover">
        <div
          className={`group flex w-full cursor-pointer flex-col items-center rounded-lg border px-6 py-4 !transition-colors ${
            disabled ? "cursor-not-allowed opacity-50" : "hover:bg-zinc-50"
          }`}
        >
          <div className="w-min rounded-full border-8 border-gray-50 bg-gray-100 p-2 !transition-colors group-hover:border-violet-50 group-hover:bg-violet-100">
            <User className="text-zinc-600 !transition-colors group-hover:text-violet-500" />
          </div> 
          <p>
            <span className="font-bold text-violet-500">
              Clique para o upload
            </span>{" "}
            ou arraste e solte aqui
          </p>
          <span className="text-sm">
            SVG, PNG, JPG or GIF (max. 1200x800px)
          </span>
        </div>
      </label>
    </div>
  );
}
