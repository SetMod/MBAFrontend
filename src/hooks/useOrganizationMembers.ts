import { computed, ref } from "vue";
import OrganizationMembers, { OrganizationRoles } from "../models/OrganizationMembersModel";
import { organizationMembersService } from "../services/OrganizationMembersService";
import useCRUD from "./useCRUD";
import useState from "./useState";

const MEMBER_STORAGE_KEY = "member"
const membersState = useState<OrganizationMembers>()

const {
    error: organizationMembersError,
    isLoading: isOrganizationMembersLoading,
    model: organizationMember,
    models: organizationMembers,
    updatedModel: updatedOrganizationMember,
    newModel: newOrganizationMember,
    deletedModel: deletedOrganizationMember,
    getFromLocalStorage,
    addToLocalStorage,
    removeFromLocalStorage,
    getAllModels: getOrganizationMembers,
    getModelById: getOrganizationMemberById,
    getModelByField: getOrganizationMemberByField,
    getModelsByFields: getOrganizationMembersByFields,
    createModel: createOrganizationMember,
    updateModel: updateOrganizationMember,
    deleteModel: deleteOrganizationMember,
} = useCRUD(organizationMembersService, membersState, MEMBER_STORAGE_KEY)

const CURRENT_MEMBER_STORAGE_KEY = "current_member"
const currentMember = ref<OrganizationMembers | null>(getFromLocalStorage(CURRENT_MEMBER_STORAGE_KEY))
const userMemberships = ref<OrganizationMembers[] | null>()

export default function useOrganizationMembers() {
    const isOrganizationOwner = computed(() => {
        return currentMember.value?.role.toLowerCase() == OrganizationRoles.OWNER.toLowerCase()
    })
    const isOrganizationAdmin = computed(() => {
        return currentMember.value?.role.toLowerCase() == OrganizationRoles.ADMIN.toLowerCase()
    })

    const getMemberByOrgAndUserIDs = async (orgId: number, userId: number) => {
        isOrganizationMembersLoading.value = true
        organizationMembersError.value = null
        try {
            const fields = { user_id: userId, organization_id: orgId }
            const member = await organizationMembersService.getByFields(fields, false)

            if (member instanceof OrganizationMembers) {
                currentMember.value = member
                addToLocalStorage(member, CURRENT_MEMBER_STORAGE_KEY)
            }

            return member
        } catch (err) {
            if (err instanceof Error) {
                organizationMembersError.value = err
                currentMember.value = null
                removeFromLocalStorage(CURRENT_MEMBER_STORAGE_KEY)
            }
        } finally {
            isOrganizationMembersLoading.value = false
        }
    }

    const getUserMemberships = async (userId: number) => {
        isOrganizationMembersLoading.value = true
        organizationMembersError.value = null
        try {
            const memberships = await organizationMembersService.getUserMemberships(userId)
            userMemberships.value = memberships

        } catch (err) {
            if (err instanceof Error) {
                organizationMembersError.value = err
                userMemberships.value = null
            }
        } finally {
            isOrganizationMembersLoading.value = false
        }
    }

    return {
        userMemberships,
        isOrganizationOwner,
        isOrganizationAdmin,
        isOrganizationMembersLoading,
        organizationMembersError,
        organizationMember,
        organizationMembers,
        updatedOrganizationMember,
        newOrganizationMember,
        deletedOrganizationMember,
        currentMember,
        getFromLocalStorage,
        addToLocalStorage,
        removeFromLocalStorage,
        getOrganizationMembers,
        getOrganizationMemberById,
        getOrganizationMemberByField,
        getOrganizationMembersByFields,
        createOrganizationMember,
        updateOrganizationMember,
        deleteOrganizationMember,
        getMemberByOrgAndUserIDs,
        getUserMemberships,
    }
}