import React, { useState} from "react"
import QuoteService from "../services/QuoteService"

const AddQuote = () => {
    const initialQuoteState = {
        id: null,
        title: "",
        author: "",
        quote: ""
    }

    const [quote, setQuote ] = useState(initialQuoteState)
    const [submitted, setSubmitted ] = useState(false)

    const handleInputChange = event => {
        const {name, value } = event.target;
        setQuote({ ...quote, [name]: value})
    }

    const saveQuote = () => {
        var data = {
            title: quote.title,
            author: quote.author,
            quote: quote.quote
        }

        QuoteService.create(data)
    .then(response =>  {
        setQuote({
            id: response.data.id,
            title: response.data.title,
            author: response.data.author,
            quote: response.data.quote
        });
        setSubmitted(true);
        console.log(response.data)
    })
    .catch(e => {
        console.log(e)
    })
    }

    const newQuote = () => {
        setQuote(initialQuoteState)
        setSubmitted(false)
    }

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newQuote}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={quote.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                required
                value={quote.author}
                onChange={handleInputChange}
                name="author"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quote">Quote</label>
              <textarea
                className="form-control"
                rows="3"
                id="quote"
                required
                value={quote.quote}
                onChange={handleInputChange}
                name="quote"
              ></textarea>
            </div>

            <button onClick={saveQuote} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );

    
}

export default AddQuote