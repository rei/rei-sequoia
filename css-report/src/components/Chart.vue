<template lang="html">
    <canvas v-bind:width="width" v-bind:height="height"></canvas>
</template>

<script>
    import chart from 'chart.js';

    export default {
        name: 'chart',
        props: [ 'data', 'height', 'width' ],
        data() {
            return {
                chartData: this.data
            }
        },
        mounted() {
            let myChart = new Chart( this.$el, {
                type: 'bar',
                data: {
                    labels: this.chartData,
                    datasets: [ {
                        label: 'Base 10 selector specificity value',
                        data: this.chartData,
                        backgroundColor: '#000',
                        borderColor: '#000',
                        borderWidth: 1
                    } ],
                },
                options: {
                    scales: {
                        xAxes: [ {
                            display: false,
                            barPercentage: 1
                        } ]
                    }
                }
            } );
        }
    }
</script>