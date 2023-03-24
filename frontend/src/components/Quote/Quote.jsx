import React, { useState, useEffect } from "react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

import "./Quote.css";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch("https://api.quotable.io/random?tags=inspirational")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
      });
  }, []);

  return (
    <div className="quote__container">
      <div className="quote__symbol open">
        <ImQuotesLeft />
      </div>
      <p className="quote__quote">{quote}</p>
      <p className="quote__author">{`-- ${author}`}</p>
      <div className="quote__symbol close">
        <ImQuotesRight />
      </div>
    </div>
  );
};

export default Quote;
