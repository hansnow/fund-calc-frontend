<template>
  <div class="w3-container w3-indigo">
    <h3>Result: {{result}}</h3>
  </div>
</template>

<script>
  export default {
    name: 'result_panel',
    props: ['result']
  }
</script>
