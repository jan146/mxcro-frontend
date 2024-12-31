<template>
    <div>
        <div v-for="nutrient in NUTRIENTS_ORDERED">
            {{toTitleCase(nutrient)}}: {{get_nutrient_summed(nutrient).toFixed(1)}}/{{NUTRIENTS_RDA[nutrient]}} ({{(100*get_nutrient_summed(nutrient).toFixed(1)/NUTRIENTS_RDA[nutrient]).toFixed(1)}}%)
        </div>
    </div>
</template>

<script setup lang="ts">

    import { toTitleCase } from '@/utils/common';
    import { NUTRIENTS_ORDERED, NUTRIENTS_RDA } from '@/utils/constants';

    const props = defineProps({
        loggedItems: { type: Array<object>, required: true },
    });

    function get_nutrient_summed(nutrient: string): number {
        let sum: number = 0;
        for (const loggedItem of props.loggedItems)
            sum += loggedItem[nutrient];
        return sum;
    }

</script>

