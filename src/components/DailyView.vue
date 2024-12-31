<template>
    <div class="w-80 h-80">
        <div class="size-full" v-if="addItemShown">
            <AddItem @add-item-toggle="addItemToggle" />
        </div>
        <div class="size-full" v-else>
            <DailyViewCalendar @add-item-toggle="addItemToggle" :loggedItems="props.loggedItems" @update-logged-items="updateLoggedItemsProxy" />
        </div>
    </div>
</template>

<script setup lang="ts">

    import { defineEmits } from 'vue';
    import { ref, type Ref } from 'vue';
    import AddItem from './AddItem.vue';
    import DailyViewCalendar from './DailyViewCalendar.vue';

    let addItemShown: Ref<boolean> = ref(false);
    const emit = defineEmits({
        updateLoggedItems: (from_date: Date, to_date: Date) => {
            return (from_date instanceof Date && to_date instanceof Date);
        },
    });
    const props = defineProps({
        loggedItems: { type: Array<object>, required: true },
    });

    function addItemToggle() {
        addItemShown.value = !addItemShown.value;
    }

    function updateLoggedItemsProxy(from_date: Date, to_date: Date) {
        emit("updateLoggedItems", from_date, to_date);
    }

</script>
