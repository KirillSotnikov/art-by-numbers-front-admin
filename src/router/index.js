import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

const marketLink = process.env.VUE_APP_MARKET_LINK;

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/products',
    component: Layout,
    name: 'Products',
    meta: { title: 'Products', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/table/products-list'),
        meta: { title: 'Products list', icon: 'table' }
      },
      {
        path: 'list?create=true',
        name: 'Create',
        component: () => import('@/views/table/products-list'),
        meta: { title: 'Create product', icon: 'tree' }
      }
    ]
  },

  {
    path: '/testimonials',
    component: Layout,
    name: 'Testimonials',
    meta: { title: 'Testimonials', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/table/testimonials-list'),
        meta: { title: 'Testimonials list', icon: 'table' }
      },
    ]
  },

  {
    path: '/orders',
    component: Layout,
    name: 'Orders',
    meta: { title: 'Orders', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/table/orders-list'),
        meta: { title: 'Orders list', icon: 'table' }
      },
    ]
  },

  {
    path: '/client-works',
    component: Layout,
    name: 'Client works',
    meta: { title: 'Client works', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/table/client-works-list'),
        meta: { title: 'Client works list', icon: 'table' }
      },
      {
        path: 'list?create=true',
        name: 'Create',
        component: () => import('@/views/table/client-works-list'),
        meta: { title: 'Create client work', icon: 'tree' }
      }
    ]
  },

  ...(marketLink ? [{
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: process.env.VUE_APP_MARKET_LINK,
        meta: { title: 'To market', icon: 'link' }
      }
    ]
  }] : []),

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history',
  base: '/admin-panel/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
