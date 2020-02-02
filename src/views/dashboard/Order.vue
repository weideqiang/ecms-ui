<template>
  <div class="dashboard-editor-container">
    <order-details/>
  </div>
</template>

<script>
import OrderDetails from './components/OrderDetails'

export default {
  name: 'Order',
  components: {
    OrderDetails
  },
  data() {
    return {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 16px;
    background-color: rgb(240, 242, 245);
    position: relative;
  }
</style>

