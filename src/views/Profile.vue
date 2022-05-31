<template>
  <div v-if="!user">Log in first</div>
  <section v-else class="form">
    <div class="p-card">
      <h1 class="p-card-title">Profile</h1>
      <div class="p-card-body">
        <div class="p-card-content">
          <label for="Username">Username:</label>
          <InputText :value="user.userUsername" placeholder="username" />
        </div>
        <div class="p-card-content">
          <label for="Email">E-mail:</label>
          <InputText v-model="user.userEmail" placeholder="email@example.com" />
        </div>
        <div class="p-card-footer">
          <Button label="Edit" class="p-button-help" />
          <Button label="Save" class="p-button-info" />
        </div>
      </div>
    </div>
  </section>
  <h3 class="preview__header">Saved datasets</h3>
  <hr />
  <section>
    <ul>
      <li>
        dataset_1.csv
        <button>Load</button>
        <button>Delete</button>
        <button>Summary</button>
      </li>
      <li>
        dataset_2.csv
        <button>Load</button>
        <button>Delete</button>
        <button>Summary</button>
      </li>
      <li>
        dataset_3.csv
        <button>Load</button>
        <button>Delete</button>
        <button>Summary</button>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import useUsers from "../hooks/useUsers";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
export default defineComponent({
  component: {
    InputText,
    Button
  },
  setup() {

    const { user } = useUsers()
    return {
      user
    }
  }
});
</script>

<style>
</style>
