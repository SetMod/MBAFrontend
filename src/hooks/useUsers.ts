import { computed } from "vue";
import Users, { Roles } from "../models/UsersModel";
import { userService } from "../services/UsersService";
import { setJWTToken, removeJWTToken } from "../utils/jwt"
import useCRUD from "./useCRUD";
import { getJWTToken } from "../utils/jwt"

const USER_STORAGE_KEY = "user"
export default function useUsers() {
    const {
        error: usersError,
        isLoading: isUsersLoading,
        model: user,
        models: users,
        updatedModel: updatedUser,
        newModel: newUser,
        deletedModel: deletedUser,
        getFromLocalStorage,
        addToLocalStorage,
        removeFromLocalStorage,
        getAllModels: getUsers,
        getModelById: getUserById,
        getModelByField: getUserByField,
        getModelsByFields: getUsersByFields,
        createModel: createUser,
        updateModel: updateUser,
        deleteModel: deleteUser,
    } = useCRUD(userService, USER_STORAGE_KEY)

    // const isAdmin = ref(false)
    const isAdmin = computed(() => {
        const currentUser = getFromLocalStorage()
        return currentUser?.role.toLocaleLowerCase() == Roles.ADMIN.toLocaleLowerCase() ? true : false
    })

    // const isLoggedIn = ref(false)
    const isLoggedIn = computed(() => {
        return getJWTToken() ? true : false
    })

    const login = async (username: string, password: string) => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const res = await userService.login(username, password)
            setJWTToken(res.access_token);

            const currentUser = await userService.whoAmI()
            user.value = currentUser
            addToLocalStorage(currentUser)

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

    const whoAmI = async () => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const res = await userService.whoAmI()
            user.value = res
            addToLocalStorage(res)

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
        removeJWTToken()
    }
    // const logout = async () => {
    //     isUsersLoading.value = true
    //     usersError.value = null
    //     try {
    //         resetUsers()
    //         removeJWTToken()
    //         const res = await userService.logout()

    //         return res
    //     } catch (err) {
    //         if (err instanceof Error) {
    //             console.error(err);
    //             usersError.value = err
    //         }
    //     } finally {
    //         isUsersLoading.value = false
    //     }
    // }

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

    return {
        isLoggedIn,
        isAdmin,
        register,
        login,
        whoAmI,
        logout,
        usersError,
        isUsersLoading,
        user,
        users,
        updatedUser,
        newUser,
        deletedUser,
        getFromLocalStorage,
        addToLocalStorage,
        removeFromLocalStorage,
        getUsers,
        getUserById,
        getUserByField,
        getUsersByFields,
        createUser,
        updateUser,
        deleteUser,
    }
}