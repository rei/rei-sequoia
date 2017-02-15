<template lang="html">
  <div class="col-md-4 vertical-push-md">
    <span>{{value}}</span>
    <p v-if="uses">({{uses}})</p>
  </div>
</template>

<script>
export default {
  name: 'detail-text',
  props: ['value', 'uses']
}
</script>

<style lang="css">
</style>
