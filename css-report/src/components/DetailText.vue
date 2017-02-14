<template lang="html">
  <div class="col-md-4">
    <p>{{value}} <span v-if="uses">({{uses}})</span></p>
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
