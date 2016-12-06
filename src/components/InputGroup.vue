<template>
  <div class="w3-container">
    <div class="w3-half">
      <div class="w3-group w3-margin">
        <label class="w3-label">基金代码</label>
        <input :value="code" @input="changeCode($event.target.value)" class="w3-input" type="text">
      </div>
    </div>
    <div class="w3-half">
      <div class="w3-group w3-margin">
        <label class="w3-label">份额</label>
        <input :value="amount" @input="changeAmount($event.target.value)" class="w3-input" type="text">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'input_group',
    props: ['index', 'code', 'amount'],
    methods: {
      changeCode (newCode) {
        this.$emit('changeCode', this.index, newCode)
      },
      changeAmount (newAmount) {
        this.$emit('changeAmount', this.index, newAmount)
      }
    }
  }
</script>
