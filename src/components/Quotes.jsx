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
      quotes: "",
			authors: "",
			isloading: true
    };

  componentDidMount() {
		this._isMounted = true;
    this.getQuote();
  }

  getQuote = () => {
		const proxy = "https://cors-anywhere.herokuapp.com/";
		const URL = `${proxy}https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`;

    axios
      .get(URL)
      .then(res => {
        const data = res.data;
        console.log(data)
				if(this._isMounted){
					this.setState({
						isLoading: false,
						quotes: data.quoteText,
						authors: data.quoteAuthor
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

    // Check if there is a quote. If there is no quote and author from the API return a hard coded quote.
    const quote = quotes === "" && authors === "" || quotes === undefined ? 'I have no quote for you! Refresh the page' : quotes

    //check if there is an author. If there is none return "Unknown Author". Do not return anything if there is no quote.
    const author = authors === "" && quote === quotes ? "Unknown Author" : quotes === "" ? null : authors
    
    return (
      !isLoading ? 
      <Wrapper>
        <Quote>{`${quote}`}</Quote>
        <Author>{author}</Author>
      </Wrapper> :
      <div>Loading...</div>
    );
  }
}
