import { FlexRowCenter } from '@styles/global-styles';
import styled from 'styled-components';

export const LoadingContainerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  &.--loading {
    overflow: hidden;
    pointer-events: none;
    ${FlexRowCenter}
    .--children {
      backdrop-filter: blur(3px);
      opacity: 0.25;
      width: 100%;
      height: 100%;
    }
  }
  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    ${FlexRowCenter}
  }
`;
