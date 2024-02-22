<template>
  <div class="examples">
    <div class="main">
      <NavigationPanel></NavigationPanel>
      <div class="viewer-container" id="myCanvas"></div>
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
  name: "ExampleView1",
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
    return {
      examples,
      viewer,
      route,
    }
  },
  methods: {
    async loadModel(modelCfg: VIEWER.ModelConfig, onProgress?: any) {
      console.log("loadModel...");
      return this.viewer?.loadModel(modelCfg, onProgress)
    }
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

    // get the exampleId from route
    const exampleId = this.route.replace("/", "")
    console.log(`Using exampleId: ${exampleId}`)

    let example: Example | undefined
    if (exampleId == null) {
      console.log("No exampleId assigned, going use a default one")
    } else {
      example = this.examples.find((exam: any) => exam.id === exampleId) as Example
    }
    if (!example) {
      example = this.examples[0] as Example
      console.warn(`Failed to find example with id '${exampleId}', going to use the first example: ${example}`)
    }
    // TODO: support more than one models in an example
    const modelCfg = example.models[0] as VIEWER.ModelConfig
    console.log("Going to load", modelCfg.src)
    const onProgress = (event: ProgressEvent) => {
      const progress = ((event.loaded * 100) / event.total).toFixed(1)
      console.log(`Loading model with id '${modelCfg.modelId}' progress: ${progress}%`)
    }
    await this.loadModel(modelCfg, onProgress)
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
    }
}
</style>