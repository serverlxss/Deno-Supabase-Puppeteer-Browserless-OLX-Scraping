// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import puppeteer from "https://deno.land/x/puppeteer@9.0.1/mod.ts";

serve(async () => {
  let BROWSERLESS_TOKEN_EXAMPLE = "abc123";
  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint:
        `wss://chrome.browserless.io?token=${Deno.env.get("BROWSERLESS_TOKEN") || BROWSERLESS_TOKEN_EXAMPLE}`,
    });
    const page = await browser.newPage();
    await page.goto("https://www.olx.com.br/");

    await page.waitForSelector("#searchtext-input");
    await page.click("#searchtext-input");

    await page.waitForSelector("#searchtext-input");
    await page.type("#searchtext-input", "Honda Civic");

    await page.waitForSelector("#searchtext-input");
    await page.keyboard.press("Enter");

    // Wait for the DOMContentLoaded event
    await page.waitForNavigation({ waitUntil: "domcontentloaded" });

    // Iterate over cars
    const cars = await page.$$eval("ul#ad-list > li", (nodes) => {
      const selectors = {
        name: ".kgl1mq-0",
        address: ".sc-1c3ysll-1",
        year:
          'div[aria-label="Informações sobre o anúncio\:"] > div:nth-of-type(2) > .sc-ifAKCX',
        km:
          'div[aria-label="Informações sobre o anúncio\:"] > div:nth-of-type(1) > .sc-ifAKCX',
        price: ".m7nrfa-0",
        url: ".sc-12rk7z2-1",
        picture_url: ".sc-1fcmfeb-2 img",
      };

      // For each car, get the data
      return nodes.map((node) => {
        return {
          name: node.querySelector(selectors.name)?.textContent as string,
          address: node.querySelector(selectors.address)?.textContent as string,
          year: node.querySelector(selectors.year)?.textContent as string,
          km: node.querySelector(selectors.km)?.textContent as string,
          price: node.querySelector(selectors.price)?.textContent as string,
          picture_url:
            (node.querySelector(selectors.picture_url) as HTMLImageElement)
              ?.src,
          url: (node.querySelector(selectors.url) as HTMLAnchorElement)?.href,
        };
      });
    });

    function weight(car) {
      return car.km * 0.65 + car.price * 0.25 + car.year * 0.1;
    }

    const sortedCars = cars.sort((car1, car2) => weight(car1) - weight(car2));
    await page.close();
    return new Response(JSON.stringify({ data: sortedCars }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ status: "error", message: "Failed to scrape data" }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
});
