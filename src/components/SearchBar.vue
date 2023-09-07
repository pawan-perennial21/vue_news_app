<template>
    <!-- <div class="drop-down">
        <DropDown
            :options="dropdownOptions"
            @selected="handleSelected"
        ></DropDown>
    </div> -->
    <div class="search-container">
        <div class="search-bar">
            <DropDown
                :options="countryList"
                v-model="selectedOption"
                placeholder="Choose a option"
                defaultVal="Choose country"
                :showSearchBar="true"
            />
            <DropDown
                :options="CategoryOptions"
                defaultVal="Choose category"
                v-model="selectedCategory"
                placeholder="Choose category"
            />
            <!-- <input
                type="text"
                placeholder="keywords (optional)"
                v-model="textInputMessage"
                class="search-inputbox"
            /> -->
            <Input
                v-model="textInputMessage"
                placeholder="Search..."
            />
        </div>
        <div class="search-reset-btn">
            <!-- <button
                class="search-button search"
                @click="handleSearch()"
            ></button> -->
            <img
                src="../assets/search.png"
                @click="handleSearch()"
                class="search-button"
            />
        </div>
        <div>
            <img
                src="../assets/arrows-circle.png"
                class="reset-button"
                @click="handleReset()"
            />
        </div>
    </div>
</template>

<script>
import DropDown from "./DropDown.vue";
import Input from "./Input.vue";
import countries from "../utils/index.json";
import { mapActions } from "vuex";
export default {
    components: {
        DropDown,
        Input,
    },
    data() {
        return {
            textInputMessage: this.$store.state.textInputMessage,
            selectedOption: this.$store.state.selectedCountry,
            selectedCategory: this.$store.state.selectedCategory,
        };
    },
    methods: {
        ...mapActions(["fetchTopHeading", "getNewsList"]),
        handleSelected(option) {
            console.log("Selected:", option);
            // You can perform any additional actions when an option is selected
        },

        handleSearch() {
            if (
                this.textInputMessage == "" &&
                this.selectedOption == "" &&
                this.selectedCategory == ""
            ) {
                this.getNewsList();
            } else {
                this.fetchTopHeading({
                    country: this.selectedOption,
                    category: this.selectedCategory,
                    keyword: this.textInputMessage,
                });
            }
        },
        handleReset() {
            this.selectedOption = "";
            this.textInputMessage = "";
            this.selectedCategory = "";
        },
    },
    watch: {
        textInputMessage() {
            this.$store.commit(
                "setTextInputMessage",
                this.textInputMessage
            );
        },
        selectedOption() {
            this.$store.commit(
                "setSelectedOption",
                this.selectedOption
            );
        },
        selectedCategory() {
            this.$store.commit(
                "setSelectedCategory",
                this.selectedCategory
            );
        },
    },

    computed: {
        filteredItems() {
            // Filter items based on the search query
            return this.items.filter((item) =>
                item.name
                    .toLowerCase()
                    .includes(this.searchQuery.toLowerCase())
            );
        },
        countryList() {
            let countryNamelist = countries.map(
                (country) => country.name
            );
            return countryNamelist;
        },
    },
};
</script>

<style scoped>
.search-container {
    padding: 4px 10%;
    display: flex;
    gap: 0;
    justify-content: center;
    background: #61677a;
}
.search-bar {
    display: flex;
    align-items: center;
}
.search-reset-btn {
    display: flex;
    align-items: center;
    position: relative;
}
.search-button {
    /* background-color: #333; */
    position: absolute;
    /* padding: 2px; */
    border: none;
    top: 23px;
    right: 10px;
    border-radius: 4px;
    cursor: pointer;
    height: 22px;
    width: 22px;
}
.reset-button {
    position: relative;
    height: 22px;
    width: 22px;
    top: 20px;
    left: 10px;
    cursor: pointer;
}
</style>
