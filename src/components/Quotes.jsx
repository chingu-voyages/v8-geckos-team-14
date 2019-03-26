import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

//styling wrapping quote text and quote author
const Wrapper = styled.div`
  height: 57px;
  width: 100%;
  margin: 0;
  padding-bottom: 3px;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
`;

//Styling for the source of the quote
const Author = styled.div`
  color: #fff;
  position: absolute;
  right: 0;
  bottom: -30px;
  left: 0;
  font-size: 0.875rem;
  opacity: 0;
  transform: translateY(-22px);
  margin-right: 4px;
  opacity: 0.75;
	display: none
`;

//styling for the quote body
const Quote = styled.div`
  width: 100%;
  display: block;
  position: relative;
  font-size: 1.125rem;
  font-weight: 300;
  user-select: text;
  margin: 0;
  transition: all 0.35s ease;
  color: rgba(255, 255, 255, 0.9);
	line-height: 1.2;

  &:hover + ${Author} {
		display: block;
  }
`;

export default class Quotes extends Component {	
		_isMounted = false;

    state = {
      quote: "",
			author: "",
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
				if(this._isMounted){
					this.setState({
						isLoading: false,
						quote: data.quoteText,
						author: data.quoteAuthor
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
    const { quote, author, isLoading } = this.state;
    return (
      <Wrapper>
        <Quote>{quote}</Quote>
        <Author>{author}</Author>
      </Wrapper>
    );
  }
}
