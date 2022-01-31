import axios from "axios";

export default {
    namespaced: true,
    state: {
        requests: [],
    },
    mutations: {
        setRequests(state, request) {
            state.requests = request;
        },
    },
    actions: {
        async createUser({ dispatch }, request) {
            try {
                await axios.post("/api/add", request);
                dispatch("getUser");
            } catch (e) {
                console.error(e)
            }
        },

        async getUser({ commit }) {
            try {
                const { data } = await axios.get("/api/get");
                commit("setRequests", data);
            } catch (e) {}
        },

        async remove({ dispatch }, request) {
            try {
                await axios.delete(`/api/remove/${request.id}`);
                dispatch("getUser");
            } catch (e) {
                console.error(e)
            }
        },

        async update( {dispatch}, request) {
            try {
                await axios.patch(`/api/update/${request.id}`, request);
                dispatch('getUser')
            } catch (e) {

            }
        }
    },
    getters: {
        requests(state) {
            return state.requests;
        },
    },
};
