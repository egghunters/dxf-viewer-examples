import { createRouter, createWebHashHistory } from 'vue-router'
import DefaultExampleView from '../views/DefaultExampleView.vue'
import UploadDxfView from '../views/UploadDxfView.vue'
import ExampleView0 from '../views/ExampleView0.vue'
import ExampleView1 from '../views/ExampleView1.vue'
import ExampleView2 from '../views/ExampleView2.vue'

const routes = [
  {
    path: '/',
    name: '',
    alias: ['/upload_dxf'],
    component: UploadDxfView
  },
  {
    path: '/dxf_0',
    name: '',
    component: ExampleView0
  },
  {
    path: '/dxf_1',
    name: '',
    component: ExampleView1
  },
  {
    path: '/dxf_2',
    name: '',
    component: ExampleView2
  },
  {
    path: '/dxf_3',
    name: '',
    component: DefaultExampleView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
 
// const toPage = (url: string) => {
//   router.push(url)
// }

export default router
