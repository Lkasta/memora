"use client";

import * as React from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextStyle, Color } from "@tiptap/extension-text-style";

// --- UI Primitives ---
// import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useIsMobile } from "@/hooks/use-mobile";

// --- Lib ---
import { cn, handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import HeaderEditorOptions from "@/app/memory/components/HeaderEditorOptions";

interface SimpleEditorProps {
  title?: string;
  image: string | null;
  content?: string;
  onTitleChange?: (title: string) => void;
  onContentChange?: (content: string, title: string) => void;
}

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <Spacer />
      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList", "taskList"]}
          portal={isMobile}
        />
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
        <TextColorButton />
        {/* 
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
        */}
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

const colors = [
  { hex: "#000000", name: "Preto" },
  { hex: "#ef4444", name: "Vermelho" },
  { hex: "#22c55e", name: "Verde" },
  { hex: "#3b82f6", name: "Azul" },
  { hex: "#facc15", name: "Amarelo" },
  { hex: "#ec4899", name: "Magenta" },
  { hex: "#22d3ee", name: "Ciano" },
  { hex: "#f97316", name: "Laranja" },
  { hex: "#a855f7", name: "Roxo" },
  { hex: "#a1a1aa", name: "Cinza" },
];

export function TextColorButton() {
  const { editor } = React.useContext(EditorContext);
  const [selected, setSelected] = React.useState<string | null>(null);

  const handleSelect = (color: string) => {
    setSelected(color);
    editor?.chain().focus().setColor(color).run();
  };

  const handleUnset = () => {
    setSelected(null);
    editor?.chain().focus().unsetColor().run();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-6 w-6 rounded-full p-0"
          style={{ backgroundColor: selected ?? "white" }}
        />
      </PopoverTrigger>
      <PopoverContent className="flex h-fit w-fit flex-wrap gap-2 p-2">
        {colors.map((color) => (
          <button
            key={color.hex}
            onClick={() => handleSelect(color.hex)}
            title={color.name}
            className={cn(
              "h-5 w-5 rounded-full border transition hover:scale-110",
              selected === color.hex && "ring-2 ring-gray-200 ring-offset-1",
            )}
            style={{ backgroundColor: color.hex }}
          />
        ))}
        <button
          onClick={handleUnset}
          title="Remover cor"
          className="flex h-5 w-5 items-center justify-center rounded-full border text-xs"
        >
          ×
        </button>
      </PopoverContent>
    </Popover>
  );
}

export function SimpleEditor({
  title = "",
  content = "",
  image,
  onTitleChange,
  onContentChange,
}: SimpleEditorProps) {
  const isMobile = useIsMobile();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main");
  const [currentTitle, setCurrentTitle] = React.useState<string>(title);
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        heading: {
          levels: [1, 2, 3, 4, 5],
        },
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      Placeholder.configure({
        placeholder: "Escreva algo aqui...",
      }),
      HorizontalRule,
      // TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error: Error) => console.error("Upload failed:", error),
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      if (onContentChange) {
        const html = editor.getHTML();
        onContentChange(html, currentTitle);
      }
    },
  });

  // Função para lidar com mudanças no título
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setCurrentTitle(newTitle);
    if (onTitleChange) {
      onTitleChange(newTitle);
    }
    if (onContentChange) {
      const html = editor?.getHTML() || "";
      onContentChange(html, newTitle);
    }
  };

  // Sincroniza o conteúdo quando a prop content mudar
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Sincroniza o título quando a prop title mudar
  React.useEffect(() => {
    if (title !== currentTitle) {
      setCurrentTitle(title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <div className="">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar ref={toolbarRef}>
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <HeaderEditorOptions image={image} />

        {/* Campo de título separado - sempre H1 */}
        <div className="px-12">
          <input
            type="text"
            value={currentTitle}
            onChange={handleTitleChange}
            placeholder="Digite o título aqui..."
            className="w-full resize-none border-none bg-transparent text-3xl font-bold text-gray-900 placeholder-gray-400 outline-none"
            style={{
              fontFamily: "inherit",
              lineHeight: "1.2",
            }}
          />
        </div>
        <EditorContent
          editor={editor}
          role="presentation"
          className="w-full px-12 pt-6"
        />
      </EditorContext.Provider>
    </div>
  );
}
