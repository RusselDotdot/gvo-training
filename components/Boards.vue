<template>
    <div class="board" @drop="onDrop($event, position)" @dragenter.prevent @dragover.prevent>
        <h3 class="title">{{ title }} <span class="task-count">{{ newTasks.length }}</span></h3>
        <div class="card-group">
            <slot name="modal"></slot>

            <div class="task-list">
                <Task v-for="task in newTasks" :title="task.title" :tags="task.tags" draggable="true" @dragstart="startDrag($event, task.title)"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        props: {
            title: String,
            tasks: Object,
            position: Number
        },

        data() {
            // const newTasks = ref([])
            return {
                // newTasks
            }
            
        },

        computed: {
            newTasks() {
                const newTasks = this.tasks.filter((task) => {
                    return task.position == this.position
                })
                return newTasks
            }
        },

        mounted() {
            // this.newTasks
        },

        methods: {
            startDrag(event, taskTitle) {
                // console.log(taskTitle)
                event.dataTransfer.dropEffect = 'move'
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.setData('taskTitle', taskTitle)
            },

            onDrop(event, dropPos) {
                const taskTitle = event.dataTransfer.getData('taskTitle')
                this.tasks.forEach((task, index) => {
                    if(task.title == taskTitle) {
                        this.tasks[index].position = dropPos
                    }
                })

            }
        }

    })
</script>

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

    .task-item {
        border: 1px solid #C1C1C1;
        margin-bottom: 6px;
        min-height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 2px;
    }

    .task-item > * {
        margin: 7px 11px;
    }

    .task-item h5 {
        font-size: 12px;
    }

    .selected-tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
    }

    .task-count {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 21px;
        background: #D9D9D9;
        border-radius: 15px;
        margin-left: 4px;
    }

</style>