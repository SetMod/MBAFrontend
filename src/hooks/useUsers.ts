import { computed, reactive, ref } from "vue";
import Users, { Roles } from "../models/UsersModel";
import { usersService } from "../services/UsersService";
import { setJWTToken, removeJWTToken } from "../utils/jwt"
import useCRUD from "./useCRUD";
import { getJWTToken } from "../utils/jwt"
import useState from "./useState";
import { email, maxLength, minLength, required, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useLocalStorage } from "./useLocalStorage";

const USER_STORAGE_KEY = "user"
const CURRENT_USER_STORAGE_KEY = "current_user"
const usersState = useState<Users>()
const {
    getFromLocalStorage,
    addToLocalStorage,
    removeFromLocalStorage
} = useLocalStorage(usersService, USER_STORAGE_KEY)
const currentUser = ref<Users | null>(getFromLocalStorage(CURRENT_USER_STORAGE_KEY))
const SELECTED_USER_STORAGE_KEY = "selected_organization"
const selectedUser = ref<Users | null>(getFromLocalStorage(SELECTED_USER_STORAGE_KEY))

const {
    error: usersError,
    isLoading: isUsersLoading,
    model: user,
    models: users,
    updatedModel: updatedUser,
    newModel: newUser,
    deletedModel: deletedUser,
    getAllModels: getUsers,
    getModelById: getUserById,
    getModelByField: getUserByField,
    getModelsByFields: getUsersByFields,
    createModel: createUser,
    updateModel: updateUser,
    deleteModel: deleteUser,
} = useCRUD(usersService, usersState)

export default function useUsers() {

    const isAdmin = computed(() => {
        return currentUser.value?.role.toLocaleLowerCase() == Roles.ADMIN.toLocaleLowerCase() ? true : false
    })
    const isLoggedIn = computed(() => {
        return currentUser.value && getJWTToken() ? true : false
    })

    const login = async (username: string, password: string) => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const res = await usersService.login(username, password)
            setJWTToken(res.access_token);

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
            const user = await usersService.whoAmI()
            currentUser.value = user
            addToLocalStorage(user, CURRENT_USER_STORAGE_KEY)

            return user
        } catch (err) {
            if (err instanceof Error) {
                console.error(err)
                usersError.value = err
                currentUser.value = null
                removeFromLocalStorage(CURRENT_USER_STORAGE_KEY)
            }
        } finally {
            isUsersLoading.value = false
        }
    }

    const logout = () => {
        currentUser.value = null
        removeJWTToken()
        removeFromLocalStorage(CURRENT_USER_STORAGE_KEY)
    }

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
        updatedUser,
        newUser,
        deletedUser,
        selectedUser,
        getUsers,
        getUserById,
        getUserByField,
        getUsersByFields,
        createUser,
        updateUser,
        deleteUser,
    }
}