import React from 'react';
import { Select, Input, Row, Col, Spin, Pagination } from 'antd';
import MovieItemComponent from './MovieItemComponent';
const { Option } = Select;
const { Search } = Input;
export default class SearchComponent extends React.Component {
    state = {
        data: [],
        /*  search: "movie", */
        isloading: false,
        pageIndex: 1,
        totalPages: 0,
        totalResults: 0,
        searchValue: "",
        selectValue: "movie",
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            selectValue: value,
            data: [],
            searchValue: "",
        })

    };
    handleSearchOnChange = (e) => {
        this.setState({ searchValue: e.target.value })
    }
    onSearch = (value) => {
        this.setState({
            isloading: true,
        })
        console.log(value);
        fetch("https://api.themoviedb.org/3/search/" + this.state.selectValue + "?api_key=04b256f451c0e618b5735841206fdedc&page=1&query=" + value)
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
                this.setState({
                    data: data.results,
                    isloading: false,
                    searchValue: value,
                    totalPages: data.total_pages,
                    totalResults: data.total_results,
                    pageIndex: data.page,
                })
            })
    }
    getRow = () => {
        let arr = [];
        let result = [];
        for (let i = 0; i < this.state.data.length; i++) {
            arr.push(this.state.data[i]);
            if (arr.length === 2) {
                result.push(<Row justify='center'>
                    {
                        arr.map(item => {
                            /* return <MovieItemComponent itemType={this.state.selectValue} {...item} col={12} /> */
                            return <MovieItemComponent {...item} movieOrTV={this.state.selectValue === "movie" ? item.title : item.name} col={12} />
                        })
                    }
                </Row>)
                arr = [];
            }
        }
        return result;
    }
    pageChange = (page) => {
        console.log("page", page);
        fetch("https://api.themoviedb.org/3/search/" + this.state.selectValue + "?api_key=04b256f451c0e618b5735841206fdedc&page=" + page + "&query=" + this.state.searchValue)
            .then(res => res.json())
            .then(data => {
                console.log('data2', data);
                this.setState({
                    data: data.results,
                    isloading: false,
                    totalPages: data.total_pages,
                    totalResults: data.total_results,
                    pageIndex: data.page,

                })
            })

    }
    render() {
        return <div>

            <Spin spinning={this.state.isloading}>
                < Select
                    defaultValue="Movie"
                    style={{
                        width: 120,
                    }}
                    onChange={this.handleChange}
                >
                    <Option value="movie">Movie</Option>
                    <Option value="tv">TV Show</Option>

                </Select>

                <Search
                    placeholder="input search text"
                    onSearch={this.onSearch}
                    style={{
                        width: 200,
                    }}
                    value={this.state.searchValue}
                    onChange={this.handleSearchOnChange}
                />
                {
                    this.state.data.length > 0 ?
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
                        </Row> : null
                }

                {
                    this.getRow()
                }
            </Spin>
        </div >
    }
}