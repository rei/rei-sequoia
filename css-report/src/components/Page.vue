<template lang="html">
<section class="card vertical-push-lg">
    <div class="card-block card-block--top" data-theme="light-20">
        <h2 class="h3">{{page.description}}</h2>
        <p><a :href="page.url" target="_blank">{{page.url}}</a></p>
        <page-stats :pageStats="pageTotals"></page-stats>
        <button type="button" class="btn btn-primary btn-sm" @click="toggle()">{{collapsed ? 'View Page Details': 'Hide Page Details'}}</button>
    </div>
    <div class="card-block" v-show="!collapsed">
        <div class="panel-group" role="tablist" aria-multiselectable="true">
            <!--Color-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h3 class="panel-title">
                        <a :href="computedId('#pageColorCollapse')" data-toggle="showColor" :id="computedId('pageColorHeading')" :aria-expanded="showColor" @click="toggleCollapse" :aria-controls="computedId('pageColorCollapse')">
                            Colors ({{pageTotals.uniques.color.total}} Total, {{cedarDiff.color.total}} not in Cedar)
                        </a>
                    </h3>
                </div>
                <div v-show="showColor" class="container" :id="computedId('pageColorCollapse')" :aria-labelledby="computedId('pageColorHeading')">
                    <div class="row row-flex">
                        <stat-header :count="pageTotals.uniques.color.total" :name="''" :after="''" :plural="'Colors'" :singular="'Color'"></stat-header>
                        <detail-colors v-for="uses,color in pageTotals.uniques.color.counts" :color="color" :uses="uses"></detail-colors>

                        <stat-header :count="cedarDiff.color.total" :name="''" :after="'not in current cedar'" :plural="'Colors'" :singular="'Color'"></stat-header>
                        <detail-colors v-for="color in cedarDiff.color.data" :color="color" :uses="null"></detail-colors>
                    </div>
                </div>
            </div>
            
            <!--Background Color-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h3 class="panel-title">
                        <a :href="computedId('#pageBgColorCollapse')" data-toggle="showBgColor" :id="computedId('pageBgColorHeading')" :aria-expanded="showBgColor" @click="toggleCollapse" :aria-controls="computedId('pageBgColorCollapse')">
                            Background Colors ({{pageTotals.uniques.backgroundColor.total}} Total, {{cedarDiff.backgroundColor.total}} not in Cedar)
                        </a>
                    </h3>
                </div>
                <div v-show="showBgColor" class="container" :id="computedId('pageBgColorCollapse')" :aria-labelledby="computedId('pageBgColorHeading')">
                    <div class="row row-flex">
                        <stat-header :count="pageTotals.uniques.backgroundColor.total" :name="'Background'" :after="''" :plural="'Colors'" :singular="'Color'"></stat-header>
                        <detail-bg-colors v-for="uses,color in pageTotals.uniques.backgroundColor.counts" :color="color" :uses="uses"></detail-bg-colors>
                        
                        <stat-header :count="cedarDiff.backgroundColor.total" :name="'Background'" :after="'not in current cedar'" :plural="'Colors'" :singular="'Color'"></stat-header>
                        <detail-bg-colors v-for="color in cedarDiff.backgroundColor.data" :color="color" :uses="null"></detail-bg-colors>
                    </div>
                </div>
            </div>
            
            <!--Font Size-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h3 class="panel-title">
                        <a :href="computedId('#pageFontSizeCollapse')" data-toggle="showFontSize" :id="computedId('pageFontSizeHeading')" :aria-expanded="showFontSize" @click="toggleCollapse" :aria-controls="computedId('pageFontSizeCollapse')">
                            Font Sizes ({{pageTotals.uniques.fontSize.total}} Total, {{cedarDiff.fontSize.total}} not in Cedar)
                        </a>
                    </h3>
                </div>
                <div v-show="showFontSize" class="container" :id="computedId('pageFontSizeCollapse')" :aria-labelledby="computedId('pageFontSizeHeading')">
                    <div class="row row-flex">
                        <stat-header :count="pageTotals.uniques.fontSize.total" :name="'Font'" :after="''" :plural="'Sizes'" :singular="'Size'"></stat-header>
                        <detail-text v-for="uses,value in pageTotals.uniques.fontSize.counts" :value="value" :uses="uses"></detail-text>

                        <stat-header :count="cedarDiff.fontSize.total" :name="'Font'" :after="'not in current cedar'" :plural="'Sizes'" :singular="'Size'"></stat-header>
                        <detail-text v-for="value in cedarDiff.fontSize.data" :value="value" :uses="null"></detail-text>
                    </div>
                </div>
            </div>

            <!--Font Family-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h3 class="panel-title">
                        <a :href="computedId('#pageFontFamilyCollapse')" data-toggle="showFontFamily" :id="computedId('pageFontFamilyHeading')" :aria-expanded="showFontFamily" @click="toggleCollapse" :aria-controls="computedId('pageFontFamilyCollapse')">
                            Font Families ({{pageTotals.uniques.fontFamily.total}} Total, {{cedarDiff.fontFamily.total}} not in Cedar)
                        </a>
                    </h3>
                </div>
                <div v-show="showFontFamily" class="container" :id="computedId('pageFontFamilyCollapse')" :aria-labelledby="computedId('pageFontFamilyHeading')">
                    <div class="row row-flex">
                        <stat-header :count="pageTotals.uniques.fontFamily.total" :name="'Font'" :after="''" :plural="'Families'" :singular="'Family'"></stat-header>
                        <detail-text v-for="uses,value in pageTotals.uniques.fontFamily.counts" :value="value" :uses="uses"></detail-text>

                        <stat-header :count="cedarDiff.fontFamily.total" :name="'Font'" :after="'not in current cedar'" :plural="'Families'" :singular="'Family'"></stat-header>
                        <detail-text v-for="value in cedarDiff.fontFamily.data" :value="value" :uses="null"></detail-text>
                    </div>
                </div>
            </div>
            
            <!--Media Queries-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h3 class="panel-title">
                        <a :href="computedId('#pageMediaQueries')" data-toggle="showMediaQuery" :id="computedId('pageMediaQueryHeading')" :aria-expanded="showMediaQuery" @click="toggleCollapse" :aria-controls="computedId('pageMediaQueries')">
                            Media Queries ({{pageTotals.uniques.mediaQueries.total}} Total, {{cedarDiff.mediaQueries.total}} not in Cedar)
                        </a>
                    </h3>
                </div>
                <div v-show="showMediaQuery" class="container" :id="computedId('pageMediaQueries')" :aria-labelledby="computedId('pageMediaQueryHeading')">
                    <div class="row row-flex">
                        <stat-header :count="pageTotals.uniques.mediaQueries.total" :name="'Media'" :after="''" :plural="'Queries'" :singular="'Query'"></stat-header>
                        <detail-text v-for="uses,value in pageTotals.uniques.mediaQueries.counts" :value="value" :uses="uses"></detail-text>

                        <stat-header :count="cedarDiff.mediaQueries.total" :name="'Media'" :after="'not in current cedar'" :plural="'Queries'" :singular="'Query'"></stat-header>
                        <detail-text v-for="value in cedarDiff.mediaQueries.data" :value="value" :uses="null"></detail-text>
                    </div>
                </div>
            </div>
            
            <!--Selector Stats-->
            <div class="panel panel-default">
                <div class="panel-heading" role="tab">
                    <h3 class="panel-title">
                        <a :href="computedId('#pageSelectorStats')" data-toggle="showSelectorStats" :id="computedId('pageSelectorStatsHeading')" :aria-expanded="showSelectorStats" @click="toggleCollapse" :aria-controls="computedId('pageSelectorStats')">
                            Selector Stats
                        </a>
                    </h3>
                </div>
                <div v-show="showSelectorStats" class="panel-body" :id="computedId('pageSelectorStats')" :aria-labelledby="computedId('pageSelectorStatsHeading')">
                    <p>{{pageTotals.stats.selectors.total}} total selectors consisting of:</p>
                    <ul>
                        <li>{{pageTotals.stats.selectors.id}} ID Selector{{pageTotals.stats.selectors.id > 1 ? 's' : ''}}</li>
                        <li>{{pageTotals.stats.selectors.type}} Type(Element) Selector{{pageTotals.stats.selectors.type > 1 ? 's' : ''}}</li>
                        <li>{{pageTotals.stats.selectors.class}} Class Selector{{pageTotals.stats.selectors.class > 1 ? 's' : ''}}</li>
                        <li>{{pageTotals.stats.selectors.pseudoClass}} Pseudo Class Selector{{pageTotals.stats.selectors.pseudoClass > 1 ? 's' : ''}}</li>
                        <li>{{pageTotals.stats.selectors.pseudoElement}} Pseudo Element Selector{{pageTotals.stats.selectors.pseudoElement > 1 ? 's' : ''}}</li>
                    </ul>
                </div>
            </div>
        </div>

        <sheet v-if="!collapsed" v-for="(data, i) in allStats" :index="computedIndex(index, i)" :sheetStats="data" :allStats="allStats"></sheet>
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

    import vueScroll from 'vue-scrollTo';

    export default {
        name: 'page',
        data() {
            return {
                page: this.data.page,
                pageTotals: this.data.overview,
                uniques: this.data.uniques,
                cedarDiff: this.data.cedarDiff,
                cedarUniques: this.data.cedarUniques,
                allStats: this.data.allStats,
                collapsed: true,
                showColor: false,
                showBgColor: false,
                showFontSize: false,
                showFontFamily: false,
                showMediaQuery: false,
                showSelectorStats: false,
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
        props: [ 'data', 'index' ],
        mounted() {
            let lochash = location.hash.substr( 1 ),
                mylocation = lochash.substr( lochash.indexOf( 'reportPage=' ) )
                .split( '&' )[ 0 ]
                .split( '=' )[ 1 ];

            if ( mylocation === this.page.id.toString() ) {
                this.toggle();
            } else {
                this.close();
            }
        },
        methods: {
            toggleCollapse: function ( e ) {
                e.preventDefault();
                let toggleVar = e.target.getAttribute( 'data-toggle' );
                this[ toggleVar ] = !this[ toggleVar ];
            },
            toggle: function () {
                if ( this.collapsed ) {
                    location.hash = `reportPage=${this.page.id}`;
                    vueScroll.scrollTo( this.$el, 500, {
                        easing: vueScroll.easing[ 'ease-in' ]
                    } );
                } else {
                    let scrollV = document.body.scrollTop;
                    location.hash = ``;
                    document.body.scrollTop = scrollV;
                }
                this.collapsed = !this.collapsed;

            },
            close: function () {
                this.collapsed = true;
            },
            computedId: function ( str ) {
                return `${str}${this.index}`;
            },
            computedIndex: function ( i1, i2 ) {
                return `${i1}${i2}`;
            }
        }
    };
</script>