<template>
  <div id="app" class="container">
    <component :is="currentPage" :currentComponent="currentComponent" @updateComponent="updateComponent"
      @updateCurrentPage="updateCurrentPage"></component>
  </div>
</template>

<script>
import SkHome from './components/HomePage/Home.vue';
import SkDetail from './components/DetailPage/Detail.vue';

export default {
  data() {
    return {
      currentPage: 'sk-home',
      currentComponent: 'button',
    };
  },
  components: {
    SkHome,
    SkDetail,
  },
  methods: {
    updateCurrentPage(page) {
      this.currentPage = page;
    },
    updateComponent(component) {
      this.updateCurrentPage('sk-detail');
      this.currentComponent = component;
    },
  },
};
</script>

<style>
body {
  font-family: 'Merriweather', serif;
  padding: 1rem 0;
}

select,
input,
textarea,
option {
  font-family: inherit;
}
</style>
