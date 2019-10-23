const mongoose = require("mongoose");
//const validUrl = require("valid-url");
const ValidUrl = require("./Validator/IsValid");
const UrlShorten = mongoose.model("UrlShorten");
//const shortid = require("shortid");
const errorUrl='http://localhost/error';
const shortMaker = require("./ShortMaker/ShortMaker");

module.exports = app => {
	app.get("/api/item/:code", async (req, res) => {		
		try{
			const item = await UrlShorten.findOne({ urlCode : req.params.code });
			if (item) 
			{					
				return res.json(item.originalUrl).redirect(item.originalUrl);
			} 
			else 
			{
				return res.status(401).json("URL not found.")			  
			}
		}
		catch(error) 
		{
			console.log(error);
			res.status(500).json("Server Error");
		}
	});
	
  app.post("/api/item", async (req, res) => {	
    const { originalUrl, shortBaseUrl } = req.body;
	//validate home url format
	if(!ValidUrl.isValid(shortBaseUrl))
	{
      return res
        .status(401)
        .json("The Base URL is invalid.");
    }
	
	//create an id for short url
	const urlCode = shortMaker.generateshort();	
	
    const updatedAt = new Date();
	//validate long url format
	if(ValidUrl.isValid(originalUrl))
	{
      try {
        const item = await UrlShorten.findOne({ originalUrl: originalUrl });				
        if (item) {
			//object already exists
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
        res.status(401).json("Invalid ID");
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