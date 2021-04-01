import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/lazy_ant_design'
import './style/Base.scss'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')