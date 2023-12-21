<script setup lang="ts">
import { ref } from "vue";
import useUsers, { } from "../hooks/useUsers";
import useUserCreateValidate from "../modules/Users/hooks/useUserCreateValidate";
import useRoutes from "../hooks/useRoutes";
import { useToast } from "primevue/usetoast";

const { redirectLogin } = useRoutes()
const { register, usersError } = useUsers()
const { userCreateValidate, userCreateState, confirmPassword, isPasswordConfirmed } = useUserCreateValidate()

const toast = useToast()
const submitted = ref(false);

const submitSignUp = async () => {
  submitted.value = true;

  if (userCreateValidate.value.$invalid) {
    toast.add({ severity: 'warn', summary: 'Warning', detail: 'Validate all fields', life: 3000 })
    return
  }

  await register(userCreateState)

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
    <div class="p-card w-30rem mt-5 mx-auto">
      <h3 class="p-card-title">Register</h3>

      <div class="p-card-body text-left">
        <div class="p-fluid text-left">
          <div class="field">
            <label>First name:</label>
            <InputText v-model="userCreateValidate.firstName.$model"
              :class="{ 'p-invalid': userCreateValidate.firstName.$invalid && submitted }" placeholder="first name" />
            <small class="p-error">
              {{
                (userCreateValidate.firstName.$invalid && submitted) || userCreateValidate.firstName.$pending ?
                userCreateValidate.firstName.required.$message.replace('Value', 'First name') : ''
              }}
            </small>
          </div>

          <div class="field">
            <label>Second name:</label>
            <InputText v-model="userCreateValidate.secondName.$model"
              :class="{ 'p-invalid': userCreateValidate.secondName.$invalid && submitted }" placeholder="second name" />
            <small class="p-error">
              {{
                (userCreateValidate.secondName.$invalid && submitted) || userCreateValidate.secondName.$pending ?
                userCreateValidate.secondName.required.$message.replace('Value', 'Second name') : ''
              }}
            </small>
          </div>

          <div class="field">
            <label>E-mail:</label>
            <InputText v-model="userCreateValidate.email.$model"
              :class="{ 'p-invalid': userCreateValidate.email.$invalid && submitted }" placeholder="email@example.com"
              type="email" />
            <span v-if="userCreateValidate.email.$error && submitted">
              <span v-for="(error, index) of userCreateValidate.email.$errors" id="email-error" :key="index">
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small class="p-error">
              {{
                (userCreateValidate.email.$invalid && submitted) || userCreateValidate.email.$pending ?
                userCreateValidate.email.required.$message.replace('Value', 'E-mail') : ''
              }}
            </small>
          </div>

          <div class="field">
            <label>Phone number:</label>
            <InputMask v-model="userCreateValidate.phone.$model" mask="+99 (999) 999-9999"
              placeholder="+ 99 (999) 999-9999" />
            <small class="p-error">
              {{
                (userCreateValidate.phone.required.$invalid && submitted) || userCreateValidate.phone.$pending ?
                userCreateValidate.phone.required.$message.replace('Value', 'Phone number') : ''
              }}
            </small>
            <small class="p-error">
              {{
                userCreateValidate.phone.minLength.$invalid && submitted ?
                userCreateValidate.phone.minLength.$message.replace('Value', 'Phone number') : ''
              }}</small>
            <small class="p-error">
              {{
                userCreateValidate.phone.maxLength.$invalid && submitted ?
                userCreateValidate.phone.maxLength.$message.replace('Value', 'Phone number') : ''
              }}
            </small>
          </div>

          <div class="field">
            <label>Username:</label>
            <InputText v-model="userCreateValidate.username.$model"
              :class="{ 'p-invalid': userCreateValidate.username.$invalid && submitted }" placeholder="username" />
            <small class="p-error">
              {{
                userCreateValidate.username.required.$invalid && submitted ?
                userCreateValidate.username.required.$message.replace('Value', 'Username') : ''
              }}
            </small>
            <small class="p-error">
              {{
                userCreateValidate.username.minLength.$invalid && submitted ?
                userCreateValidate.username.minLength.$message.replace('This field', 'Username') : ''
              }}
            </small>
          </div>

          <div class="field">
            <label>Password:</label>
            <Password v-model="userCreateValidate.password.$model"
              :class="{ 'p-invalid': userCreateValidate.password.$invalid && submitted }" placeholder="password"
              toggle-mask />
            <small class="p-error">
              {{
                (userCreateValidate.password.required.$invalid && submitted) || userCreateValidate.password.$pending ?
                userCreateValidate.password.required.$message.replace('Value', 'Password') : ''
              }}
            </small>
          </div>

          <div class="field">
            <label>Confirm password:</label>
            <Password v-model="confirmPassword"
              :class="{ 'p-invalid': (!confirmPassword || isPasswordConfirmed) && submitted }" placeholder="password"
              toggle-mask :feedback="submitted" />
            <small class="p-error">
              {{ !confirmPassword && submitted ? 'Confirm password is required.' : '' }}
            </small>
            <small class="p-error">
              {{ isPasswordConfirmed && submitted ? "Password doesn't match" : '' }}
            </small>
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
          <Button label="Login" severity="secondary" link @click="redirectLogin" />
        </div>
      </div>
    </div>
  </form>
</template>
