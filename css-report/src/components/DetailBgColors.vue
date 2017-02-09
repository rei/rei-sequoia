<template lang="html">
  <div class="col-md-2">
    <div :style="styleObj"></div>
    <p>{{color}}</p>
  </div>
</template>

<script>
export default {
  name: 'detail-bg-colors',
  props: ['color'],
  data() {
    return {
      styleObj: {
        backgroundColor: this.color,
        paddingBottom: '50%'
      }
    };
  }
};
</script>
