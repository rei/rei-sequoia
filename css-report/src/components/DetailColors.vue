<template lang="html">
  <div class="col-md-2">
    <p :style="{color: color, fontSize: '26px'}"><b>REI</b></p>
    <p>{{color}}</p>
  </div>
</template>

<script>
export default {
  name: 'detail-colors',
  props: ['color']
}
</script>
