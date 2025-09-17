import { ChangeEvent, ElementType } from "react";
import { Button } from "./button";
import { Input } from "./input";

type Props = {
  icon: ElementType;
  disabled: boolean;
  textButton: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function FileInputButton({
  icon,
  onChange,
  disabled,
  textButton,
}: Props) {
  const Icon = icon;
  return (
    <div className="relative">
      <Input
        id="cover"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
      <label htmlFor="cover">
        <Button
          asChild
          className="h-min cursor-pointer space-x-1 bg-gray-100 px-2 py-1 text-xs text-gray-700 shadow-none transition-colors hover:bg-gray-300"
          size="sm"
          disabled={disabled}
        >
          <span className="flex items-center gap-1">
            <Icon className="!h-[13px] !w-[13px]" size={10} />
            {textButton}
          </span>
        </Button>
      </label>
    </div>
  );
}
