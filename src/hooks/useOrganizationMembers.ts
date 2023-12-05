import { ref } from "vue";
import OrganizationMembers from "../models/OrganizationMembersModel";
import { organizationMembersService } from "../services/OrganizationMembersService";
import useCRUD from "./useCRUD";
import useState from "./useState";

const ORGANIZATION_MEMBER_STORAGE_KEY = "organizationMember"
const currentMember = ref<OrganizationMembers | null>()
const membersState = useState<OrganizationMembers>()

export default function useOrganizationMembers() {
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
    } = useCRUD(organizationMembersService, membersState, ORGANIZATION_MEMBER_STORAGE_KEY)

    const getMemberByOrgAndUserIDs = async (orgId: number, userId: number) => {
        isOrganizationMembersLoading.value = true
        organizationMembersError.value = null
        try {
            const fields = { user_id: userId, organization_id: orgId }
            const res = await organizationMembersService.getByFields(fields, false)
            if (res instanceof OrganizationMembers) currentMember.value = res

            return res
        } catch (err) {
            if (err instanceof Error) {
                organizationMembersError.value = err
            }
        } finally {
            isOrganizationMembersLoading.value = false
        }
    }

    return {
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
    }
}