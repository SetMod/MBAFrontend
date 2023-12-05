<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, maxLength, sameAs } from "@vuelidate/validators";
import Users, { Roles } from "../models/UsersModel";
import useUsers from "../hooks/useUsers";
import useRoutes from "../hooks/useRoutes";
import { useToast } from "primevue/usetoast";

const { register, usersError } = useUsers()
const { redirectLogin } = useRoutes()
const toast = useToast()
const submitted = ref(false);
const password = computed(() => {
  return state.password
})

const state = reactive({
  firstName: '',
  secondName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  role: Roles.USER,
})
const rules = {
  firstName: { required },
  secondName: { required },
  email: { required, email },
  username: { required, minLength: minLength(4) },
  password: { required, minLength: minLength(6) },
  confirmPassword: { required, sameAsPassword: sameAs(password) },
  phone: { required, minLength: minLength(18), maxLength: maxLength(18) },
}
const v$ = useVuelidate(rules, state)

const submitSignUp = async () => {
  submitted.value = true;

  if (v$.value.$invalid) {
    toast.add({ severity: 'warn', summary: 'Warning', detail: 'Validate all fields', life: 3000 })
    return
  }

  const newUser = new Users()
  newUser.firstName = state.firstName
  newUser.secondName = state.secondName
  newUser.email = state.email
  newUser.username = state.username
  newUser.passwordHash = state.password
  newUser.phone = state.phone
  newUser.role = state.role

  register(newUser).then((res) => {
    if (usersError.value) {
      toast.add({ severity: 'error', summary: 'Failed', detail: usersError.value.message, life: 3000 });
    } else {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Signed Up', life: 3000 });
      redirectLogin();
    }
  })

}
</script>

<template>
  <Toast />
  <div class="p-card w-29rem mt-8 mx-auto">
    <h3 class="p-card-title">Register</h3>

    <div class="p-card-body text-left">
      <div class="p-fluid text-left">
        <div class="field">
          <label>First name:</label>
          <InputText v-model="v$.firstName.$model" :class="{ 'p-invalid': v$.firstName.$invalid && submitted }"
            placeholder="first name" />
          <small v-if="(v$.firstName.$invalid && submitted) || v$.firstName.$pending" class="p-error">{{
            v$.firstName.required.$message.replace('Value', 'First name')
          }}</small>
        </div>

        <div class="field">
          <label>Second name:</label>
          <InputText v-model="v$.secondName.$model" :class="{ 'p-invalid': v$.secondName.$invalid && submitted }"
            placeholder="second name" />
          <small v-if="(v$.secondName.$invalid && submitted) || v$.secondName.$pending" class="p-error">{{
            v$.secondName.required.$message.replace('Value', 'Second name')
          }}</small>
        </div>

        <div class="field">
          <label>E-mail:</label>
          <InputText v-model="v$.email.$model" :class="{ 'p-invalid': v$.email.$invalid && submitted }"
            placeholder="email@example.com" type="email" />
          <span v-if="v$.email.$error && submitted">
            <span v-for="(error, index) of v$.email.$errors" id="email-error" :key="index">
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending" class="p-error">{{
            v$.email.required.$message.replace('Value', 'E-mail')
          }}</small>
        </div>

        <div class="field">
          <label>Phone number:</label>
          <InputMask v-model="v$.phone.$model" mask="+99 (999) 999-9999" placeholder="+ 99 (999) 999-9999" />
          <small v-if="(v$.phone.required.$invalid && submitted) || v$.phone.$pending" class="p-error">{{
            v$.phone.required.$message.replace('Value', 'Phone number')
          }}</small>
          <small v-else-if="v$.phone.minLength.$invalid && submitted" class="p-error">{{
            v$.phone.minLength.$message.replace('Value', 'Phone number')
          }}</small>
          <small v-else-if="v$.phone.maxLength.$invalid && submitted" class="p-error">{{
            v$.phone.maxLength.$message.replace('Value', 'Phone number')
          }}</small>
        </div>

        <div class="field">
          <label>Username:</label>
          <InputText v-model="v$.username.$model" :class="{ 'p-invalid': v$.username.$invalid && submitted }"
            placeholder="username" />
          <small v-if="v$.username.required.$invalid && submitted" class="p-error">{{
            v$.username.required.$message.replace('Value', 'Username')
          }}</small>
          <small v-else-if="v$.username.minLength.$invalid && submitted" class="p-error">{{
            v$.username.minLength.$message.replace('This field', 'Username')
          }}</small>
        </div>

        <div class="field">
          <label>Password:</label>
          <Password v-model="v$.password.$model" :class="{ 'p-invalid': v$.password.$invalid && submitted }"
            placeholder="password" toggle-mask />
          <small v-if="(v$.password.required.$invalid && submitted) || v$.password.$pending" class="p-error">{{
            v$.password.required.$message.replace('Value', 'Password')
          }}</small>
        </div>

        <div class="field">
          <label>Confirm password:</label>
          <Password v-model="v$.confirmPassword.$model" :class="{ 'p-invalid': v$.confirmPassword.$invalid && submitted }"
            placeholder="password" toggle-mask :feedback="submitted" />
          <small v-if="(v$.confirmPassword.required.$invalid && submitted) || v$.confirmPassword.$pending"
            class="p-error">{{
              v$.confirmPassword.required.$message.replace('Value', 'Password')
            }}</small>
          <small v-else-if="(v$.confirmPassword.sameAsPassword.$invalid && submitted) || v$.confirmPassword.$pending"
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
        <Button @click="submitSignUp">Submit</Button>
        <Button class="p-button-secondary" @click="redirectLogin">Login</Button>
      </div>
    </div>
  </div>
</template>
