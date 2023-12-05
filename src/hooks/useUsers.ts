import { computed, ref } from "vue";
import Users, { Roles } from "../models/UsersModel";
import UsersService, { usersService } from "../services/UsersService";
import { setJWTToken, removeJWTToken } from "../utils/jwt"
import useCRUD from "./useCRUD";
import { getJWTToken } from "../utils/jwt"
import useState from "./useState";
import Organizations from "../models/OrganizationsModel";

const USER_STORAGE_KEY = "user"
const currentUser = ref<Users | null>()
const userOrganizations = ref<Organizations[] | null>()
const usersState = useState<Users>()

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
    } = useCRUD(usersService, usersState, USER_STORAGE_KEY)

    // const isAdmin = ref(false)
    const isAdmin = computed(() => {
        const currentUser = getFromLocalStorage()
        return currentUser?.role.toLocaleLowerCase() == Roles.ADMIN.toLocaleLowerCase() ? true : false
    })

    // const isLoggedIn = ref(false)
    const isLoggedIn = computed(() => {
        return getJWTToken() ? true : false
    })

    const getOrganizations = async (id: number) => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const res = await usersService.getOrganizations(id)
            userOrganizations.value = res

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
            const res = await usersService.login(username, password)
            setJWTToken(res.access_token);

            const user = await usersService.whoAmI()
            addToLocalStorage(user)

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
            const res = await usersService.whoAmI()
            currentUser.value = res
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
            const res = await usersService.register(newUser)

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
        users,
        user,
        currentUser,
        userOrganizations,
        getOrganizations,
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