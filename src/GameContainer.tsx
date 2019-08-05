import React, { useEffect, useMemo} from 'react';
import styled from '@emotion/styled'
import {SortableElement, SortableElementProps} from "react-sortable-hoc";
import {stateItem} from "./types";
import Draggable , {DraggableEventHandler}from 'react-draggable';


type BoxOwnProps = {
    initialItem: stateItem,
    index: number,
    onDrag: DraggableEventHandler,
    onStop: DraggableEventHandler
}
type sortableElementProp = SortableElementProps & BoxOwnProps

export const Box: React.FunctionComponent<BoxOwnProps> = ({initialItem, index, onDrag, onStop}) => {
    console.log(initialItem, index);


    // const randomColor0 = useRef('#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6));
    const randomColor = useMemo(() => '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6), []);


    return (
        <Draggable
            onDrag={onDrag}
            onStop={onStop}
            defaultClassNameDragging={'draggingClass'}
            defaultClassNameDragged={'draggingClass'}
        >
            <BoxWrapperListItem
                randomColor={randomColor}
                isVisible={initialItem.isVisible}
            >
                <span> {initialItem.value}</span>
            </BoxWrapperListItem>
        </Draggable>
    )

};

export const SortableBox = SortableElement<sortableElementProp>(Box);



const BoxWrapperListItem = styled.li<{ randomColor: string , isVisible: boolean }>`
    background-color: ${props => props.randomColor};
    height: 50px;
    margin: 5px;
    padding: 5px;
    flex: 0 0 20%;
    // &.draggingClass{
    //     z-index:1;
    // }
    
`;

// background-color: ${'#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)};