<template lang="html">
  <div class="row row-flex vertical-push">
    <div class="col-md-4">
      <p><b>Rules:</b> {{stats.rules.total}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Selectors:</b> {{stats.selectors.total}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Declarations:</b> {{stats.declarations.total}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Colors:</b> {{uniques.color.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Background Colors:</b> {{uniques.backgroundColor.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Font Sizes:</b> {{uniques.fontSize.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Font Families:</b> {{uniques.fontFamily.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Media Queries:</b> {{stats.mediaQueries.unique}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sheet-stats',
  props: ['stats', 'uniques']
}
</script>

<style lang="css">
</style>
