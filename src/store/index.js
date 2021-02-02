import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask(state, {
      id,
      description,
      date
    }) {

      state.tasks = state.tasks.map(task => {
        const status = date < new Date() ? 'outdated' : task.status;
        if (task.id === id) {
          return {
            ...task,
            description,
            date,
            status
          };
        }
        return task;
      });
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    completeTask(state, id) {
      state.tasks = state.tasks.map(task => {
        if (task.id === id) {
          const status = 'completed';
          return {
            ...task,
            status
          };
        }
        return task;
      });
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },
  actions: {
    createTask({ commit }, task) {
      commit('createTask', task);
    },
    updateTask({ commit }, payload) {
      commit('updateTask', payload);
    },
    completeTask({ commit }, id) {
      commit('completeTask', id);
    },
  },
  getters: {
    tasks: state => state.tasks,
    taskById: state => id => state.tasks.find(t => t.id === id),
  },
  modules: {},
});
