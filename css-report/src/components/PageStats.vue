<template lang="html">
  <div class="row row-flex vertical-push">
    <div class="col-md-4">
      <p><b>Total Size (Gzip): </b>{{pageStats.size/1000}}kb</p>
    </div>
    <div class="col-md-4">
      <p><b>Stylesheets: </b>{{pageStats.styleSheetsCount}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Style Tags: </b>{{pageStats.styleTagsCount}}</p>
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
      <p><b>Colors: </b>{{pageStats.color}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Background Colors: </b>{{pageStats.backgroundColor}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Font Sizes: </b>{{pageStats.fontSize}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Font Families: </b>{{pageStats.fontFamily}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Media Queries: </b>{{pageStats.mediaQueries}}</p>
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
