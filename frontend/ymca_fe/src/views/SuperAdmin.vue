<template>
  <b-container>
    <b-row class="center-it">
      <b-button
          v-b-modal="'new-ymca'"
          variant="ymca-fe"
          class="rounded-pill"
      >
        Create YMCA
      </b-button>
    </b-row>
    <b-row
        class="center-it">
      <b-button
          v-b-modal="'new-user'"
          variant="ymca-fe"
          class="rounded-pill"
      >
        Create new user
      </b-button>
    </b-row>
    <b-modal
        id="new-ymca"
        ref="new-ymca"
        hide-footer
        hide-header
    >
      <b-form
        id="new-ymca"
      >
        <h3>
          New YMCA
        </h3>
        <b-form-group
            id="new-ymca"
            class="rounded-pill"
        >
          <b-input
              id="ymca-name"
              class="rounded-pill"
          />
        </b-form-group>
        <b-button class="rounded-pill btn-ymca-fe">
          Create YMCA
        </b-button>
      </b-form>
    </b-modal>
    <b-modal
        id="new-user"
        ref="new-user"
        hide-footer
        hide-header
    >
      <new-user/>
    </b-modal>
  </b-container>
</template>

<script>
import NewUser from "./NewUser";

export default {
  name: "SuperAdmin",
  components: {NewUser},
}
</script>

<style scoped>

</style>