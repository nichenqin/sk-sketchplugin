<template>
  <div id="app" class="container">
    <keep-alive>
      <component :is="currentPage" :currentComponent="currentComponent" @updateComponent="updateComponent"
        @updateCurrentPage="updateCurrentPage"></component>
    </keep-alive>
  </div>
</template>

<script>
import SkHome from './components/home-page/home.vue';
import SkDetail from './components/detail-page/detail.vue';

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
option,
code {
  font-family: inherit;
}

pre {
  white-space: pre-wrap;
  font-size: 1.3rem;
}
</style>
