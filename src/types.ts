export interface stateItem  {
    value: number,
    isVisible: boolean
}

export type appComponentsState = {
    items: stateItem[]
}

// export type DraggableEventHandler = DraggableEventHandler


export type DraggableData = {
    node: HTMLElement,
    // lastX + deltaX === x
    x: number, y: number,
    deltaX: number, deltaY: number,
    lastX: number, lastY: number
};