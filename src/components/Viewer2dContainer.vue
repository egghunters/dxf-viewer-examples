<template>
  <div class="viewer-container" id="myCanvas"></div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue';
import { useStore, mapState, mapMutations, mapActions } from 'vuex';

import * as VIEWER from 'x-viewer'
import { useRoute } from 'vue-router';
import { Example } from '@/Defines'
import { fetchExamples } from "@/uitls/Utils"
import { createViewer } from '@/uitls/ViewerUtils';

export default defineComponent({
  name: "Viewer2dContainer",
  props: {
    // TODO: this doesn't work for now, fix it!
    // examples: {
    //   type: Array as () => Example[],
    //   required: true,
    // },
    modelUrl: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['examples']),
  },
  setup(/* props */) {
    const route = useRoute().path;
    const store = useStore()
    provide('store', store)
    provide('$store', store)
    const viewer = ref<VIEWER.Viewer2d | undefined>(undefined)
    return {
      store,
      viewer,
      route,
    }
  },
  methods: {
    ...mapMutations(['setExamples']),
    ...mapActions(['']),
    async loadModel(modelCfg: VIEWER.ModelConfig, onProgress?: any) {
      console.log("loadModel...");
      return this.viewer?.loadModel(modelCfg, onProgress)
    }
  },
  beforeMount() {
  },
  async mounted() {
    let examples = this.examples;
    if (!this.examples) {
      examples = this.examples
    } else {
      examples = await fetchExamples()
      this.setExamples(examples) // put this into vuex
    }
    console.log("Fetched examples:", this.examples)
    if (!examples || examples.length < 1) {
      console.error("No example found!")
      return
    }
    this.viewer = await createViewer();
    const exampleId = this.route.replace("/", "")
    console.log(`this.$route.query.exampleId: ${exampleId}`)

    let example: Example | undefined
    if (exampleId == null) {
      console.log("No exampleId assigned, going use a default one")
    } else {
      example = examples.find((exam: any) => exam.id === exampleId) as Example
    }
    if (!example) {
      example = examples[0] as Example
      console.warn(`Failed to find example with id '${exampleId}', going to use the first example: ${example}`)
    }
    // TODO: support more than one models in a example
    const modelCfg = example.models[0] as VIEWER.ModelConfig
    console.log("Going to load", modelCfg.src)
    const onProgress = (event: ProgressEvent) => {
      const progress = ((event.loaded * 100) / event.total).toFixed(1)
      console.log(`Loading model with id '${modelCfg.modelId}' progress: ${progress}%`)
    }
    await this.loadModel(modelCfg, onProgress)
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .viewer-container {
    position: absolute;
    width: 80%;
    height: calc(100% - 3px);
    top: 0px;
    right: 10px;
  }
</style>
