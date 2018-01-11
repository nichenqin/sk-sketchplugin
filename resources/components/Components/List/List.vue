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
        <label :for="`list-column-${n}`">title-{{n}}</label>
        <input type="text" class="form-control" :id="`list-column-${n}`" v-model="titleItems[n - 1].title">
      </div>
    </div>

    <div class="form-row mb-3">
      <div class="col" v-for="n in columns" :key="n">
        <label :for="`list-row-${n}`">row-{{n}}</label>
        <input type="text" class="form-control" :id="`list-row-${n}`" v-model="rowItems[n - 1].title">
      </div>
    </div>

    <div class="form-row mb-3">
      <div class="col" v-for="n in columns" :key="n">
        <input type="text" class="form-control" v-model="rowItems[n - 1].subtitle" placeholder="sub title">
      </div>
    </div>

    <div class="form-row mb-3">
      <div class="col" v-for="n in columns" :key="n">
        <select class="custom-select" v-model="rowItems[n - 1].icon">
          <option value="">Choose a icon...</option>
          <option :value="icon" v-for="icon of icons" :key="icon">{{ icon }}</option>
        </select>
      </div>
    </div>

    <div class="form-row mb-3">
      <div class="col" v-for="n in columns" :key="n">
        <div class="custom-control custom-checkbox mb-3">
          <input type="checkbox" :disabled="rowItems[n - 1].icon !== 'icon' || !!rowItems[n - 1].subtitle"
            class="custom-control-input" :id="`listIsLargeIcon${n}`" v-model="rowItems[n - 1].isLargeIcon">
          <label class="custom-control-label" :for="`listIsLargeIcon${n}`">large icon</label>
        </div>
      </div>
    </div>

    <button @click="handleImport" class="btn btn-block btn-primary btn-lg">Import To Sketch</button>

    <sk-preview>
      <tb-table :dataSource="rowsData" :MaxRows="maxRows" :columns="columnsData" type="double"></tb-table>
    </sk-preview>

    <sk-code-html tag="tb-table" :properties="properties"></sk-code-html>

    <sk-code-javascript :properties="properties"></sk-code-javascript>
  </div>
</template>

<script>
import { TbTable } from '@zhinan/tb-components';
import SkPreview from '../../Shared/Preview.vue';
import SkCodeHtml from '../../Shared/Code/CodeHtml.vue';
import SkCodeJavascript from '../../Shared/Code/CodeJavascript.vue';

export default {
  data() {
    const rows = 1;
    const columns = 3;

    const rowItems = [...new Array(columns)].map(() => ({
      title: 'Text',
      icon: '',
      isLargeIcon: false,
      subtitle: '',
    }));
    const titleItems = [...new Array(columns)].map(() => ({ title: 'title' }));

    return {
      rows,
      columns,
      rowItems,
      titleItems,
      maxRows: 5,
      showPagination: true,
      icons: ['user', 'icon'],
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
        title: this.titleItems[index].title,
      }));
    },
    rowsData() {
      return [...new Array(this.rows)].map(() => {
        const obj = {};
        for (let i = 0; i < this.columns; i += 1) {
          obj[`title${i}`] = {
            title: this.rowItems[i].title,
            subtitle: this.rowItems[i].subtitle,
            icon: this.rowItems[i].icon,
          };
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
      const { rows, columns, showPagination, titleItems, rowItems } = this;
      const payload = {
        rows,
        columns,
        titleItems,
        rowItems,
        showPagination,
      };
      this.$emit('import', payload);
    },
  },
  watch: {
    rows(rows) {
      if (rows <= 0) this.rows = 1;
    },
    columns(columns, oldColums) {
      if (columns <= 0) this.columns = 1;
      if (columns > oldColums) {
        this.titleItems.push({ title: 'title' });
        this.rowItems.push({ title: 'Text', icon: '', isLargeIcon: false });
      } else {
        this.titleItems.pop();
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
