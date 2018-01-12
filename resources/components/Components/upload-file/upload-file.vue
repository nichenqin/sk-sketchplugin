<template>
  <section>
    <form @submit.prevent="handleImport">

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Status</label>
        </div>
        <select class="custom-select" v-model="status">
          <option v-for="s of allStatus" :value="s" :key="s">{{ s }}</option>
        </select>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            File Name
          </div>
        </div>
        <input type="text" class="form-control" v-model="fileName">
      </div>

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="uploadFileCanDelete" v-model="canDelete">
        <label class="custom-control-label" for="uploadFileCanDelete">Can Delete</label>
      </div>

      <button class="btn btn-block btn-lg btn-primary">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-upload-file :show-delete="canDelete"></tb-upload-file>
    </sk-preview>
  </section>
</template>

<script>
import { UploadFile as TbUploadFile } from '@zhinan/tb-components';
import SkPreview from '../../shared/preview.vue';

export default {
  data() {
    return {
      fileName: 'uploadFile.sketch',
      canDelete: false,
      status: 'normal',
      allStatus: ['normal', 'uploading'],
    };
  },
  components: {
    TbUploadFile,
    SkPreview,
  },
  methods: {
    handleImport() {
      const { canDelete, status, fileName } = this;
      const payload = { canDelete, status, fileName };
      this.$emit('import', payload);
    },
  },
};
</script>
