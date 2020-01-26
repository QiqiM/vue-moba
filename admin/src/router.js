import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'main',
            component: Main,
            children: [
                { path: '/categories/create', component: CategoryEdit },
                { path: '/categories/list', component: CategoryList },
                { path: '/categories/edit/:id', component: CategoryEdit, props: true }
            ]
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})