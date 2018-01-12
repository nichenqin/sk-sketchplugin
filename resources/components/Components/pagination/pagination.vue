<template>
  <section>

    <form @submit.prevent="handleImport">

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Margin Right</label>
        </div>
        <input type="number" class="form-control" v-model.number="marginRight">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Total Page</label>
        </div>
        <input type="number" class="form-control" v-model.number="totalPage">
      </div>

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="paginationShowLimit" v-model="showLimit">
        <label class="custom-control-label" for="paginationShowLimit">Show Limit</label>
      </div>

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="paginationShowJump" v-model="showJump">
        <label class="custom-control-label" for="paginationShowJump">Show Jump</label>
      </div>

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="paginationIsSmall" v-model="isSmall">
        <label class="custom-control-label" for="paginationIsSmall">Small Size</label>
      </div>

      <button class="btn btn-primary btn-lg btn-block">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-pagination :total-page.sync="totalPage" :current.sync="currentPage" :type="type"
        :is-skip="showJump"></tb-pagination>
    </sk-preview>

  </section>
</template>

<script>
import { Pagination as TbPagination } from '@zhinan/tb-components';
import SkPreview from '../../shared/preview.vue';

export default {
  data() {
    return {
      marginRight: 5,
      totalPage: 10,
      currentPage: 1,
      showJump: false,
      showLimit: false,
      isSmall: false,
    };
  },
  components: {
    TbPagination,
    SkPreview,
  },
  computed: {
    type() {
      return this.isSmall ? 'small' : '';
    },
  },
  methods: {
    handleImport() {
      const { marginRight, totalPage, showLimit, showJump, currentPage, isSmall } = this;
      const payload = { marginRight, totalPage, showLimit, showJump, currentPage, isSmall };
      this.$emit('import', payload);
    },
  },
  watch: {
    marginRight(num) {
      if (num <= 0) this.marginRight = 0;
    },
    totalPage(num) {
      if (num <= 0) this.totalPage = 0;
    },
  },
};
</script>
