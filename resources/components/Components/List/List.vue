<template>
  <div>
    <button class="btn btn-primary btn-lg btn-block" @click="increaceRow">添加行</button>
    <button class="btn btn-warning btn-lg btn-block" @click="decreaceRow">删除行</button>
    <sk-preview>
      <tb-table :dataSource="dataSource" :MaxRows="maxRows" :columns="columnsData"></tb-table>
    </sk-preview>
    <sk-code-html tag="tb-table" :properties="properties"></sk-code-html>
  </div>
</template>

<script>
import { TbTable } from '@zhinan/tb-components';
import SkPreview from '../../Shared/Preview.vue';
import SkCodeHtml from '../../Shared/Code/CodeHtml.vue';

export default {
  data() {
    return {
      rows: 1,
      columns: 4,
      maxRows: 5,
    };
  },
  components: {
    SkPreview,
    SkCodeHtml,
    TbTable,
  },
  computed: {
    columnsData() {
      return [...new Array(this.columns)].map((val, index) => ({
        key: `title${index}`,
        title: 'title',
      }));
    },
    dataSource() {
      return [...new Array(this.rows)].map(() => {
        const obj = {};
        for (let i = 0; i < this.columns; i += 1) {
          obj[`title${i}`] = 'text';
        }
        return obj;
      });
    },
    properties() {
      const { columnsData, dataSource, maxRows } = this;
      return { dataSource, columns: columnsData, MaxRows: maxRows };
    },
  },
  methods: {
    increaceRow() {
      this.rows += 1;
    },
    decreaceRow() {
      this.rows -= 1;
    },
  },
  watch: {
    rows(rows) {
      if (rows <= 0) this.rows = 1;
    },
  },
};
</script>
