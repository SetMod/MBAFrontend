import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import About from './views/About.vue'

import Users from "./modules/Users/views/Users.vue"

import Organizations from "./modules/Organizations/views/Organizations.vue"

import Admin from './views/Admin/Admin.vue'
import AdminHome from "./views/Admin/AdminHome.vue"

import useUsers from './hooks/useUsers'

const { isAdmin, isLoggedIn } = useUsers()

export const HomeRoute: RouteRecordRaw = {
  path: '/',
  name: 'Home',
  component: Home
}
export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  // beforeEnter: (to, from) => !isLoggedIn.value,
  component: Login
}
export const RegisterRoute: RouteRecordRaw = {
  path: '/register',
  name: 'Register',
  // beforeEnter: (to, from) => !isLoggedIn.value,
  component: Register
}
export const AboutRoute: RouteRecordRaw = {
  path: '/about',
  name: 'About',
  component: About
  // component: () => import('./views/About.vue')
}
export const ProfileRoute: RouteRecordRaw = {
  path: '/profile',
  name: 'Profile',
  beforeEnter: (to, from) => isLoggedIn.value,
  component: Profile
}


export const AdminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'Admin',
  beforeEnter: (to, from) => isLoggedIn.value && isAdmin.value,
  component: Admin,
  children: [
    {
      path: '',
      component: AdminHome
    },
    {
      path: 'users',
      component: Users,
    },
    {
      path: 'organizations',
      component: Organizations
    },
  ]
}

import UserModule from './modules/Users'
import OrganizationModule from './modules/Organizations'
export const routes: Array<RouteRecordRaw> = [
  HomeRoute,
  UserModule.UserRoutes.UserRoutes,
  OrganizationModule.OrganizationRoutes.OrganizationRoutes,
  AdminRoutes,
  ProfileRoute,
  LoginRoute,
  RegisterRoute,
  AboutRoute,
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
