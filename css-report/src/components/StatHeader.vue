<template lang="html">
  <div class="col-xs-12 vertical-pull-lg">
    <h4 class="label-classification">{{count}} {{name}} {{count>1 ? plural : singular}}</h4>
  </div>
</template>

<script>
export default {
    name: 'stat-header',
    props: [ 'count', 'name', 'plural', 'singular' ]
}
</script>
