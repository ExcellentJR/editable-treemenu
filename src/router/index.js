import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import cotalogue from '@/components/cotalogue'
import contextMenu from '@/components/contextMenu'

const index = r => require.ensure([], () => r(require('../page/index')), 'index')

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: index
    }]
})