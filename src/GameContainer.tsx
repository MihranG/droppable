import React, {useMemo, useState} from 'react';
import styled from '@emotion/styled'
import {stateItem, DraggableEventHandler} from "./types";


type BoxOwnProps = {
    initialItem: stateItem,
    index: number,
    onDragStart: (id: number) => DraggableEventHandler,
    onDragStop: (id: number) => DraggableEventHandler,
    onDrop: (id: number) => DraggableEventHandler
}


type BoxWrapperListItemProps = {
    onDragStart: DraggableEventHandler,
    onDragStop: DraggableEventHandler,
    ondrop: DraggableEventHandler,
    randomColor: string,
    isDraggedOver: boolean,
    isInDraggingState: boolean

}

export const Box: React.FunctionComponent<BoxOwnProps> = ({initialItem, index, onDragStart, onDragStop, onDrop}) => {


    const randomColor = useMemo(() => '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6), []);


    const [isDraggedOver, isDraggedOverSetter] = useState(false);
    const [isInDraggingState, isInDraggingStateSetter] = useState(false);

    return (

        <BoxWrapperListItem
            onDragStart={(e:DragEvent)=>{
                isInDraggingStateSetter(true);
                return onDragStart(index)(e)}
            }
            onDragEnd={(e:DragEvent)=>{
                isInDraggingStateSetter(false);
                return onDragStop(index)(e)}
            }
            onDrop={(e:DragEvent)=>{
                isDraggedOverSetter(false);
                return onDrop(index)(e)
            }}

            onDragEnter={(e: Event) => {
                e.stopPropagation();
                isDraggedOverSetter(true)
            }}

            onDragLeave={(e: Event) => {
                e.stopPropagation();
                e.preventDefault();

                isDraggedOverSetter(false)
            }}

            onDragOver={(e:Event)=>{
                e.stopPropagation();
                e.preventDefault();
            }}

            randomColor={randomColor}
            isDraggedOver={isDraggedOver}
            isInDraggingState={isInDraggingState}
            draggable={true}
        >
            <span> {initialItem.value}</span>
        </BoxWrapperListItem>
    )

};



// @ts-ignore
const BoxWrapperListItem = styled.li<BoxWrapperListItemProps>`
    border: ${(props:BoxWrapperListItemProps)=>
    props.isDraggedOver && !props.isInDraggingState ? '4px dotted black' : ''};
    background-color: ${(props: BoxWrapperListItemProps) => props.randomColor};
    height: ${(props:BoxWrapperListItemProps) => props.isInDraggingState ? '60px' : '50px'};
    margin: 5px;
    padding: 5px;
    flex: 0 0 20%;
    // &.draggingClass{
    //     z-index:1;
    // }
    
`;

// background-color: ${'#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)};