<template lang="html">
  <div class="col-md-2">
    <div :style="styleObj"></div>
    <p>{{color}} <span v-if="uses">({{uses}})</span></p>
  </div>
</template>

<script>
export default {
  name: 'detail-bg-colors',
  props: ['color', 'uses'],
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
