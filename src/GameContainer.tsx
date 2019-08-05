import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import styled from '@emotion/styled'
import {SortableElement, SortableElementProps} from "react-sortable-hoc";
import {Grid} from "@material-ui/core";
import {stateItem} from "./types";


type BoxOwnProps = {
    initialItem: stateItem,
    index: number
}
type sortableElementProp = SortableElementProps & BoxOwnProps

const Box: React.FunctionComponent<BoxOwnProps> = ({initialItem, index}) => {
    console.log(initialItem, index);


    // const randomColor0 = useRef('#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6));
    const randomColor = useMemo(() => '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6), []);

    useEffect(() => {
        console.log('initialNumber props', initialItem)
    }, [initialItem]);


    useEffect(() => {
        console.log('item props', index)
    }, [index]);

    return (
            <BoxWrapperListItem randomColor={randomColor} isVisible={initialItem.isVisible}>
                <span> {initialItem.value}</span>
            </BoxWrapperListItem>
    )

};

export const SortableBox = SortableElement<sortableElementProp>(Box);


const BoxWrapperListItem = styled.li<{ randomColor: string , isVisible: boolean }>`
    background-color: ${props => props.randomColor};
    height: 50px;
    margin: 5px;
    padding: 5px;
    flex: 0 0 20%;
    &.dragging-helper-class{
        list-style: none;
    }
`;

// background-color: ${'#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)};