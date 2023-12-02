<script setup lang="ts">
import { ref, reactive } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import useUsers from "../hooks/useUsers";
import useRoutes from "../hooks/useRoutes";
import { useToast } from "primevue/usetoast";

const { isUsersLoading, isLoggedIn, usersError, login } = useUsers()
const { redirectSignUp, redirectHome } = useRoutes()
const toast = useToast()
const submitted = ref(false);

const state = reactive({
  userUsername: '',
  userPassword: ''
})
const rules = {
  userUsername: { required },
  userPassword: { required }
}

const v$ = useVuelidate(rules, state)

const handleSubmit = () => {
  submitted.value = true;
  if (v$.value.$invalid) {
    toast.add({ severity: 'warn', summary: 'Warning', detail: 'Validate all fields', life: 3000 });
    return
  }

  // await login(state.userUsername, state.userPassword)
  login(state.userUsername, state.userPassword).then((res) => {
    if (usersError.value instanceof Error) {
      toast.add({ severity: 'error', summary: 'Failed', detail: usersError.value.message, life: 3000 });
    } else if (res) {
      toast.add({ severity: 'success', summary: 'Success', detail: res.message, life: 3000 });
      redirectHome()
    }
  })
}
</script>

<template>
  <Toast />
  <section class="flex justify-content-center align-items-center mt-8">
    <div class="p-card w-29rem">
      <h3 class="p-card-title">Login</h3>
      <div class="p-card-body text-left">
        <div class="field flex flex-column align-content-center">
          <label for="Username" class="flex align-items-center mr-3">Username:</label>
          <InputText v-model="v$.userUsername.$model" :disabled="isUsersLoading"
            :class="{ 'p-invalid': v$.userUsername.$invalid && submitted }" placeholder="Username" />
          <small v-if="(v$.userUsername.$invalid && submitted) || v$.userUsername.$pending" class="p-error">{{
            v$.userUsername.required.$message.replace('Value', 'Name')
          }}</small>
        </div>


        <div class="field flex flex-column align-content-center">
          <label for="Password" class="flex align-items-center mr-3">Password:</label>
          <Password v-model="v$.userPassword.$model" placeholder="Password" :disabled="isUsersLoading"
            :class="{ 'p-invalid': v$.userPassword.$invalid && submitted }" toggle-mask :feedback="false" />
          <small v-if="(v$.userPassword.$invalid && submitted) || v$.userPassword.$pending" class="p-error">{{
            v$.userPassword.required.$message.replace('Value', 'Password')
          }}</small>
        </div>

        <div class="p-card-footer flex justify-content-around align-content-center mt-2">
          <Button @click="handleSubmit">Submit</Button>
          <Button class="p-button-secondary" label="Register" @click="redirectSignUp" />
        </div>
      </div>
    </div>
  </section>
</template>


<style></style>