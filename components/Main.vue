<template>
    <div class="main">
        <Filter :tags="tags" @filter-tasks="filterTasks"/>
        <div class="board-container">
            <Boards title="未対応" :tasks="taskProp" :position="positions[0]" :filterLength="filterLength" @reorder-tasks="reOrderTask">
                <template v-slot:modal>
                    <Modal value="課題の追加..." :tags="tags" @create-tag="createTag" @create-task="createTask" :position="positions[0]" :tasks="tasks"/>
                </template>
            </Boards>
            <Boards title="処理中" :tasks="taskProp" :position="positions[1]" :filterLength="filterLength" @reorder-tasks="reOrderTask">
                <template v-slot:modal>
                    <Modal value="課題の追加..." :tags="tags" @create-tag="createTag" @create-task="createTask" :position="positions[1]" :tasks="tasks"/>
                </template>
            </Boards>
            <Boards title="レビュー中" :tasks="taskProp"  :position="positions[2]" :filterLength="filterLength" @reorder-tasks="reOrderTask">
                <template v-slot:modal>
                    <Modal value="課題の追加..." :tags="tags" @create-tag="createTag" @create-task="createTask" :position="positions[2]" :tasks="tasks"/>
                </template>
            </Boards>
            <Boards title="完了" :tasks="taskProp" :position="positions[3]" :filterLength="filterLength" @reorder-tasks="reOrderTask">
                <template v-slot:modal>
                    <Modal value="課題の追加..." :tags="tags" @create-tag="createTag" @create-task="createTask" :position="positions[3]" :tasks="tasks"/>
                </template>
            </Boards>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    export default defineComponent({
        data() {
            const tags = ref([]);
            const tasks = ref([]);
            const filteredTask = ref([]);
            const filterLength = 0
            const positions = [1, 2, 3, 4]
            return{
                tags,
                tasks,
                filteredTask,
                filterLength,
                positions
            }
        },

        watch: {
            tags: {
                deep: true,
                handler(newTag) {
                    localStorage.setItem('tags', JSON.stringify(newTag))
                }
            },
            tasks: {
                deep: true,
                handler(newTask) {
                    localStorage.setItem('tasks', JSON.stringify(newTask))
                }
            },
            filteredTask: {
                deep: true,
                handler(newTask) {
                    localStorage.setItem('filteredTask', JSON.stringify(newTask))
                }
            },
        },

        methods: {
            filterTasks(filters) {
                this.filterLength = filters.length
                this.filteredTask = []
                let trueCount = []
                for (let i = 0; i < this.tasks.length; i++) {
                    trueCount[i] = 0
                }
                filters.forEach((filter, index) => {
                    for(let i = 0; i < this.tasks.length; i++) {
                        for(let j = 0; j < this.tasks[i].tags.length; j++) {
                            if(filter.title == this.tasks[i].tags[j].title) {
                                trueCount[i]++
                            }
                        }
                    }
                })

                trueCount.forEach((value, index) => {
                    if(value == filters.length) {
                        this.filteredTask.push(this.tasks[index])
                    }
                })
            },

            createTag(params) {
                this.tags.push({
                    title : params
                })
            },

            createTask(params) {
                this.tasks.push({
                    title: params.title,
                    tags: params.tags,
                    position: params.position
                })
            },

            reOrderTask(params) {
                this.tasks = [];
                params.forEach(task => {
                    this.tasks.push(task)
                })
                // console.log(params[0])
            }
        },

        computed: {
            taskProp() {
                if(this.filterLength > 0) {
                    return this.filteredTask
                }
                return this.tasks
            }
        },

        mounted() {
            this.tasks = JSON.parse(localStorage.getItem('tasks')) || []
            this.tags = JSON.parse(localStorage.getItem('tags')) || []
            this.filteredTask = JSON.parse(localStorage.getItem('filteredTask')) || []
            this.taskProp
        }
    })
</script>

<style>
    .main > * {
        margin: 0 58px;
    }
    
    .board-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 40px;
        margin-top: 40px;
    }

    .board-container > .board {
        min-width: 250px;
        width: 100%;
        margin-bottom: 10px;
    }
</style>