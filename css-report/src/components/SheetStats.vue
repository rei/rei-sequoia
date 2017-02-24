<template lang="html">
  <div class="row row-flex vertical-push">
    <div class="col-sm-6">
      <p><b>Rules:</b> {{stats.rules.total}}</p>
    </div>
    <div class="col-sm-6">
      <p><b>Selectors:</b> {{stats.selectors.total}}</p>
    </div>
    <div class="col-sm-6">
      <p><b>Declarations:</b> {{stats.declarations.total}}</p>
    </div>
    <div class="col-sm-6">
      <p><b>Colors:</b> {{uniques.color.total}} ({{cedar.color.total}} not in Cedar)</p>
    </div>
    <div class="col-sm-6">
      <p><b>Background Colors:</b> {{uniques.backgroundColor.total}} ({{cedar.backgroundColor.total}} not in Cedar)</p>
    </div>
    <div class="col-sm-6">
      <p><b>Font Sizes:</b> {{uniques.fontSize.total}} ({{cedar.fontSize.total}} not in Cedar)</p>
    </div>
    <div class="col-sm-6">
      <p><b>Font Families:</b> {{uniques.fontFamily.total}} ({{cedar.fontFamily.total}} not in Cedar)</p>
    </div>
    <div class="col-sm-6">
      <p><b>Media Queries:</b> {{uniques.mediaQueries.total}} ({{cedar.mediaQueries.total}} not in Cedar)</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'sheet-stats',
        props: [ 'sheetStats', 'cedar' ],
        data() {
            return {
                stats: this.sheetStats.stats.stats,
                uniques: this.sheetStats.uniques
            }
        }
    };
</script>

<style lang="css">

</style>