export interface stateItem  {
    value: number,
    isVisible: boolean
}

export type appComponentsState = {
    items: stateItem[];
    draggingID: number

}



export type DraggableEventHandler = (
    e: DragEvent,
) => void;


// export interface ReactTestRendererWithState extends ReactTestRenderer  {
//     getInstance() :  ()=>ReactElement
// }

//
// interface DragEventWithElement<E> extends DragEventInit<E>{
//
// }

// export type DraggableEventHandlerHTML = (event: MouseEvent<HTMLLIElement>) => void