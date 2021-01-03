const db = require("../models");
const Quote = db.quotes

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "content cannot be empty"})
    }
    //create quote
    const quote = new Quote({
        title: req.body.title,
        author: req.body.author,
        quote: req.body.quote
    });
    //save quote
    quote.save(quote)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some erro occured while creating the quote"
        })
    })
}

//retreive quotes
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Quote.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

//retreive single object with id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
    .then(data => {
        if(!data) 
            res.send(404).send({message: "No quote found"});
            else res.send(data)
    })
    .catch(err => {
        res.status(500)
        .send({message: "Error retreiving Tutorial with id" + id})
    })

}

//update or edit quote
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "dataa to edit cannot be empty!",
    });
  }
  const id = req.params.id;

  Quote.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `cannot update quote with id=$id. Maybe cannot find quote`,
        });
      } else res.send({ message: "quote was successfully edited" });
    })
    .catch((err) => {
      res.satus(500).send({
        mesasge: "Error updating tutorial with id" + id,
      });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id

    Quote.findByAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({ message: `cannot delete quote with id ${id}. Maybe quote not found`})
        }else {
            res.send({
                message: "Quote was successfully deleted"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "could not delete quote with id" + id
        })
    })
}

//delete all quotes from database
exports.deleteAll = (req, res) => {
    Quote.dleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Quotes were deleted successfiully`
        })
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some erorr occurred whule removing quotes"
        })
    })
}