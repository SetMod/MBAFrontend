import { computed } from "vue"
import { MenuItem } from "primevue/menuitem"
import { useRouter } from "vue-router"
import {
    HomeRoute,
    LoginRoute,
    RegisterRoute,
    AdminRoutes,
    AboutRoute,
    ProfileRoute,
} from "../router"

export default function useRoutes() {
    const router = useRouter()
    // const { isLoggedIn, isAdmin, currentUser } = useUsers()
    // const { selectedOrganization } = useOrganizations()
    // const { currentMember, isOrganizationAdmin } = useMembers()

    const getHomeRoute = () => {
        return HomeRoute.path
    }
    const getAdminRoute = () => {
        return AdminRoutes.path
    }
    const redirectHome = () => {
        router.push({
            path: HomeRoute.path
        })
    }
    const redirectLogin = () => {
        router.push({
            path: LoginRoute.path
        })
    }
    const redirectRegister = () => {
        router.push({
            path: RegisterRoute.path
        })
    }

    const getAboutRoute = () => {
        return AboutRoute.path
    }
    const getLoginRoute = () => {
        return LoginRoute.path
    }
    const getRegisterRoute = () => {
        return RegisterRoute.path
    }
    const getProfileRoute = () => {
        return ProfileRoute.path
    }
    const getUserRoute = (userId: number | string) => {
        return `/user/${userId}`
    }
    const getUserOrganizationsRoute = (orgId: number) => {
        return `/user/${orgId}/organizations`
    }
    const getUserMembershipsRoute = (orgId: number) => {
        return `/user/${orgId}/memberships`
    }

    const getOrganizationRoute = (orgId: number) => {
        return `/organization/${orgId}`
    }
    const getOrganizationMembersRoute = (orgId: number) => {
        return `/organization/${orgId}/members`
    }
    const getOrganizationMemberRoute = (orgId: number, memberId: number) => {
        return `/organization/${orgId}/member/${memberId}`
    }
    const getOrganizationDatasourcesRoute = (orgId: number) => {
        return `/organization/${orgId}/datasources`
    }
    const getOrganizationDatasourceRoute = (orgId: number, datasourceId: number) => {
        return `/organization/${orgId}/datasource/${datasourceId}`
    }
    const getOrganizationReportsRoute = (orgId: number) => {
        return `/organization/${orgId}/reports`
    }
    const getReportRoute = (orgId: number, reportId: number) => {
        return `/organization/${orgId}/report/${reportId}`
    }
    const getReportCreateRoute = (orgId: number) => {
        return `/organization/${orgId}/report/create`
    }
    const getOrganizationAnalyzesRoute = (orgId: number) => {
        return `/organization/${orgId}/analyzes`
    }
    const getOrganizationAnalyzeRoute = (orgId: number, analyzeId: number) => {
        return `/organization/${orgId}/analyze/${analyzeId}`
    }
    const getOrganizationSettingsRoute = (orgId: number) => {
        return `/organization/${orgId}/settings`
    }

    const breadCrumbItems = computed(() => {
        return new Array<MenuItem>(
            {
                label: 'Home', route: HomeRoute.path, icon: 'pi pi-fw pi-home',
            }
        )
    })

    return {
        getHomeRoute,
        getAdminRoute,
        // navBarItems,
        // sideBarItems,
        breadCrumbItems,
        redirectHome,
        redirectLogin,
        redirectRegister,
        getUserRoute,
        getUserMembershipsRoute,
        getOrganizationReportsRoute,
        getOrganizationDatasourcesRoute,
        getOrganizationAnalyzesRoute,
        getOrganizationDatasourceRoute,
        getOrganizationSettingsRoute,
        getOrganizationMemberRoute,
        getUserOrganizationsRoute,
        getOrganizationAnalyzeRoute,
        getAboutRoute,
        getLoginRoute,
        getReportRoute,
        getReportCreateRoute,
        getRegisterRoute,
        getProfileRoute,
        getOrganizationRoute,
        getOrganizationMembersRoute,
        // redirectFiles,
        // redirectReports,
    }
}
