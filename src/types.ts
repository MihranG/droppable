import * as React from "react";

export interface stateItem  {
    value: number,
    isVisible: boolean
}

export type appComponentsState = {
    items: stateItem[];
    draggingID: number

}

// export type DraggableEventHandler = DraggableEventHandler


export type DraggableData = {
    node: HTMLElement,
    // lastX + deltaX === x
    x: number, y: number,
    deltaX: number, deltaY: number,
    lastX: number, lastY: number
};



export type DraggableEvent = React.MouseEvent<HTMLElement | SVGElement>
    | React.TouchEvent<HTMLElement | SVGElement>
    | MouseEvent
    | TouchEvent


export type DraggableEventHandler = (
    e: DragEvent,
) => void;

//
// interface DragEventWithElement<E> extends DragEventInit<E>{
//
// }

// export type DraggableEventHandlerHTML = (event: MouseEvent<HTMLLIElement>) => void