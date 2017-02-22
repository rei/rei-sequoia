<template lang="html">
  <div class="row row-flex vertical-push">
    <div class="col-md-4">
      <p><b>Total Size (Gzip): </b>{{pageStats.size/1000}}kb</p>
    </div>
    <div class="col-md-4">
      <p><b>External Stylesheets: </b>{{pageStats.styleSheetsCount}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Internal Stylesheets: </b>{{pageStats.styleTagsCount}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Total Rules: </b>{{pageStats.rules}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Total Selectors: </b>{{pageStats.selectors}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Total Declarations: </b>{{pageStats.declarations}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Colors: </b>{{pageStats.color.total}} ({{pageStats.color.diff}} not in cedar)</p>
    </div>
    <div class="col-md-4">
      <p><b>Background Colors: </b>{{pageStats.backgroundColor.total}} ({{pageStats.backgroundColor.diff}} not in cedar)</p>
    </div>
    <div class="col-md-4">
      <p><b>Font Sizes: </b>{{pageStats.fontSize.total}} ({{pageStats.fontSize.diff}} not in cedar)</p>
    </div>
    <div class="col-md-4">
      <p><b>Font Families: </b>{{pageStats.fontFamily.total}} ({{pageStats.fontFamily.diff}} not in cedar)</p>
    </div>
    <div class="col-md-4">
      <p><b>Media Queries: </b>{{pageStats.mediaQueries.total}} ({{pageStats.mediaQueries.diff}} not in cedar)</p>
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