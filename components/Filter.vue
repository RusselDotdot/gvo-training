<template>
    <div class="filter">
        <label for="">タグ</label><br/>
        <select name="" id="">
            <option value=""></option>
        </select>
    </div>
</template>

<style>
    .filter label {
        font-size: 14px;
    }

    .filter select {
        border: none;
        width: 150px;
        height: 30px;
        display: flex;
        align-items: center;
        border-radius: 3px;
        overflow: hidden;
        background: url(../assets/images/arr-down.png) no-repeat center right 5%, #FFFFFF;
        appearance: none;
    }
    
    .filter select:focus {
        border: none;
        outline: none;
    }
</style>