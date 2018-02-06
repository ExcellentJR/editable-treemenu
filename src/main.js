// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue/dist/vue.common.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes.js'
import { Modal, Message } from 'iview'

Vue.use(VueRouter)
    // Vue.component('Message', Message);
Vue.component('Modal', Modal);
Vue.config.productionTip = false
Vue.prototype.$Message = Message
    /* eslint-disable no-new */
    // Routing logic
var router = new VueRouter({
    routes: routes
})

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})