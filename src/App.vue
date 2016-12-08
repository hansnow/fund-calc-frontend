<template>
  <div id="app">
    <div class="w3-third w3-hide-small">&nbsp;</div>
    <div class="w3-border w3-third">
      <div class="w3-container w3-blue">
        <h2>Calculator</h2>
      </div>
      <div v-for="(fund, index) in funds">
        <input-group
          :index="index"
          :code="fund.code"
          :amount="fund.amount"
          :is-last="index+1 === funds.length"
          @changeCode="onChangeCode"
          @changeAmount="onChangeAmount"
        >
        </input-group>
      </div>
      <div class="w3-container w3-margin-bottom">
        <button @click="addInput" class="w3-btn-block w3-blue">添加一支基金</button>
        <button @click="removeInput" class="w3-btn-block w3-red">删除一支基金</button>
        <button @click="calc" class="w3-btn-block w3-green w3-margin-top">计算</button>
      </div>
      <result-panel
        :result="result"
        :loading="loading"
        v-if="result || loading"
      >
      </result-panel>
    </div>
    <div class="w3-third"></div>
  </div>
</template>

<script>
import { InputGroup, ResultPanel } from './components'
import util from './util'
import { getSum } from './service'
const { store } = util

export default {
  name: 'app',
  data () {
    return {
      funds: [{code: '', amount: ''}],
      result: 0,
      loading: false
    }
  },
  methods: {
    addInput () {
      this.funds.push({code: '', amount: ''})
    },
    removeInput () {
      if (this.funds.length > 1) { this.funds.pop() }
      // save funds combination
      store.set(this.funds)
    },
    onChangeCode (index, newCode) {
      this.funds = [
        ...this.funds.slice(0, index),
        {
          code: newCode,
          amount: this.funds[index].amount
        },
        ...this.funds.slice(index + 1)
      ]
    },
    onChangeAmount (index, newAmount) {
      this.funds = [
        ...this.funds.slice(0, index),
        {
          code: this.funds[index].code,
          amount: newAmount
        },
        ...this.funds.slice(index + 1)
      ]
    },
    async calc () {
      // 想来想去还是在js做成{code: amount}的形式吧
      // 这样在后端也许能省点事（比如code有重复的情况)
      this.loading = true
      var result = {}
      this.funds.map((item) => { result[item.code] = item.amount })

      try {
        const {data} = await getSum(result)
        if (data !== 'error') {
          this.result = data
          store.set(this.funds)
        } else {
          this.result = '哪儿输错了'
        }
      } catch (err) {
        this.result = '网络错误'
      }
      this.loading = false

      // original code
      // axios.post('/api', {funds: result})
      // .then((resp) => {
      //   this.loading = false
      //   if (resp.data !== 'error') {
      //     this.result = resp.data
      //     // save funds combination
      //     store.set(this.funds)
      //   } else {
      //     this.result = '哪儿输错了'
      //   }
      // })
      // .catch((err) => {
      //   this.loading = false
      //   console.log(err)
      //   this.result = '网络错误'
      // })
    }
  },
  created () {
    this.funds = store.get() || [{code: '', amount: ''}]
  },
  components: {
    InputGroup,
    ResultPanel
  }
}
</script>

<style src="./w3.css"></style>
