<template>
  <Toast />
  <div class="flex justify-content-center">
    <AnalyzeCreateVue :submit="submitAnalyze" :loading="isAnalyzesLoading" />
    <div>
      <AssociationRulesDataTableVue :association-rules="associationRules || []" />
      <!-- <VisualizationsVue /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import useAnalyzes from "../hooks/useAnalyzes";
import useFiles from "../hooks/useFiles";
import useReports from "../hooks/useReports";
import useUsers from "../hooks/useUsers";
import { useToast } from "primevue/usetoast";
import Analyzes from "../models/AnalyzesModel";
import Files from "../models/FileDatasourcesModel";
import Reports from "../models/ReportsModel";
import AnalyzeCreateVue from "../components/Analyzes/AnalyzeCreate.vue";
import AssociationRulesDataTableVue from "../components/Analyzes/AssociationRulesDataTable.vue";
import AssociationRules from "../models/AssociationRulesModel";
// import VisualizationsVue from "../components/Visualizations/Visualizations.vue";

export default defineComponent({
  components: {
    AnalyzeCreateVue,
    AssociationRulesDataTableVue,
    // VisualizationsVue
  },
  setup() {
    onMounted(() => {
      if (isLoggedIn.value && user.value) {
        getUserFiles(user.value.userId)
        getUserReports(user.value.userId)
      }
    })
    const toast = useToast();
    const { user, isLoggedIn, } = useUsers()
    const { getUserReports, userReports: reports, isReportsLoading } = useReports()
    const { getUserFiles, files, isFilesLoading } = useFiles()
    const { userAnalyzes: analyzes, associationRules, isAnalyzesLoading, createAnalyze } = useAnalyzes()
    const selectedAnalyze = ref<Analyzes>()
    const submitAnalyze = async (analyze: Analyzes, file: Files, report: Reports) => {
      if (!file || !report) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select file and report', life: 3000 });

      analyze.reportId = report.reportId

      const response = await createAnalyze(analyze, file.fileId)
      if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 });
      toast.add({ severity: 'success', summary: 'Success', detail: 'Analyze success', life: 3000 });
    }
    const openDelete = (associationRule: AssociationRules) => {
      console.log(associationRule);
    }
    const openEdit = (associationRule: AssociationRules) => {
      console.log(associationRule);
    }
    const openCreate = (associationRule: AssociationRules) => {
      console.log(associationRule);
    }
    return {
      files,
      reports,
      analyzes,
      isFilesLoading,
      isReportsLoading,
      isAnalyzesLoading,
      associationRules,
      selectedAnalyze,
      submitAnalyze,
      openCreate,
      openEdit,
      openDelete,
    };
  },
});
</script>