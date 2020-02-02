import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// import '../mock' // simulation data

import md5 from 'js-md5'
import echarts from 'echarts'
import touch from './utils/vueTouch'
import messageInfo from './utils/message'
import http from './commjs/httpAxios.js'
import userMngApi from './commjs/userMngApi.js'
import reportMngApi from './commjs/reportMngApi'
import workForceMngApi from './commjs/workForceMngApi'
import registerBookApi from './commjs/registerBookApi'
import hostExchangeApi from './commjs/hostExchangeApi'
import systemPublicApi from './commjs/systemPublicApi'
import warningMngApi from './commjs/warningMngApi'
import combo from './commjs/combo'
import tlTable from './module/Table'
import tlInput from './module/InputForm'
import accountManageApi from './commjs/accountManageApi'
import pbAuthInfoApi from './commjs/pbAuthInfoApi'
import 'babel-polyfill' // npm install --save babel-polyfill
import userStatisticsApi from './commjs/userStatisticsApi.js'
import examSystemMngApi from './commjs/examSystemMngApi.js'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'

Vue.use(FormMaking)
Vue.use(ElementUI)
Vue.use(touch)
Vue.use(messageInfo)
Vue.use(VXETable)
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$userMngApi = userMngApi
Vue.prototype.$reportMngApi = reportMngApi
Vue.prototype.$md5 = md5
Vue.prototype.$echarts = echarts
Vue.prototype.$workForceMngApi = workForceMngApi
Vue.prototype.$registerBookApi = registerBookApi
Vue.prototype.$pbAuthInfoApi = pbAuthInfoApi
Vue.prototype.pbAuthInfoApi = pbAuthInfoApi
Vue.prototype.$combo = combo
Vue.prototype.$hostExchangeApi = hostExchangeApi
Vue.prototype.$accountManageApi = accountManageApi
Vue.prototype.$userStatisticsApi = userStatisticsApi
Vue.prototype.$systemPublicApi = systemPublicApi
Vue.prototype.$warningMngApi = warningMngApi
Vue.prototype.$examSystemMngApi = examSystemMngApi
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
Vue.component('tl-table', tlTable)
Vue.component('tl-input', tlInput)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
