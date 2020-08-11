import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Sentence, { getShouldHighlight, aggregateSentence, renderLect, TIME_CODE_FUDGE } from './Sentence';
import storyData from '../../fixtureData/story.data';

const mockSentence = storyData.paragraphs[0].sentences[0];

describe('Sentence', () => {
  describe('the main component render', () => {
    const baseProps = {
      sentence: mockSentence,
      readTime: 12.34,
      showModal: () => {},
      configuration: {
        shouldShowTranslation: false,
        isTranslationBelow: false,
      },
    };

    const renderer = ShallowRenderer.createRenderer();

    describe('with data', () => {
      it('should render and match snapshot', () => {
        renderer.render(<Sentence {...baseProps} />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });

    describe('with data, shouldShowTranslation', () => {
      it('should render and match snapshot', () => {
        renderer.render(<Sentence { ...baseProps } configuration={ { ...baseProps.configuration, shouldShowTranslation: true } }/>);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });

    describe('with data, isTranslationBelow', () => {
      it('should render and match snapshot', () => {
        renderer.render(<Sentence { ...baseProps } configuration={ { ...baseProps.configuration, isTranslationBelow: true } }/>);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });
  });

  describe('getShouldHighlight', () => {
    const lect = {
      text: 'text123',
      start: 1000,
      end: 2000,
    };

    describe('when readTime is well before start', () => {
      const readTime = lect.start - TIME_CODE_FUDGE * 2;
      it('should return false', () => {
        expect(getShouldHighlight(lect, readTime)).toBe(false);
      });
    });

    describe('when readTime is before start but within fudge', () => {
      const readTime = lect.start - TIME_CODE_FUDGE / 2;
      it('should return true', () => {
        expect(getShouldHighlight(lect, readTime)).toBe(true);
      });
    });

    describe('when readTime is well within start and stop', () => {
      const readTime = lect.start + (lect.end - lect.start) / 2;
      it('should return true', () => {
        expect(getShouldHighlight(lect, readTime)).toBe(true);
      });
    });

    describe('when readTime is after start but within fudge', () => {
      const readTime = lect.end + TIME_CODE_FUDGE / 2;
      it('should return true', () => {
        expect(getShouldHighlight(lect, readTime)).toBe(true);
      });
    });

    describe('when readTime is well after end', () => {
      const readTime = lect.end + TIME_CODE_FUDGE * 2;
      it('should return false', () => {
        expect(getShouldHighlight(lect, readTime)).toBe(false);
      });
    });
  });

  describe('aggregateSentence', () => {
    it('should return the correct string', () => {
      const expectedString = ' Frère Jacques.';
      expect(aggregateSentence(mockSentence)).toBe(expectedString);
    });
  });

  describe('renderLect', () => {
    describe('if should be highlighted', () => {
      const mockLect = mockSentence.lects[0];
      const readTime = mockLect.start + TIME_CODE_FUDGE / 2;
      const functionProps = {
        idx: 12,
        isLast: false,
        lect: mockLect,
        originalSentence: 'original sentence 123',
        readTime,
        sentenceTranslation: 'sentence translation 123',
        showModal: () => {},
      }
      it('should render and match snapshot', () => {
        expect(renderLect(functionProps)).toMatchSnapshot();
      });
    });

    describe('if should not be highlighted', () => {
      const mockLect = mockSentence.lects[0];
      const readTime = mockLect.end + TIME_CODE_FUDGE * 2;
      const functionProps = {
        idx: 12,
        isLast: false,
        lect: mockLect,
        originalSentence: 'original sentence 123',
        readTime,
        sentenceTranslation: 'sentence translation 123',
        showModal: () => {},
      }
      it('should render and match snapshot', () => {
        expect(renderLect(functionProps)).toMatchSnapshot();
      });
    });
  });
});
