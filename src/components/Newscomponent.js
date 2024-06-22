import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class Newscomponent extends Component {
  constructor(){
    super();
    this.state = {
      articles: [],  // Corrected 'article' to 'articles' for consistency
      loading: false
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=7595bd0192074449852cac36bd4566c1";

    this.setState({loading: true});  // Set loading state to true before fetching data
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({articles: parsedData.articles, loading: false});  // Corrected 'article' to 'articles' and set loading state to false
    } catch (error) {
      console.error("Error fetching the news data:", error);
      this.setState({loading: false});
    }
  }
  
  render() {
    return (
      <div className='container my-3'>
        <h1>Top Headlines</h1>
        <div className='row'>
          {this.state.articles.map((element) => {
            return (
              <div className='col-md-4' key={element.url}>
                <NewsItems 
                  title={element.title ? element.title : ""} 
                  description={element.description ? element.description : ""} 
                  imageurl={element.urlToImage} 
                  newsurl={element.url} 
                />
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}

export default Newscomponent
