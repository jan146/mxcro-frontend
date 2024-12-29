<template>
    <div class="w-full flex gap-4">
        <div>
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
        <div class="grid grid-cols-3 gap-0 custom-border">
            <div class="col-span-1 custom-border">Arrow left</div>
            <div class="col-span-1 custom-border">{{date}}</div>
            <div class="col-span-1 custom-border">Arrow right</div>
            <div class="col-span-2 row-span-3">
                <div class="col-span-2 custom-border">Arrow up</div>
                <div class="col-span-2 custom-border">Entry</div>
                <div class="col-span-2 custom-border">Entry</div>
                <div class="col-span-2 custom-border">Entry</div>
                <div class="col-span-2 custom-border">Arrow down</div>
            </div>
            <div class="col-span-1 row-span-3 bg-green-400 custom-border">Add entry</div>
            <!-- <div class="col-span-3 bg-red-200 custom-border">Footer</div> -->
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
    const date: string = new Date().toLocaleString("en-GB", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

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

<style scoped>
.custom-border {
  @apply border border-2 border-gray-100;
}
</style>
