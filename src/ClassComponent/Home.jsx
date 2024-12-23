import React, { Component } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      totalResults: 0,
      page: 1,
    };
  }

  async getAPIData() {
    this.setState({ page: 1 });
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${
        this.props.search ? this.props.search : this.props.q
      }&language=${
        this.props.language
      }&pageSize=24&page=1&sortBy=publishedAt&apiKey=a1bd5e07acb14784b68b659a6c76be1a`
    );
    response = await response.json();

    this.setState({
      articles: response.articles.filter((x) => x.title !== "[Removed]"),
      totalResults: response.totalResults,
    });
  }
  fetchData = async () => {
    this.setState({ page: this.state.page + 1 });
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${
        this.props.search ? this.props.search : this.props.q
      }&language=${this.props.language}&pageSize=24&page=${
        this.state.page
      }&sortBy=publishedAt&apiKey=a1bd5e07acb14784b68b659a6c76be1a`
    );
    response = await response.json();
    if (response?.status === "ok")
      this.setState({
        articles: this.state.articles.concat(
          response.articles.filter((x) => x.title !== "[Removed]")
        ),
      });
  };

  componentDidMount() {
    this.getAPIData();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) this.getAPIData();
  }
  render() {
    return (
      <div className="container-flud">
        <h5 className="background text-light text-center p-2 mt-2 text-capitalize">
          {this.props.search ? this.props.search : this.props.q} Articles
        </h5>
        <InfiniteScroll
          dataLength={this.state.articles?.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.articles?.length < this.state.totalResults}
          loader={
            <div className="my-5 text-center">
              <div class="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <div className="row">
            {this.state.articles?.map((item, index) => {
              return (
                <NewsItem
                  key={index}
                  source={item.source.name ?? "N/A"}
                  title={item.title}
                  description={item.description}
                  url={item.url}
                  pic={item.urlToImage ?? "/images/no image.webp"}
                  date={item.publishedAt}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
