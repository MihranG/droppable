import React from 'react';
import ReactDOM from 'react-dom';
import {act, create,} from 'react-test-renderer';
import {Box} from "./Box";
import {boxItemPropMock} from "./mocks";


describe('Box component', () => {
    let container;
    jest.spyOn(Math, 'random').mockImplementation(() => 0.5);
    const onDragStartSpied = jest.fn((id) => () => 'onDragStart' + id);
    const onDragStopSpied = jest.fn(() => () => 'onDragStop');
    const onDropSpied = jest.fn((id) => () => 'onDrop' + id);

    beforeEach(() => {
        container = document.createElement('div');
        act(() => {
            ReactDOM.render(<Box
                initialItem={boxItemPropMock}
                index={6}
                onDrop={onDropSpied}
                onDragStart={onDragStartSpied}
                onDragStop={onDragStopSpied}
            />, container);
        })
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    describe('should be rendered', () => {
        let BoxComponent: any;
        beforeEach(() => {
            act(() => {
                BoxComponent = create(<Box
                    initialItem={boxItemPropMock}
                    index={6}
                    onDrop={jest.fn((id) => () => 'onDrop' + id)}
                    onDragStart={jest.fn((id) => () => 'onDragStart' + id)}
                    onDragStop={jest.fn(() => () => 'onDragStop')}
                />, container);
            });
        });

        it('should match snapshots ', () => {
            expect(BoxComponent.toJSON()).toMatchSnapshot();
        });

        it('should have appropriate event handlers', (done) => {
            // todo need to figure out why event dispatchers are not working correctly

            const fifthBox = container.querySelector('[data-testid="box-5"]');

            // ReactTestUtils.Simulate.dragStart(BoxComponent);
            fifthBox.dispatchEvent(new Event('dragStart'));
            fifthBox.dispatchEvent(new Event('dragEnd'));
            fifthBox.dispatchEvent(new Event('drop'));
            setTimeout(() => {
                expect(onDragStartSpied).toHaveBeenCalled();
                expect(onDragStopSpied).toHaveBeenCalled();
                expect(onDropSpied).toHaveBeenCalled();
            }, 0);
            done()
        });
    })
});