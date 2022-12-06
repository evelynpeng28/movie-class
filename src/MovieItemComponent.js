import React from "react";
import { Col } from "antd";
export default class MovieItemComponent extends React.Component {
    render() {
        return <Col span={this.props.col}>
            <img src={"https://image.tmdb.org/t/p/w500/" + this.props.poster_path} alt='img' style={{ height: 340, width: 230 }} />
            <div>
                {/* <h5>Name:{this.props.title ? this.props.title : this.props.name}</h5> */}
                {/*  <h5>Name:{this.props.itemType === "tv" ? this.props.name : this.props.title}</h5> */}
                <h5>Name:{this.props.movieOrTV}</h5>
                <h5>Release Date:{this.props.release_date}</h5>
                <h5>Vote Average:{this.props.vote_average}</h5>
            </div>
        </Col>

    }
}