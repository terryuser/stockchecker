import React, { useContext, useEffect, useState } from 'react';

let stockNews = (props) => {
    const { news } = props;

    const top3_News = () => {
        let i = 0, limit = 4;

        let top_result = [];

        while (i < limit) {
            top_result.push(news[i]);
            i++;
        }

        console.log(Object.values(top_result));

        return (
            <div className="news-top pl-0 col-9">
                {
                    Object.values(top_result).map((item, index) => {
                        let dd = item.provider_publish_time.getDay(), mm = item.provider_publish_time.getMonth() + 1, yyyy = item.provider_publish_time.getFullYear();
                        let time = ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy;

                        return (
                            <div className="news-item d-flex" key={index}>
                                <div className="thumbnail d-flex text-left px-0 col-3"><img className="w-100" src={item.thumbnail} width={300} /></div>
                                <div className="content text-left pl-4 col-9">
                                    <div className="time-author">
                                        <span className="time">{time}</span>
                                        <span className="author">{item.provider_name}</span>
                                    </div>
                                    <div className="title">{item.title}</div>
                                    <p className="summary">{item.summary}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    const other_news = () => {
        let i = 3, limit = 12;

        let other_news_list = [];

        while (i < limit) {
            if (news[i]) other_news_list.push(news[i]);
            i++;
        }

        console.log(Object.values(other_news_list));

        return (
            <div className="news-other col-3">
                {
                    Object.values(other_news_list).map((item, index) => {
                        let dd = item.provider_publish_time.getDay(), mm = item.provider_publish_time.getMonth() + 1, yyyy = item.provider_publish_time.getFullYear();
                        let time = ((dd < 10) ? '0' + dd : dd) + '-' + ((mm < 10) ? '0' + mm : mm) + '-' + yyyy;

                        return (
                            <div className="news-item row" key={index}>
                                <div className="content">
                                    <div className="time-author">
                                        <span className="time">{time}</span>
                                        <span className="author">{item.provider_name}</span>
                                    </div>
                                    <div className="title">{item.title}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    return (
        <div className="stock-news container d-flex row mx-0 px-0 pt-4 mt-5 col-12">
            <h2>Current News</h2>
            <div className="news-wrapper wrapper d-flex">
                {top3_News()}
                {other_news()}
            </div>

        </div>
    );
}



export default stockNews;