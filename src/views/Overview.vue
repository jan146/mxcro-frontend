<template>
    <div class="w-full flex gap-4 justify-center">
        <div class="w-1/3">
            <UserInfo />
            <DailyView class="mt-4" />
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
</script>

