<template>
  <div>
    <div class="btn-group d-flex mb-3">
      <button class="btn btn-primary btn-lg" @click="increaceRow">Increace Row</button>
      <button class="btn btn-warning btn-lg" @click="decreaceRow">Decreace Row</button>
    </div>
    <div class="btn-group d-flex mb-3">
      <button class="btn btn-primary btn-lg" @click="increaceColumn">Increace Column</button>
      <button class="btn btn-warning btn-lg" @click="decreaceColumn">Decreace Column</button>
    </div>

    <button class="btn btn-block btn-success btn-lg" @click="handleImport">Import To Sketch</button>

    <sk-preview>
      <tb-table :dataSource="dataSource" :MaxRows="maxRows" :columns="columnsData"></tb-table>
    </sk-preview>

    <sk-code-html tag="tb-table" :properties="properties"></sk-code-html>

    <sk-code-javascript :properties="properties"></sk-code-javascript>
  </div>
</template>

<script>
import PluginCall from 'sketch-module-web-view/client';
import { TbTable } from '@zhinan/tb-components';
import SkPreview from '../../Shared/Preview.vue';
import SkCodeHtml from '../../Shared/Code/CodeHtml.vue';
import SkCodeJavascript from '../../Shared/Code/CodeJavascript.vue';

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
    SkCodeJavascript,
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
    increaceColumn() {
      this.columns += 1;
    },
    decreaceColumn() {
      this.columns -= 1;
    },
    handleImport() {
      const { rows, columns } = this;
      const payload = { rows, columns };
      PluginCall('import', 'list', payload);
    },
  },
  watch: {
    rows(rows) {
      if (rows <= 0) this.rows = 1;
    },
    columns(columns) {
      if (columns <= 0) this.columns = 1;
    },
  },
};
</script>

<style scoped>
.btn {
  flex: 1;
}
</style>
