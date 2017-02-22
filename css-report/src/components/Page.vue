<template>
<section class="card vertical-push-lg">
    <div class="card-block card-block--top" data-theme="light-20">
        <h2 class="h3">{{page.description}}</h2>
        <p><a :href="page.url" target="_blank">{{page.url}}</a></p>
        <page-stats :pageStats="pageTotals"></page-stats>
        <button type="button" class="btn btn-primary btn-sm" @click="toggle()">{{collapsed ? 'View Page Details': 'Hide Page Details'}}</button>
    </div>
    <div class="card-block" v-show="!collapsed">
        <div class="row row-flex">
            <!--Color-->
            <stat-header :count="pageTotals.color" :name="''" :after="''" :plural="'Colors'" :singular="'Color'"></stat-header>
            <detail-colors v-for="uses,color in uniques.color" :color="color" :uses="uses"></detail-colors>

            <stat-header :count="cedarDiff.color.total" :name="''" :after="'not in current cedar'" :plural="'Colors'" :singular="'Color'"></stat-header>
            <detail-colors v-for="color in cedarDiff.color.data" :color="color" :uses="null"></detail-colors>
            
            <!--Background Color-->
            <stat-header :count="pageTotals.backgroundColor" :name="'Background'" :after="''" :plural="'Colors'" :singular="'Color'"></stat-header>
            <detail-bg-colors v-for="uses,color in uniques.backgroundColor" :color="color" :uses="uses"></detail-bg-colors>
            
            <stat-header :count="cedarDiff.backgroundColor.total" :name="'Background'" :after="'not in current cedar'" :plural="'Colors'" :singular="'Color'"></stat-header>
            <detail-bg-colors v-for="color in cedarDiff.backgroundColor.data" :color="color" :uses="null"></detail-bg-colors>
            
            <!--Font Size-->
            <stat-header :count="pageTotals.fontSize" :name="'Font'" :after="''" :plural="'Sizes'" :singular="'Size'"></stat-header>
            <detail-text v-for="uses,value in uniques.fontSize" :value="value" :uses="uses"></detail-text>

            <stat-header :count="cedarDiff.fontSize.total" :name="'Font'" :after="'not in current cedar'" :plural="'Sizes'" :singular="'Size'"></stat-header>
            <detail-text v-for="value in cedarDiff.fontSize.data" :value="value" :uses="null"></detail-text>
            
            <!--Font Family-->
            <stat-header :count="pageTotals.fontFamily" :name="'Font'" :after="''" :plural="'Families'" :singular="'Family'"></stat-header>
            <detail-text v-for="uses,value in uniques.fontFamily" :value="value" :uses="uses"></detail-text>

            <stat-header :count="cedarDiff.fontFamily.total" :name="'Font'" :after="'not in current cedar'" :plural="'Families'" :singular="'Family'"></stat-header>
            <detail-text v-for="value in cedarDiff.fontFamily.data" :value="value" :uses="null"></detail-text>
            
            <!--Media Queries-->
            <stat-header :count="pageTotals.mediaQueries" :name="'Media'" :after="''" :plural="'Queries'" :singular="'Query'"></stat-header>
            <detail-text v-for="uses,value in uniques.mediaQueries" :value="value" :uses="uses"></detail-text>

            <stat-header :count="cedarDiff.mediaQueries.total" :name="'Media'" :after="''" :plural="'Queries'" :singular="'Query'"></stat-header>
            <detail-text v-for="value in cedarDiff.mediaQueries.data" :value="value" :uses="null"></detail-text>
        </div>

        <sheet v-if="!collapsed" v-for="data in allStats" :sheetStats="data" :allStats="allStats" :cedar="cedarUniques"></sheet>
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
            }
        }
    };
</script>