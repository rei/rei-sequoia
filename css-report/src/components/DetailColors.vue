<template lang="html">
  <div class="col-md-2">
    <p :style="styleObj"><b>REI</b></p>
    <p>{{color}} <span v-if="uses">({{uses}})</span></p>
  </div>
</template>

<script>
export default {
  name: 'detail-colors',
  props: ['color', 'uses'],
  data() {
    return {
      styleObj: {
        color: this.color,
        fontSize: '26px'
      }
    }
  }
}
</script>
