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
    // const { currentMember, isOrganizationAdmin } = useOrganizationMembers()

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
    const getUserOrganizationsRoute = (orgId: number | undefined = undefined) => {
        // if (!orgId) {
        //     orgId = currentUser.value?.id
        // }
        return `/user/${orgId}/organizations`
        // return `/organization/${orgId}/`
    }
    const getOrganizationRoute = (orgId: number) => {
        return `/organization/${orgId}`
    }
    const getOrganizationMembersRoute = (orgId: number) => {
        return `/organization/${orgId}/members`
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
        getUserOrganizationsRoute,
        getAboutRoute,
        getLoginRoute,
        getRegisterRoute,
        getProfileRoute,
        getOrganizationRoute,
        getOrganizationMembersRoute,
        // redirectFiles,
        // redirectReports,
    }
}
