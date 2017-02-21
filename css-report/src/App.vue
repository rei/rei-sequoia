<template>
<div id="app" class="loaded">
    <div class="container">
        <h1>CSS Report</h1>
        <p>(As of {{updated}})</p>
        <page v-for="d in data" :data="d"></page>
    </div>
</div>
</template>

<script>
import Page from './components/Page';

import data from 'assets/data.json';


export default {
    name: 'app',
    data() {
        console.log(data.updated);
        return {
            data: data.data,
            updated: data.updated
        };
    },
    components: {
        Page
    }
};
</script>
