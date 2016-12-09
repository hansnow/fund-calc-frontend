<template>
  <div v-if="loading" class="loading">
  </div>
  <div v-else class="container">
    <chart
      :chart-data="chartData"
      :value="value"
    ></chart>
  </div>
</template>

<script>
  import { Chart } from '../components'
  import { getFundNav } from '../service'
  export default {
    name: 'chart-view',
    data () {
      return {
        chartData: [],
        value: 11,
        loading: false
      }
    },
    methods: {
      async fetchData () {
        this.loading = true
        // $route.query.fund 异常处理
        try {
          const { data } = await getFundNav(this.$route.query.fund)
          this.chartData = data.chartData
          this.value = data.value
        } catch (err) {
          console.log(err)
        }
        this.loading = false
      }
    },
    created () {
      this.fetchData()
    },
    components: {
      Chart
    }
  }
</script>

<style scoped>
  .loading {
    height: 100vh;
    width: 100vw;
    background: url(../../static/spinner_squares.svg) no-repeat center center;
  }
</style>

