<template>
  <section>

    <form @submit.prevent="handleImport">

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Name</label>
        </div>
        <input type="text" class="form-control" v-model="name">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Background Color</label>
        </div>
        <input type="text" class="form-control" v-model.lazy="backgroundColor">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Border Color</label>
        </div>
        <input type="text" class="form-control" v-model.lazy="borderColor">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Width</label>
        </div>
        <input type="number" class="form-control" v-model.number="width">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Height</label>
        </div>
        <input type="number" class="form-control" v-model.number="height">
      </div>

      <button class="btn btn-lg btn-block btn-primary" type="submit">Import To Sketch</button>

    </form>

    <sk-preview>
      <sk-rectangle-preview :width="width" :height="height" :background-color="backgroundColor"
        :border-color="borderColor">

      </sk-rectangle-preview>
    </sk-preview>

  </section>
</template>

<script>
import SkPreview from '../../Shared/Preview.vue';
import SkRectanglePreview from './RectanglePreview.vue';

export default {
  data() {
    return {
      name: 'rectangle',
      backgroundColor: '#D8D8D8',
      borderColor: '#979797',
      width: 300,
      height: 300,
    };
  },
  components: {
    SkPreview,
    SkRectanglePreview,
  },
  methods: {
    handleImport() {
      const { width, height, backgroundColor, borderColor } = this;
      const payload = { width, height, backgroundColor, borderColor };
      this.$emit('import', payload);
    },
  },
};
</script>
