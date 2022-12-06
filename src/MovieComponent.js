import React from 'react';
import { Radio, Spin, Row, Col, Pagination, List, Card } from 'antd';
import MovieItemComponent from './MovieItemComponent';


export default class MovieComponent extends React.Component {
    state = {
        data: [],
        isloading: false,
        pageIndex: 1,
        totalPages: 0,
        totalResults: 0,
        movieType: "now_playing",

    }
    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=04b256f451c0e618b5735841206fdedc&page=1")
            .then(res => res.json())
            .then(data => {
                console.log('nowplaying', data);
                this.setState({
                    data: data.results,
                    totalPages: data.total_pages,
                    totalResults: data.total_results,
                    pageIndex: data.page,
                })
            })
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        let a = "";
        if (e.target.value === 2) {
            a = "popular"
            /* fetch("https://api.themoviedb.org/3/movie/popular?api_key=04b256f451c0e618b5735841206fdedc&page=1")
                .then(res => res.json())
                .then(data => {
                    console.log('popular', data);
                    this.setState({
                        data: data.results,
                    })
                }) */
        }
        else if (e.target.value === 3) {
            a = "top_rated"
            /* fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=04b256f451c0e618b5735841206fdedc&page=1")
                .then(res => res.json())
                .then(data => {
                    console.log('rated', data);
                    this.setState({
                        data: data.results,
                    })
                }) */
        }
        else if (e.target.value === 4) {
            a = "upcoming"
            /*  fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=04b256f451c0e618b5735841206fdedc&page=1")
                 .then(res => res.json())
                 .then(data => {
                     console.log('upcoming', data);
                     this.setState({
                         data: data.results,
                     })
                 }) */
        }
        else if (e.target.value === 1) {
            a = "now_playing"
            /* fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=04b256f451c0e618b5735841206fdedc&page=1")
                .then(res => res.json())
                .then(data => {
                    console.log('upcoming', data);
                    this.setState({
                        data: data.results,
                    })
                }) */
        }
        this.setState({
            isloading: true,
        })
        fetch("https://api.themoviedb.org/3/movie/" + a + "?api_key=04b256f451c0e618b5735841206fdedc&page=1")
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
                this.setState({
                    data: data.results,
                    isloading: false,
                    totalPages: data.total_pages,
                    totalResults: data.total_results,
                    pageIndex: data.page,
                    movieType: a,
                })
            })

    };
    pageChange = (page) => {
        console.log("page", page);
        fetch("https://api.themoviedb.org/3/movie/" + this.state.movieType + "?api_key=04b256f451c0e618b5735841206fdedc&page=" + page)
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
                this.setState({
                    data: data.results,
                    isloading: false,
                    totalPages: data.total_pages,
                    totalResults: data.total_results,
                    pageIndex: data.page,

                })
            })

    }
    getRow = () => {
        /* let newArr = [];
        let arr = [];
        for (let i = 0; i < 5; i++) {
            arr = this.state.data.slice(i * 4, (i + 1) * 4);
            newArr.push(arr);
        }
        console.log(newArr);
        if (newArr) {
            let result = newArr[0].map(x => {
                return <Col>
                    {x.title}
                </Col>

            });
            return result;
        }
        else {
            return null;
        } */
        let result = [];
        let arr = [];
        for (let i = 0; i < this.state.data.length; i++) {
            arr.push(this.state.data[i]);
            if (arr.length === 4) {
                result.push(<Row justify='center'>
                    {arr.map(item => {
                        return <MovieItemComponent {...item} movieOrTV={item.title} col={6} />
                    })}
                </Row>)
                arr = [];
            }
        }
        return result;
    }

    render() {
        return <div>

            <Spin spinning={this.state.isloading}>
                <Row>
                    <Col>
                        <Radio.Group name="radiogroup" defaultValue={1} onChange={this.onChange}>
                            <Radio value={1}>Now Playing</Radio>
                            <Radio value={2}>Popular</Radio>
                            <Radio value={3}>Top Rated</Radio>
                            <Radio value={4}>Upcoming</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Pagination
                            current={this.state.pageIndex}
                            total={this.state.totalResults}
                            defaultPageSize={20}
                            showSizeChanger={false}
                            onChange={this.pageChange}
                        />
                    </Col>
                </Row>



                {
                    this.getRow()
                }



            </Spin>

        </div>
    }
}