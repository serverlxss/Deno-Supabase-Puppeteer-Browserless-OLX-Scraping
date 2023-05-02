## OLX Web Scraper

This is a Deno application that uses Puppeteer to scrape data from the OLX
website and return the sorted list of cars based on a custom function.

## Getting Started

1. Install Deno:
   [https://deno.land/manual/getting_started/installation](https://deno.land/manual/getting_started/installation)
2. Clone the repository:
   `git clone https://github.com/your-username/olx-web-scraper.git`
3. Navigate to the project directory: `cd olx-web-scraper`
4. Run the application: `deno run --allow-net --allow-env index.ts`

## Configuration

This application uses the Browserless.io service to run headless Chrome. In
order to use this service, you need to set the `BROWSERLESS_TOKEN` environment
variable to your Browserless API token.

Alternatively, you can set a default token in the `BROWSERLESS_TOKEN_EXAMPLE`
variable in the code.

## Usage

Once the application is running, it will scrape the OLX website for cars and
return a sorted list of cars based on the weight function, which calculates a
custom score for each car based on its year, mileage, and price.

The application returns a JSON response with the following format:

```json
{
  "data": [
    {
      "name": "Honda Civic 2018",
      "address": "São Paulo, SP",
      "year": "2018",
      "km": "50.000",
      "price": "R$ 80.000",
      "picture_url": "https://example.com/car.jpg",
      "url": "https://www.olx.com.br/anuncio/honda-civic-2018-ID12345.html"
    },
    ...
  ]
}
```

If the application encounters an error, it will return a JSON response with the
following format:

```json
{
  "status": "error",
  "message": "Failed to scrape data"
}
```

## Contributing

Feel free to submit pull requests or open issues for any bugs or feature
requests.
