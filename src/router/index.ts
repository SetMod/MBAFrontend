import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Files from '../views/Files.vue'
import Analyze from '../views/Analyze.vue'
import Profile from '../views/Profile.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Admin from '../views/Admin.vue'
import useUsers from '../hooks/useUsers'
import useRoles from '../hooks/useRoles'

const { getUserRole } = useRoles()
const { user, isLoggedIn } = useUsers()

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/files',
    name: 'Files',
    beforeEnter: (to, from) => {
      return isLoggedIn.value
    },
    component: Files
  },
  {
    path: '/analyze',
    name: 'Analyze',
    component: Analyze
  },
  {
    path: '/visualizations',
    name: 'Visualizations',
    component: () => import('../views/Visualizations.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    beforeEnter: (to, from) => {
      return isLoggedIn.value
    },
    component: Profile
  },
  {
    path: '/admin',
    name: 'Admin',
    beforeEnter: (to, from) => {
      return getUserRole(user.value) === 'Admin' && isLoggedIn.value ? true : false
    },
    component: Admin
  },
  {
    path: '/signin',
    name: 'Sign In',
    beforeEnter: (to, from) => {
      return !isLoggedIn.value
    },
    component: SignIn
  },
  {
    path: '/signup',
    name: 'Sign Un',
    beforeEnter: (to, from) => {
      return !isLoggedIn.value
    },
    component: SignUp
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
