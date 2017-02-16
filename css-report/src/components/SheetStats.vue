<template lang="html">
  <div class="row row-flex vertical-push">
    <div class="col-md-4">
      <p><b>Rules:</b> {{sheetStats.rules}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Selectors:</b> {{sheetStats.selectors}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Declarations:</b> {{sheetStats.declarations}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Unique Colors:</b> {{sheetStats.color.unique}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Total Colors:</b> {{sheetStats.color.total}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Unique Background Colors:</b> {{sheetStats.backgroundColor.unique}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Background Colors:</b> {{sheetStats.backgroundColor.total}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Unique Font Sizes:</b> {{sheetStats.fontSize.unique}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Font Sizes:</b> {{sheetStats.fontSize.total}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Unique Font Families:</b> {{sheetStats.fontFamily.unique}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Font Families:</b> {{sheetStats.fontFamily.total}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Unique Media Queries:</b> {{sheetStats.mediaQueries.unique}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Media Queries:</b> {{sheetStats.mediaQueries.total}}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'sheet-stats',
    props: [ 'sheetStats' ]
};
</script>

<style lang="css">
</style>
