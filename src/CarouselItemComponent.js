import React from "react";
import { Image } from 'antd'
export default class CarouselItemComponent extends React.Component {
    render() {
        return <div style={{ height: 500 }} className="Carousel">

            <Image src={this.props.src} />
            <div className="CarouselDes"><p>{this.props.title}</p></div>
        </div>
    }
}