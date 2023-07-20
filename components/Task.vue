<template>
    <div class="task-item">
        <h5>{{ title }}</h5>
        <div class="selected-tag-list">
            <Tag v-for="tag in tags" :title="tag.title"/>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    export default defineComponent({
        props: {
            title: String,
            tags: Object
        }
    })

</script>

<style>

</style>