import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {create, act, /*ReactTestRenderer*/} from 'react-test-renderer';
import {initialStateMock} from "./mocks";

describe('App root component', () => {
    let AppComponent: any;

    jest.spyOn(Math,'random').mockImplementation(()=>0.5);

    it('should render without errors', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    act(() => {
        AppComponent = create(<App/>);
    });

    it('should match snapshots ', () => {
        expect(AppComponent.toJSON()).toMatchSnapshot();
    });

    it('should initiate correct state', () => {
        AppComponent = create(<App/>);
        expect(AppComponent.getInstance()!.state).toEqual(initialStateMock)
    });

    describe('should has method',()=>{
        it('onDragStart which must return function',()=>{
            expect(AppComponent.getInstance()!.state.draggingID).toBe(-1);
            AppComponent.getInstance().onDragStart(8)();
            expect(AppComponent.getInstance()!.state.draggingID).toBe(8);
        });


        it('onDragStop which must return function which sets draggingId to initial value',()=>{
            AppComponent.getInstance().setState({draggingID:5});
            expect(AppComponent.getInstance()!.state.draggingID).toBe(5);
            AppComponent.getInstance().onDragStop()();
            expect(AppComponent.getInstance()!.state.draggingID).toBe(-1);
        });

        it('onDrop which must return function which will swap items',()=>{
            AppComponent.getInstance().setState({draggingID:5});
            expect(AppComponent.getInstance()!.state.draggingID).toBe(5);
            expect(AppComponent.getInstance()!.state.items[5]).toEqual({isVisible:true, value:6});
            expect(AppComponent.getInstance()!.state.items[10]).toEqual({isVisible:true, value:11});
            AppComponent.getInstance().onDrop(10)();
            expect(AppComponent.getInstance()!.state.items[10]).toEqual({isVisible:true, value:6});
            expect(AppComponent.getInstance()!.state.items[5]).toEqual({isVisible:true, value:11});
            expect(AppComponent.getInstance()!.state.draggingID).toBe(-1);
        })
    })
});
