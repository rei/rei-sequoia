<template>
  <section class="card vertical-push-lg">
    <div class="card-block card-block--top" data-theme="light-20">
      <h2 class="h3">{{page.description}}</h2>
      <p><a :href="page.url" target="_blank">{{page.url}}</a></p>
      <page-stats :pageData="pageData"></page-stats>
      <button type="button" class="btn btn-primary btn-sm" @click="collapsed = !collapsed">{{collapsed ? 'View Page Details': 'Hide Page Details'}}</button>
    </div>
    <div class="card-block" v-if="!collapsed">
      <div class="row row-flex">
        <stat-header :count="pageData.uniques.color.length" :name="''" :plural="'Colors'" :singular="'Color'"></stat-header>
        <detail-colors v-for="color in pageData.uniques.color" :color="color"></detail-colors>

        <stat-header :count="pageData.uniques.backgroundColor.length" :name="'Background'" :plural="'Colors'" :singular="'Color'"></stat-header>
        <detail-bg-colors v-for="color in pageData.uniques.backgroundColor" :color="color"></detail-bg-colors>

        <stat-header :count="pageData.uniques.fontSize.length" :name="'Font'" :plural="'Sizes'" :singular="'Size'"></stat-header>
        <detail-text v-for="value in pageData.uniques.fontSize" :value="value"></detail-text>

        <stat-header :count="pageData.uniques.fontFamily.length" :name="'Font'" :plural="'Families'" :singular="'Family'"></stat-header>
        <detail-text v-for="value in pageData.uniques.fontFamily" :value="value"></detail-text>

        <stat-header :count="pageData.uniques.mediaQueries.length" :name="'Media'" :plural="'Queries'" :singular="'Query'"></stat-header>
        <detail-text v-for="value in pageData.uniques.mediaQueries" :value="value"></detail-text>
      </div>

      <sheet v-for="data in pageData.styleData" :data="data"></sheet>
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

export default {
  name: 'page',
  data () {
    return {
      page: this.dataObj.page,
      links: this.dataObj.links,
      styles: this.dataObj.styles,
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
    this.pageData = utils.parsePageData(this.links, this.styles);
    console.log(this.pageData);
  }
};
</script>
