import { reactive, ref, toRefs } from "vue";
import Organizations from "../models/OrganizationsModel";
import OrganizationMembers from "../models/OrganizationMembersModel";
import OrganizationsService from "../services/OrganizationsService";

interface OrganizationsState {
    organization: Organizations | undefined,
    organizations: Organizations[] | undefined,
    organizationMembers: OrganizationMembers[] | undefined,
}

const state = reactive<OrganizationsState>({
    organization: undefined,
    organizations: undefined,
    organizationMembers: undefined,
})

export default function useOrganizations() {
    const organizationsService = reactive(new OrganizationsService())
    const isLoading = ref(false)

    const resetOrganizations = () => {
        state.organization = undefined
        state.organizations = undefined
        localStorage.removeItem('organization')
    }
    const resetOrganization = () => {
        state.organization = undefined
        localStorage.removeItem('organization')
    }

    const getOrganizations = async () => {
        isLoading.value = true
        const response = await organizationsService.getAll()
        if (Array.isArray(response)) state.organizations = response
        isLoading.value = false

        return response
    }

    const getOrganizationById = async (userId: number) => {
        isLoading.value = true
        const response = await organizationsService.getById(userId)
        if (response instanceof Organizations) {
            localStorage.setItem('organization', JSON.stringify(organizationsService.mapModelToJSON(response)))
        }
        isLoading.value = false

        return response
    }

    const getOrganizationMembers = async (userId: number) => {
        isLoading.value = true
        const response = await organizationsService.getOrganizationMembers(userId)
        if (Array.isArray(response)) state.organizationMembers = response
        isLoading.value = false

        return response
    }
    const addUserToOrganization = async (usersOrganization: OrganizationMembers) => {
        isLoading.value = true
        const response = await organizationsService.addUserToOrganization(usersOrganization)
        isLoading.value = false

        return response
    }
    const createOrganization = async (newOrganization: Organizations, userId: number) => {
        isLoading.value = true
        const response = await organizationsService.create(newOrganization, userId)
        isLoading.value = false

        return response
    }

    const updateOrganization = async (updatedOrganization: Organizations) => {
        isLoading.value = true
        const response = await organizationsService.update(updatedOrganization.id, updatedOrganization)
        isLoading.value = false

        return response
    }

    const deleteOrganization = async (organizationId: number) => {
        isLoading.value = true
        const response = await organizationsService.delete(organizationId)
        isLoading.value = false

        return response
    }
    const deleteUserFromOrganization = async (usersOrganization: OrganizationMembers) => {
        isLoading.value = true
        const response = await organizationsService.deleteUserFromOrganization(usersOrganization)
        isLoading.value = false

        return response
    }
    return {
        isOrganizationsLoading: isLoading,
        resetOrganizations,
        resetOrganization,
        getOrganizationById,
        getOrganizations,
        getOrganizationMembers,
        addUserToOrganization,
        createOrganization,
        updateOrganization,
        deleteOrganization,
        deleteUserFromOrganization,
        ...toRefs(state)
    }
}