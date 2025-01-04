<template>
    <div class="w-full flex gap-4 justify-center relative">
        <button @click="logOut" class="absolute top-0 left-0 hover:bg-zinc-700 size-12 flex justify-center items-center rounded-lg">
            <svg-icon class="text-white" type="mdi" :path="mdiArrowLeft"></svg-icon>
        </button>
        <DeleteUser />
        <div class="w-1/3">
            <UserInfo />
            <DailyView class="mt-4" :loggedItems="loggedItems" :loggedItemsSelected="loggedItemsSelected" @update-logged-items="updateLoggedItems" @toggle-item="toggleItem" @clear-item-selection="clearItemSelection" />
        </div>
        <div class="w-1/3">
            <Summary :loggedItems="loggedItems" :loggedItemsSelected="loggedItemsSelected" />
        </div>
    </div>
</template>

<script setup lang="ts">

    import DailyView from "@/components/DailyView.vue";
    import UserInfo from "@/components/UserInfo.vue";
    import Summary from "@/components/Summary.vue";
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiArrowLeft } from '@mdi/js';
    import { useRoute, type RouteLocationNormalizedLoaded as Route, useRouter, type Router } from "vue-router";
    import { onMounted, reactive, type Reactive } from 'vue';
    import { BACKEND_URL } from '@/utils/constants';
    import DeleteUser from "@/components/DeleteUser.vue";

    const router: Router = useRouter();
    const route: Route = useRoute();
    let loggedItems: Reactive<Array<object>> = reactive([]);
    let loggedItemsSelected: Reactive<Array<object>> = reactive([]);

    function logOut() {
        router.push({ name: "home" });
    }

    function toggleItem(loggedItem: object) {
        const index: number = loggedItemsSelected.indexOf(loggedItem);
        if (index < 0)
            loggedItemsSelected.push(loggedItem);
        else
            loggedItemsSelected.splice(index, 1);
    }

    function clearItemSelection() {
        loggedItemsSelected.splice(0, loggedItemsSelected.length);
    }

    function updateLoggedItems(fromDate: Date, toDate: Date) {
        fetch(`${BACKEND_URL}/api/v1/logged_item/user/${route.params.user_id}` + "?" + new URLSearchParams({
            from: fromDate.toLocaleDateString(),
            to: toDate.toLocaleDateString(),
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
            });
    }

    onMounted(() => {
        updateLoggedItems(new Date(), new Date());
    })

</script>

