import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";

export default function initEditor(
  rootContainer: HTMLDivElement,
  data?: OutputData
  //   toolbarContainer: HTMLDivElement
) {
  const editor = new EditorJS({
    holder: rootContainer,
    data,
    tools: {
      header: Header,
    },
    autofocus: true,
    placeholder: "Write something meaningful",
  });

  return {
    async getContent() {
      return editor.save();
    },
    clear() {
      editor.clear();
    },
  };
}
