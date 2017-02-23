<template lang="html">
  <div class="col-xs-6 col-sm-4 col-md-2 vertical-push-md">
    <div :style="styleObj"></div>
    <span>{{color}}</span>
    <p v-if="uses">({{uses}})</p>
  </div>
</template>

<script>
    export default {
        name: 'detail-bg-colors',
        props: [ 'color', 'uses' ],
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