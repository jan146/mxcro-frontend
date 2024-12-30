<template>
    <div v-if="addItemShown">
        <AddItem :addItemShown @add-item-toggle="addItemToggle" />
    </div>
    <div v-else>
        <DailyViewCalendar :addItemShown @add-item-toggle="addItemToggle" />
    </div>
</template>

<script setup lang="ts">

    import { ref, type Ref } from 'vue';
    import AddItem from './AddItem.vue';
    import DailyViewCalendar from './DailyViewCalendar.vue';

    let addItemShown: Ref<boolean> = ref(false);

    function addItemToggle() {
        addItemShown.value = !addItemShown.value;
    }

</script>
