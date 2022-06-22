<template>
  <Toast />
  <AnalyzeCreateVue :submit="submitAnalyze" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import useAnalyzes from "../hooks/useAnalyzes";
import useFiles from "../hooks/useFiles";
import useOrganizations from "../hooks/useOrganizations";
import useReports from "../hooks/useReports";
import useUsers from "../hooks/useUsers";
import Analyzes from "../models/AnalyzesModel";
import AnalyzeCreateVue from "../components/Analyzes/AnalyzeCreate.vue";
import Files from "../models/FilesModel";
import Reports from "../models/ReportsModel";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  components: {
    AnalyzeCreateVue
  },
  setup() {
    onMounted(() => {
      if (isLoggedIn.value && user.value) {
        getUserFiles(user.value.userId)
        getUserReports(user.value.userId)
        getUserAnalyzes(user.value.userId)
      }
    })
    const toast = useToast();
    const { user, isLoggedIn, } = useUsers()
    const { organization } = useOrganizations()
    const { getUserReports, userReports: reports, isReportsLoading } = useReports()
    const { getUserFiles, files, isFilesLoading } = useFiles()
    const { userAnalyzes: analyzes, getUserAnalyzes, createAnalyze } = useAnalyzes()
    const selectedAnalyze = ref<Analyzes>()
    const submitAnalyze = async (analyze: Analyzes, file: Files, report: Reports) => {
      if (!file || !report) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select file and report', life: 3000 });
      // toast.add({ severity: 'info', summary: 'Updated', detail: 'File Updated', life: 3000 });
      console.log(analyze);
      console.log(file);
      console.log(report);

    }
    return {
      selectedAnalyze,
      reports,
      files,
      analyzes,
      isFilesLoading,
      isReportsLoading,
      submitAnalyze,
    };
  },
});
</script>

<style>
.preview__header {
  text-align: left;
}

.form form {
  text-align: left;
  width: fit-content;
  margin: 0.5rem auto;
  margin-top: 1rem;
}

.table {
  max-width: 100%;
  overflow: auto;
}

.table table {
  margin: 0.5rem auto;
}
</style>
