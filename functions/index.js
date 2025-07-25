const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const axios = require("axios");
const cheerio = require("cheerio");

exports.scrapeUrl = functions.https.onCall(async (data, context) => {
  logger.info("Scrape function triggered", {data});

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const url = data.url;
  if (!url) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with a 'url' argument."
    );
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    });
    const html = response.data;

    const $ = cheerio.load(html);

    $('script, style, nav, footer, header').remove();

    const text = $('body').text();

    const cleanedText = text.replace(/\s\s+/g, ' ').trim();

    logger.info("Successfully scraped URL:", url);
    return {
      success: true,
      text: cleanedText.substring(0, 5000)
    };

  } catch (error) {
    logger.error("Error scraping URL", {url: url, error: error.message});
    throw new functions.https.HttpsError(
      "internal",
      `Failed to scrape the URL. Reason: ${error.message}`
    );
  }
});