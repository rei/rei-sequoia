<template>
  <section class="card vertical-push-lg">
    <div class="card-block card-block--top" data-theme="light-20">
      <h2 class="h3">{{page.description}}</h2>
      <p><a :href="page.url" target="_blank">{{page.url}}</a></p>
      <page-stats :pageTotals="pageTotals" :links="links" :styles="styles"></page-stats>
      <button type="button" class="btn btn-primary btn-sm" @click="collapsed = !collapsed">{{collapsed ? 'View Details': 'Hide Details'}}</button>
    </div>
    <div class="card-block" v-if="!collapsed">
      <stat-header :count="pageTotals.uniques.color.length" :name="''" :plural="'Colors'" :singular="'Color'"></stat-header>
      <detail-colors v-for="color in pageTotals.uniques.color" :color="color"></detail-colors>
      <stat-header :count="pageTotals.uniques.backgroundColor.length" :name="'Background'" :plural="'Colors'" :singular="'Color'"></stat-header>
      <detail-bg-colors v-for="color in pageTotals.uniques.backgroundColor" :color="color"></detail-bg-colors>
      <stat-header :count="pageTotals.uniques.fontSize.length" :name="'Font'" :plural="'Sizes'" :singular="'Size'"></stat-header>
      <detail-text v-for="value in pageTotals.uniques.fontSize" :value="value"></detail-text>
      <stat-header :count="pageTotals.uniques.fontFamily.length" :name="'Font'" :plural="'Families'" :singular="'Family'"></stat-header>
      <detail-text v-for="value in pageTotals.uniques.fontFamily" :value="value"></detail-text>

      <sheet v-for="link in links" :data="link" :is-style="false"></sheet>
      <sheet v-for="style in styles" :data="style" :is-style="true"></sheet>
    </div>
  </section>
</template>

<script>
import PageStats from './PageStats';
import StatHeader from './StatHeader';
import DetailColors from './DetailColors';
import DetailBgColors from './DetailBgColors';
import DetailText from './DetailText';
import Sheet from './Sheet';

let utils = require('../utils/utils.js');
let cssstats = require('cssstats');
let _ = require('lodash');

export default {
  name: 'page',
  data () {
    return {
      page: this.dataObj.page,
      links: this.dataObj.links,
      styles: this.dataObj.styles,
      css: this.dataObj.css,
      collapsed: true
    };
  },
  components: {
    PageStats,
    StatHeader,
    DetailColors,
    DetailBgColors,
    DetailText,
    Sheet
  },
  props: ['dataObj'],
  created () {
    this.pageTotals = this.parseOverviewData(this.links, this.styles);
  },
  methods: {
    parseOverviewData: function( links, styles ) {
      let totalObj = {};
      totalObj.size = 0;
      totalObj.rules = 0;
      totalObj.selectors = 0;
      totalObj.declarations = 0;
      totalObj.uniques = {};
      let uniquesArr = [];

      // Linked css stats
      for ( let i = 0, j = links.length; i < j; i++ ) {
        let linkStats = cssstats( links[ i ].css );
        if ( linkStats ) {
          totalObj.size += linkStats.gzipSize;
          totalObj.rules += linkStats.rules.total;
          totalObj.selectors += linkStats.selectors.total;
          totalObj.declarations += linkStats.declarations.total;
          uniquesArr.push( utils.parseUniques( linkStats ) );
        }
      }
      // Style tag stats
      for ( let i = 0, j = styles.length; i < j; i++ ) {
        let styleStats = cssstats( styles[ i ] );
        if ( styleStats ) {
          totalObj.rules += styleStats.rules.total;
          totalObj.selectors += styleStats.selectors.total;
          totalObj.declarations += styleStats.declarations.total;
          uniquesArr.push( utils.parseUniques( styleStats ) );
        }
      }
      // Get uniques
      uniquesArr.forEach( function ( uniques, index ) {
        let props = _.keys( uniques );
        props.forEach( function ( prop ) {
          totalObj.uniques[ prop ] = _.union( totalObj.uniques[ prop ], uniques[ prop ] );
        } );
      } );

      return totalObj;
    }
  }
};
</script>
