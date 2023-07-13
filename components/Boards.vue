<script setup>
    defineProps({
        title: String
    })
</script>

<template>
    <div class="board">
        <h3 class="title">{{ title }}</h3>
        <div class="card-group">
            <slot></slot>
        </div>
    </div>
</template>

<style>
    .title {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .title::before {
        content: "";
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin-right: 8px;
    }

    .board:nth-of-type(1) .title::before {
        background: #ED8077;
    }

    .board:nth-of-type(2) .title::before {
        background: #4487C5;
    }

    .board:nth-of-type(3) .title::before {
        background: #5EB5A6;
    }

    .board:nth-of-type(4) .title::before {
        background: #A1AF2F;
    }
    
    .card-group {
        height: 574px;
        width: 100%;
        background: #FFFFFF;
        border-radius: 3px;
        overflow: auto;
    }

    .card-group > * {
        margin: 6px 10px;
    }
</style>