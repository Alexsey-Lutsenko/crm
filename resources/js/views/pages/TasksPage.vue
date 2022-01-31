<template>
    <div class="d-flex justify-content-center">
        <h1>Tasks Page</h1>
    </div>

    <form
        class="form-group mt-3 d-inline-flex justify-content-center w-100"
        @submit.prevent
    >
        <div class="mr5">
            <input
                type="text"
                id="name"
                placeholder="name"
                v-model="user.name"
                class="form-control text-center"
            />
            <small v-if="message">{{ message }}</small>
        </div>

        <div class="mr5">
            <input
                type="text"
                id="email"
                placeholder="email"
                v-model="user.email"
                class="form-control text-center"
            />
        </div>

        <div>
            <button class="btn btn-secondary ml-5" @click="isCreate ? submit(user) : update(user)">{{isCreate ? 'Submit' : 'Update'}}</button>
        </div>
    </form>

    <div class="d-flex justify-content-center mt-5">
        <app-loader v-if="loader"></app-loader>
        <table class="table w-50" v-if="!loader">
            <thead>
                <tr class="text-center">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="req in requests" :key="req.id" class="text-center">
                    <td>{{ req.name }}</td>
                    <td>{{ req.email }}</td>
                    <td><button class="btn btn-primary" @click="updateForUser(req)">Change</button></td>
                    <td>
                        <button class="btn btn-danger" @click="remove(req)">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div
        class="d-flex justify-content-center"
        v-if="requests.length === 0 && !loader"
    >
        Not data for table
    </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        const loader = ref(false);
        const user = ref({
            name: "",
            email: "",
        });
        const message = ref();
        const isCreate = ref(true);
        const id = ref()
        const r = ref()

        onMounted(async () => {
            loader.value = true;
            await store.dispatch("userList/getUser");
            loader.value = false;
        });

        const requests = computed(() => store.getters["userList/requests"]);

        const submit = async () => {
            if (!user.value.name || !user.value.email) {
                return (message.value = "Not find name or email");
            }

            isCreate.value = true

            await store.dispatch("userList/createUser", user.value);
            message.value = "";
            user.value.name = user.value.email = "";
        };

        const remove = async (req) => {
            await store.dispatch("userList/remove", req);
        };

        const updateForUser = (req) => {
            isCreate.value = false
            user.value.name = req.name
            user.value.email = req.email
            id.value = req.id
        }

        const update = async (req) => {
            Object.values(requests.value).forEach((req, i, array) => {
                if (req.id === id.value) {
                    return r.value = req
                }
            })

            req.id = id.value

            if (r.value.name === req.name && r.value.email === req.email) {
                return message.value = "Name or email has not been changed"
            }
            await store.dispatch('userList/update', req)
            message.value = "";
            user.value.name = user.value.email = "";
            isCreate.value = true
        }

        return {
            requests,
            loader,
            remove,
            user,
            submit,
            update,
            message,
            isCreate,
            updateForUser
        };
    },
};
</script>

<style scoped lang="scss">
.mr5 {
    margin-right: 0.5rem;
}
</style>
