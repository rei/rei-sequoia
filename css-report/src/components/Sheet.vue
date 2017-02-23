<template lang="html">
<section class="card vertical-pull-lg">
    <div class="card-block card-block--top" data-theme="light-30">
        <h3 class="h4">{{sheetStats.name}} ({{sheetStats.stats.humanizedGzipSize}})</h3>
        <sheet-stats :sheetStats="sheetTotals"></sheet-stats>
        <button v-if="hasData" type="button" class="btn btn-primary btn-sm" @click="collapsed = !collapsed">{{collapsed ? 'View File Details': 'Hide File Details'}}</button>
    </div>
    <div class="card-block" v-show="!collapsed">
        <div class="panel-group" role="tablist" aria-multiselectable="true">
            <!--Color-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title">
                        <a :href="computedId('#sheetColorCollapse')" data-toggle="showColor" :id="computedId('sheetColorHeading')" :aria-expanded="showColor" @click="toggleCollapse" :aria-controls="computedId('sheetColorCollapse')">
                            Colors ({{sheetTotals.color.unique}} unique, {{cedarDiff.color.total}} not in Cedar)
                        </a>
                    </h4>
                </div>
                <div v-show="showColor" class="container" :id="computedId('sheetColorCollapse')" :aria-labelledby="computedId('sheetColorHeading')">
                    <div class="row row-flex">
                        <stat-header v-if="sheetTotals.color.unique > 0" :count="sheetTotals.color.unique" :name="'Unique'" :after="''" :plural="'Colors'" :singular="'Color'"></stat-header>
                        <detail-colors v-if="sheetTotals.color.unique > 0" v-for="uses,color in sheetStats.color.uniques" :color="color" :uses="uses"></detail-colors>
                        <stat-header v-if="cedarDiff.color.total > 0" :count="cedarDiff.color.total" :name="''" :after="'not in current cedar'" :plural="'Colors'" :singular="'Color'"></stat-header>
                        <detail-colors v-if="cedarDiff.color.total > 0" v-for="color in cedarDiff.color.data" :color="color" :uses="null"></detail-colors>
                    </div>
                </div>
            </div>

            <!--Background Color-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title">
                        <a :href="computedId('#sheetBgColorCollapse')" data-toggle="showBgColor" :id="computedId('sheetBgColorHeading')" :aria-expanded="showBgColor" @click="toggleCollapse" :aria-controls="computedId('sheetBgColorCollapse')">
                            Background Colors ({{sheetTotals.backgroundColor.unique}} unique, {{cedarDiff.backgroundColor.total}} not in Cedar)
                        </a>
                    </h4>
                </div>
                <div v-show="showBgColor" class="container" :id="computedId('sheetBgColorCollapse')" :aria-labelledby="computedId('sheetBgColorHeading')">
                    <div class="row row-flex">
                        <stat-header v-if="sheetTotals.backgroundColor.unique" :count="sheetTotals.backgroundColor.unique" :name="'Unique Background'" :after="''" :plural="'Colors'" :singular="'Color'"></stat-header>
                        <detail-bg-colors v-if="sheetTotals.backgroundColor.unique" v-for="uses,color in sheetStats.backgroundColor.uniques" :color="color" :uses="uses"></detail-bg-colors>
                        <stat-header v-if="cedarDiff.backgroundColor.total > 0" :count="cedarDiff.backgroundColor.total" :name="'Background'" :after="'not in current cedar'" :plural="'Colors'" :singular="'Color'"></stat-header>
                        <detail-bg-colors v-if="cedarDiff.backgroundColor.total > 0" v-for="color in cedarDiff.backgroundColor.data" :color="color" :uses="null"></detail-bg-colors>
                    </div>
                </div>
            </div>
    
            <!--Font Size-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title">
                        <a :href="computedId('#sheetFontSizeCollapse')" data-toggle="showFontSize" :id="computedId('sheetFontSizeHeading')" :aria-expanded="showFontSize" @click="toggleCollapse" :aria-controls="computedId('sheetFontSizeCollapse')">
                            Font Sizes ({{sheetTotals.fontSize.unique}} unique, {{cedarDiff.fontSize.total}} not in Cedar)
                        </a>
                    </h4>
                </div>
                <div v-show="showFontSize" class="container" :id="computedId('sheetFontSizeCollapse')" :aria-labelledby="computedId('sheetFontSizeHeading')">
                    <div class="row row-flex">
                        <stat-header v-if="sheetTotals.fontSize.unique > 0" :count="sheetTotals.fontSize.unique" :name="'Unique Font'" :after="''" :plural="'Sizes'" :singular="'Size'"></stat-header>
                        <detail-text v-if="sheetTotals.fontSize.unique > 0" v-for="uses,text in sheetStats.fontSize.uniques" :value="text" :uses="uses"></detail-text>
                        <stat-header v-if="cedarDiff.fontSize.total > 0" :count="cedarDiff.fontSize.total" :name="'Font'" :after="'not in current cedar'" :plural="'Sizes'" :singular="'Size'"></stat-header>
                        <detail-text v-if="cedarDiff.fontSize.total > 0" v-for="text in cedarDiff.fontSize.data" :value="text" :uses="null"></detail-text>
                    </div>
                </div>
            </div>
    
            <!--Font Family-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title">
                        <a :href="computedId('#sheetFontFamilyCollapse')" data-toggle="showFontFamily" :id="computedId('sheetFontFamilyHeading')" :aria-expanded="showFontFamily" @click="toggleCollapse" :aria-controls="computedId('sheetFontFamilyCollapse')">
                            Font Families ({{sheetTotals.fontFamily.unique}} unique, {{cedarDiff.fontFamily.total}} not in Cedar)
                        </a>
                    </h4>
                </div>
                <div v-show="showFontFamily" class="container" :id="computedId('sheetFontFamilyCollapse')" :aria-labelledby="computedId('sheetFontFamilyHeading')">
                    <div class="row row-flex">
                        <stat-header v-if="sheetTotals.fontFamily.unique > 0" :count="sheetTotals.fontFamily.unique" :name="'Unique Font'" :after="''" :plural="'Families'" :singular="'Family'"></stat-header>
                        <detail-text v-if="sheetTotals.fontFamily.unique > 0" v-for="uses,text in sheetStats.fontFamily.uniques" :value="text" :uses="uses"></detail-text>
                        <stat-header v-if="cedarDiff.fontFamily.total > 0" :count="cedarDiff.fontFamily.total" :name="'Font'" :after="'not in current cedar'" :plural="'Families'" :singular="'Family'"></stat-header>
                        <detail-text v-if="cedarDiff.fontFamily.total > 0" v-for="text in cedarDiff.fontFamily.data" :value="text" :uses="null"></detail-text>
                    </div>
                </div>
            </div>
    
            <!--Media Queries-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title">
                        <a :href="computedId('#sheetMediaQueryCollapse')" data-toggle="showMediaQuery" :id="computedId('sheetMediaQueryHeading')" :aria-expanded="showMediaQuery" @click="toggleCollapse" :aria-controls="computedId('sheetMediaQueryCollapse')">
                            Media Queries ({{sheetTotals.mediaQueries.unique}} unique, {{cedarDiff.mediaQueries.total}} not in Cedar)
                        </a>
                    </h4>
                </div>
                <div v-show="showMediaQuery" class="container" :id="computedId('sheetMediaQueryCollapse')" :aria-labelledby="computedId('sheetMediaQueryHeading')">
                    <div class="row row-flex">
                        <stat-header v-if="sheetTotals.mediaQueries.unique > 0" :count="sheetTotals.mediaQueries.unique" :name="'Unique Media'" :after="''" :plural="'Queries'" :singular="'Query'"></stat-header>
                        <detail-text v-if="sheetTotals.mediaQueries.unique > 0" v-for="uses,text in sheetStats.mediaQueries.uniques" :value="text" :uses="uses"></detail-text>
                        <stat-header v-if="cedarDiff.mediaQueries.total > 0" :count="cedarDiff.mediaQueries.total" :name="'Media'" :after="'not in current cedar'" :plural="'Queries'" :singular="'Query'"></stat-header>
                        <detail-text v-if="cedarDiff.mediaQueries.total > 0" v-for="text in cedarDiff.mediaQueries.data" :value="text" :uses="null"></detail-text>
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title">
                        <a :href="computedId('#sheetSpecificityCollapse')" data-toggle="showSpecificity" :id="computedId('sheetSpecificityHeading')" :aria-expanded="showSpecificity" @click="toggleCollapse" :aria-controls="computedId('sheetSpecificityCollapse')">
                            Specificity (Max: {{sheetStats.specificity.max}}, Average: {{round(sheetStats.specificity.average, 3)}})
                        </a>
                    </h4>
                </div>
                <div v-show="showSpecificity" class="panel-body" :id="computedId('sheetSpecificityCollapse')" :aria-labelledby="computedId('sheetSpecificityHeading')">
                    <div v-if="sheetStats.specificityGraph">
                        <h5 class="label-classification">Specificity Graph</h5>
                        <chart :data="sheetStats.specificityGraph" :height="500" :width="1000"></chart>
                    </div>
                    <h5 class="label-classification vertical-pull-lg">Top Ten Selectors</h5>
                    <ol>
                        <li v-for="s in specificTen">({{s.specificity}}) {{s.selector}}</li>
                    </ol>
                </div>
            </div>
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
    import Chart from './Chart';

    import _ from 'lodash';

    export default {
        name: 'sheet',
        props: [ 'sheetStats', 'allStats', 'cedar', 'index' ],
        components: {
            SheetStats,
            StatHeader,
            DetailColors,
            DetailBgColors,
            DetailText,
            Chart
        },
        data() {
            return {
                collapsed: true,
                showColor: false,
                showBgColor: false,
                showFontSize: false,
                showFontFamily: false,
                showMediaQuery: false,
                showSpecificity: false,
                hasData: false
            };
        },
        created() {
            // These are also defined in data/parse.js in case we want different things for Page vs Stylesheet
            let uniqueProperties = [ 'color', 'backgroundColor', 'fontSize', 'fontFamily', 'mediaQueries' ]; // Unique properties we want to get details about
            let metrics = [ 'rules', 'selectors', 'declarations' ]; // Things we want a total count of for the sheet-stats area
            // Get sheet overview metric data
            this.sheetTotals = this.getTotals( this.sheetStats, metrics );

            this.specificTen = _.slice( this.sheetStats.specificityArr, 0, 10 );

            // Remove current sheet data from all data for comparison later
            let othersArr = _.reject( this.allStats, {
                id: this.sheetStats.id
            } );
            // Get true unique values for the sheet and sheet overview data
            let compareObj = {};
            this.cedarDiff = {};
            uniqueProperties.forEach( ( prop ) => {
                compareObj[ prop ] = [];
                othersArr.forEach( ( o ) => {
                    let otherVals = _.keys( o[ prop ].counts );
                    compareObj[ prop ] = _.concat( compareObj[ prop ], otherVals );
                } );

                let styleVals = _.keys( this.sheetStats[ prop ].counts );
                let diffArr = _.difference( styleVals, compareObj[ prop ] );

                this.cedarDiff[ prop ] = {};
                this.cedarDiff[ prop ].data = _.difference( styleVals, _.keys( this.cedar[ prop ].counts ) );
                this.cedarDiff[ prop ].total = this.cedarDiff[ prop ].data.length;

                this.sheetStats[ prop ].uniques = {};
                diffArr.forEach( ( val ) => {
                    this.sheetStats[ prop ].uniques[ val ] = this.sheetStats[ prop ].counts[ val ];
                } );

                // Overview data
                this.sheetTotals[ prop ] = {};
                this.sheetTotals[ prop ].total = _.keys( this.sheetStats[ prop ].counts ).length;
                this.sheetTotals[ prop ].diff = this.cedarDiff[ prop ].total;
                this.sheetTotals[ prop ].unique = _.keys( this.sheetStats[ prop ].uniques ).length;

                if ( !this.hasData && ( this.sheetTotals[ prop ].total > 0 || this.cedarDiff[ prop ].total > 0 ) ) {
                    this.hasData = true;
                }
            } );
        },
        methods: {
            getTotals: function ( statObj, metrics ) {
                let returnObj = {};
                metrics.forEach( ( metric ) => {
                    returnObj[ metric ] = statObj.stats[ metric ].total;
                } );

                return returnObj;
            },
            toggleCollapse: function ( e ) {
                e.preventDefault();
                let toggleVar = e.target.getAttribute( 'data-toggle' );
                this[ toggleVar ] = !this[ toggleVar ];
            },
            computedId: function ( str ) {
                return `${str}${this.index}`;
            },
            round: function ( value, exp ) {
                if ( typeof exp === 'undefined' || +exp === 0 )
                    return Math.round( value );

                value = +value;
                exp = +exp;

                if ( isNaN( value ) || !( typeof exp === 'number' && exp % 1 === 0 ) )
                    return NaN;

                // Shift
                value = value.toString().split( 'e' );
                value = Math.round( +( value[ 0 ] + 'e' + ( value[ 1 ] ? ( +value[ 1 ] + exp ) : exp ) ) );

                // Shift back
                value = value.toString().split( 'e' );
                return +( value[ 0 ] + 'e' + ( value[ 1 ] ? ( +value[ 1 ] - exp ) : -exp ) );
            }
        }
    };
</script>