<template>
    <div class="about">
        <h1>This is the overview page for user with user_id: {{$route.params.user_id}}</h1>
        <div>
            Username: {{username}}
            Age: {{age}}
            Height: {{height}} cm
            Weight: {{weight}} kg
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

    onMounted(() => {
        fetch(`${BACKEND_URL}/user_info/${route.params.user_id}`)
            .then(response => response.json())
            .then(data => {
                username.value = data["username"];
                age.value = data["age"];
                height.value = data["height"];
                weight.value = data["weight"];
            })
            .catch(err => console.error(err))
    })

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
