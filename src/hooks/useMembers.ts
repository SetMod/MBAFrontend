import { computed, ref } from "vue";
import OrganizationMembers, { IOrganizationMembersFullResponse, OrganizationRoles } from "../models/OrganizationMembersModel";
import { organizationMembersService } from "../services/OrganizationMembersService";
import useCRUD from "./useCRUD";
import useState from "./useState";
import { useLocalStorage } from "./useLocalStorage";
import { usersService } from "../services/UsersService";
import { organizationsService } from "../services/OrganizationsService";

const MEMBER_STORAGE_KEY = "member"
const CURRENT_MEMBER_STORAGE_KEY = "current_member"
const membersState = useState<OrganizationMembers>()
const {
    getFromLocalStorage,
    addToLocalStorage,
    removeFromLocalStorage
} = useLocalStorage(organizationMembersService, MEMBER_STORAGE_KEY)
const currentMember = ref<OrganizationMembers | null>(getFromLocalStorage(CURRENT_MEMBER_STORAGE_KEY))

const {
    error: membersError,
    isLoading: isMembersLoading,
    model: member,
    models: members,
    updatedModel: updatedOrganizationMember,
    newModel: newOrganizationMember,
    deletedModel: deletedOrganizationMember,
    getAllModels: getMembers,
    getModelById: getMemberById,
    getModelByField: getMemberByField,
    getModelsByFields: getMembersByFields,
    createModel: createMember,
    updateModel: updateMember,
    deleteModel: deleteMember,
} = useCRUD(organizationMembersService, membersState)


export default function useMembers() {
    const isOrganizationOwner = computed(() => {
        return currentMember.value?.role.toLowerCase() == OrganizationRoles.OWNER.toLowerCase()
    })
    const isOrganizationAdmin = computed(() => {
        return currentMember.value?.role.toLowerCase() == OrganizationRoles.ADMIN.toLowerCase()
    })

    const getMemberByOrgAndUserIDs = async (orgId: number, userId: number) => {
        isMembersLoading.value = true
        membersError.value = null
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
                membersError.value = err
                currentMember.value = null
                removeFromLocalStorage(CURRENT_MEMBER_STORAGE_KEY)
            }
        } finally {
            isMembersLoading.value = false
        }
    }


    const userMembershipsFull = ref<IOrganizationMembersFullResponse[]>([])
    const getUserMembershipsFull = async (userId: number) => {
        isMembersLoading.value = true
        membersError.value = null
        try {
            const memberships = await usersService.getOrganizationMembersFull(userId)
            userMembershipsFull.value = memberships
        } catch (err) {
            if (err instanceof Error) {
                membersError.value = err
                userMembershipsFull.value = []
            }
        } finally {
            isMembersLoading.value = false
        }
    }

    const userMemberships = ref<OrganizationMembers[]>([])
    const getUserMemberships = async (userId: number) => {
        isMembersLoading.value = true
        membersError.value = null
        try {
            const memberships = await usersService.getMemberships(userId)
            userMemberships.value = memberships

        } catch (err) {
            if (err instanceof Error) {
                membersError.value = err
                userMemberships.value = []
            }
        } finally {
            isMembersLoading.value = false
        }
    }



    const organizationMembers = ref<OrganizationMembers[]>([])
    const getOrganizationMembers = async (orgId: number) => {
        isMembersLoading.value = true
        membersError.value = null
        try {
            const members = await organizationsService.getMembers(orgId)
            organizationMembers.value = members
        } catch (err) {
            if (err instanceof Error) {
                membersError.value = err
                organizationMembers.value = []
            }
        } finally {
            isMembersLoading.value = false
        }
    }
    const organizationMembersFull = ref<IOrganizationMembersFullResponse[]>([])
    const getOrganizationMembersFull = async (orgId: number) => {
        isMembersLoading.value = true
        membersError.value = null
        try {
            const members = await organizationsService.getOrganizationMembersFull(orgId)
            organizationMembersFull.value = members
        } catch (err) {
            if (err instanceof Error) {
                membersError.value = err
                organizationMembersFull.value = []
            }
        } finally {
            isMembersLoading.value = false
        }
    }

    return {
        isOrganizationOwner,
        isOrganizationAdmin,
        isMembersLoading,
        membersError,
        member,
        members,
        updatedOrganizationMember,
        newOrganizationMember,
        deletedOrganizationMember,
        currentMember,
        userMembershipsFull,
        userMemberships,
        organizationMembers,
        organizationMembersFull,
        getOrganizationMembers,
        getOrganizationMembersFull,
        getUserMemberships,
        getUserMembershipsFull,
        getMembers,
        getMemberById,
        getMemberByField,
        getMembersByFields,
        createMember,
        updateMember,
        deleteMember,
        getMemberByOrgAndUserIDs,
    }
}