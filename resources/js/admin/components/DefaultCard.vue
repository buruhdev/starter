<template>
    <div class="card">
        <div class="card-header">{{ title }}</div>
        <div class="card-body">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";

export default defineComponent({
   name: "DefaultCard",
   props: {
       title: {
           required: true,
           type: String as PropType<string>
       }
   }
});
</script>
