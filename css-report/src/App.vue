<template>
<div id="app" class="loaded">
    <div class="container">
        <h1>CSS Report</h1>
        <page v-for="page in pages" :data="page"></page>
    </div>
</div>
</template>

<script>
import Page from './components/Page';

import pages from 'assets/data.json';

export default {
    name: 'app',
    data() {
        return {
            pages: pages,
        };
    },
    components: {
        Page
    }
};
</script>
