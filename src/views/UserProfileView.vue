<script setup lang="ts">
// highlight-start
import { gql } from '@apollo/client/core'
import { useNhostClient, useUserData } from '@nhost/vue'
import { useMutation } from '@vue/apollo-composable'
import { ref } from 'vue'
// highlight-end
const user = useUserData()
// highlight-start
const { nhost } = useNhostClient()

const UPDATE_USER_MUTATION = gql`
  mutation ($id: uuid!, $displayName: String!, $metadata: jsonb) {
    updateUser(pk_columns: { id: $id }, _set: { displayName: $displayName, metadata: $metadata }) {
      id
      displayName
      metadata
    }
  }
`
const firstName = ref('')
const lastName = ref('')
const { mutate, loading, error } = useMutation(UPDATE_USER_MUTATION)

const updateUserProfile = async (event: Event) => {
  event.preventDefault()
  if (user.value) {
    await mutate({
      id: user.value.id,
      displayName: `${firstName.value} ${lastName.value}`.trim(),
      metadata: {
        firstName: firstName.value,
        lastName: lastName.value
      }
    })
    await nhost.auth.refreshSession()
  }
}
// highlight-end
</script>

<template>
  <div>
    <div i-carbon-home text-4xl inline-block />
    <p>Profile page</p>
    <p>
      <em text-sm op75>Quickstart</em>
    </p>
    <div v-if="user" py-4>
      <p my-4>Hello, {{ user?.displayName }}. Your email is {{ user?.email }}.</p>
      <!-- highlight-start -->
      <form @submit="updateUserProfile">
        <input v-model="firstName" placeholder="First name" class="input" />
        <br />
        <input v-model="lastName" placeholder="Last name" class="input" />
        <br />
        <button className="m-3 text-sm btn" :disabled="loading">Save</button>
        <div v-if="error">
          {{ error.message }}
        </div>
      </form>
      <!-- highlight-end -->
    </div>
  </div>
</template>
