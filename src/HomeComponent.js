import { getKeyThenIncreaseKey } from 'antd/lib/message';
import React from 'react';
import { Carousel, Spin, Col, Row, Avatar, List, Space, Rate } from 'antd';
import CarouselItemComponent from './CarouselItemComponent';
export default class HomeComponent extends React.Component {
    state = {
        list: [],
        isLoading: false,
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=04b256f451c0e618b5735841206fdedc&page=1')
            .then(a => a.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    list: data.results,
                    isLoading: false,
                })
            })
    }
    getMovies = () => {
        if (this.state.list) {
            let result = this.state.list.map(x => {
                return <CarouselItemComponent
                    key={x.id}
                    src={`https://image.tmdb.org/t/p/original${x.backdrop_path}`}
                    title={x.title}
                />
            });
            return result;
        }
        else {
            return null;
        }
    }
    render() {
        return <div className='Home'>
            {/*  <Carousel autoplay>

                {
                    this.state.list.map(item => {
                        return <div>
                            <div>{item.title}</div>
                        </div>
                    })
                }
            </Carousel> */}
            <Spin spinning={this.state.isLoading}>
                <Row justify={"center"}>
                    <Col span={24} sm={24} xs={24} lg={13}>
                        <Carousel autoplay
                            dots={{ className: 'CarouselDot' }}>
                            {
                                this.getMovies()
                            }
                        </Carousel>
                    </Col>
                </Row>
                <Row justify='left'>
                    <Col>
                        <h1 style={{ color: "orange", marginLeft: 280 }}>Now Playing List</h1>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <Col span={24} sm={24} xs={24} lg={13}>
                        <List
                            bordered="true"
                            itemLayout="vertical"
                            size="large"
                            dataSource={this.state.list ? this.state.list : null}

                            renderItem={(item) => (
                                <List.Item key={item.title}
                                >

                                    <div style={{ color: "white", height: 170 }}>
                                        <img
                                            style={{
                                                width: "120px"
                                                , height: "165px",
                                                float: "left"
                                            }}
                                            alt="logo"
                                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        />
                                        <div style={{ marginLeft: 140, marginTop: 20 }}>
                                            <div>Name: {item.title}</div>
                                            <div>Release Date: {item.release_date}</div>
                                            <div>Review: <Rate allowHalf defaultValue={2.5} /></div>
                                        </div>

                                    </div>


                                </List.Item>
                            )}
                        >

                        </List>

                    </Col>

                </Row>

            </Spin>


        </div>
    }
}