<template lang="html">
  <div class="col-md-2 vertical-push-md">
    <p :style="styleObj"><b>REI</b></p>
    <span>{{color}}</span>
    <p v-if="uses">({{uses}})</p>
  </div>
</template>

<script>
export default {
    name: 'detail-colors',
    props: [ 'color', 'uses' ],
    data() {
        return {
            styleObj: {
                color: this.color,
                fontSize: '26px'
            }
        };
    }
};
</script>
