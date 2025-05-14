"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useAsyncFn } from "react-use";
import { OutputData } from "@editorjs/editorjs";

export interface ExportedData {
  content: OutputData;
  title: string;
}

export type NewPostFormAction = (
  data: ExportedData,
  id?: number,
) => Promise<{
  message: string | ReactNode | null;
  type: "error" | "info" | "success";
}>;

export function NewPostForm({
  action,
  initial,
  id,
}: {
  action: NewPostFormAction;
  initial?: ExportedData;
  id?: number;
}) {
  const [{ loading, value }, formAction] = useAsyncFn(action);
  const rootContainer = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(initial?.title || "");
  const [editor, setEditor] = useState<null | ReturnType<
    typeof import("@/lib/editor").default
  >>(null);

  useEffect(() => {
    import("@/lib/editor").then(({ default: initEditor }) => {
      setEditor(initEditor(rootContainer.current!, initial?.content));
    });
    return () => {
      console.info(rootContainer.current);

      if (rootContainer.current) rootContainer.current.innerHTML = "";
    };
  }, [initial?.content, setEditor]);

  async function save() {
    if (!editor) {
      alert("cannot access editor");
      return;
    }
    const content = await editor.getContent();
    await formAction({ content, title }, id);
    setTitle("");
    editor.clear();
  }

  return (
    <>
      {value?.message && (
        <Alert
          className="col-span-2"
          variant={value.type === "error" ? "destructive" : "default"}
        >
          <AlertDescription>{value.message}</AlertDescription>
        </Alert>
      )}

      <Button disabled={loading} onClick={() => save()}>
        Save
      </Button>
      <br />
      <input
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        type="text"
        placeholder="Title here"
        className="text-3xl my-3"
      />
      <div ref={rootContainer} className="prose prose-xl" />
    </>
  );
}
