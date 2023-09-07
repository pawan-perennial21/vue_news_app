<template>
    <div class="dropdown" :class="{ open: isOpen }">
        <div class="dropdown-toggle" @click="toggleDropdown">
            {{ selected ? selected : defaultVal }}
        </div>
        <div class="dropdown-menu">
            <input
                type="text"
                v-model="searchTerm"
                id="input"
                placeholder="Search..."
                ref="refInput"
                v-if="showSearchBar"
            />

            <div
                v-for="(option, index) in filteredOptions"
                :key="'option-' + index"
                class="dropdown-item"
                @click="selectOption(option)"
            >
                {{ option }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Dropdown",
    props: ["options", "value", "showSearchBar", "defaultVal"],
    data() {
        return {
            selected: this.value,
            isOpen: false,
            searchTerm: "",
        };
    },
    watch: {
        value(newValue) {
            this.selected = newValue;
        },
    },
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener(
            "click",
            this.handleClickOutside
        );
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
            this.$nextTick(() => {
                this.$refs.refInput?.focus();
            });
        },
        selectOption(option) {
            this.selected = option;
            this.$emit("input", option);
            this.isOpen = false;
        },
        handleClickOutside(event) {
            if (this.$el && !this.$el.contains(event.target)) {
                this.isOpen = false;
            }
        },
    },
    computed: {
        filteredOptions() {
            return this.searchTerm
                ? this.options.filter((el) =>
                      el
                          .toLowerCase()
                          .includes(this.searchTerm.toLowerCase())
                  )
                : this.options;
        },
    },
};
</script>

<style>
.dropdown {
    position: relative;
    min-width: 250px;
    margin: 14px;
}

.dropdown-toggle {
    cursor: pointer;
    font-size: 16px;
    padding: 10px;
    border-radius: 0.2rem;
    background-color: rgb(255, 255, 255);
    text-align: left;
}

.dropdown-toggle::after {
    content: "▾";
    float: right;
}

.dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    padding: 0.5rem 0;
    margin: 0;
    border: 1px solid #ccc;
    min-width: 249px;
    font-size: 1.2rem;
    border-radius: 0.2rem;
    background-color: rgb(255, 255, 255);
    height: 240px;
    overflow: auto;
}

.open .dropdown-menu {
    display: block;
}

.dropdown-item {
    cursor: pointer;
    padding: 0.25rem 1rem;
    text-align: left;
    margin-top: 4px;
}

.dropdown-item:hover {
    background-color: grey;
}

.select-dropdown,
.select-dropdown * {
    margin: 0;
    padding: 0;
    position: relative;
    box-sizing: border-box;
}
.select-dropdown {
    position: relative;
    background-color: #e6e6e6;
    border-radius: 4px;
}

.select-dropdown select {
    font-size: 1rem;
    font-weight: normal;
    max-width: 100%;
    padding: 8px 24px 8px 10px;
    border: none;
    background-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.select-dropdown select:active,
.select-dropdown select:focus {
    outline: none;
    box-shadow: none;
}

.select-dropdown:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 8px;
    width: 0;
    height: 0;
    margin-top: -2px;
    border-top: 5px solid #aaa;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
}

#input {
    box-sizing: border-box;
    background-position: 14px 12px;
    background-repeat: no-repeat;
    font-size: 16px;
    padding: 10px 7px 10px 7px;
    border: none;
    border-bottom: 1px solid #ddd;
}

#input:focus {
    outline: 3px solid #ddd;
}

@media only screen and (max-width: 820px) {
    .dropdown {
        min-width: 340px;
    }

    .dropdown-menu {
        min-width: 338px;
    }

    #input {
        width: 300px;
    }

    .dropdown-toggle {
        padding: 8px 12px;
    }
}

@media only screen and (max-width: 768px) {
    .dropdown {
        min-width: 340px;
    }

    .dropdown-menu {
        min-width: 338px;
    }

    #input {
        width: 300px;
    }
}

@media only screen and (max-width: 360px) {
    .dropdown {
        min-width: 100%;
    }

    .dropdown-menu {
        min-width: 100%;
    }

    #input {
        width: 90%;
    }

    .dropdown-toggle {
        padding: 8px 4px;
    }
}
</style>
