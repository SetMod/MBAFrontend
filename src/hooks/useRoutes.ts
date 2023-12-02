import { ref } from "vue"
import { MenuItem } from "primevue/menuitem"
import useUsers from "./useUsers"
import { useRouter } from "vue-router"

export default function useRoutes() {
    const router = useRouter()
    const { isLoggedIn } = useUsers()

    const redirectHome = () => {
        router.push({
            path: '/'
        })
    }
    const redirectSignIn = () => {
        router.push({
            path: '/login'
        })
    }
    const redirectSignUp = () => {
        router.push({
            path: '/register'
        })
    }
    const redirectFiles = () => {
        router.push({
            path: '/files'
        })
    }
    const redirectReports = () => {
        router.push({
            path: '/reports'
        })
    }

    const navBarRoutes = ref(new Array<MenuItem>(
        {
            label: 'Home', to: '/', icon: 'pi pi-fw pi-home',
        },
        {
            label: 'Admin', to: '/admin', icon: 'pi pi-fw pi-shield'
            // visible: () => isLoggedIn.value // && isAdmin.value
        },
        {
            label: 'Organizations', to: '/organizations', icon: 'pi pi-fw pi-building',
        },
        {
            label: 'About', to: '/about', icon: 'pi pi-fw pi-info-circle',
        },
        {
            label: 'Profile', to: '/profile', icon: 'pi pi-fw pi-user',
            visible: () => isLoggedIn.value
        },
        {
            label: 'Login', to: '/login', icon: 'pi pi-fw pi-sign-in',
            visible: () => !isLoggedIn.value
        },
        {
            label: 'Logout', to: '/logout', icon: 'pi pi-fw pi-sign-out',
            visible: () => isLoggedIn.value
        },
        {
            label: 'Register', to: '/register', icon: 'pi pi-fw pi-check-square',
            visible: () => !isLoggedIn.value
        },
    ))

    const sideBarRoutes = ref(new Array<MenuItem>(
        {
            label: 'Members', to: '/Members', icon: 'pi pi-fw pi-users',
            // visible: () => isLoggedIn.value
        },
        {
            label: 'Datasources', to: '/datasources', icon: 'pi pi-fw pi-list',
            // visible: () => isLoggedIn.value
        },
        {
            label: 'Files', to: '/files', icon: 'pi pi-fw pi-file-excel',
            // visible: () => isLoggedIn.value
        },
        {
            label: 'Reports', to: '/reports', icon: 'pi pi-fw pi-list',
            // visible: () => isLoggedIn.value
        },
        // {
        //     label: 'Visualizations', to: '/visualizations', icon: 'pi pi-fw pi-image',
        //     visible: () => isLoggedIn.value
        // },
        {
            label: 'Analyze', to: '/analyze', icon: 'pi pi-fw pi-check',
            // visible: () => isLoggedIn.value
        },

        {
            label: 'Settings', to: '/settings', icon: 'pi pi-fw pi-cog'
            // visible: () => isLoggedIn.value // && (isOrganizationOwner.value || isOrganizationAdmin.value)
        },
    ))


    const breadCrumbRoutes = ref(new Array<MenuItem>(
        {
            label: 'Home', to: '/', icon: 'pi pi-fw pi-home',
        },
        {
            label: 'Members', to: '/Members', icon: 'pi pi-fw pi-users',
            // visible: () => isLoggedIn.value
        },
    ))
    return {
        navBarRoutes,
        sideBarRoutes,
        breadCrumbRoutes,
        redirectHome,
        redirectSignIn,
        redirectSignUp,
        redirectFiles,
        redirectReports,
    }
}
