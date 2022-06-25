import { ref } from "vue"
import { MenuItem } from "primevue/menuitem"
import useUsers from "./useUsers"

export default function useNavBar() {
    const { isAdmin, isLoggedIn } = useUsers()

    const items = ref(new Array<MenuItem>(
        {
            label: 'Home', to: '/', icon: 'pi pi-fw pi-home',
        },
        {
            label: 'Files', to: '/files', icon: 'pi pi-fw pi-file-excel',
            visible: () => isLoggedIn.value
        },
        {
            label: 'Reports', to: '/reports', icon: 'pi pi-fw pi-list',
            visible: () => isLoggedIn.value
        },
        {
            label: 'Analyze', to: '/analyze', icon: 'pi pi-fw pi-check',
            visible: () => isLoggedIn.value
        },
        // {
        //     label: 'Visualizations', to: '/visualizations', icon: 'pi pi-fw pi-image',
        //     visible: () => isLoggedIn.value
        // },
        {
            label: 'Profile', to: '/profile', icon: 'pi pi-fw pi-user',
            visible: () => isLoggedIn.value
        },
        {
            label: 'Admin', to: '/admin',
            visible: () => isLoggedIn.value && isAdmin.value
            // isLoggedIn.value && getUserRole(user.value) === 'Admin' ? true : false
        },
        {
            label: 'About', to: '/about', icon: 'pi pi-fw pi-info-circle',
        },
        {
            label: 'Sign In', to: '/signin', icon: 'pi pi-fw pi-sign-in',
            visible: () => !isLoggedIn.value
        },
        {
            label: 'Sign UP', to: '/signup', icon: 'pi pi-fw pi-check-square',
            visible: () => !isLoggedIn.value
        },
    ))
    return {
        items
    }
}