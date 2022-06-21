import { computed, reactive, ref, toRefs } from "vue";
import Users from "../models/UsersModel";
import UsersService from "../services/UsersService";
import useRedirect from "./useRedirect";

interface UsersState {
    user: Users | undefined
    users: Users[] | undefined
}

const state = reactive<UsersState>({
    user: undefined,
    users: undefined,
})

export default function useUsers() {
    const { redirectHome, redirectSignIn } = useRedirect()
    const userService = reactive(new UsersService())
    const isLoading = ref(false)
    const isLoggedIn = computed(() => {
        const user = localStorage.getItem('user')
        if (user) {
            const loggedUser = userService.mapDataToUser(JSON.parse(user))
            state.user = loggedUser
        }
        return state.user === undefined ? false : true
    })
    const isAdmin = computed(() => state.user && state.user?.roleName === 'Admin' ? true : false)

    const getUsers = async () => {
        isLoading.value = true
        const response = await userService.getUsers()
        if (Array.isArray(response)) state.users = response
        isLoading.value = false

        return response
    }

    const getUserById = async (userId: number) => {
        isLoading.value = true
        const response = await userService.getUserById(userId)
        isLoading.value = false

        return response
    }

    const sigIn = async (userUsername: string, userPassword: string) => {
        isLoading.value = true
        const response = await userService.sigInUser(userUsername, userPassword)
        if (response instanceof Users) {
            state.user = response
            localStorage.setItem('user', JSON.stringify(userService.mapUserToData(response)))
            redirectHome()
        }
        isLoading.value = false

        return response
    }

    const resetUsers = () => {
        state.user = undefined
        localStorage.removeItem('user')
    }

    const signUp = async (newUser: Users) => {
        isLoading.value = true
        const response = await userService.createUser(newUser)
        if (response instanceof Users) {
            redirectSignIn()
        }
        isLoading.value = false

        return response
    }
    const updateUser = async (updatedUser: Users) => {
        // isLoading.value = true
        const response = await userService.updateUser(updatedUser)
        // isLoading.value = false

        return response
    }

    const deleteUser = async (userId: number) => {
        isLoading.value = true
        const response = await userService.deleteUser(userId)
        isLoading.value = false

        return response
    }

    return {
        isLoggedIn,
        isUsersLoading: isLoading,
        isAdmin,
        resetUsers,
        getUsers,
        getUserById,
        updateUser,
        deleteUser,
        signUp,
        sigIn,
        ...toRefs(state)
    }
}