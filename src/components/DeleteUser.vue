<template>
    <button @click="deleteUser" class="absolute top-0 right-0 border-2 border-red-600 p-2 rounded-lg font-semibold text-red-600 hover:bg-red-600 hover:text-white transition duration-200">
        Delete User
    </button>
</template>

<script setup lang="ts">

    import { useRoute, type RouteLocationNormalizedLoaded as Route, useRouter, type Router } from "vue-router";
    import { BACKEND_URL } from '@/utils/constants';

    const route: Route = useRoute();
    const router: Router = useRouter();

    function deleteUser() {
        fetch(`${BACKEND_URL}/api/v1/user_info/id/${route.params.user_id}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            if (data.error)
                console.error(data);
            else
                router.push({ name: "home" });
        })
        .catch(err => console.error(err));
    }

</script>

