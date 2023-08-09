export const state = () => ({
    orderFormModal: false,
    addOrderModal: false,
});

const getters = {
    orderFormModal: state => state.orderFormModal,
    addOrderModal: state => state.orderFormModal
};

const mutations = {
    toggleFormModal (state, res) {
        state.orderFormModal = res;
    },

    toggleOrderModal (state,res) {
        state.addOrderModal = res;
    }
}

const actions = {
    toggleFormModal({ commit }, payload) {
        commit('toggleFormModal', payload);
    },

    toggleOrderModal({ commit }, payload) {
        commit('toggleOrderModal', payload)
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}
