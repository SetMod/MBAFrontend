<script setup lang="ts">
import { ref } from "vue";
import Users from "../models/UsersModel";
import useUsers, { useUserRegisterValidate } from "../hooks/useUsers";
import useRoutes from "../hooks/useRoutes";
import { useToast } from "primevue/usetoast";

const { redirectLogin } = useRoutes()
const { register, usersError } = useUsers()
const { registerValidate, registerState } = useUserRegisterValidate()

const toast = useToast()
const submitted = ref(false);

const submitSignUp = async () => {
  submitted.value = true;

  if (registerValidate.value.$invalid) {
    toast.add({ severity: 'warn', summary: 'Warning', detail: 'Validate all fields', life: 3000 })
    return
  }

  const newUser = new Users()
  newUser.firstName = registerState.firstName
  newUser.secondName = registerState.secondName
  newUser.email = registerState.email
  newUser.username = registerState.username
  newUser.passwordHash = registerState.password
  newUser.phone = registerState.phone
  newUser.role = registerState.role

  await register(newUser)

  if (usersError.value) {
    toast.add({ severity: 'error', summary: 'Failed', detail: usersError.value.message, life: 3000 });
  } else {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Signed Up', life: 3000 });
    redirectLogin();
  }
}
</script>

<template>
  <Toast />
  <form @submit.prevent="submitSignUp">
    <div class="p-card w-29rem mt-8 mx-auto">
      <h3 class="p-card-title">Register</h3>

      <div class="p-card-body text-left">
        <div class="p-fluid text-left">
          <div class="field">
            <label>First name:</label>
            <InputText v-model="registerValidate.firstName.$model"
              :class="{ 'p-invalid': registerValidate.firstName.$invalid && submitted }" placeholder="first name" />
            <small v-if="(registerValidate.firstName.$invalid && submitted) || registerValidate.firstName.$pending"
              class="p-error">{{
                registerValidate.firstName.required.$message.replace('Value', 'First name')
              }}</small>
          </div>

          <div class="field">
            <label>Second name:</label>
            <InputText v-model="registerValidate.secondName.$model"
              :class="{ 'p-invalid': registerValidate.secondName.$invalid && submitted }" placeholder="second name" />
            <small v-if="(registerValidate.secondName.$invalid && submitted) || registerValidate.secondName.$pending"
              class="p-error">{{
                registerValidate.secondName.required.$message.replace('Value', 'Second name')
              }}</small>
          </div>

          <div class="field">
            <label>E-mail:</label>
            <InputText v-model="registerValidate.email.$model"
              :class="{ 'p-invalid': registerValidate.email.$invalid && submitted }" placeholder="email@example.com"
              type="email" />
            <span v-if="registerValidate.email.$error && submitted">
              <span v-for="(error, index) of registerValidate.email.$errors" id="email-error" :key="index">
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small v-else-if="(registerValidate.email.$invalid && submitted) || registerValidate.email.$pending"
              class="p-error">{{
                registerValidate.email.required.$message.replace('Value', 'E-mail')
              }}</small>
          </div>

          <div class="field">
            <label>Phone number:</label>
            <InputMask v-model="registerValidate.phone.$model" mask="+99 (999) 999-9999"
              placeholder="+ 99 (999) 999-9999" />
            <small v-if="(registerValidate.phone.required.$invalid && submitted) || registerValidate.phone.$pending"
              class="p-error">{{
                registerValidate.phone.required.$message.replace('Value', 'Phone number')
              }}</small>
            <small v-else-if="registerValidate.phone.minLength.$invalid && submitted" class="p-error">{{
              registerValidate.phone.minLength.$message.replace('Value', 'Phone number')
            }}</small>
            <small v-else-if="registerValidate.phone.maxLength.$invalid && submitted" class="p-error">{{
              registerValidate.phone.maxLength.$message.replace('Value', 'Phone number')
            }}</small>
          </div>

          <div class="field">
            <label>Username:</label>
            <InputText v-model="registerValidate.username.$model"
              :class="{ 'p-invalid': registerValidate.username.$invalid && submitted }" placeholder="username" />
            <small v-if="registerValidate.username.required.$invalid && submitted" class="p-error">{{
              registerValidate.username.required.$message.replace('Value', 'Username')
            }}</small>
            <small v-else-if="registerValidate.username.minLength.$invalid && submitted" class="p-error">{{
              registerValidate.username.minLength.$message.replace('This field', 'Username')
            }}</small>
          </div>

          <div class="field">
            <label>Password:</label>
            <Password v-model="registerValidate.password.$model"
              :class="{ 'p-invalid': registerValidate.password.$invalid && submitted }" placeholder="password"
              toggle-mask />
            <small v-if="(registerValidate.password.required.$invalid && submitted) || registerValidate.password.$pending"
              class="p-error">{{
                registerValidate.password.required.$message.replace('Value', 'Password')
              }}</small>
          </div>

          <div class="field">
            <label>Confirm password:</label>
            <Password v-model="registerValidate.confirmPassword.$model"
              :class="{ 'p-invalid': registerValidate.confirmPassword.$invalid && submitted }" placeholder="password"
              toggle-mask :feedback="submitted" />
            <small
              v-if="(registerValidate.confirmPassword.required.$invalid && submitted) || registerValidate.confirmPassword.$pending"
              class="p-error">{{
                registerValidate.confirmPassword.required.$message.replace('Value', 'Password')
              }}</small>
            <small
              v-else-if="(registerValidate.confirmPassword.sameAsPassword.$invalid && submitted) || registerValidate.confirmPassword.$pending"
              class="p-error">Password doesn't match</small>
          </div>

          <!-- <div>
          <div class="field flex flex-column align-content-center">
            <label for="role">Role:</label>
            <Dropdown v-model="selectedRole" :options="roles" option-label="roleName" placeholder="Select a role"
            :filter="true" filter-placeholder="Find Role" :loading="!roles" />
          </div>
          
          <small v-if="!selectedRole && submitted" class="p-error">Role is required</small>
        </div> -->
        </div>


        <div class="p-card-footer flex justify-content-around align-items-center">
          <Button type="submit">Submit</Button>
          <Button label="Login" severity="secondary" outlined @click="redirectLogin" />
        </div>
      </div>
    </div>
  </form>
</template>
