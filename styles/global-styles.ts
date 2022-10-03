import styled, { createGlobalStyle, css } from 'styled-components';

/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  :root {
    --color-1: #B6B6B6;
    --color-2: #746962;
    --color-3: #FFC113;
    --color-4: #343434;
    --color-5: #D81111;
    --color-6: #71655E;
    --font-title: 'Philosopher', sans-serif;
    --font-body: 'Conv_SanFranciscoDisplay-Light';
    --font-SFPro: 'Conv_SanFranciscoDisplay-Semibold';
    --font-title-1: 'Philosopher-bold';
  }

  body {
    background: #F9F9F9;
    font-size: 16px;
  }
`;

export const Flex = css`
  display: flex;
`;

export const FlexCol = css`
  display: flex;
  flex-direction: column;
`;

export const FlexRowCenter = css`
  ${Flex};
  justify-content: center;
  align-items: center;
`;

export const FlexRowStart = css`
  ${Flex};
  justify-content: flex-start;
  align-items: center;
`;

export const FlexRowEnd = css`
  ${Flex};
  justify-content: flex-end;
  align-items: center;
`;

export const FlexRowBetween = css`
  ${Flex}
  justify-content: space-between;
  align-items: center;
`;

export const FlexColCenter = css`
  ${FlexCol};
  ${FlexRowCenter}
`;

export const FlexColStart = css`
  ${FlexCol};
  justify-content: flex-start;
  align-items: flex-start;
`;

export const FlexColEnd = css`
  ${FlexCol};
  justify-content: flex-end;
  align-items: flex-end;
`;

export const FlexColBetween = css`
  ${FlexCol};
  justify-content: space-between;
  align-items: baseline;
`;

export const BackgroundCover = css<{ bgUrl: string | null | undefined }>`
  background-image: url(${props => props.bgUrl && props.bgUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const BackgroundContain = css`
  ${BackgroundCover};
  background-size: contain;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${FlexRowCenter};
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1;
`;
