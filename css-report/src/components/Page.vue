<template>
<section class="card vertical-push-lg">
    <div class="card-block card-block--top" data-theme="light-20">
        <h2 class="h3">{{page.description}}</h2>
        <p><a :href="page.url" target="_blank">{{page.url}}</a></p>
        <page-stats :pageStats="pageTotals"></page-stats>
        <button type="button" class="btn btn-primary btn-sm" @click="collapsed = !collapsed">{{collapsed ? 'View Page Details': 'Hide Page Details'}}</button>
    </div>
    <div class="card-block" v-show="!collapsed">
        <div class="row row-flex">
            <stat-header :count="pageTotals.color" :name="''" :plural="'Colors'" :singular="'Color'"></stat-header>
            <detail-colors v-for="uses,color in uniques.color" :color="color" :uses="uses"></detail-colors>

            <stat-header :count="pageTotals.backgroundColor" :name="'Background'" :plural="'Colors'" :singular="'Color'"></stat-header>
            <detail-bg-colors v-for="uses,color in uniques.backgroundColor" :color="color" :uses="uses"></detail-bg-colors>

            <stat-header :count="pageTotals.fontSize" :name="'Font'" :plural="'Sizes'" :singular="'Size'"></stat-header>
            <detail-text v-for="uses,value in uniques.fontSize" :value="value" :uses="uses"></detail-text>

            <stat-header :count="pageTotals.fontFamily" :name="'Font'" :plural="'Families'" :singular="'Family'"></stat-header>
            <detail-text v-for="uses,value in uniques.fontFamily" :value="value" :uses="uses"></detail-text>

            <stat-header :count="pageTotals.mediaQueries" :name="'Media'" :plural="'Queries'" :singular="'Query'"></stat-header>
            <detail-text v-for="uses,value in uniques.mediaQueries" :value="value" :uses="uses"></detail-text>
        </div>

        <sheet v-for="data in allStats" :sheetStats="data" :allStats="allStats"></sheet>
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

let _ = require( 'lodash' );
let randomID = require( 'random-id' );
let cssstats = require( 'cssstats' );

export default {
    name: 'page',
    data() {
        return {
            page: this.data.page,
            links: this.data.links,
            tags: this.data.styles,
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
    props: [ 'data' ],
    created() {
        // These are also defined in Sheet.vue in case we want different things for Page vs Stylesheet
        let uniqueProperties = [ 'color', 'backgroundColor', 'fontSize', 'fontFamily', 'mediaQueries' ]; // Unique properties we want to get details about
        let metrics = [ 'size', 'rules', 'selectors', 'declarations' ]; // Things we want a total count of for the page-stats area
        // set up overview object
        this.pageTotals = {};
        metrics.forEach( ( metric ) => {
            this.pageTotals[ metric ] = 0;
        } );

        // Get CSSStats
        this.statsArr = [];
        this.links.forEach( ( link ) => {
            this.statsArr.push( this.getStats( link, false ) );
        } );
        this.tags.forEach( ( tag ) => {
            this.statsArr.push( this.getStats( tag, true ) );
        } );

        // Get unique stats and build overview data from stats
        this.allStats = [];
        this.uniques = {};
        this.statsArr.forEach( ( statObj ) => {
            let tempUniques = this.getUniques( statObj, uniqueProperties )
            this.allStats.push( tempUniques );

            // Parse the unique stats
            uniqueProperties.forEach( ( prop ) => {
                this.uniques[ prop ] = _.mergeWith( this.uniques[ prop ], tempUniques[ prop ].counts, ( objVal, srcVal ) => {
                    if ( !objVal ) {
                        objVal = 0;
                    }
                    return objVal + srcVal;
                } );
                this.pageTotals[ prop ] = _.keys( this.uniques[ prop ] ).length;
            } );

            this.pageTotals = this.getTotals( statObj.stats, this.pageTotals );
        } );

        // Page Overview Stats
        this.pageTotals.styleSheetsCount = this.links.length;
        this.pageTotals.styleTagsCount = this.tags.length;

    },
    methods: {
        getTotals: function ( stats, totalObj ) {
            totalObj.size += stats.gzipSize;
            totalObj.rules += stats.rules.total;
            totalObj.selectors += stats.selectors.total;
            totalObj.declarations += stats.declarations.total;

            return totalObj;
        },
        getUniques: function ( statObj, properties ) {
            let returnObj = {};
            returnObj.id = randomID( 10 );
            returnObj.name = statObj.name;
            returnObj.stats = statObj.stats;
            // returnObj.css = statObj.css;

            properties.forEach( ( prop ) => {
                returnObj[ prop ] = {};
                if ( prop === 'fontSize' ) {
                    returnObj[ prop ].allValues = statObj.stats.declarations.getAllFontSizes();
                    returnObj[ prop ].counts = _.countBy( returnObj[ prop ].allValues, _.identity );
                } else if ( prop === 'fontFamily' ) {
                    returnObj[ prop ].allValues = statObj.stats.declarations.getAllFontFamilies();
                    returnObj[ prop ].counts = _.countBy( returnObj[ prop ].allValues, _.identity );
                } else if ( prop === 'mediaQueries' ) {
                    returnObj[ prop ].allValues = statObj.stats.mediaQueries.values;
                    returnObj[ prop ].counts = _.countBy( returnObj[ prop ].allValues, _.identity );
                } else {
                    returnObj[ prop ].allValues = statObj.stats.declarations.properties[ _.kebabCase( prop ) ];
                    returnObj[ prop ].counts = _.countBy( returnObj[ prop ].allValues, _.identity );
                }
            } );

            return returnObj;
        },
        getStats: function ( style, isStyle ) {
            let styleObj = {};
            let css;
            if ( isStyle ) {
                styleObj.name = '<style> tag';
                css = style;
            } else {
                styleObj.name = style.link;
                css = style.css;
            }
            styleObj.stats = cssstats( css );

            return styleObj;
        }
    }
};
</script>
