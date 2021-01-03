import React, {useState, useEffect} from "react"
import QuoteService from "../services/QuoteService"
import {Link } from "react-router-dom"



const QuoteList = () => {
   const [ quotes, setQuotes ] = useState([])
   const [currentQuote, setCurrentQuote ] = useState(null);
   const [currentIndex, setCurrentIndex ] = useState(-1);
   const [ searchTitle, setSearchTitle ] = useState("");

   useEffect (() => {
       retrieveQuotes()
   }, [])
   const onChangeSearchTitle = e => {
       const searchTitle = e.target.value;
       setSearchTitle(searchTitle);
   }

   const retrieveQuotes = () => {
       QuoteService.getAll()
       .then(response => {
           setQuotes(response.data);
           console.log(response.data)
       })
       .catch(e => {
           console.log(e)
       })
   }

   const refreshList = () => {
       retrieveQuotes()
       setQuotes(null);
       setCurrentIndex(-1)
   }

   const setActiveQuote = (quote, index) => {
       setCurrentQuote(quote);
       setCurrentIndex(index)
   }

   const removeAllQuotes = () => {
       QuoteService.removeAll()
       .then(response => {
           console.log(response.data);
           refreshList()
       })
       .catch(e => {
           console.log(e)
       })
   }

   const findByTitle = () => {
       QuoteService.findByTitle(searchTitle)
       .then(response => {
           setQuotes(response.data)
           console.log(response.data)
       })
       .catch(e => {
           console.log(e)
       })
   }

   return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Quotes List</h4>

        <ul className="list-group">
          {quotes &&
            quotes.map((quote, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveQuote(quote, index)}
                key={index}
              >
                {quote.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllQuotes}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentQuote ? (
          <div>
            <h4>Quote</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentQuote.title}
            </div>
            <div>
              <label>
                <strong>author:</strong>
              </label>{" "}
              {currentQuote.author}
            </div>
            <div>
              <label>
                <strong>Quote:</strong>
              </label>{" "}
              {currentQuote.Quote}
            </div>

            <Link
              to={"/quotes/" + currentQuote.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};





export default QuoteList