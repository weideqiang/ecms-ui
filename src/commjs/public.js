export function checkAuth() {
  const curPath = this.$route.params.path
  const trxList = this.$store.getters.getUserTrxList
  // 判断是否有权限
  if (trxList.indexOf(curPath) === -1) {
    this.$message({
      showClose: true,
      message: '当前用户无此权限',
      type: 'warning'
    })
    this.$router.push('/Index')
  }
}
