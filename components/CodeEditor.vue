<script setup>
import { lineNumbers, highlightActiveLine, EditorView, keymap} from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap } from "@codemirror/commands";
import { history } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const props = defineProps({
  modelValue: String,
  language: String, // Langage pour CodeMirror (ex: 'javascript')
});
const emit = defineEmits(["update:modelValue"]);

const editorContainer = ref(null);
let view = null;

onMounted(() => {
  view = new EditorView({
    state: EditorState.create({
      doc: props.modelValue,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        history(),
        keymap.of(defaultKeymap),
        oneDark,
        props.language === "javascript" ? javascript() : [],
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            emit("update:modelValue", view.state.doc.toString());
          }
        }),
      ],
    }),
    parent: editorContainer.value,
  });
});

</script>

<template>
  <div ref="editorContainer" class="code-editor"></div>
</template>

<style scoped>


</style>
