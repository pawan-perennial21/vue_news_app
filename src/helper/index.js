import countries from "../utils/index.json";
console.log("countries", countries);
export const getPublishDate = (date) => {
    return date?.split("T")[0].replaceAll("-", "/");
};

export function getCountryCode(countryName) {
    if (countryName) {
        let code = countries.filter((country) => {
            if (country.name === countryName) {
                return country;
            }
        });
        return code[0]?.code.toLowerCase();
    }
    return "";
}
