<template>
    <input
        class="wrapper-input"
        v-model="inputValue"
        :placeholder="placeholder"
        @input="emitInput"
    />
</template>

<script>
export default {
    props: {
        value: String,
        placeholder: String,
    },
    data() {
        return {
            inputValue: this.value,
        };
    },
    methods: {
        emitInput() {
            this.$emit("input", this.inputValue);
        },
    },
};
</script>

<style scoped>
.wrapper-input {
    cursor: pointer;
    font-size: 16px;
    padding: 10px;
    border-radius: 0.2rem;
    border: none;
    outline: none;
}
</style>
