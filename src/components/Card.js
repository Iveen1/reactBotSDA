import React from "react";
class Card extends React.Component {
    constructor() {
        super();
        this.state = { isHovered: false};
        this.toggleHover = this.toggleHover.bind(this);
    }
    toggleHover() {
        this.setState(prevState => ({ isHovered: !prevState.isHovered }));
    }

    render() {
        if (!this.state.isHovered || this.props.dontchange === true){
            return (
                <div className="card" onClick={this.toggleHover}>
                    <div class="cardheader">{this.props.header}</div>
                    <div class="element">{this.props.second}</div>
                    <div class="element">{this.props.third}</div>
                    <div class="cardbottom">{this.props.fourth}</div>
                </div>
            )
        }else{
            return (
                <div className="card" onClick={this.toggleHover}>
                    <div class="cardheader">{this.props.hoveredinfo}</div>
                </div>
            )
        }

    }
}

export default Card;