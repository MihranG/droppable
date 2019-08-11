import React, {Component} from 'react';
import {Box} from "./Box";
import {css} from "@emotion/core";
import styled from "@emotion/styled";
import {appComponentsState} from "./types";

const RECTANGLE_SIZE_HARDCODED = 4 * 4;


export class App extends Component <{}, appComponentsState> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            items: Array.apply(null, Array(RECTANGLE_SIZE_HARDCODED)).map((_, i) => ({value: i + 1, isVisible: true})),
            draggingID: -1
        };
    }

    onDrop = (id: number): () => void => {
        const {items, draggingID} = this.state;

        return () => {
            const newItems = [...items];
            const buffer = newItems[id];
            newItems[id] = newItems[draggingID];
            newItems[draggingID] = buffer;

            this.setState({
                items: newItems,
                draggingID: -1
            })
        }
    };

    onDragStop = (): () => void => {
        return () => {
            this.setState({
                draggingID: -1
            })

        }
    };

    onDragStart = (id: number): () => void => () => {
        this.setState({
            draggingID: id
        })

    };

    render() {
        const {items} = this.state;

        return (
            <div css={wrapperDivStyle}>
                <StyledUl>
                    {items.map((item, index) => (

                        <Box key={`item-${item.value}`}
                             onDragStart={this.onDragStart}
                             onDragStop={this.onDragStop}
                             onDrop={this.onDrop}
                             index={index} initialItem={item}
                        />

                    ))}
                </StyledUl>

            </div>
        );
    }
}


const wrapperDivStyle = css`
    #margin: 0 50px;
`;

const StyledUl = styled.ul`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    list-style:none;
    padding: 0;
    &.draggingClass{
        z-index:1;
    }
`;

export default App;