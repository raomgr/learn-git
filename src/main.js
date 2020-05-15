import 'babel-polyfill'
import Vue from 'vue'
import Element from 'element-ui'
import scroll from 'vue-seamless-scroll'
import Icon from 'vue-svg-icon/Icon.vue'
import '@/theme/element-#17CAAA/index.css'
import '@/assets/styl/index.styl'
import '@/assets/iconfont/iconfont.css'

import App from '@/App'
import { router } from '@/router'
import '@/router/routerControl'
// import '@/assets/styl/iconfont.css'
import store from '@/store'
import 'normalize.css'
import Api from '@/api'
import i18n from '@/lang'

Vue.component('icon', Icon)

Vue.use(scroll)
Vue.use(Element, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.prototype.$request = Api


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
