<template>
  <div>
    <h1>List</h1>

    <div class="row">
      <div class="input-field col s6">
        <select ref="select" v-model="filter">
          <option value="" disabled selected>Choose filter</option>
          <option value="active">Active</option>
          <option value="outdated">Outdated</option>
          <option value="completed">Completed</option>
        </select>
        <label>Status filter</label>
      </div>
      <button
        v-if="filter" class="btn-floating red darken-2" @click="filter = null"
      >
        <i class="material-icons">cancel</i>
      </button>
    </div>


    <hr>

    <table v-if="tasks.length">
      <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Date</th>
        <th>Description</th>
        <th>Status</th>
        <th>Open</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(task, idx) of displayTasks" :key="task.id">
        <td> {{ idx + 1 }}</td>
        <td> {{ task.title }}</td>
        <td> {{ new Date(task.date).toLocaleDateString() }}</td>
        <td class="task-descr-wrapper">
          <div class="task-descr"> {{ task.description }}</div>
        </td>
        <td> {{ task.status }}</td>
        <td>
          <router-link tag="button" class="btn btn-small blue-grey" :to="'/task/'+task.id">
            Open
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
    <p v-else>No tasks</p>
  </div>

</template>

<script>
export default {
  name: 'List',
  data: () => ({
    filter: null,
  }),
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    displayTasks() {
      if (this.filter) {
        return this.tasks.filter(t => t.status === this.filter);
      }
      return this.tasks;
    }
  },
  mounted() {
    M.FormSelect.init(this.$refs.select, {});
  },

};



</script>

<style scoped>
.task-descr-wrapper {
  max-width: 400px;
}

.task-descr {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
