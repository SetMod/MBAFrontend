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
    const getRoleByName = async (roleName: string) => {
        isLoading.value = true
        const response = await rolesService.getRoleByName(roleName)
        isLoading.value = false

        return response
    }

    const createRole = async (newRole: Roles) => {
        isLoading.value = true
        const response = await rolesService.createRole(newRole)
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
        isLoading.value = true
        const response = await rolesService.deleteRole(roleId)
        isLoading.value = false

        return response
    }

    const getUserRole = async (user: Users) => {
        await getRoles()

        if (!state.roles) return

        const role = state.roles.find((role) => role.roleId === user.roleId)
        return role ? role.roleName : 'User'
    }

    return {
        getRoles,
        getRoleById,
        getRoleByName,
        createRole,
        updateRole,
        deleteRole,
        getUserRole,
        resetRoles,
        isRolesLoading: isLoading,
        ...toRefs(state)
    }
}