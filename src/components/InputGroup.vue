<template>
  <div :class="[{'w3-bottombar':!isLast}, 'w3-container', 'w3-border-blue']">
    <div class="w3-third">
      <div class="w3-group w3-margin">
        <label class="w3-label">基金名称</label>
        <p v-if="loading"><img src="../../static/spinner_squares.svg" style="width: 24px"></p>
        <p v-else>{{name}}</p>
      </div>
    </div>
    <div class="w3-third">
      <div class="w3-group w3-margin">
        <label class="w3-label">基金代码</label>
        <input :value="code" @input="changeCode($event.target.value)" class="w3-input" type="text">
      </div>
    </div>
    <div class="w3-third">
      <div class="w3-group w3-margin">
        <label class="w3-label">份额</label>
        <input :value="amount" @input="changeAmount($event.target.value)" class="w3-input" type="text">
      </div>
    </div>
  </div>
</template>

<script>
  import { getFundName } from '../service'
  export default {
    name: 'input_group',
    data () {
      return {
        name: '',
        loading: false
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

        // original code
        // axios.post('/api/get_fund_name', {fund: fundCode})
        // .then((resp) => {
        //   this.loading = false
        //   if (resp.data) {
        //     this.name = resp.data
        //   } else {
        //     this.name = 'Not Found'
        //   }
        // })
        // .catch((err) => {
        //   this.loading = false
        //   this.name = `Network Error: ${err}`
        // })
      }
    },
    created () {
      if (this.code.length === 6) {
        this._getFundName(this.code)
      }
    }
  }
</script>
