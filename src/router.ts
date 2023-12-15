import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import About from './views/About.vue'

import Users from "./views/Users/Users.vue"
import User from "./views/Users/User/User.vue"
import UserHome from "./views/Users/User/UserHome.vue"

import Reports from "./views/Reports/Reports.vue"
import Report from "./views/Reports/Report/Report.vue"
import ReportHome from "./views/Reports/Report/ReportHome.vue"

import Organizations from "./views/Organizations/Organizations.vue"
import Organization from "./views/Organizations/Organization/Organization.vue"
import OrganizationSettings from "./views/Organizations/Organization/OrganizationSettings.vue"
import OrganizationHome from "./views/Organizations/Organization/OrganizationHome.vue"

import Members from "./views/Members/Members.vue"
import Member from "./views/Members/Member/Member.vue"
import MemberHome from "./views/Members/Member/MemberHome.vue"

import Datasources from "./views/Datasources/Datasources.vue"
import Datasource from "./views/Datasources/Datasource/Datasource.vue"
import DatasourceHome from "./views/Datasources/Datasource/DatasourceHome.vue"

import Analyzes from "./views/Analyzes/Analyzes.vue"
import Analyze from "./views/Analyzes/Analyze/Analyze.vue"
import AnalyzeHome from "./views/Analyzes/Analyze/AnalyzeHome.vue"

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


export const UserRoutes: RouteRecordRaw = {
  path: "/user/:userId(\\d+)",
  component: User,
  children: [
    {
      path: '',
      component: UserHome,
      props: true,
    },
    {
      path: 'organizations',
      component: Organizations,
      props: true,
    },
    {
      path: 'memberships',
      component: () => Members,
      props: true,
    },
    {
      path: 'reports',
      component: Reports,
      props: true,
    },
  ]
}


export const OrganizationRoutes: RouteRecordRaw = {
  path: "/organization/:orgId",
  component: Organization,
  children: [
    {
      path: '',
      component: OrganizationHome,
      props: true,
    },
    {
      path: 'members',
      component: Members,
      props: true,
    },
    {
      path: 'member/:memberId',
      component: Member,
      children: [
        {
          path: '',
          component: MemberHome,
          props: true,
        }
      ]
    },
    {
      path: 'datasources',
      component: Datasources,
      props: true,
    },
    {
      path: 'datasource/:datasourceId',
      component: Datasource,
      children: [
        {
          path: '',
          component: DatasourceHome,
          props: true,
        }
      ]
    },
    {
      path: 'analyzes',
      component: Analyzes,
      props: true,
    },
    {
      path: 'analyze/:analyzeId',
      component: Analyze,
      children: [
        {
          path: '',
          component: AnalyzeHome,
          props: true,
        }
      ]
    },
    {
      path: 'reports',
      component: Reports,
      props: true,
    },
    {
      path: 'report/:reportId',
      component: Report,
      children: [
        {
          path: '',
          component: ReportHome,
          props: true,
        }
      ]
    },
    {
      path: 'settings',
      component: OrganizationSettings,
      props: true,
      // component: () => import('./views/About.vue')
    }
    // ... Organization members, datasources, reports, etc.
  ]
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
      path: 'user/:userId',
      component: User,
      children: UserRoutes.children
    },
    {
      path: 'organizations',
      component: Organizations
    },
    {
      path: 'organization/:orgId',
      component: Organization,
      children: OrganizationRoutes.children
    },
  ]
}

export const routes: Array<RouteRecordRaw> = [
  HomeRoute,
  UserRoutes,
  OrganizationRoutes,
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
