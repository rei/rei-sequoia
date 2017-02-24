<template lang="html">
<section class="card vertical-pull-lg">
    <div class="card-block card-block--top" data-theme="light-30">
        <h3 class="h4">{{sheetStats.name}} ({{stats.humanizedGzipSize}})</h3>
        <sheet-stats :sheetStats="sheetStats" :cedar="cedar"></sheet-stats>
        <button type="button" class="btn btn-primary btn-sm" @click="collapsed = !collapsed">{{collapsed ? 'View File Details': 'Hide File Details'}}</button>
    </div>
    <div class="card-block" v-show="!collapsed">
        <div class="panel-group" role="tablist" aria-multiselectable="true">
            <!--Color-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title">
                        <a :href="computedId('#sheetColorCollapse')" data-toggle="showColor" :id="computedId('sheetColorHeading')" :aria-expanded="showColor" @click="toggleCollapse" :aria-controls="computedId('sheetColorCollapse')">
                            Colors ({{uniques.color.total}} total, {{cedar.color.total}} not in Cedar)
                        </a>
                    </h4>
                </div>
                <div v-show="showColor" class="container" :id="computedId('sheetColorCollapse')" :aria-labelledby="computedId('sheetColorHeading')">
                    <div class="row row-flex">
                        <stat-header v-if="uniques.color.total > 0" :count="uniques.color.total" :name="''" :after="''" :plural="'Colors'" :singular="'Color'"></stat-header>
                        <detail-colors v-if="uniques.color.total > 0" v-for="uses,color in uniques.color.counts" :color="color" :uses="uses"></detail-colors>
                        <stat-header v-if="cedar.color.total > 0" :count="cedar.color.total" :name="''" :after="'not in current cedar'" :plural="'Colors'" :singular="'Color'"></stat-header>
                        <detail-colors v-if="cedar.color.total > 0" v-for="color in cedar.color.data" :color="color" :uses="null"></detail-colors>
                    </div>
                </div>
            </div>

            <!--Background Color-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title">
                        <a :href="computedId('#sheetBgColorCollapse')" data-toggle="showBgColor" :id="computedId('sheetBgColorHeading')" :aria-expanded="showBgColor" @click="toggleCollapse" :aria-controls="computedId('sheetBgColorCollapse')">
                            Background Colors ({{uniques.backgroundColor.total}} unique, {{cedar.backgroundColor.total}} not in Cedar)
                        </a>
                    </h4>
                </div>
                <div v-show="showBgColor" class="container" :id="computedId('sheetBgColorCollapse')" :aria-labelledby="computedId('sheetBgColorHeading')">
                    <div class="row row-flex">
                        <stat-header v-if="uniques.backgroundColor.total" :count="uniques.backgroundColor.total" :name="'Unique Background'" :after="''" :plural="'Colors'" :singular="'Color'"></stat-header>
                        <detail-bg-colors v-if="uniques.backgroundColor.total" v-for="uses,color in uniques.backgroundColor.counts" :color="color" :uses="uses"></detail-bg-colors>
                        <stat-header v-if="cedar.backgroundColor.total > 0" :count="cedar.backgroundColor.total" :name="'Background'" :after="'not in current cedar'" :plural="'Colors'" :singular="'Color'"></stat-header>
                        <detail-bg-colors v-if="cedar.backgroundColor.total > 0" v-for="color in cedar.backgroundColor.data" :color="color" :uses="null"></detail-bg-colors>
                    </div>
                </div>
            </div>
    
            <!--Font Size-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title">
                        <a :href="computedId('#sheetFontSizeCollapse')" data-toggle="showFontSize" :id="computedId('sheetFontSizeHeading')" :aria-expanded="showFontSize" @click="toggleCollapse" :aria-controls="computedId('sheetFontSizeCollapse')">
                            Font Sizes ({{uniques.fontSize.total}} unique, {{cedar.fontSize.total}} not in Cedar)
                        </a>
                    </h4>
                </div>
                <div v-show="showFontSize" class="container" :id="computedId('sheetFontSizeCollapse')" :aria-labelledby="computedId('sheetFontSizeHeading')">
                    <div class="row row-flex">
                        <stat-header v-if="uniques.fontSize.total > 0" :count="uniques.fontSize.total" :name="'Unique Font'" :after="''" :plural="'Sizes'" :singular="'Size'"></stat-header>
                        <detail-text v-if="uniques.fontSize.total > 0" v-for="uses,text in uniques.fontSize.counts" :value="text" :uses="uses"></detail-text>
                        <stat-header v-if="cedar.fontSize.total > 0" :count="cedar.fontSize.total" :name="'Font'" :after="'not in current cedar'" :plural="'Sizes'" :singular="'Size'"></stat-header>
                        <detail-text v-if="cedar.fontSize.total > 0" v-for="text in cedar.fontSize.data" :value="text" :uses="null"></detail-text>
                    </div>
                </div>
            </div>
    
            <!--Font Family-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title">
                        <a :href="computedId('#sheetFontFamilyCollapse')" data-toggle="showFontFamily" :id="computedId('sheetFontFamilyHeading')" :aria-expanded="showFontFamily" @click="toggleCollapse" :aria-controls="computedId('sheetFontFamilyCollapse')">
                            Font Families ({{uniques.fontFamily.total}} unique, {{cedar.fontFamily.total}} not in Cedar)
                        </a>
                    </h4>
                </div>
                <div v-show="showFontFamily" class="container" :id="computedId('sheetFontFamilyCollapse')" :aria-labelledby="computedId('sheetFontFamilyHeading')">
                    <div class="row row-flex">
                        <stat-header v-if="uniques.fontFamily.total > 0" :count="uniques.fontFamily.total" :name="'Unique Font'" :after="''" :plural="'Families'" :singular="'Family'"></stat-header>
                        <detail-text v-if="uniques.fontFamily.total > 0" v-for="uses,text in uniques.fontFamily.counts" :value="text" :uses="uses"></detail-text>
                        <stat-header v-if="cedar.fontFamily.total > 0" :count="cedar.fontFamily.total" :name="'Font'" :after="'not in current cedar'" :plural="'Families'" :singular="'Family'"></stat-header>
                        <detail-text v-if="cedar.fontFamily.total > 0" v-for="text in cedar.fontFamily.data" :value="text" :uses="null"></detail-text>
                    </div>
                </div>
            </div>
    
            <!--Media Queries-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title">
                        <a :href="computedId('#sheetMediaQueryCollapse')" data-toggle="showMediaQuery" :id="computedId('sheetMediaQueryHeading')" :aria-expanded="showMediaQuery" @click="toggleCollapse" :aria-controls="computedId('sheetMediaQueryCollapse')">
                            Media Queries ({{uniques.mediaQueries.total}} unique, {{cedar.mediaQueries.total}} not in Cedar)
                        </a>
                    </h4>
                </div>
                <div v-show="showMediaQuery" class="container" :id="computedId('sheetMediaQueryCollapse')" :aria-labelledby="computedId('sheetMediaQueryHeading')">
                    <div class="row row-flex">
                        <stat-header v-if="uniques.mediaQueries.total > 0" :count="uniques.mediaQueries.total" :name="'Unique Media'" :after="''" :plural="'Queries'" :singular="'Query'"></stat-header>
                        <detail-text v-if="uniques.mediaQueries.total > 0" v-for="uses,text in uniques.mediaQueries.counts" :value="text" :uses="uses"></detail-text>
                        <stat-header v-if="cedar.mediaQueries.total > 0" :count="cedar.mediaQueries.total" :name="'Media'" :after="'not in current cedar'" :plural="'Queries'" :singular="'Query'"></stat-header>
                        <detail-text v-if="cedar.mediaQueries.total > 0" v-for="text in cedar.mediaQueries.data" :value="text" :uses="null"></detail-text>
                    </div>
                </div>
            </div>

            <!--Selector Stats-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h3 class="panel-title">
                        <a :href="computedId('#sheetSelectorStats')" data-toggle="showSelectorStats" :id="computedId('sheetSelectorStatsHeading')" :aria-expanded="showSelectorStats" @click="toggleCollapse" :aria-controls="computedId('sheetSelectorStats')">
                            Selector Stats
                        </a>
                    </h3>
                </div>
                <div v-show="showSelectorStats" class="panel-body" :id="computedId('sheetSelectorStats')" :aria-labelledby="computedId('sheetSelectorStatsHeading')">
                    <p>{{stats.selectors.total}} total selectors consisting of:</p>
                    <ul>
                        <li>{{stats.selectors.id}} ID Selector{{stats.selectors.id > 1 ? 's' : ''}}</li>
                        <li>{{stats.selectors.type}} Type(Element) Selector{{stats.selectors.type > 1 ? 's' : ''}}</li>
                        <li>{{stats.selectors.class}} Class Selector{{stats.selectors.class > 1 ? 's' : ''}}</li>
                        <li>{{stats.selectors.pseudoClass}} Pseudo Class Selector{{stats.selectors.pseudoClass > 1 ? 's' : ''}}</li>
                        <li>{{stats.selectors.pseudoElement}} Pseudo Element Selector{{stats.selectors.pseudoElement > 1 ? 's' : ''}}</li>
                    </ul>
                </div>
            </div>

            <!--Specificity-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h4 class="panel-title">
                        <a :href="computedId('#sheetSpecificityCollapse')" data-toggle="showSpecificity" :id="computedId('sheetSpecificityHeading')" :aria-expanded="showSpecificity" @click="toggleCollapse" :aria-controls="computedId('sheetSpecificityCollapse')">
                            Specificity (Max: {{stats.selectors.specificity.max}}, Average: {{round(stats.selectors.specificity.average, 3)}})
                        </a>
                    </h4>
                </div>
                <div v-show="showSpecificity" class="panel-body" :id="computedId('sheetSpecificityCollapse')" :aria-labelledby="computedId('sheetSpecificityHeading')">
                    <div v-if="sheetStats.specificityGraph">
                        <h5 class="label-classification">Specificity Graph</h5>
                        <chart :data="sheetStats.specificityGraph" :height="500" :width="1000"></chart>
                    </div>
                    <h5 class="label-classification vertical-pull-lg">Highest specificity Selectors</h5>
                    <ol>
                        <li v-for="s in sheetStats.specificityArr">({{s.specificity}}) {{s.selector}}</li>
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
        props: [ 'sheetStats', 'allStats', 'index' ],
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
                stats: this.sheetStats.stats.stats,
                uniques: this.sheetStats.uniques,
                cedar: this.sheetStats.cedar,
                collapsed: true,
                showColor: false,
                showBgColor: false,
                showFontSize: false,
                showFontFamily: false,
                showMediaQuery: false,
                showSelectorStats: false,
                showSpecificity: false,
                hasData: false
            };
        },
        methods: {
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