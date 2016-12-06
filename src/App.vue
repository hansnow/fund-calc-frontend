<template>
  <div id="app" class="w3-margin-top">
    <div class="w3-third">&nbsp;</div>
    <div class="w3-border w3-third">
      <div class="w3-container w3-blue">
        <h2>Calculator</h2>
      </div>
      <div v-for="(fund, index) in funds">
        <input-group
          :index="index"
          :code="fund.code"
          :amount="fund.amount"
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
        v-if="result"
      >
      </result-panel>
    </div>
    <div class="w3-third"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { InputGroup, ResultPanel } from './components'
export default {
  name: 'app',
  data () {
    return {
      funds: [{code: '', amount: ''}],
      result: 0
    }
  },
  methods: {
    addInput () {
      this.funds.push({code: '', amount: ''})
    },
    removeInput () {
      if (this.funds.length > 1) this.funds.pop()
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
    calc () {
      // 想来想去还是在js做成{code: amount}的形式吧
      // 这样在后端也许能省点事（比如code有重复的情况)
      var result = {}
      this.funds.map((item) => { result[item.code] = item.amount })
      axios.post('/api', {funds: result})
      .then((resp) => {
        if (resp.data !== 'error') {
          this.result = resp.data
        } else {
          this.result = '哪儿输错了'
        }
      })
    }
  },
  components: {
    InputGroup,
    ResultPanel
  }
}
</script>

<style src="./w3.css"></style>
