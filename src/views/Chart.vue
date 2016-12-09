<template>
  <div id="chart-detail">
    <div class="w3-third w3-hide-small">&nbsp;</div>
    <div class="w3-third">
      <div class="container">
        <chart
          :chart-data="chartData"
          :value="value"
        ></chart>
        <p v-if="loading">loading</p>
      </div>
    </div>
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

