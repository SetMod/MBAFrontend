import { RouteRecordRaw } from "vue-router"
import User from "./views/User.vue"
import UserHome from "./views/UserHome.vue"
import MembersModule from '../Members'
import OrganizationsModule from '../Organizations'

export const UserRoutes: RouteRecordRaw = {
    path: "/user/:userId(\\d+)",
    component: User,
    children: [
        {
            path: '',
            component: UserHome,
            props: true,
        },
        MembersModule.MemberRoutes.UserMembershipsRoute,
        OrganizationsModule.OrganizationRoutes.UserOrganizationsRoute
        // {
        //     path: 'organizations',
        //     component: Organizations,
        //     props: true,
        // },
        // {
        //     path: 'memberships',
        //     component: () => Members,
        //     props: true,
        // },
        // {
        //     path: 'reports',
        //     component: Reports,
        //     props: true,
        // },
    ]
}

export default {
    UserRoutes,
}
