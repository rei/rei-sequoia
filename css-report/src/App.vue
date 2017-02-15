<template>
<div id="app">
    <div class="container">
        <h1>CSS Report</h1>
        <page v-for="data in datam" :data="data"></page>
    </div>
</div>
</template>

<script>
import Page from './components/Page';

import data from 'assets/data.json';

export default {
    name: 'app',
    data() {
        return {
            datam: data
        }
    },
    components: {
        Page
    }
}
</script>
