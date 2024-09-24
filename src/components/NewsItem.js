import React, { Component } from 'react'


export default class NewsItem extends Component {
  
  render() {
    let def_img="https://www.shutterstock.com/image-vector/no-image-vector-symbol-missing-260nw-2214534511.jpg";
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>                                                                                                                                                                                        
          <img src={imageUrl?imageUrl:def_img} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
