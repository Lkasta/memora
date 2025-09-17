import { Button } from "@/components/ui/button";
import FileInputButton from "@/components/ui/FileInputButton";
import {
  useDeleteImage,
  useUpdateImage,
  useUploadImage,
} from "@/service/memory-image/memory-images.hook";
import { useAuth } from "@/store/useAuth";
import { SquarePen, Image as Imageicon, Trash2 } from "lucide-react";
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
  const { mutate: updateImage, isPending: updateImageisPending } =
    useUpdateImage();
  const { mutate: deleteImage, isPending: deleteImagePending } =
    useDeleteImage();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (image) {
      const formData = new FormData();
      formData.append("pic", file);
      formData.append("memorie_id", String(memorieId));
      formData.append("user_id", String(user?.id));

      updateImage(formData);
    } else {
      const formData = new FormData();
      formData.append("pic", file);
      formData.append("memorie_id", String(memorieId));
      formData.append("user_id", String(user?.id));

      uploadImage(formData);
    }
  };

  const handleDelete = () => {
    if (!memorieId || !user?.id) return;

    const formData = new FormData();
    formData.append("memorie_id", String(memorieId));
    formData.append("user_id", String(user.id));

    deleteImage(formData);
  };
  return (
    <div className="">
      {image ? (
        <div className="group relative mb-5 h-72 bg-black">
          <div className="absolute bottom-2 left-2 z-10 flex gap-2 opacity-0 !transition-opacity group-hover:opacity-100">
            <FileInputButton
              icon={SquarePen}
              onChange={handleUpload}
              disabled={updateImageisPending}
              textButton="Atualizar Capa"
            />
            <Button
              className="h-min cursor-pointer space-x-1 bg-gray-100 px-2 py-1 text-xs text-gray-700 shadow-none transition-colors hover:bg-gray-300"
              size="sm"
              onClick={handleDelete}
              disabled={deleteImagePending}
            >
              <span className="flex items-center gap-1">
                <Trash2 className="!h-[13px] !w-[13px]" size={10} />
                Deletar capa
              </span>
            </Button>
          </div>
          <Image
            width={1000}
            height={1000}
            src={`data:image/jpeg;base64,${image}`}
            alt="thumbnail"
            className="top-0 left-0 h-full w-full object-cover !transition-opacity group-hover:opacity-80"
          />
        </div>
      ) : (
        <div className="flex h-15 items-center px-12 opacity-0 !transition-opacity hover:opacity-100">
          <FileInputButton
            icon={Imageicon}
            onChange={handleUpload}
            disabled={isPending}
            textButton="Adicionar Capa"
          />
        </div>
      )}
    </div>
  );
}
