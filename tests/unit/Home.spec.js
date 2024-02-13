import { mount } from "@vue/test-utils";
import { expect } from "chai";
import NewsView from "../../src/views/Home.vue";
import store from "../../src/store";

const mockNews = [
    {
        source: {
            id: "rtl-nieuws",
            name: "RTL Nieuws",
        },
        author: "RTL Nieuws",
        title: "Nederlandse orkesten niet in de prijzen bij Grammy Awards",
        description:
            "Het Metropole Orkest en het Radio Filharmonisch Orkest zijn vannacht niet in de prijzen gevallen tijdens de uitreiking van de Grammy Awards. Het Metropole was genomineerd in de categorie Best Large Jazz Ensemble Album met het album Olympians. Het Radio Filhar…",
        url: "https://www.rtlnieuws.nl/nieuws/buitenland/artikel/5433177/nederlandse-orkesten-niet-de-prijzen-bij-grammy-awards",
        urlToImage:
            "https://www.rtlnieuws.nl/sites/default/files/content/images/2024/02/05/ANP-490280362.jpg?itok=DSiI2Z2c&offsetX=0&offsetY=0&cropWidth=1280&cropHeight=720&width=2048&height=1152&impolicy=dynamic",
        publishedAt: "2024-02-05T02:42:37+00:00",
        content:
            "Het Metropole legde het af tegen het The Count Basie Orchestra, dat won met Basie Swings The Blues. De prijs waar het Radio Filharmonisch Orkest kans op maakte, ging naar het Los Angeles Philharmonic… [+265 chars]",
    },
    {
        source: {
            id: "breitbart-news",
            name: "Breitbart News",
        },
        author: "Bradley Jaye",
        title: "'Internet Rumors' Proven True: Border Bill to Allow 8,500 Migrants per Day",
        description:
            'The authors of the border bill assured it would not permit 5,000 migrants or more per day, attributing those claims as "internet rumors."',
        url: "http://www.breitbart.com/politics/2024/02/04/internet-rumors-proven-true-border-bill-allow-8500-migrants-day/",
        urlToImage:
            "https://media.breitbart.com/media/2022/09/AP22241152762345-640x335.png",
        publishedAt: "2024-02-05T02:19:45Z",
        content:
            "Sometimes you can believe what you read on the internet.\r\nThe authors of the border bill repeatedly assured Americans that their bill would not permit 5,000 migrants or more per day, attributing thos… [+2091 chars]",
    },
];

function mountNewsView() {
    return mount(NewsView, {
        global: {
            plugins: [store],
        },
    });
}

describe("Home", () => {
    it('renders "No news found" when there are no news articles', async () => {
        const wrapper = mountNewsView();
        expect(wrapper.find(".no-data").exists()).to.be.true;
    });

    it("renders news grid when there are news articles", async () => {
        await store.dispatch("fetchAllData", mockNews);
        const wrapper = mountNewsView();
        expect(wrapper.find(".news-list").exists()).to.be.true;
    });
});
