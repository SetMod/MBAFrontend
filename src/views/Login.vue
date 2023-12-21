<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import useUsers from "../hooks/useUsers";
import useUserLoginValidate from "../modules/Users/hooks/useUserLoginValidate";
import useRoutes from "../hooks/useRoutes";

const { redirectRegister, redirectHome } = useRoutes()
const { isUsersLoading, usersError, login, whoAmI } = useUsers()
const { userLoginValidate, userLoginState } = useUserLoginValidate()

const toast = useToast()
const submitted = ref(false);

const handleSubmit = async () => {
  submitted.value = true;
  if (userLoginValidate.value.$invalid) {
    toast.add({ severity: 'warn', summary: 'Warning', detail: 'Validate all fields', life: 3000 });
    return
  }

  await login(userLoginState.username, userLoginState.password)
  await whoAmI()

  if (usersError.value instanceof Error) {
    toast.add({ severity: 'error', summary: 'Failed', detail: usersError.value.message, life: 3000 });
  } else {
    toast.add({ severity: 'success', summary: 'Success', detail: "Login successful!", life: 3000 });
    redirectHome()
  }
}
</script>

<template>
  <Toast />
  <form @submit.prevent="handleSubmit">
    <div class="flex justify-content-center align-items-center mt-8">
      <div class="p-card w-29rem">
        <h3 class="p-card-title">Login</h3>
        <div class="p-card-body text-left">
          <div class="field">
            <label for="Username" class="flex align-items-center mr-3">Username:</label>
            <InputText v-model="userLoginValidate.username.$model" class="w-full" :disabled="isUsersLoading"
              :class="{ 'p-invalid': userLoginValidate.username.$invalid && submitted }" placeholder="Username" />
            <small v-if="(userLoginValidate.username.$invalid && submitted) || userLoginValidate.username.$pending"
              class="p-error">{{
                userLoginValidate.username.required.$message.replace('Value', 'Name')
              }}</small>
          </div>

          <!-- <div class="field flex flex-column align-content-center"> -->
          <div class="field">
            <label for="Password" class="flex align-items-center mr-3">Password:</label>
            <Password v-model="userLoginValidate.password.$model" placeholder="Password" class="w-full" input-class="w-full"
              :disabled="isUsersLoading" :class="{ 'p-invalid': userLoginValidate.password.$invalid && submitted }"
              toggle-mask :feedback="false" />
            <small v-if="(userLoginValidate.password.$invalid && submitted) || userLoginValidate.password.$pending"
              class="p-error">{{
                userLoginValidate.password.required.$message.replace('Value', 'Password')
              }}</small>
          </div>

          <div class="p-card-footer flex justify-content-around align-content-center mt-2">
            <Button type="submit">Submit</Button>
            <Button label="Register" severity="secondary" link @click="redirectRegister" />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
