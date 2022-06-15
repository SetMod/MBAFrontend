import { ref } from "vue"
import { MenuItem } from "primevue/menuitem"
import useUsers from "./useUsers"
import useRoles from "./useRoles"

export default function useNavBar() {
    const { user, isLoggedIn } = useUsers()
    const { getUserRole } = useRoles()

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
        },
        {
            label: 'Analyze', to: '/analyze', icon: 'pi pi-fw pi-check',
        },
        {
            label: 'Visualizations', to: '/visualizations', icon: 'pi pi-fw pi-image',
        },
        {
            label: 'Profile', to: '/profile', icon: 'pi pi-fw pi-user',
            visible: () => isLoggedIn.value
        },
        {
            label: 'Admin', to: '/admin',
            visible: () => {
                if (isLoggedIn.value && getUserRole(user.value) === 'Admin') return true
                else return false
            }
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