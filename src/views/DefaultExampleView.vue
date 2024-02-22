<template>
  <div class="examples">
    <div class="examples-main">
      <NavigationPanel></NavigationPanel>
      <Viewer2dContainer model-url="/models/dxf/dxf_0.dxf"></Viewer2dContainer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {  mapMutations, mapActions } from 'vuex';
import Viewer2dContainer from '@/components/Viewer2dContainer.vue'; // @ is an alias to /src
import NavigationPanel from '@/components/NavigationPanel.vue';
import { fetchExamples } from "@/uitls/Utils";
import { Example } from '@/Defines';

export default defineComponent({
  name: "DefaultExampleView",
  components: {
    NavigationPanel,
    Viewer2dContainer
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
    const examples = ref<Example[]>([])
    const fetchData = async () => {
      const items = await fetchExamples()
      examples.value = items
      console.log(examples)
    }
    fetchData()

    return {
      examples,
    }
  },
  methods: {
    ...mapMutations(['setExamples']),
    ...mapActions(['']),
  },
  beforeMount() {
  },
  mounted() {
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
    h1, h2 {
      margin: 5px 0px;
    }
    .examples-main {
      position: absolute;
      width: 100%;
      height: 100%;
    }
}
</style>