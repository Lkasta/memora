import { Button } from "@/components/ui/button";
import FileInputButton from "@/components/ui/FileInputButton";
import { useUpdateMemorie } from "@/service/memories/memories.hook";
import { useAuth } from "@/store/useAuth";
import { SquarePen, Image as Imageicon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useUploadThing } from "@/utils/uploadthing";

export default function HeaderEditorOptions({
  image,
}: {
  image: string | null;
}) {
  const { id: memorieId } = useParams();
  const { user } = useAuth();

  const { mutate: updateMemorie, isPending: updateMemoriePending } =
    useUpdateMemorie();
  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !memorieId) return;

    try {
      const res = await startUpload([file]);
      if (res && res.length > 0) {
        updateMemorie({
          id: Number(memorieId),
          payload: { image_url: res[0].url },
        });
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleDelete = () => {
    if (!memorieId) return;

    updateMemorie({
      id: Number(memorieId),
      payload: { image_url: undefined },
    });
  };

  return (
    <div className="">
      {image ? (
        <div className="group relative mb-5 h-72 bg-black">
          <div className="absolute bottom-2 left-2 z-10 flex gap-2 opacity-0 !transition-opacity group-hover:opacity-100">
            <FileInputButton
              icon={SquarePen}
              onChange={handleUpload}
              disabled={isUploading || updateMemoriePending}
              textButton="Atualizar Capa"
            />
            <Button
              className="h-min cursor-pointer space-x-1 bg-gray-100 px-2 py-1 text-xs text-gray-700 shadow-none transition-colors hover:bg-gray-300"
              size="sm"
              onClick={handleDelete}
              disabled={isUploading || updateMemoriePending}
            >
              <span className="flex items-center gap-1">
                <Trash2 className="!h-[13px] !w-[13px]" size={10} />
                Deletar capa
              </span>
            </Button>
          </div>
          <Image
            src={image}
            width={1000}
            height={1000}
            alt="thumbnail"
            className="top-0 left-0 h-full w-full object-cover !transition-opacity group-hover:opacity-80"
          />
        </div>
      ) : (
        <div className="flex h-15 items-center px-12 opacity-0 !transition-opacity hover:opacity-100">
          <FileInputButton
            icon={Imageicon}
            onChange={handleUpload}
            disabled={isUploading || updateMemoriePending}
            textButton="Adicionar Capa"
          />
        </div>
      )}
    </div>
  );
}
