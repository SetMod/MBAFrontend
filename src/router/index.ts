import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import About from '../views/About.vue'
// import Settings from '../views/Settings.vue'
import useUsers from '../hooks/useUsers'

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
  // component: () => import('../views/About.vue')
}
export const ProfileRoute: RouteRecordRaw = {
  path: '/profile',
  name: 'Profile',
  beforeEnter: (to, from) => isLoggedIn.value,
  component: Profile
}


import Users from "../views/Users/Users.vue"
import User from "../views/Users/User/User.vue"
import UserHome from "../views/Users/User/Home.vue"
import Reports from "../views/Reports/Reports.vue"
import Report from "../views/Reports/Report/Report.vue"
import ReportHome from "../views/Reports/Report/Home.vue"

import Organizations from "../views/Organizations/Organizations.vue"
import Organization from "../views/Organizations/Organization/Organization.vue"
import Settings from "../views/Organizations/Organization/Settings.vue"
import OrganizationHome from "../views/Organizations/Organization/Home.vue"
import Members from "../views/Members/Members.vue"
import Member from "../views/Members/Member/Member.vue"
import MemberHome from "../views/Members/Member/Home.vue"
import Datasources from "../views/Datasources/Datasources.vue"
import Datasource from "../views/Datasources/Datasource/Datasource.vue"
import DatasourceHome from "../views/Datasources/Datasource/Home.vue"
import Analyzes from "../views/Analyzes/Analyzes.vue"
import Analyze from "../views/Analyzes/Analyze/Analyze.vue"
import AnalyzeHome from "../views/Analyzes/Analyze/Home.vue"

export const UserRoutes: RouteRecordRaw = {
  path: "/user/:userId(\\d+)",
  component: User,
  children: [
    {
      path: '',
      component: UserHome,
    },
    {
      path: 'organizations',
      component: Organizations,
    },
    {
      path: 'reports',
      component: Reports,
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
    },
    {
      path: 'members',
      component: Members,
    },
    {
      path: 'member/:memberId',
      component: Member,
      children: [
        {
          path: '',
          component: MemberHome,
        }
      ]
    },
    {
      path: 'datasources',
      component: Datasources,
    },
    {
      path: 'datasource/:datasourceId',
      component: Datasource,
      children: [
        {
          path: '',
          component: DatasourceHome,
        }
      ]
    },
    {
      path: 'analyzes',
      component: Analyzes,
    },
    {
      path: 'analyze/:analyzeId',
      component: Analyze,
      children: [
        {
          path: '',
          component: AnalyzeHome,
        }
      ]
    },
    {
      path: 'reports',
      component: Reports,
    },
    {
      path: 'report/:reportId',
      component: Report,
      children: [
        {
          path: '',
          component: ReportHome,
        }
      ]
    },
    {
      path: 'settings',
      component: Settings
      // component: () => import('../views/About.vue')
    }
    // ... Organization members, datasources, reports, etc.
  ]
}

import Admin from '../views/Admin/Admin.vue'
import AdminHome from "../views/Admin/Home.vue"
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
      path: 'user/:id',
      component: User,
      children: UserRoutes.children
    },
    {
      path: 'organizations',
      component: Organizations
    },
    {
      path: 'organization/:id',
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


// export const AdminRoute: RouteRecordRaw = {
//   path: '/admin',
//   name: 'Admin',
//   beforeEnter: (to, from) => isLoggedIn.value && isAdmin.value,
//   component: Admin,
//   children: [
//     AdminHomeRoute,
//     AdminUsersRoute,
//     AdminUserRoute,
//     AdminOrganizationsRoute,
//   ]
// }
// export const MembersRoute: RouteRecordRaw = {
//   path: '/members',
//   name: 'Members',
//   component: Organizations,
//   children: [
//     {
//       path: ':id',
//       component: Organizations
//     }
//   ]
// }
// export const DatasourcesRoute: RouteRecordRaw = {
//   path: '/datasources',
//   name: 'Datasources',
//   beforeEnter: (to, from) => isLoggedIn.value,
//   component: Datasources,
//   // children: [
//   //   {
//   //     path: '/datasources/:id',
//   //     component: DatasourcesDataTable
//   //   }
//   // ]
// }
// export const FilesDatasourcesRoute: RouteRecordRaw = {
//   path: `/files`,
//   name: 'FilesDatasources',
//   beforeEnter: (to, from) => isLoggedIn.value,
//   component: Files,
// }
// export const ReportsRoute: RouteRecordRaw = {
//   path: '/reports',
//   name: 'Reports',
//   beforeEnter: (to, from) => isLoggedIn.value,
//   component: Reports
// }
// export const AnalyzeRoute: RouteRecordRaw = {
//   path: '/analyze',
//   name: 'Analyze',
//   beforeEnter: (to, from) => isLoggedIn.value,
//   component: Analyze
// }
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

// export const OrganizationsRoute: RouteRecordRaw = {
//   path: '/organizations',
//   name: 'Organizations',
//   component: Organizations,
//   // children: [
//   //   {
//   //     path: ':id',
//   //     component: Organizations,
//   //     children: [
//   //       MembersRoute,
//   //       DatasourcesRoute
//   //     ]
//   //   }
//   // ]
// }
// export const SettingsRoute: RouteRecordRaw = {
//   path: '/settings',
//   name: 'Settings',
//   component: Settings
//   // component: () => import('../views/About.vue')
// }

// export const routes: Array<RouteRecordRaw> = [
//   HomeRoute,
//   OrganizationsRoute,
//   MembersRoute,
//   AdminRoutes,
//   ProfileRoute,
//   DatasourcesRoute,
//   FilesDatasourcesRoute,
//   ReportsRoute,
//   AnalyzeRoute,
//   LoginRoute,
//   RegisterRoute,
//   AboutRoute,
//   SettingsRoute,
// ]
