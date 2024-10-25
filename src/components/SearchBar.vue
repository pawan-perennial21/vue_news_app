<template>
    <div class="search-conatiner">
        <div class="dropdown-boxes">
            <div class="country-list">
                <select
                    class="select-style"
                    name="country"
                    v-model="SearchCountry"
                >
                    <option value="">Select Country</option>
                    <option
                        v-for="(list, key) in countryList"
                        :value="list"
                        :key="key"
                        :selected="
                            key == SearchCountry ? true : false
                        "
                    >
                        {{ list }}
                    </option>
                </select>
            </div>
            <div class="category-list">
                <select
                    class="select-style"
                    name="category"
                    v-model="SearchCategory"
                >
                    <option value="">Select Category</option>
                    <option
                        :value="list"
                        v-for="(list, key) in categoryData"
                        :key="key"
                    >
                        {{ list }}
                    </option>
                </select>
            </div>
            <div class="keywords-input">
                <input
                    class="select-style setbox-input"
                    type="text"
                    placeholder="keywords (optional)"
                    v-model="SearchQuery"
                />
            </div>
        </div>
        <div class="search-btn">
            <div class="cta-btn" @click="handelSearch">
                <img src="../assets/search.png" alt="search" />
            </div>
            <div class="cta-btn" @click="handleReset">
                <img src="../assets/arrows-circle.png" alt="reset" />
            </div>
        </div>
    </div>
</template>
<script>
import countries from "../utils/countries.json";
import { categories } from "../utils/category.json";
export default {
    data() {
        return {
            countryData: countries,
            categoryData: categories,
            SearchQuery: "",
            SearchCountry: "",
            SearchCategory: "",
        };
    },
    computed: {
        countryList() {
            let countryNamelist = countries.map(
                (country) => country.name
            );
            return countryNamelist;
        },
    },
    methods: {
        handelSearch() {
            const payload = {
                searchQuery: this.SearchQuery,
                searchCountry: this.SearchCountry,
                searchCategory: this.SearchCategory,
            };
            if (
                this.SearchQuery === "" &&
                this.SearchCountry === "" &&
                this.SearchCategory === ""
            ) {
                this.$store.dispatch("fetchAllData");
            } else {
                this.$store.dispatch("updatePageSize", 6);
                this.$emit("getSearchParams", payload);
            }
        },
        handleReset() {
            (this.SearchQuery = ""),
                (this.SearchCountry = ""),
                (this.SearchCategory = "");
            this.$store.dispatch("fetchAllData");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
    },
};
</script>

<style>
.search-conatiner {
    width: 100%;
    padding: 20px;
    background: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
.dropdown-boxes {
    display: flex;
    align-content: center;
    gap: 20px;
}
select,
input {
    width: 200px;
    height: 35px;
    padding: 5px 15px;
    border: none;
    outline: none;
    border-radius: 8px;
}
select{
     border-right: 8px solid transparent
}

.search-btn {
    display: flex;
}
.cta-btn {
    background: #64ccc5;
    padding: 5px;
    margin-left: 15px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.cta-btn > img {
    width: 23px;
    height: 23px;
    border: none;
    outline: none;
    border-radius: 8px;
}

@media (max-width: 698px) {
    .search-conatiner {
        display: flex;
        flex-direction: column;
    }
    .dropdown-boxes {
        display: flex;
        flex-direction: column;
    }
}
</style>
