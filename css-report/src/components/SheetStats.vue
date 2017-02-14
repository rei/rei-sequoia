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
      <p><b>Unique Colors:</b> {{uniques.color.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Total Colors:</b> {{totals.color.values.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Unique Background Colors:</b> {{uniques.backgroundColor.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Background Colors:</b> {{totals.backgroundColor.values.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Unique Font Sizes:</b> {{uniques.fontSize.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Font Sizes:</b> {{totals.fontSize.values.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Unique Font Families:</b> {{uniques.fontFamily.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Font Families:</b> {{totals.fontFamily.values.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Unique Media Queries:</b> {{uniques.mediaQueries.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Media Queries:</b> {{stats.mediaQueries.unique}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sheet-stats',
  props: ['stats', 'totals', 'uniques']
}
</script>

<style lang="css">
</style>
