import { ref } from "vue"
import { MenuItem } from "primevue/menuitem"
import useUsers from "./useUsers"
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
    // const redirectFiles = () => {
    //     router.push({
    //         path: FilesDatasourcesRoute.path
    //     })
    // }
    // const redirectReports = () => {
    //     router.push({
    //         path: ReportsRoute.path
    //     })
    // }

    const navBarRoutes = ref(new Array<MenuItem>(
        {
            label: 'Home', to: HomeRoute.path, icon: 'pi pi-fw pi-home',
        },
        {
            label: 'Admin', to: AdminRoutes.path, icon: 'pi pi-fw pi-shield',
            visible: () => isLoggedIn.value && isAdmin.value
        },
        {
            label: 'Organizations', to: "/user/1/organizations", icon: 'pi pi-fw pi-building',
            // visible: () => isLoggedIn.value
        },
        {
            label: 'My Reports', to: "/user/1/reports", icon: 'pi pi-fw pi-building',
            // visible: () => isLoggedIn.value
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

    const sideBarRoutes = ref<Array<MenuItem>>([
        {
            label: 'Admin',
            icon: 'pi pi-box',
            visible: () => isLoggedIn.value && isAdmin.value,
            items: [
                { 
                    label: 'Home', to: '/admin', icon: 'pi pi-fw pi-users',
                },
                {
                    label: 'Users', to: '/admin/users', icon: 'pi pi-fw pi-users',
                },
                {
                    label: 'Organizations', to: '/admin/organizations', icon: 'pi pi-fw pi-users',
                }
            ]
        },
        {
            label: 'My Organization',
            icon: 'pi pi-mobile',
            visible: () => isLoggedIn.value,
            items: [
                {
                    label: 'Members', to: '/organization/1/members', icon: 'pi pi-fw pi-users',
                },
                {
                    label: 'Datasources', to: '/organization/1/datasources', icon: 'pi pi-fw pi-list',
                },
                // {
                //     label: 'Files', to: FilesDatasourcesRoute.path, icon: 'pi pi-fw pi-file-excel',
                //     visible: () => isLoggedIn.value
                // },
                {
                    label: 'Reports', to: '/organization/1/reports', icon: 'pi pi-fw pi-list',
                },
                // {
                //     label: 'Visualizations', to: '/visualizations', icon: 'pi pi-fw pi-image',
                //     visible: () => isLoggedIn.value
                // },
                {
                    label: 'Analyzes', to: '/organization/1/analyzes', icon: 'pi pi-fw pi-check',
                },
                {
                    label: 'Settings', to: '/organization/1/settings', icon: 'pi pi-fw pi-cog',
                    visible: () => isLoggedIn.value // && (isOrganizationOwner.value || isOrganizationAdmin.value)
                },
            ]
        },
    ]);

    const breadCrumbRoutes = ref(new Array<MenuItem>(
        {
            label: 'Home', to: HomeRoute.path, icon: 'pi pi-fw pi-home',
        }
    ))
    return {
        navBarRoutes,
        sideBarRoutes,
        breadCrumbRoutes,
        redirectHome,
        redirectLogin,
        redirectRegister,
        // redirectFiles,
        // redirectReports,
    }
}
