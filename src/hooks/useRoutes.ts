import { ref } from "vue"
import { MenuItem } from "primevue/menuitem"
import useUsers from "./useUsers"
import { useRouter } from "vue-router"
import {
    HomeRoute,
    LoginRoute,
    RegisterRoute,
    FilesDatasourcesRoute,
    ReportsRoute,
    AdminRoute,
    OrganizationsRoute,
    DatasourcesRoute,
    AboutRoute,
    ProfileRoute,
    MembersRoute,
    AnalyzeRoute,
    SettingsRoute
} from "../router"

export default function useRoutes() {
    const router = useRouter()
    const { isLoggedIn, isAdmin } = useUsers()

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
    const redirectFiles = () => {
        router.push({
            path: FilesDatasourcesRoute.path
        })
    }
    const redirectReports = () => {
        router.push({
            path: ReportsRoute.path
        })
    }

    const navBarRoutes = ref(new Array<MenuItem>(
        {
            label: 'Home', to: HomeRoute.path, icon: 'pi pi-fw pi-home',
        },
        {
            label: 'Admin', to: AdminRoute.path, icon: 'pi pi-fw pi-shield',
            visible: () => isLoggedIn.value && isAdmin.value
        },
        {
            label: 'My Organizations', to: OrganizationsRoute.path, icon: 'pi pi-fw pi-building',
        },
        {
            label: 'About', to: AboutRoute.path, icon: 'pi pi-fw pi-info-circle',
        },
        {
            label: 'Profile', to: ProfileRoute.path, icon: 'pi pi-fw pi-user',
            visible: () => isLoggedIn.value
        },
        {
            label: 'Login', to: LoginRoute.path, icon: 'pi pi-fw pi-sign-in',
            visible: () => !isLoggedIn.value
        },
        {
            label: 'Register', to: RegisterRoute.path, icon: 'pi pi-fw pi-check-square',
            visible: () => !isLoggedIn.value
        },
    ))

    const sideBarRoutes = ref(new Array<MenuItem>(
        {
            label: 'Members', to: MembersRoute.path, icon: 'pi pi-fw pi-users',
            visible: () => isLoggedIn.value
        },
        {
            label: 'Datasources', to: DatasourcesRoute.path, icon: 'pi pi-fw pi-list',
            visible: () => isLoggedIn.value
        },
        {
            label: 'Files', to: FilesDatasourcesRoute.path, icon: 'pi pi-fw pi-file-excel',
            visible: () => isLoggedIn.value
        },
        {
            label: 'Reports', to: ReportsRoute.path, icon: 'pi pi-fw pi-list',
            visible: () => isLoggedIn.value
        },
        // {
        //     label: 'Visualizations', to: '/visualizations', icon: 'pi pi-fw pi-image',
        //     visible: () => isLoggedIn.value
        // },
        {
            label: 'Analyze', to: AnalyzeRoute.path, icon: 'pi pi-fw pi-check',
            visible: () => isLoggedIn.value
        },

        {
            label: 'Settings', to: SettingsRoute.path, icon: 'pi pi-fw pi-cog',
            visible: () => isLoggedIn.value // && (isOrganizationOwner.value || isOrganizationAdmin.value)
        },
    ))


    const breadCrumbRoutes = ref(new Array<MenuItem>(
        {
            label: 'Home', to: HomeRoute.path, icon: 'pi pi-fw pi-home',
        },
        {
            label: 'Members', to: MembersRoute.path, icon: 'pi pi-fw pi-users',
            visible: () => isLoggedIn.value
        },
    ))
    return {
        navBarRoutes,
        sideBarRoutes,
        breadCrumbRoutes,
        redirectHome,
        redirectLogin,
        redirectRegister,
        redirectFiles,
        redirectReports,
    }
}
