import countries from "../utils/countries.json";

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
