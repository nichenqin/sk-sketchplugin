<template>
  <section>

    <form @submit.prevent="handleImport">

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Status</label>
        </div>
        <select class="custom-select" v-model="currentStatus">
          <option v-for="status of allStatus" :value="status" :key="status">{{ status }}</option>
        </select>
      </div>

      <button type="submit" class="btn btn-lg btn-block btn-primary">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-upload-image></tb-upload-image>
    </sk-preview>

  </section>
</template>

<script>
import { UploadImage as TbUploadImage } from '@zhinan/tb-components';
import SkPreview from '../../shared/preview.vue';

export default {
  data() {
    return {
      currentStatus: 'normal',
      allStatus: [
        'normal',
        'hover',
        'drag',
        'uploading',
        'uploaded',
        'uploaded_selection',
        'uploaded_hover',
      ],
    };
  },
  components: {
    SkPreview,
    TbUploadImage,
  },
  methods: {
    handleImport() {
      const { currentStatus } = this;
      const payload = { status: currentStatus };
      this.$emit('import', payload);
    },
  },
};
</script>
