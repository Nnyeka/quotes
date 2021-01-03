
import React, { useState, useEffect } from "react"
import QuoteService from "../services/QuoteService"

const Quote = props => {
    const initialQuoteState = {
        id: null,
        title: "",
        author: "",
        quote: ""
    }

    const [currentQuote, setCurrentQuote ] = useState(initialQuoteState)
    const [message, setMessage ] = useState("");

    const getQuote = id => {
        QuoteService.get(id)
        .then(response => {
            setCurrentQuote(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        getQuote(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const {name, value } = event.target;
        setCurrentQuote({...currentQuote, [name]: value });
    }

    const updateQuote = () => {
        QuoteService.update(currentQuote.id, currentQuote)
        .then(response => {
            console.log(response.data);
            setMessage("The quote has been successfully edited")
        })
        .catch(e => {
            console.log(e)
        })
    }

    const deleteQuote = () => {
        QuoteService.remove(currentQuote.id)
        .then(response => {
            console.log(response.data);
            props.history.push("/quotes")
        })
        .catch(e => {
            console.log(e)
        })
    }

    return (
      <div>
        <div className="edit-form">
          <h4>Quote</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentQuote.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={currentQuote.author}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quote">Quote</label>
              <input
                type="text"
                className="form-control"
                id="quote"
                name="quote"
                value={currentQuote.quote}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button className="badge badge-danger mr-2" onClick={deleteQuote}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateQuote}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      </div>
    );

}

export default Quote