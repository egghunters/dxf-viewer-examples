<template>
  <div class="navigation">
    <ul>
      <li>
        <router-link :to="{ path: `/upload_dxf` }">Upload your dxf</router-link>
      </li>
    </ul>
    <ul v-if="examples.length > 0">
      <li v-for="(example, index) in examples" :key="index">
        <router-link :to="{ path: `/${example.id}` }" :class="example.id === activeExampleId ? 'active' : ''">Example {{ example.id }}</router-link>
      </li>
    </ul>
    <ul v-else>
      Loading examples...
    </ul>
  </div>
</template>
  
<script lang="ts">
  import { defineComponent, ref, provide } from 'vue';
  import { useStore, /*mapState, mapMutations,*/ mapActions } from 'vuex';
  import { useRoute } from 'vue-router';
  import { fetchExamples } from "@/uitls/Utils"
  import { Example } from '@/Defines';
  
  export default defineComponent({
    name: "NavigationPanel",
    components: {
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
      // ...mapState(['examples']),
    },
    setup(/* props */) {
      const store = useStore()
      provide('store', store)
      provide('$store', store)

      const activeExampleId = useRoute().path.replace("/", "")
      const examplesRef = ref<Example[]>([])
      const fetchData = async () => {
        const items = await fetchExamples()
        examplesRef.value = items
        // const setExamples = mapMutations(['setExamples'])['setExamples']
        // setExamples(items) // put this into vuex
        console.log("Examples:", items)
      }
      // TODO: get examples from store if any
      fetchData()
  
      return {
        store,
        examples: examplesRef,
        activeExampleId,
      }
    },
    methods: {
      // ...mapMutations(['setExamples']),
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
  .navigation {
    width: 20%;
    padding-top: 50px;
    min-height: 500px;
    opacity: 0.8;
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin-left: 10px;
      margin-top: 5px;
    }
    a {
      color: #42b983;
      &:hover {
        color: #505050;
      }
      &.active {
        font-weight: bold;
        font-style: italic;
      }
    }
  }
</style>