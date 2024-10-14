import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const descriptionshortner = (description) => {
  if (description.length > 100) {
    return description.substring(0, 100) + "...";
  }
  return description;
};

export default class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.props.category[0].toUpperCase() + this.props.category.slice(1)} - CrowNews`;
  }

  async componentDidMount() {
    await this.fetchArticles();
  }

  fetchArticles = async (page = 1) => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=570c9f9c431c42fa8aa7433d8d230be7&page=${page}&pageSize=5`;
    const data = await fetch(url);
    this.props.setProgress(30);
    const parsedata = await data.json();
    this.props.setProgress(70);
    console.log(parsedata);
    this.setState({
      article: parsedata.articles,
      totalResults: parsedata.totalResults,
      page: page,
    });
    this.props.setProgress(100);
  };

  handlePrevClick = async () => {
    const newPage = this.state.page - 1;
    if (newPage >= 1) {
      await this.fetchArticles(newPage);
    }
  };

  handleNextClick = async () => {
    const newPage = this.state.page + 1;
    if (newPage <= Math.ceil(this.state.totalResults / 5)) {
      await this.fetchArticles(newPage);
    }
  };

  fetchMoreData = async () => {
    this.setState({page: this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=570c9f9c431c42fa8aa7433d8d230be7&page=${this.state.page}&pageSize=5`;
    const data = await fetch(url);
    const parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      article: this.state.article.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
      
    });
  };

  render() {
    return (
      <div >
        
          <h2 className="text-center" style={{marginTop : "65px"}}>
            CrowNews - Top{" "}
            {this.props.category[0].toUpperCase() + this.props.category.slice(1)}{" "}
            Headlines
          </h2>
          <InfiniteScroll
            dataLength={this.state.article.length}
            next={this.fetchMoreData}
            hasMore={this.state.article.length < this.state.totalResults}
            loader={<h4>Loading...</h4>}
          >
            
            <div className="container">
            <div className="row">
              {this.state.article.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={
                        element.title ? element.title.slice(0, 35) + "..." : ""
                      }
                      description={
                        element.description
                          ? descriptionshortner(element.description)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                    />
                  </div>
                );
              })}
            </div>
            </div>
          </InfiniteScroll>
        </div>
    );
  }
}
