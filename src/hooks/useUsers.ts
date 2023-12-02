import { computed, reactive, ref, toRefs } from "vue";
import Users from "../models/UsersModel";
import { userService } from "../services/UsersService";
import { accessTokenKey } from "../config";

interface UsersState {
    user: Users | null
    users: Users[] | null
}

const usersState = reactive<UsersState>({
    user: null,
    users: null,
})

export default function useUsers() {
    const usersError = ref<Error | null>(null)
    const isUsersLoading = ref(false)
    const isAdmin = ref(false)
    const userKey = "user"

    // const isLoggedIn = ref(false)
    const isLoggedIn = computed(() => {
        const accessKey = localStorage.getItem(accessTokenKey)
        return accessKey ? true : false
    })

    const isUserLoggedIn = computed(() => {
        const user = localStorage.getItem(userKey)
        if (!user) return false

        const loggedUser = userService.mapJSONToModel(JSON.parse(user))
        usersState.user = loggedUser

        return true
    })

    const resetUsers = () => {
        usersState.user = null
        usersState.users = null
        localStorage.removeItem(userKey)
    }

    const getUsers = async () => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const res = await userService.getAll()
            usersState.users = res

            return res
        } catch (err) {
            if (err instanceof Error) {
                usersError.value = err
            }
        } finally {

            isUsersLoading.value = false
        }

    }

    const getUserById = async (userId: number) => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const res = await userService.getById(userId)

            return res
        } catch (err) {
            if (err instanceof Error) {
                usersError.value = err
            }
        } finally {

            isUsersLoading.value = false
        }

    }

    const login = async (username: string, password: string) => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const res = await userService.login(username, password)

            const user = await userService.whoAmI()
            if (user instanceof Users) {
                usersState.user = user
                localStorage.setItem(userKey, JSON.stringify(userService.mapModelToJSON(user)))
            }

            return res
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                usersError.value = err
            }
        } finally {
            isUsersLoading.value = false
        }
    }
    const logout = async () => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const res = await userService.logout()

            return res
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                usersError.value = err
            }
        } finally {
            isUsersLoading.value = false
        }
    }

    const createUser = async (newUser: Users) => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const res = await userService.create(newUser)

            return res
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                usersError.value = err
            }
        } finally {
            isUsersLoading.value = false
        }
    }

    const register = async (newUser: Users) => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const res = await userService.create(newUser)

            return res
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                usersError.value = err
            }
        } finally {
            isUsersLoading.value = false
        }
    }

    const updateUser = async (updatedUser: Users) => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const res = await userService.update(updatedUser.id, updatedUser)
            // state.user = res
            // localStorage.setItem(userKey, JSON.stringify(res))

            return res
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                usersError.value = err
            }
        } finally {
            isUsersLoading.value = false
        }
    }

    const deleteUser = async (userId: number) => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const res = await userService.delete(userId)

            return res
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                usersError.value = err
            }
        } finally {
            isUsersLoading.value = false
        }

    }

    return {
        isLoggedIn,
        isAdmin,
        isUsersLoading,
        usersError,
        resetUsers,
        getUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
        register,
        login,
        logout,
        ...toRefs(usersState)
    }
}