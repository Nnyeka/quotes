module.exports = app => {
    const quotes = require("../controllers/quoteController.js");
  
    var router = require("express").Router();
  
    // Create a new Quote
    router.post("/", quotes.create);
  
    // Retrieve all Quotes
    router.get("/", quotes.findAll);
  
    // Retrieve a single Quote with id
    router.get("/:id", quotes.findOne);
  
    // Update a Quote with id
    router.put("/:id", quotes.update);
  
    // Delete a Quote with id
    router.delete("/:id", quotes.delete);
  
    // delete all Quote
    router.delete("/", quotes.deleteAll);
  
    app.use('/api/quotes', router);
  };