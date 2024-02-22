<template>
  <div class="examples">
    <div class="main">
      <NavigationPanel></NavigationPanel>
      <div class="viewer-container" id="myCanvas"></div>

      <div style="position: absolute; top: 40px; opacity: 0.6; width: 100%;text-align: center;pointer-events: none;">
        <div class="upload-btn" id="uploadBtn" style="pointer-events: auto;">
          <button id="uploadModelFile" type="button" @click="uploadModelFileBtnClicked">Click to upload dxf/pdf file(s)</button>
          <label for="uploadModelFile" title="Choose one or more dxf/pdf files to load">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
              <path
                d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z">
              </path>
            </svg>
            <span>Upload dxf/pdf</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as VIEWER from 'x-viewer'
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import NavigationPanel from '@/components/NavigationPanel.vue';
import { fetchExamples } from "@/uitls/Utils"
import { Example } from '@/Defines';
import { createViewer } from '@/uitls/ViewerUtils';

export default defineComponent({
  name: "UploadDxfView",
  components: {
    NavigationPanel,
  },
  props: {
    title: {
      type: String,
      required: false
    },
  },
  data() {
    return {
    }
  },
  computed: {
  },
  setup(/* props */) {
    const route = useRoute().path;
    const examples = ref<Example[]>([])
    const fetchData = async () => {
      const items = await fetchExamples()
      examples.value = items
      console.log(examples)
    }
    fetchData()

    const viewer = ref<VIEWER.Viewer2d | undefined>(undefined)
    const modelUploader = ref<VIEWER.LocalDxfUploader | undefined>(undefined);
    return {
      examples,
      viewer,
      route,
      modelUploader,
    }
  },
  methods: {
    async loadModel(modelCfg: VIEWER.ModelConfig, onProgress?: any) {
      console.log("loadModel...");
      return this.viewer?.loadModel(modelCfg, onProgress)
    },
    uploadModelFileBtnClicked() {
      this.modelUploader?.openFileBrowserToUpload();
    },
  },
  beforeMount() {
  },
  async mounted() {
    const viewerCfg = {
      containerId: "myCanvas",
      enableLayoutBar: true,
      enableSpinner: true,
      enableProgressBar: true,
    }
    this.viewer = await createViewer(viewerCfg)
    this.modelUploader = new VIEWER.LocalDxfUploader(this.viewer as VIEWER.Viewer2d);
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .examples {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: left;
    .main {
      position: absolute;
      width: 100%;
      height: 100%;
      .viewer-container {
        position: absolute;
        width: 80%;
        height: calc(100% - 3px);
        top: 0px;
        right: 10px;
      }
      .upload-btn {
        margin-top: 2em;
        display: inline-block;
      }

      .upload-btn button {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
      }

      .upload-btn label {
        color: #353535;
        background: gray;
        border: 0;
        border-radius: 3px;
        font-size: 1rem;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        display: inline-block;
        overflow: hidden;
        padding: 0.625rem 1.25rem;
      }

      .upload-btn label:hover {
        background: #DDD;
      }

      .upload-btn svg {
        width: 1em;
        height: 1em;
        vertical-align: middle;
        fill: currentColor;
        margin-top: -0.25em;
        margin-right: 0.25em;
      }
    }
}
</style>