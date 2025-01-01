<template>
    <div class="border-4 border-white rounded-lg p-2 w-full">
        <div v-for="nutrient in NUTRIENTS_ORDERED" class="relative">
            <div class="text-white font-medium">
                {{toTitleCase(nutrient)}}
            </div>
            <div class="flex justify-end w-full absolute top-0 left-0 text-white">
                {{getNutrientSummed(nutrient).toFixed(1)}}/{{NUTRIENTS_RDA[nutrient]}} ({{getNutrientPercentage(nutrient)}})
            </div>
            <div class="border-2 border-white mb-2 h-4 rounded-xl">
                <div class="h-full rounded-xl" :style="{ maxWidth: getNutrientPercentage(nutrient), backgroundColor: getBarColor(nutrient) }"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { toTitleCase } from '@/utils/common';
    import { NUTRIENTS_ORDERED, NUTRIENTS_RDA } from '@/utils/constants';

    const props = defineProps({
        loggedItems: { type: Array<object>, required: true },
    });

    function getNutrientSummed(nutrient: string): number {
        let sum: number = 0;
        for (const loggedItem of props.loggedItems)
            sum += loggedItem[nutrient];
        return sum;
    }

    function getNutrientPercentage(nutrient: string): string {
        return (100*getNutrientSummed(nutrient)/NUTRIENTS_RDA[nutrient]).toFixed(1) + "%";
    }

    function getBarColor(nutrient: string): string {
        const percentage: number = 100*getNutrientSummed(nutrient)/NUTRIENTS_RDA[nutrient];
        if (percentage <= 100)
            return "white";
        if (percentage <= 115)
            return "yellow";
        if (percentage <= 130)
            return "orange";
        return "red";
    }

</script>

