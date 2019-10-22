const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const shortid = require("shortid");
const errorUrl='http://localhost/error';

module.exports = app => {  
  app.post("/api/item", async (req, res) => {	
    const { originalUrl, shortBaseUrl } = req.body;
	//validate home url format
    if (validUrl.isUri(shortBaseUrl)) {
    } else {
      return res
        .status(401)
        .json("The Base URL is invalid.");
    }
	
	//create an id for short url
    const urlCode = shortid.generate();
    const updatedAt = new Date();
	//validate long url format
    if (validUrl.isUri(originalUrl)) {
      try {
        const item = await UrlShorten.findOne({ originalUrl: originalUrl });
        if (item) {
          res.status(200).json(item);
        } else {
			//build the new object with short url inside
          shortUrl = shortBaseUrl + "/" + urlCode;
          const item = new UrlShorten({
            originalUrl,
            shortUrl,
            urlCode,
            updatedAt
          });
          await item.save();
          res.status(200).json(item);
        }
      } catch (err) {
        res.status(401).json("Invalid User Id");
      }
    } else {
      return res
        .status(401)
        .json(
          "This is not a valid URL."
        );
    }
  });
};