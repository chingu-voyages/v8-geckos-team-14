import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

//styling wrapping quote text and quote author
const Wrapper = styled.div`
  height: 4em;
  width: 100%;
  padding-bottom: 5px;
  text-align: center;
`;

//Styling for the source of the quote
const Author = styled.div`
  color: #fff;
  font-size: 1rem;
  opacity: 0.8;
  transform: translateY(-1.5rem);
  margin-right: 4px;
  text-shadow: 1px 1px 0px black;
  padding-top: 5px;
`;

//styling for the quote body
const Quote = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  text-shadow: 1px 1px 0px black;
  padding: 0.5em 0.5em 1.5em 0.5em;
  border-radius: 20px;
  display: block;
  font-size: 1.125rem;
  font-weight: 600;
  user-select: text;
  margin: 0;
  transition: all 0.35s ease;
  color: rgba(255, 255, 255, 0.9);
`;

export default class Quotes extends Component {
  _isMounted = false;

  state = {
    quotes: "Take it easy — but take it.",
    authors: "Woody Guthrie",
    isloading: true
  };

  componentDidMount() {
    this._isMounted = true;
    this.getQuote();
  }

  getQuote = () => {
    const proxy = "https://cors-anywhere.herokuapp.com/"; // Not working in production
    const URL = `https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`;
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    axios
      .get(URL, config)
      .then(res => {
        const data = res.data;
        const { quoteText, quoteAuthor } = data;
        if (this._isMounted && quoteText && quoteAuthor) {
          this.setState({
            isLoading: false,
            quotes: quoteText,
            authors: quoteAuthor
          });
        }
      })
      .catch(err => {
        if (err) console.log(err);
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { quotes, authors, isLoading } = this.state;

    return !isLoading ? (
      <Wrapper>
        <Quote>{quotes}</Quote>
        <Author>{authors}</Author>
      </Wrapper>
    ) : (
      <Wrapper>Loading...</Wrapper>
    );
  }
}
