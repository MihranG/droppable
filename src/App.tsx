import React, {Component, ReactNodeArray} from 'react';
import {SortableContainer, SortEvent, SortOver, SortOverHandler} from 'react-sortable-hoc';
import {SortableBox} from "./GameContainer";
import {css} from "@emotion/core";
import styled from "@emotion/styled";
import {appComponentsState, stateItem} from "./types";

const SortableContainerComponent = SortableContainer(({children}: { children: ReactNodeArray }) => <StyledUl>{children}</StyledUl>);


class App extends Component <{}, appComponentsState> {

    constructor(props: Readonly<appComponentsState>) {
        super(props);
        this.state = {
            items: Array.apply(null, Array(16)).map((_, i) => ({value: i + 1, isVisible:true}))
        };
    }


    onSortEnd = ({oldIndex, newIndex}: { oldIndex: number, newIndex: number }) => {
        this.setState(({items}) => {

            // const itemsWithoutItem: number[] = [...items.slice(0, oldIndex), ...items.slice(oldIndex, items.length - 1)];
            const arrayCopy: stateItem[] = items.slice(0);
            arrayCopy[newIndex] = items[oldIndex];
            arrayCopy[oldIndex] = items[newIndex];
            // console.log('itemsWithoutItem0: ', {...itemsWithoutItem});

            // itemsWithoutItem[newIndex] = items[oldIndex];
            console.log('itemsWithoutItem1: ', items[oldIndex], arrayCopy, items);

            return ({
                items: arrayCopy
            })
        });
    };

    onHoverItem: SortOverHandler = ({index, oldIndex, newIndex, collection, isKeySorting}: SortOver, e: SortEvent) =>{
        console.log(666, {index, oldIndex, newIndex, collection, isKeySorting}, e);
        const {items} = this.state;

        const newItems = [...items];
        newItems[newIndex].isVisible = false;

        this.setState({
            items: newItems
        })

    };

    render() {
        const {items} = this.state;

        return (
            <div css={wrapperDivStyle}>
                <SortableContainerComponent
                    onSortOver={this.onHoverItem}
                    axis={'xy'}
                    onSortEnd={this.onSortEnd}
                    helperClass={'dragging-helper-class'}
                    lockToContainerEdges
                    hideSortableGhost={false}
                    transitionDuration={0}
                >
                    {items.map((item, index) => (
                            <SortableBox key={`item-${item.value}`} index={index} initialItem={item}/>
                    ))}

                </SortableContainerComponent>
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
`;

export default App;