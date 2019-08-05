import React, {Component} from 'react';
import {Box} from "./GameContainer";
import {css} from "@emotion/core";
import styled from "@emotion/styled";
import {appComponentsState} from "./types";
import Draggable, {DraggableData, DraggableEventHandler, DraggableEvent} from 'react-draggable'

// const SortableContainerComponent = SortableContainer(({children}: { children: ReactNodeArray }) => <StyledUl>{children}</StyledUl>);


class App extends Component <{}, appComponentsState> {

    constructor(props: Readonly<appComponentsState>) {
        super(props);
        this.state = {
            items: Array.apply(null, Array(16)).map((_, i) => ({value: i + 1, isVisible:true}))
        };
    }


    onSortEnd: DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {
        // this.setState(({items}) => {
        //
        //     // const itemsWithoutItem: number[] = [...items.slice(0, oldIndex), ...items.slice(oldIndex, items.length - 1)];
        //     const arrayCopy: stateItem[] = items.slice(0);
        //     arrayCopy[newIndex] = items[oldIndex];
        //     arrayCopy[oldIndex] = items[newIndex];
        //     // console.log('itemsWithoutItem0: ', {...itemsWithoutItem});
        //
        //     // itemsWithoutItem[newIndex] = items[oldIndex];
        //     console.log('itemsWithoutItem1: ', items[oldIndex], arrayCopy, items);
        //
        //     // return ({
        //     //     items: arrayCopy
        //     // })
        // });
        console.log('onSortEnd', e, data)



    };

    onDrag: DraggableEventHandler = (e: DraggableEvent, data: DraggableData) =>{
        console.log('onDrag', data, e);
        if(e.target){

        }

    };

    render() {
        const {items} = this.state;

        return (
            <div css={wrapperDivStyle}>
                <StyledUl>
                    {items.map((item, index) => (

                            <Box key={`item-${item.value}`} onDrag={this.onDrag} onStop={this.onSortEnd} index={index} initialItem={item}/>

                    ))}
                </StyledUl>

            </div>
        );
    }
}



const wrapperDivStyle=css`
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