<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Create task</h1>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input v-model="title" id="title" type="text" class="validate" required>
          <label for="title">Title</label>
          <span class="helper-text" data-error="title is required"></span>

          <div class="chips" ref="chips"></div>

          <div class="input-field">
            <textarea v-model="description" id="description" class="materialize-textarea" ></textarea>
            <label for="description">Textarea</label>
            <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
          </div>

          <input ref="datepicker" type="text" >

          <button class="btn" type="submit">Create task</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Create',
  data: () => ({
    description: '',
    title: '',
    chips: null,
    date: null,
  }),
  methods: {
    submitHandler() {
      const task = {
        title: this.title,
        description: this.description,
        id: new Date(),
        status: 'active',
        date: this.date.date,
        chips: this.chips.chipsData.map((c) => c.tag),
      };
      this.$store.dispatch('createTask', task);
      this.$router.push('/list');
    },
  },
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Tasks tags',
    });

    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true,
    });
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
