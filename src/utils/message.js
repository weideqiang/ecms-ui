exports.install = function(Vue, option) {
  Vue.prototype.messageWarning = function(message) {
    this.$message({
      showClose: true,
      center: true,
      message: message,
      type: 'warning',
      duration: '50000'
    })
  }
  Vue.prototype.messageError = function(message) {
    this.$message({
      showClose: true,
      center: true,
      message: message,
      type: 'error',
      duration: '50000'
    })
  }
  Vue.prototype.messageInfo = function(message) {
    this.$message({
      showClose: true,
      center: true,
      message: message,
      type: 'info',
      duration: '50000'
    })
  }
  Vue.prototype.messageSuccess = function(message) {
    this.$message({
      showClose: true,
      center: true,
      message: message,
      type: 'success',
      duration: '50000'
    })
  }
}

