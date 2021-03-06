import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal, { renderLine, ModalInterface } from './Modal';

const mockLectData = {
  originalSentence: '1.23',
  end: 4.56,
  text: 'Hola.',
  translation: 'Hello.',
  explanation: 'This is how we say hello,',
};
const mockModalData = {
  ...mockLectData,
  originalSentence: 'original123',
  sentenceTranslation: 'translation123'
}
describe('Modal', () => {
  describe('the main component render', () => {
    const renderer = ShallowRenderer.createRenderer();
    describe('empty', () => {
      it('should render without crashing', () => {
        const props = {} as ModalInterface;
        renderer.render(<Modal {...props} />);
        expect(renderer.getRenderOutput()).toBeNull();
      });
    });

    describe('with data', () => {
      const props = {
        data: mockModalData,
        hideModal: () => {},
      };

      it('should render without crashing', () => {
        renderer.render(<Modal { ...props } />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });
  });

  describe('renderLine', () => {
    describe('without thisData', () => {
      const label = 'label123';
      const thisData = undefined as unknown as string;
      it('should render and not crash', () => {
        expect(renderLine(label, thisData)).toBeNull();
      });
    });

    describe('with data', () => {
      const label = 'label123';
      const thisData = 'thisData123';
      it('should render and not crash', () => {
        expect(renderLine(label, thisData)).toMatchSnapshot();
      });
    });
  });

  describe('cancel button', () => {
    const props = { hideModal: jest.fn(), data: 'some data' } as unknown as ModalInterface;
    render(<Modal { ...props }/>);
    let retrievedButtons;

    beforeAll(() => {
      render(<Modal { ...props }/>);
      retrievedButtons = screen.getAllByTestId('modal-close-button');
      userEvent.click(retrievedButtons[0]);
    });

    it('should only be one button', () => {
      expect(retrievedButtons.length).toBe(1);
    });

    it('should call function when clicked', () => {
      expect(props.hideModal).toBeCalled();
    });
  });
});
