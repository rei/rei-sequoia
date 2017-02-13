<template lang="html">
  <div class="row row-flex vertical-push">
    <div class="col-md-4">
      <p><b>Total Size (Gzip): </b>{{pageData.size/1000}}kb</p>
    </div>
    <div class="col-md-4">
      <p><b>Stylesheets: </b>{{pageData.styleSheetsCount}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Style Tags: </b>{{pageData.styleTagsCount}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Total Rules: </b>{{pageData.rules}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Total Selectors: </b>{{pageData.selectors}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Total Declarations: </b>{{pageData.declarations}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Colors: </b>{{pageData.uniques.color.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Background Colors: </b>{{pageData.uniques.backgroundColor.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Font Sizes: </b>{{pageData.uniques.fontSize.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Font Families: </b>{{pageData.uniques.fontFamily.length}}</p>
    </div>
    <div class="col-md-4">
      <p><b>Media Queries: </b>{{pageData.uniques.mediaQueries.length}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-stats',
  props:['pageData']
}
</script>

<style lang="css">
</style>
