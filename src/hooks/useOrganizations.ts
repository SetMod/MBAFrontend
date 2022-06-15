import { reactive, ref, toRefs } from "vue";
import Organizations from "../models/OrganizationsModel";
import OrganizationsService from "../services/OrganizationsService";

interface OrganizationsState {
    organization: Organizations | undefined,
    organizations: Organizations[] | undefined
}

const state = reactive<OrganizationsState>({
    organization: undefined,
    organizations: undefined
})

export default function useOrganizations() {
    const organizationsService = reactive(new OrganizationsService())
    const isLoading = ref(false)
    // const isLoggedIn = computed(() => {
    //     const user = localStorage.getItem('user',)
    //     if (user) {
    //         const loggedUser = organizationsService.mapDataToUser(JSON.parse(user))
    //         state.user = loggedUser
    //     }
    //     return state.user === undefined ? false : true
    // })

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
        const response = await organizationsService.getOrganizations()
        if (Array.isArray(response)) state.organizations = response
        isLoading.value = false

        return response
    }

    const getUserById = async (userId: number) => {
        isLoading.value = true
        const response = await organizationsService.getOrganizationById(userId)
        if (response instanceof Organizations) {
            localStorage.setItem('organization', JSON.stringify(organizationsService.mapOrganizationToData(response)))
        }
        isLoading.value = false

        return response
    }

    const getUserOrganizations = async (userId: number) => {
        isLoading.value = true
        const response = await organizationsService.getUserOrganizations(userId)
        if (Array.isArray(response)) state.organizations = response
        isLoading.value = false

        return response
    }

    const createOrganization = async (newOrganization: Organizations) => {
        isLoading.value = true
        const response = await organizationsService.createOrganization(newOrganization)
        isLoading.value = false

        return response
    }

    const updateOrganization = async (updatedOrganization: Organizations) => {
        isLoading.value = true
        const response = await organizationsService.updateOrganization(updatedOrganization)
        isLoading.value = false

        return response
    }

    const deleteOrganization = async (organizationId: number) => {
        isLoading.value = true
        const response = await organizationsService.deleteOrganization(organizationId)
        isLoading.value = false

        return response
    }
    return {
        isLoading,
        resetOrganizations,
        resetOrganization,
        getUserById,
        getOrganizations,
        getUserOrganizations,
        createOrganization,
        updateOrganization,
        deleteOrganization,
        ...toRefs(state)
    }
}