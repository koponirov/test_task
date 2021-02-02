<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <h1>{{ task.title }}</h1>
      <form @submit.prevent="submitHandler">
        <div class="input-field">

          <div class="chips" ref="chips"></div>

          <div class="input-field">
            <textarea
              v-model="description"
              id="description"
              class="materialize-textarea"
              style="min-height: 150px"
            ></textarea>
            <label for="description">Description</label>
            <span class="character-counter" style="float: right; font-size: 12px;">
            {{ description.length }}/2048
          </span>
          </div>

          <input ref="datepicker" type="text">

          <div v-if="task.status !== 'completed'">
            <button class="btn blue-grey" type="submit" style="margin-right: 1rem;">Update</button>
            <button class="btn green accent-3" type="button" @click="completeTask">Complete task</button>
          </div>

        </div>
      </form>
    </div>
  </div>



</template>

<script>
export default {
  name: 'Task',
  data: () => ({
    description: '',
    chips: null,
    date: null,
  }),
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id);
    },
  },
  methods: {
    submitHandler() {
      debugger
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        description: this.description,
        date: this.date.date,
      });
      this.$router.push('/list');
    },
    completeTask() {
      this.$store.dispatch('completeTask', this.task.id);
      this.$router.push('/list');
    },
  },
  mounted() {
    this.description = this.task.description;
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Tasks tags',
      data: this.task.chips
    });

    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(this.task.date),
      setDefaultDate: true,
    });

    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy;
    }

    if (this.chips && this.chips.destroy) {
      this.chips.destroy;
    }
  },
};
</script>

<style scoped>

</style>
