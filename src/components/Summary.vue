<template>
    <div class="border-4 border-white rounded-lg p-2 w-full">
        <div v-for="nutrient in NUTRIENTS_ORDERED" class="relative">
            <div class="text-white font-medium">
                {{toTitleCase(nutrient)}}
            </div>
            <div v-if="Object.keys(daily_rda).length > 0" class="flex justify-end w-full absolute top-0 left-0 text-white">
                {{getNutrientSummed(nutrient).toFixed(1)}}/{{Math.round(daily_rda[nutrient])}} ({{getNutrientPercentage(nutrient)}})
            </div>
            <div v-if="Object.keys(daily_rda).length > 0" class="border-2 border-white mb-2 h-4 rounded-xl">
                <div class="h-full rounded-xl" :style="{ maxWidth: getNutrientPercentage(nutrient), backgroundColor: getBarColor(nutrient) }"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { useRoute, type RouteLocationNormalizedLoaded as Route } from "vue-router";
    import { toTitleCase } from '@/utils/common';
    import { BACKEND_URL, NUTRIENTS_ORDERED } from '@/utils/constants';
    import { onMounted, reactive, type Reactive } from 'vue';

    const route: Route = useRoute();
    const props = defineProps({
        loggedItems: { type: Array<object>, required: true },
        loggedItemsSelected: { type: Array<object>, required: true },
    });

    let daily_rda: Reactive<{ [key: string]: number }> = reactive({});

    onMounted(() => {
        fetch(`${BACKEND_URL}/api/v1/user_info/daily_rda/${route.params.user_id}`)
        .then(response => response.json())
        .then(data => {
            if (data.error)
                console.error(data.error);
            else {
                for (const key in data)
                    daily_rda[key] = data[key];
            }
        })
        .catch(err => console.error(err));
    });

    function getNutrientSummed(nutrient: string): number {
        let sum: number = 0;
        const loggedItems_: Array<object> = props.loggedItemsSelected.length === 0 ? props.loggedItems : props.loggedItemsSelected;
        for (const loggedItem of loggedItems_)
            sum += loggedItem[nutrient];
        return sum;
    }

    function getNutrientPercentage(nutrient: string): string {
        return (100*getNutrientSummed(nutrient)/daily_rda[nutrient]).toFixed(1) + "%";
    }

    function getBarColor(nutrient: string): string {
        const percentage: number = 100*getNutrientSummed(nutrient)/daily_rda[nutrient];
        if (percentage <= 100)
            return "white";
        if (percentage <= 115)
            return "yellow";
        if (percentage <= 130)
            return "orange";
        return "red";
    }

</script>

