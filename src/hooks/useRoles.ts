import { reactive, ref, toRefs } from "vue"
import Roles from "../models/RolesModel"
import Users from "../models/UsersModel";
import RolesService from "../services/RolesService";

interface RolesState {
    roles: Roles[] | undefined
}
const state = reactive<RolesState>({
    roles: undefined
})

export default function useRoles() {
    const rolesService = reactive(new RolesService())
    const isLoading = ref(false)

    const resetRoles = () => {
        state.roles = undefined
    }

    const getRoles = async () => {
        isLoading.value = true
        const response = await rolesService.getRoles()
        if (Array.isArray(response)) state.roles = response
        isLoading.value = false

        return response
    }

    const getRoleById = async (roleId: number) => {
        isLoading.value = true
        const response = await rolesService.getRoleById(roleId)
        isLoading.value = false

        return response
    }

    const updateRole = async (updatedRole: Roles) => {
        isLoading.value = true
        const response = await rolesService.updateRole(updatedRole)
        isLoading.value = false

        return response
    }

    const deleteRole = async (roleId: number) => {
        const result = confirm('Delete role?')
        if (result == false) return
        isLoading.value = true
        const response = await rolesService.deleteRole(roleId)
        isLoading.value = false

        return response
    }

    const getUserRole = (user: Users | undefined) => {
        if (Array.isArray(state.roles) && user instanceof Users)
            return state.roles.find((role) => role.roleId === user.roleId)?.roleName
        else return 'User'
    }

    return {
        getRoles,
        getRoleById,
        updateRole,
        deleteRole,
        getUserRole,
        resetRoles,
        isRolesLoading: isLoading,
        ...toRefs(state)
    }
}