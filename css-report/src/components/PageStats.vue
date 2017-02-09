<template lang="html">
  <div class="row row-flex vertical-push">
    <div class="col-md-4">
      <p><b>Total Size (Gzip): </b>{{pageTotals.size/1000}}kb</p>
    </div>
    <div class="col-md-4">
      <p><b>Stylesheets: </b>{{links.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Style Tags: </b>{{styles.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Total Rules: </b>{{pageTotals.rules}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Total Selectors: </b>{{pageTotals.selectors}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Total Declarations: </b>{{pageTotals.declarations}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Colors: </b>{{pageTotals.uniques.color.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Background Colors: </b>{{pageTotals.uniques.backgroundColor.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Font Sizes: </b>{{pageTotals.uniques.fontSize.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Font Families: </b>{{pageTotals.uniques.fontFamily.length}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-stats',
  props:['pageTotals', 'links', 'styles']
}
</script>

<style lang="css">
</style>
