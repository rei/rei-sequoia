<template lang="html">
  <div class="row row-flex vertical-push">
    <div class="col-sm-6">
      <p><b>Total Size (Gzip): </b>{{pageStats.stats.humanizedGzipSize}}</p>
    </div>
    <div class="col-sm-6">
      <p><b>External Stylesheets: </b>{{pageStats.styleSheetsCount}}</p>
    </div>
    <div class="col-sm-6">
      <p><b>Internal Stylesheets: </b>{{pageStats.styleTagsCount}}</p>
    </div>
    <div class="col-sm-6">
      <p><b>Total Rules: </b>{{pageStats.stats.rules.total}}</p>
    </div>
    <div class="col-sm-6">
      <p><b>Total Selectors: </b>{{pageStats.stats.selectors.total}}</p>
    </div>
    <div class="col-sm-6">
      <p><b>Total Declarations: </b>{{pageStats.stats.declarations.total}}</p>
    </div>
    <div class="col-sm-6">
      <p><b>Colors: </b>{{pageStats.uniques.color.total}} ({{pageStats.uniques.color.diff}} not in cedar)</p>
    </div>
    <div class="col-sm-6">
      <p><b>Background Colors: </b>{{pageStats.uniques.backgroundColor.total}} ({{pageStats.uniques.backgroundColor.diff}} not in cedar)</p>
    </div>
    <div class="col-sm-6">
      <p><b>Font Sizes: </b>{{pageStats.uniques.fontSize.total}} ({{pageStats.uniques.fontSize.diff}} not in cedar)</p>
    </div>
    <div class="col-sm-6">
      <p><b>Font Families: </b>{{pageStats.uniques.fontFamily.total}} ({{pageStats.uniques.fontFamily.diff}} not in cedar)</p>
    </div>
    <div class="col-sm-6">
      <p><b>Media Queries: </b>{{pageStats.uniques.mediaQueries.total}} ({{pageStats.uniques.mediaQueries.diff}} not in cedar)</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'page-stats',
        props: [ 'pageStats' ]
    }
</script>

<style lang="css">

</style>