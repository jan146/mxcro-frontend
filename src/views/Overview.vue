<template>
    <div class="w-full">
        <h1>This is the overview page for user with user_id: {{$route.params.user_id}}</h1>
        <div class="flex flex-col w-full" v-if="username">
            <div>Username: {{username}}</div>
            <div>Age: {{age}}</div>
            <div>Height: {{height}} cm</div>
            <div>Weight: {{weight}} kg</div>
        </div>
        <div v-else-if="online">
            <div>Failed to get information about specified user</div> 
        </div>
        <div v-else-if="offline">
            <div>Failed to connect to backend. Is it up?</div> 
        </div>
        <div v-else>
            <div>Connecting to server ...</div> 
        </div>
    </div>
</template>

<script setup lang="ts">

    import { useRoute, type RouteLocationNormalizedLoaded as Route } from "vue-router";
    import { ref, type Ref, onMounted } from 'vue';
    import { BACKEND_URL } from '@/utils/constants';

    const route: Route = useRoute();
    const username: Ref<string> = ref("");
    const age: Ref<string> = ref("");
    const height: Ref<string> = ref("");
    const weight: Ref<string> = ref("");
    const online: Ref<boolean> = ref(false);
    const offline: Ref<boolean> = ref(false);

    onMounted(() => {
        fetch(`${BACKEND_URL}/user_info/${route.params.user_id}`)
            .then(response => response.json())
            .then(data => {
                online.value = true;
                if (!data.error) {
                    username.value = data["username"];
                    age.value = data["age"];
                    height.value = data["height"];
                    weight.value = data["weight"];
                }
            })
            .catch(err => {
                offline.value = true;
                console.error(err);
            })
    })

</script>

