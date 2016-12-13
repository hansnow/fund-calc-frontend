<template>
  <div :class="[{'w3-bottombar':!isLast}, 'w3-container', 'w3-border-blue']">
    <div class="w3-container">
    <div class="w3-half">
      <div class="w3-group w3-margin">
        <label class="w3-label">基金名称</label>
        <p v-if="loading"><img src="../../static/spinner_squares.svg" style="width: 24px"></p>
        <p v-else>
          <a @click="chartShow = !chartShow" href="javascript: void(0)">
            <img v-if="name && name !== 'Not Found'"
              src="../../static/line_chart.png"
              style="vertical-align: text-top;height: 20px"
              alt=""
            />
          </a>
          &nbsp;{{name}}
        </p>
      </div>
    </div>
    <div class="w3-quarter">
      <div class="w3-group w3-margin">
        <label class="w3-label">基金代码</label>
        <input :value="code" @input="changeCode($event.target.value)" class="w3-input" type="text">
      </div>
    </div>
    <div class="w3-quarter">
      <div class="w3-group w3-margin">
        <label class="w3-label">份额</label>
        <input :value="amount" @input="changeAmount($event.target.value)" class="w3-input" type="text">
      </div>
    </div>
    </div>
    <div class="w3-container">
      <transition name="chart" @before-enter="fetchChartData" @after-leave="chartLoading=true">
        <div v-if="chartShow" class="chart">
          <div v-if="chartLoading" style="background: url(../../static/spinner_squares.svg) no-repeat center center;height: 100%;"></div>
          <div v-else style="text-align: center;">
            <chart :chart-data="chartData" :value="chartValue" :index="index"></chart>
            <router-link :to="{ path: 'chart', query: { fund: this.code }}">查看大图</router-link>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { getFundName, getFundNav } from '../service'
  import Chart from './Chart'
  export default {
    name: 'input_group',
    data () {
      return {
        name: '',
        loading: false,
        chartShow: false,
        chartLoading: true,
        chartData: [],
        chartValue: 0
      }
    },
    props: ['index', 'code', 'amount', 'is-last'],
    methods: {
      changeCode (newCode) {
        this.$emit('changeCode', this.index, newCode)
        if (newCode.length === 6) {
          this._getFundName(newCode)
        }
      },
      changeAmount (newAmount) {
        this.$emit('changeAmount', this.index, newAmount)
      },
      async _getFundName (fundCode) {
        this.loading = true
        try {
          const {data} = await getFundName(fundCode)
          if (data) this.name = data
          else this.name = 'Not Found'
        } catch (err) {
          this.name = err.toString()
        }
        this.loading = false
      },
      async fetchChartData () {
        try {
          const { data } = await getFundNav(this.code)
          this.chartData = data.chartData
          this.chartValue = data.value
        } catch (err) {
          console.log(err)
        }
        this.chartLoading = false
      }
    },
    created () {
      if (this.code.length === 6) {
        this._getFundName(this.code)
      }
    },
    components: {
      Chart
    }
  }
</script>

<style scoped>
  .chart {
    height: 310px;
    overflow: hidden;
  }
  .chart-enter, .chart-leave-active {
    height: 0
  }
  .chart-enter-active, .chart-leave-active {
    transition: height .3s ease;
  }
</style>
