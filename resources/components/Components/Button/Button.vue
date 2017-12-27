<template>
  <div>
    <div class="card">
      <div class="card-header">
        预览
      </div>
      <div class="card-body">
        <h4 class="card-title">{{currentComponent}}</h4>
        <tb-button :type="currentType">按钮</tb-button>
      </div>
    </div>
    <form>
      <div class="form-group">
        <label> 完整路径： </label>
        <div class="alert alert-primary" role="alert">
          {{ path }}
        </div>
      </div>
      <div class="form-group">
        <label>类型</label>
        <select class="form-control" @change="$emit('update:currentType', $event.target.value)">
          <option value="">请选择类型</option>
          <option value="risk">risk</option>
          <option value="tab">tab</option>
          <option value="ghost">ghost</option>
          <option value="line_gray">line_gray</option>
          <option value="line_blue">line_blue</option>
        </select>
      </div>
      <div class="form-group">
        <label>状态</label>
        <select class="form-control" @change="$emit('update:status', $event.target.value)">
          <option value="normal">normal</option>
          <option value="hover">hover</option>
          <option value="active">active</option>
          <option value="disable">disable</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
import { TbButton } from '@zhinan/tb-components';

export default {
  props: ['currentComponent', 'path', 'status', 'currentType'],
  components: {
    TbButton,
  },
};
</script>
