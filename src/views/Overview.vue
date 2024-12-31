<template>
    <div class="w-full flex gap-4 justify-center">
        <div class="w-1/3">
            <UserInfo />
            <DailyView class="mt-4" :loggedItems="loggedItems" @update-logged-items="updateLoggedItems" />
        </div>
        <div class="w-1/3">
            <Summary />
        </div>
    </div>
</template>

<script setup lang="ts">

    import DailyView from "@/components/DailyView.vue";
    import UserInfo from "@/components/UserInfo.vue";
    import Summary from "@/components/Summary.vue";
    import { useRoute, type RouteLocationNormalizedLoaded as Route } from "vue-router";
    import { onMounted, reactive, type Reactive } from 'vue';
    import { BACKEND_URL } from '@/utils/constants';

    const route: Route = useRoute();
    let loggedItems: Reactive<Array<object>> = reactive([]);

    function updateLoggedItems(from_date: Date, to_date: Date) {
        fetch(`${BACKEND_URL}/logged_item/${route.params.user_id}` + "?" + new URLSearchParams({
            from: from_date.toLocaleDateString(),
            to: to_date.toLocaleDateString(),
        }).toString())
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    // Clear list
                    loggedItems.splice(0, loggedItems.length);
                    // Update list with fetched items
                    loggedItems.push(...data.logged_items);
                }
                else
                    console.error(data.error);
            })
            .catch(err => {
                console.error(err);
            })
    }

    onMounted(() => {
        updateLoggedItems(new Date(), new Date());
    })

</script>

