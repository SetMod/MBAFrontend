import { computed, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import Users from "../models/UsersModel";
import { userService } from "../services/UsersService";

interface UsersState {
    user: Users | undefined
    users: Users[] | undefined
}

const state = reactive<UsersState>({
    user: undefined,
    users: undefined,
})

export default function useUsers() {
    const router = useRouter()
    const isUsersLoading = ref(false)
    const isLoggedIn = computed(() => {
        return state.user === undefined ? false : true
    })
    const getUsers = () => {
        isUsersLoading.value = true
        userService.getUsers().then((users) => {
            if (users) state.users = users
        }).finally(() => isUsersLoading.value = false)
    }
    const getUser = (userId: number) => {
        isUsersLoading.value = true
        userService.getUserByID(userId).then((user) => {
            if (user instanceof String) alert(user)
            else if (user instanceof Users) state.user = user
            else alert('An unexpected error ocurred')
        }).finally(() => isUsersLoading.value = false)
    }

    const sigInUser = (userUsername: string, userPassword: string) => {
        userService.sigInUser(userUsername, userPassword).then((user) => {
            if (user) {
                state.user = user
                router.push({
                    path: '/'
                })
            }
        })
    }

    const signInRedirect = () => {
        router.push({
            path: '/signin'
        })
    }
    const signUpRedirect = () => {
        router.push({
            path: '/signup'
        })
    }

    const createUser = (newUser: Users) => {
        userService.createUser(newUser).then((createdUser) => {
            if (createdUser) {
                alert('User created successfully!')
                signInRedirect()
            } else {
                alert('Couldn\'t create an user!')
                return false
            }
        })
    }

    const updateUser = (userId: number, updatedUser: Users) => {
        userService.updateUser(userId, updatedUser).then((updatedUser) => {
            if (updatedUser instanceof String) alert(updatedUser)
            if (updatedUser instanceof Users) alert('User successfully updated!')
            else alert('An unexpected error ocurred')
        })
    }

    const deleteUser = (userId: number) => {
        const result = confirm('Delete user?')
        if (result) userService.deleteUser(userId).then((deletedUser) => {
            console.log(deletedUser);
        })
    }

    return {
        isLoggedIn,
        isUsersLoading,
        getUsers,
        getUser,
        createUser,
        deleteUser,
        sigInUser,
        signInRedirect,
        signUpRedirect,
        ...toRefs(state)
    }
}