<template>
    <div>
        <!-- <h1>This is the overview page for user with user_id: {{$route.params.user_id}}</h1> -->
        <div class="flex flex-col w-full text-white" v-if="username">
            <div class="font-semibold">Username: {{username}}</div>
            <div class="font-semibold">Age: {{age}}</div>
            <div class="font-semibold">Height: {{height}} cm</div>
            <div class="font-semibold">Weight: {{weight}} kg</div>
            <div class="font-semibold">Gender: {{gender}}</div>
            <div class="font-semibold">Activity level: {{activity_level}}</div>
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
    import { toTitleCase } from "@/utils/common";

    const route: Route = useRoute();
    const username: Ref<string> = ref("");
    const age: Ref<string> = ref("");
    const height: Ref<string> = ref("");
    const weight: Ref<string> = ref("");
    const gender: Ref<string> = ref("");
    const activity_level: Ref<string> = ref("");
    const online: Ref<boolean> = ref(false);
    const offline: Ref<boolean> = ref(false);

    onMounted(() => {
        fetch(`${BACKEND_URL}/api/v1/user_info/id/${route.params.user_id}`)
            .then(response => response.json())
            .then(data => {
                online.value = true;
                if (!data.error) {
                    username.value = data["username"];
                    age.value = data["age"];
                    height.value = data["height"];
                    weight.value = data["weight"];
                    gender.value = (data["gender"] == "f" ? "Female" : "Male");
                    activity_level.value = toTitleCase(data["activity_level"]);
                }
                else
                    console.error(data.error);
            })
            .catch(err => {
                offline.value = true;
                console.error(err);
            });
    })

</script>

