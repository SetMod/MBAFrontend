import { RouteRecordRaw } from "vue-router"
import Members from './views/Members.vue'
import Member from './views/Member.vue'
import MemberHome from './views/MemberHome.vue'

export const UserMembershipsRoute = {
    path: 'memberships',
    component: () => Members,
    props: true,
}

export const OrganizationMembersRoute: RouteRecordRaw = {
    path: 'members',
    component: Members,
    props: true,
}

export const OrganizationMemberRoutes: RouteRecordRaw = {
    path: 'member/:memberId',
    component: Member,
    children: [
        {
            path: '',
            component: MemberHome,
            props: true,
        }
    ]
}

export default {
    UserMembershipsRoute,
    OrganizationMembersRoute,
    OrganizationMemberRoutes,
}