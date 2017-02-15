<template lang="html">
  <section class="card vertical-pull-lg">
    <div class="card-block card-block--top" data-theme="light-20">
      <h3 class="h4">{{sheetStats.name}} ({{sheetStats.stats.humanizedGzipSize}})</h3>
      <sheet-stats :sheetStats="sheetTotals"></sheet-stats>
      <button type="button" class="btn btn-primary btn-sm" @click="collapsed = !collapsed">{{collapsed ? 'View File Details': 'Hide File Details'}}</button>
    </div>
    <div class="card-block" v-show="!collapsed">
      <div class="row row-flex">
        <stat-header :count="sheetTotals.color.unique" :name="'Unique'" :plural="'Colors'" :singular="'Color'"></stat-header>
        <detail-colors v-for="uses,color in sheetStats.color.uniques" :color="color" :uses="uses"></detail-colors>
        <!-- <stat-header :count="data.uniques.data.color.length" :name="''" :plural="'Colors'" :singular="'Color'"></stat-header>
        <detail-colors v-for="color in data.uniques.data.color" :color="color"></detail-colors> -->

        <stat-header :count="sheetTotals.backgroundColor.unique" :name="'Unique Background'" :plural="'Colors'" :singular="'Color'"></stat-header>
        <detail-bg-colors v-for="uses,color in sheetStats.backgroundColor.uniques" :color="color" :uses="uses"></detail-bg-colors>
        <!-- <stat-header :count="data.uniques.data.backgroundColor.length" :name="'Background'" :plural="'Colors'" :singular="'Color'"></stat-header>
        <detail-bg-colors v-for="color in data.uniques.data.backgroundColor" :color="color"></detail-bg-colors> -->

        <stat-header :count="sheetTotals.fontSize.unique" :name="'Unique Font'" :plural="'Sizes'" :singular="'Size'"></stat-header>
        <detail-text v-for="uses,text in sheetStats.fontSize.uniques" :value="text" :uses="uses"></detail-text>
        <!-- <stat-header :count="data.uniques.data.fontSize.length" :name="'Font'" :plural="'Sizes'" :singular="'Size'"></stat-header>
        <detail-text v-for="value in data.uniques.data.fontSize" :value="value"></detail-text> -->

        <stat-header :count="sheetTotals.fontFamily.unique" :name="'Unique Font'" :plural="'Families'" :singular="'Family'"></stat-header>
        <detail-text v-for="uses,text in sheetStats.fontFamily.uniques" :value="text" :uses="uses"></detail-text>
        <!-- <stat-header :count="data.uniques.data.fontFamily.length" :name="'Font'" :plural="'Families'" :singular="'Family'"></stat-header>
        <detail-text v-for="value in data.uniques.data.fontFamily" :value="value"></detail-text> -->

        <stat-header :count="sheetTotals.mediaQueries.unique" :name="'Unique Media'" :plural="'Queries'" :singular="'Query'"></stat-header>
        <detail-text v-for="uses,text in sheetStats.mediaQueries.uniques" :value="text" :uses="uses"></detail-text>
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

let _ = require( 'lodash' );

export default {
    name: 'sheet',
    props: [ 'sheetStats', 'allStats' ],
    components: {
        SheetStats,
        StatHeader,
        DetailColors,
        DetailBgColors,
        DetailText
    },
    data() {
        return {
            collapsed: true,
        };
    },
    created() {
        // These are also defined in Page.vue in case we want different things for Page vs Stylesheet
        let uniqueProperties = [ 'color', 'backgroundColor', 'fontSize', 'fontFamily', 'mediaQueries' ]; // Unique properties we want to get details about
        let metrics = [ 'rules', 'selectors', 'declarations' ]; // Things we want a total count of for the sheet-stats area
        // Get sheet overview metric data
        this.sheetTotals = this.getTotals( this.sheetStats, metrics );

        // Remove current sheet data from all data for comparison later
        let othersArr = _.reject( this.allStats, {
            id: this.sheetStats.id
        } );
        // Get true unique values for the sheet and sheet overview data
        let compareObj = {};
        uniqueProperties.forEach( ( prop ) => {
            compareObj[ prop ] = [];
            othersArr.forEach( ( o ) => {
                let otherVals = _.keys( o[ prop ].counts );
                compareObj[ prop ] = _.concat( compareObj[ prop ], otherVals );
            } );

            let styleVals = _.keys( this.sheetStats[ prop ].counts );
            let diffArr = _.difference( styleVals, compareObj[ prop ] );

            this.sheetStats[ prop ].uniques = {};
            diffArr.forEach( ( val ) => {
                this.sheetStats[ prop ].uniques[ val ] = this.sheetStats[ prop ].counts[ val ];
            } );

            // Overview data
            this.sheetTotals[ prop ] = {};
            this.sheetTotals[ prop ].total = _.keys( this.sheetStats[ prop ].counts ).length;
            this.sheetTotals[ prop ].unique = _.keys( this.sheetStats[ prop ].uniques ).length;
        } );
    },
    methods: {
        getTotals: function ( statObj, metrics ) {
            let returnObj = {};
            metrics.forEach( ( metric ) => {
                returnObj[ metric ] = statObj.stats[ metric ].total;
            } );

            return returnObj;
        }
    }
};
</script>
