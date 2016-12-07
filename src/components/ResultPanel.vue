<template>
  <div class="w3-container w3-indigo">
    <h3 v-if="loading">Result: <img style="width: 30px" src="../../static/spinner.svg" aria-hidden=true></h3>
    <h3 v-else>Result: {{result}}</h3>
  </div>
</template>

<script>
  export default {
    name: 'result_panel',
    props: ['result', 'loading']
  }
</script>
