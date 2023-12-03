import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Organizations from '../views/Organizations.vue'
import Datasources from '../views/Datasources.vue'
import DatasourcesDataTable from '../components/Datasources/DatasourcesDataTable.vue'
import Files from '../views/Files.vue'
import Analyze from '../views/Analyze.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'
import About from '../views/About.vue'
import Reports from '../views/Reports.vue'
import Settings from '../views/Settings.vue'
import useUsers from '../hooks/useUsers'

const { isAdmin, isLoggedIn } = useUsers()

export const HomeRoute: RouteRecordRaw = {
  path: '/',
  name: 'Home',
  component: Home
}
export const AdminRoute: RouteRecordRaw = {
  path: '/admin',
  name: 'Admin',
  beforeEnter: (to, from) => isLoggedIn.value && isAdmin.value,
  component: Admin
}
export const ProfileRoute: RouteRecordRaw = {
  path: '/profile',
  name: 'Profile',
  beforeEnter: (to, from) => isLoggedIn.value,
  component: Profile
}
export const MembersRoute: RouteRecordRaw = {
  path: '/members',
  name: 'Members',
  component: Organizations,
  children: [
    {
      path: ':id',
      component: Organizations
    }
  ]
}
export const DatasourcesRoute: RouteRecordRaw = {
  path: '/datasources',
  name: 'Datasources',
  beforeEnter: (to, from) => isLoggedIn.value,
  component: Datasources,
  // children: [
  //   {
  //     path: '/datasources/:id',
  //     component: DatasourcesDataTable
  //   }
  // ]
}
export const FilesDatasourcesRoute: RouteRecordRaw = {
  path: `/files`,
  name: 'FilesDatasources',
  beforeEnter: (to, from) => isLoggedIn.value,
  component: Files,
}
export const ReportsRoute: RouteRecordRaw = {
  path: '/reports',
  name: 'Reports',
  beforeEnter: (to, from) => isLoggedIn.value,
  component: Reports
}
export const AnalyzeRoute: RouteRecordRaw = {
  path: '/analyze',
  name: 'Analyze',
  beforeEnter: (to, from) => isLoggedIn.value,
  component: Analyze
}
// export const VisualizationsRoute: RouteRecordRaw = {
//   path: '/visualizations',
//   name: 'Visualizations',
//   beforeEnter: (to, from) => isLoggedIn.value,
//   component: () => import('../views/Visualizations.vue')
// }
// export const ChartsRoute: RouteRecordRaw = {
//   path: '/charts',
//   name: 'Charts',
//   beforeEnter: (to, from) => isLoggedIn.value,
//   component: () => import('../views/Visualizations.vue')
// }
export const OrganizationsRoute: RouteRecordRaw = {
  path: '/organizations',
  name: 'Organizations',
  component: Organizations,
  // children: [
  //   {
  //     path: ':id',
  //     component: Organizations,
  //     children: [
  //       MembersRoute,
  //       DatasourcesRoute
  //     ]
  //   }
  // ]
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
  // component: () => import('../views/About.vue')
}
export const SettingsRoute: RouteRecordRaw = {
  path: '/settings',
  name: 'Settings',
  component: Settings
  // component: () => import('../views/About.vue')
}

export const routes: Array<RouteRecordRaw> = [
  HomeRoute,
  OrganizationsRoute,
  MembersRoute,
  AdminRoute,
  ProfileRoute,
  DatasourcesRoute,
  FilesDatasourcesRoute,
  ReportsRoute,
  AnalyzeRoute,
  LoginRoute,
  RegisterRoute,
  AboutRoute,
  SettingsRoute,
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
