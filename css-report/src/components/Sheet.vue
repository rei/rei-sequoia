<template lang="html">
  <section class="card vertical-pull-lg">
    <div class="card-block card-block--top" data-theme="light-20">
      <h3 class="h4">{{data.name}} ({{data.stats.humanizedGzipSize}})</h3>
      <sheet-stats :stats="data.stats" :totals="data.uniques.data" :uniques="data.trueUniques"></sheet-stats>
      <button type="button" class="btn btn-primary btn-sm" @click="collapsed = !collapsed">{{collapsed ? 'View File Details': 'Hide File Details'}}</button>
    </div>
    <div class="card-block" v-if="!collapsed">
      <div class="row row-flex">
        <stat-header :count="data.trueUniques.color.length" :name="'Unique'" :plural="'Colors'" :singular="'Color'"></stat-header>
        <detail-colors v-for="color in data.trueUniques.color" :color="color"></detail-colors>
        <!-- <stat-header :count="data.uniques.data.color.length" :name="''" :plural="'Colors'" :singular="'Color'"></stat-header>
        <detail-colors v-for="color in data.uniques.data.color" :color="color"></detail-colors> -->

        <stat-header :count="data.trueUniques.backgroundColor.length" :name="'Unique Background'" :plural="'Colors'" :singular="'Color'"></stat-header>
        <detail-bg-colors v-for="color in data.trueUniques.backgroundColor" :color="color"></detail-bg-colors>
        <!-- <stat-header :count="data.uniques.data.backgroundColor.length" :name="'Background'" :plural="'Colors'" :singular="'Color'"></stat-header>
        <detail-bg-colors v-for="color in data.uniques.data.backgroundColor" :color="color"></detail-bg-colors> -->

        <stat-header :count="data.trueUniques.fontSize.length" :name="'Unique Font'" :plural="'Sizes'" :singular="'Size'"></stat-header>
        <detail-text v-for="value in data.trueUniques.fontSize" :value="value"></detail-text>
        <!-- <stat-header :count="data.uniques.data.fontSize.length" :name="'Font'" :plural="'Sizes'" :singular="'Size'"></stat-header>
        <detail-text v-for="value in data.uniques.data.fontSize" :value="value"></detail-text> -->

        <stat-header :count="data.trueUniques.fontFamily.length" :name="'Unique Font'" :plural="'Families'" :singular="'Family'"></stat-header>
        <detail-text v-for="value in data.trueUniques.fontFamily" :value="value"></detail-text>
        <!-- <stat-header :count="data.uniques.data.fontFamily.length" :name="'Font'" :plural="'Families'" :singular="'Family'"></stat-header>
        <detail-text v-for="value in data.uniques.data.fontFamily" :value="value"></detail-text> -->

        <stat-header :count="data.trueUniques.mediaQueries.length" :name="'Unique Media'" :plural="'Queries'" :singular="'Query'"></stat-header>
        <detail-text v-for="value in data.trueUniques.mediaQueries" :value="value"></detail-text>
        <!-- <stat-header :count="data.uniques.data.mediaQueries.length" :name="'Media'" :plural="'Queries'" :singular="'Query'"></stat-header>
        <detail-text v-for="value in data.uniques.data.mediaQueries" :value="value"></detail-text> -->
      </div>
    </div>
  </section>
</template>

<script>
import SheetStats from './SheetStats';
import StatHeader from './StatHeader';
import DetailColors from './DetailColors';
import DetailBgColors from './DetailBgColors';
import DetailText from './DetailText';

export default {
  name: 'sheet',
  props: ['data'],
  components: {
    SheetStats,
    StatHeader,
    DetailColors,
    DetailBgColors,
    DetailText
  },
  data(){
    return {
      collapsed: true
    }
  }
}
</script>
