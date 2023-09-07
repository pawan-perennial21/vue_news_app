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
        value: String, // Value passed to the input
        placeholder: String,
    },
    data() {
        return {
            inputValue: this.value, // Local data for input value
        };
    },
    methods: {
        emitInput() {
            this.$emit("input", this.inputValue); // Emit input event with updated value
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
