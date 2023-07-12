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