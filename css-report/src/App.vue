<template>
<div id="app" class="loaded">
    <div class="container">
        <h1>CSS Report</h1>
        <p>(As of {{updated}})</p>
        <page v-for="(d, index) in data" :data="d" :index="index"></page>
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
                data: data.data,
                updated: data.updated
            };
        },
        components: {
            Page
        }
    };
</script>