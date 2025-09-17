import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUploadImage } from "@/service/memory-image/memory-images.hook";
import { useAuth } from "@/store/useAuth";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function HeaderEditorOptions({
  image,
}: {
  image: string | null;
}) {
  const { id: memorieId } = useParams();
  const { user } = useAuth();
  const { mutate: uploadImage, isPending } = useUploadImage();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("pic", file);
    formData.append("memorie_id", String(memorieId));
    formData.append("user_id", String(user?.id));

    uploadImage(formData);
  };

  return (
    <div className="">
      {image ? (
        <div className="mb-5 h-72 bg-gray-300">
          <Image
            width={1000}
            height={1000}
            src={`data:image/jpeg;base64,${image}`}
            alt="thumbnail"
            className="top-0 left-0 h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-15 items-center px-12 opacity-0 !transition-opacity hover:opacity-100">
          <div className="relative">
            <Input
              id="cover"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
            <label htmlFor="cover">
              <Button
                asChild
                className="cursor-pointer bg-transparent py-2 text-xs text-gray-700 shadow-none !transition-colors hover:bg-gray-200"
                size="sm"
                disabled={isPending}
              >
                <span>Adicionar capa</span>
              </Button>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
