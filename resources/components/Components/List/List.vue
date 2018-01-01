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

    <div class="form-row mb-3">
      <div class="col" v-for="n in columns" :key="n">
        <label :for="`list-column-${n}`">column-{{n}}</label>
        <input type="text" class="form-control" :id="`list-column-${n}`" v-model="columnItems[n - 1]">
      </div>
    </div>

    <div class="form-row mb-3">
      <div class="col" v-for="n in columns" :key="n">
        <label :for="`list-row-${n}`">row-{{n}}</label>
        <input type="text" class="form-control" :id="`list-row-${n}`" v-model="rowItems[n - 1]">
      </div>
    </div>

    <button @click="handleImport" class="btn btn-block btn-primary btn-lg">Import To Sketch</button>

    <sk-preview>
      <tb-table :dataSource="rowsData" :MaxRows="maxRows" :columns="columnsData"></tb-table>
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

const r = 1;
const c = 3;

const rowItems = [...new Array(c)].map(() => 'Text');
const columnItems = [...new Array(c)].map(() => 'title');

export default {
  data() {
    return {
      rows: r,
      columns: c,
      rowItems,
      columnItems,
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
        title: this.columnItems[index],
      }));
    },
    rowsData() {
      return [...new Array(this.rows)].map(() => {
        const obj = {};
        for (let i = 0; i < this.columns; i += 1) {
          obj[`title${i}`] = this.rowItems[i];
        }
        return obj;
      });
    },
    properties() {
      const { columnsData, rowsData, maxRows } = this;
      return { dataSource: rowsData, columns: columnsData, MaxRows: maxRows };
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
    columns(columns, oldColums) {
      if (columns <= 0) this.columns = 1;
      if (columns > oldColums) {
        this.columnItems.push('title');
        this.rowItems.push('Text');
      } else {
        this.columnItems.pop();
        this.rowItems.pop();
      }
    },
  },
};
</script>

<style scoped>
.btn {
  flex: 1;
}
</style>
