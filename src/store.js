import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        reservations: []
    },
    mutations: {
        addReservation(state, item) {
            state.reservations.push(item);
        }
    },
    actions: {
        addReservation({ commit }, item) {
            commit('addReservation', item);
        }
    },
    getters: {
        getReservations: state => state.reservations
    }
});
