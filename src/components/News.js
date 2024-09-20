import React, { Component } from 'react'
import NewsItem from './NewsItem'


const descriptionshortner = (description)=>{
    let new_des="";
    if(description.length>=0){
      new_des=description;
    }
    if(description.length>=100){
      new_des = description.substring(0,100)+"...";
      return new_des;
    }
    return new_des;
}
export default class News extends Component {
  constructor() {
    super();
    this.state={
      article: [],
    loading: false,
    page:1,
    pageSize:21,
  };
  }
  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=570c9f9c431c42fa8aa7433d8d230be7&page=1&pageSize=21";
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({article: parsedata.articles,totalResults: parsedata.totalResults});
  }

  handleprevclick =async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=570c9f9c431c42fa8aa7433d8d230be7&page=${this.state.page-1}&pageSize=21`;
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
    page: this.state.page-1,
    article: parsedata.articles
    });
  }
  handlenextclick =async ()=>{
    if(this.state.page+1>(Math.ceil(this.state.totalResults/21))){

    }
    else{
    
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=570c9f9c431c42fa8aa7433d8d230be7&page=${this.state.page+1}&pageSize=21`;
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
    page: this.state.page+1,
    article: parsedata.articles
    });
  }
  }
  render() {
    
    return (
      <div> 
          <div className="container my-3">
            <h2>CrowNews- Top Headlines</h2>
              <div className="row">
              {this.state.article.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                      <NewsItem  title={!element.title?"":element.title.slice(0,35)+"..."} description={!element.description?"":descriptionshortner(element.description)} imageUrl={element.urlToImage} newsUrl={element.url} />
                      </div>
              })}
              <div className="container d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&larr;Previous</button>
              <button type="button" className="btn btn-dark"onClick={this.handlenextclick}>Next&rarr;</button>
              </div>
              </div>                               
          </div>
      </div>
    )
  }
}
