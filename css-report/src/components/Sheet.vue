<template lang="html">
  <section class="card vertical-pull-lg">
    <div class="card-block card-block--top" data-theme="light-20">
      <h3 class="h4">{{name}} ({{stats.humanizedGzipSize}})</h3>
      <sheet-stats :stats="stats" :uniques="uniques"></sheet-stats>
      <button type="button" class="btn btn-primary btn-sm" @click="collapsed = !collapsed">{{collapsed ? 'View Details': 'Hide Details'}}</button>
    </div>
    <div class="card-block" v-if="!collapsed">
      <stat-header :count="uniques.color.length" :name="''" :plural="'Colors'" :singular="'Color'"></stat-header>
      <detail-colors v-for="color in uniques.color" :color="color"></detail-colors>
      <stat-header :count="uniques.backgroundColor.length" :name="'Background'" :plural="'Colors'" :singular="'Color'"></stat-header>
      <detail-bg-colors v-for="color in uniques.backgroundColor" :color="color"></detail-bg-colors>
      <stat-header :count="uniques.fontSize.length" :name="'Font'" :plural="'Sizes'" :singular="'Size'"></stat-header>
      <detail-text v-for="value in uniques.fontSize" :value="value"></detail-text>
      <stat-header :count="uniques.fontFamily.length" :name="'Font'" :plural="'Families'" :singular="'Family'"></stat-header>
      <detail-text v-for="value in uniques.fontFamily" :value="value"></detail-text>
    </div>
  </section>
</template>

<script>
import SheetStats from './SheetStats';
import StatHeader from './StatHeader';
import DetailColors from './DetailColors';
import DetailBgColors from './DetailBgColors';
import DetailText from './DetailText';

let utils = require('../utils/utils.js');
let cssstats = require('cssstats');

export default {
  name: 'sheet',
  props: ['data', 'isStyle'],
  components: {
    SheetStats,
    StatHeader,
    DetailColors,
    DetailBgColors,
    DetailText
  },
  data(){
    let name, css;
    if (!this.isStyle) {
      name = this.data.link;
      css = this.data.css;
    } else {
      name = 'Style tag';
      css = this.data;
    }
    return {
      name: name,
      css: css,
      collapsed: true
    }
  },
  created() {
    console.log('sheet created');
    this.stats = cssstats(this.css);
    this.uniques = utils.parseUniques(this.stats);
  }
}
</script>
