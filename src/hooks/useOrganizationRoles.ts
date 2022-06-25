import { reactive, ref, toRefs } from "vue"
import OrganizationRoles from "../models/OrganizationRolesModel"
import OrganizationRolesService from "../services/OrganizationRolesService"

interface OrganizationsRolesState {
    organizationRoles: OrganizationRoles[] | undefined
}

const state = reactive<OrganizationsRolesState>({
    organizationRoles: undefined
})

export default function useOrganizationRoles() {
    const organizationRolesService = reactive(new OrganizationRolesService())
    const isLoading = ref(false)

    const resetOrganizationRoles = () => {
        state.organizationRoles = undefined
    }

    const getOrganizationsRoles = async () => {
        isLoading.value = true
        const response = organizationRolesService.getAllOrganizationRoles()
        if (Array.isArray(response)) state.organizationRoles = response
        isLoading.value = true

        return response
    }
    return {
        resetOrganizationRoles,
        getOrganizationsRoles,
        ...toRefs(state)
    }
}