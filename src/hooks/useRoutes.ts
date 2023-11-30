import { ref } from "vue"
import { MenuItem } from "primevue/menuitem"

export default function useRoutes() {
    const navBarRoutes = ref(new Array<MenuItem>(
        {
            label: 'Home', to: '/', icon: 'pi pi-fw pi-home',
        },
        {
            label: 'About', to: '/about', icon: 'pi pi-fw pi-info-circle',
        },
        {
            label: 'Sign In', to: '/signin', icon: 'pi pi-fw pi-sign-in',
            // visible: () => !isLoggedIn.value
        },
        {
            label: 'Sign UP', to: '/signup', icon: 'pi pi-fw pi-check-square',
            // visible: () => !isLoggedIn.value
        },
    ))

    const sideBarRoutes = ref(new Array<MenuItem>(
        {
            label: 'Datasources', to: '/datasources', icon: 'pi pi-fw pi-list',
        },
        {
            label: 'Reports', to: '/reports', icon: 'pi pi-fw pi-list',
        },
        {
            label: 'Analyze', to: '/analyze', icon: 'pi pi-fw pi-check',
        },
        {
            label: 'Profile', to: '/profile', icon: 'pi pi-fw pi-user',
        },
        {
            label: 'Admin', to: '/admin',
            // visible: () => isAdmin.value && getUserRole(user.value) === 'Admin' ? true : false
        },
    ))


    return {
        navBarRoutes,
        sideBarRoutes,
    }
}
