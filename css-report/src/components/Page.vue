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

export default {
    name: 'page',
    data() {
        return {
            page: this.data.page,
            pageTotals: this.data.overview,
            uniques: this.data.uniques,
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
    props: [ 'data' ]
};
</script>
