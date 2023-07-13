<template>
    <div class="main">
        <Filter />
        <div class="board-container">
            <Boards title="未対応">
                <Button value="課題の追加..." variant="btn-modal" />
            </Boards>
            <Boards title="処理中">
                <Button value="課題の追加..." variant="btn-modal" />
            </Boards>
            <Boards title="レビュー中">
                <Button value="課題の追加..." variant="btn-modal" />
            </Boards>
            <Boards title="完了">
                <Button value="課題の追加..." variant="btn-modal" />
            </Boards>
        </div>
    </div>
</template>

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