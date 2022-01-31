import Vuex from "vuex";

import userList from "./modules/userList.module";

export default new Vuex.Store({
    modules: {
        userList,
    },
});
