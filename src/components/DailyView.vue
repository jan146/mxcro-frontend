<template>
    <div class="w-80 h-80">
        <div class="size-full" v-if="addItemShown">
            <AddItem @add-item-toggle="addItemToggle" />
        </div>
        <div class="size-full" v-else>
            <DailyViewCalendar @add-item-toggle="addItemToggle" :loggedItems="loggedItems" @update-logged-items="updateLoggedItems" />
        </div>
    </div>
</template>

<script setup lang="ts">

    import { useRoute, type RouteLocationNormalizedLoaded as Route } from "vue-router";
    import { ref, type Ref, onMounted, reactive, type Reactive } from 'vue';
    import AddItem from './AddItem.vue';
    import DailyViewCalendar from './DailyViewCalendar.vue';
    import { BACKEND_URL } from '@/utils/constants';

    const route: Route = useRoute();
    let addItemShown: Ref<boolean> = ref(false);
    let loggedItems: Reactive<Array<object>> = reactive([]);

    function addItemToggle() {
        addItemShown.value = !addItemShown.value;
    }

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
