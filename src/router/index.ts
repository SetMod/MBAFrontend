import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Files from '../views/Files.vue'
import Analyze from '../views/Analyze.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'
import About from '../views/About.vue'
import Reports from '../views/Reports.vue'
import useUsers from '../hooks/useUsers'

const { isAdmin, isLoggedIn } = useUsers()

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/files',
    name: 'Files',
    beforeEnter: (to, from) => isLoggedIn.value,
    component: Files
  },
  {
    path: '/reports',
    name: 'Reports',
    beforeEnter: (to, from) => isLoggedIn.value,
    component: Reports
  },
  {
    path: '/analyze',
    name: 'Analyze',
    beforeEnter: (to, from) => isLoggedIn.value,
    component: Analyze
  },
  // {
  //   path: '/visualizations',
  //   name: 'Visualizations',
  //   beforeEnter: (to, from) => isLoggedIn.value,
  //   component: () => import('../views/Visualizations.vue')
  // },
  {
    path: '/profile',
    name: 'Profile',
    beforeEnter: (to, from) => isLoggedIn.value,
    component: Profile
  },
  {
    path: '/admin',
    name: 'Admin',
    beforeEnter: (to, from) => isLoggedIn.value && isAdmin.value,
    component: Admin
  },
  {
    path: '/about',
    name: 'About',
    component: About
    // component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // beforeEnter: (to, from) => !isLoggedIn.value,
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    // beforeEnter: (to, from) => !isLoggedIn.value,
    component: Register
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
