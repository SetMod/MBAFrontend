import { reactive, ref, toRefs } from "vue"
import Roles from "../models/RolesModel"
import Users from "../models/UsersModel";
import { rolesService } from "../services/RolesService";

interface RolesState {
    roles: Roles[] | undefined
}
const state = reactive<RolesState>({
    roles: undefined
})

export default function useRoles() {
    const isLoading = ref(false)

    const resetRoles = () => {
        state.roles = undefined
    }

    const getRoles = async () => {
        isLoading.value = true
        const response = await rolesService.getAll()
        if (Array.isArray(response)) state.roles = response
        isLoading.value = false

        return response
    }

    const getRoleById = async (roleId: number) => {
        isLoading.value = true
        const response = await rolesService.getById(roleId)
        isLoading.value = false

        return response
    }
    const getRoleByName = async (roleName: string) => {
        isLoading.value = true
        const response = await rolesService.getByField("name", roleName)
        isLoading.value = false

        return response
    }

    const createRole = async (newRole: Roles) => {
        isLoading.value = true
        const response = await rolesService.create(newRole)
        isLoading.value = false

        return response
    }

    const updateRole = async (updatedRole: Roles) => {
        isLoading.value = true
        const response = await rolesService.update(updatedRole.id, updatedRole)
        isLoading.value = false

        return response
    }

    const deleteRole = async (roleId: number) => {
        isLoading.value = true
        const response = await rolesService.delete(roleId)
        isLoading.value = false

        return response
    }

    const getUserRole = async (user: Users) => {
        await getRoles()

        if (!state.roles) return

        const role = state.roles.find((role) => role.id === user.roleId)
        return role ? role.name : 'User'
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