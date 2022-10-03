import { createGlobalStyle } from 'styled-components';
/* istanbul ignore next */
export const ResponsiveGlobal = createGlobalStyle`
  body {
    @media (max-width: 1200px) {
      font-size: 12px;
    }
  }

  .far {
    font-weight: 300;
  }

  .action-icon {
    font-size: 1rem !important;
    margin-bottom: 10px !important;
    margin-top: 10px !important;
  }

  @media (min-width: 576px) {
    &.show-on-mobile {
      display: none !important;
    }
    &.hide-on-mobile {
      display: inline-block !important;
    }
  }
  @media (max-width: 575px) {
    .show-on-mobile {
      display: inline-block !important;
    }
    .hide-on-mobile {
      display: none !important;
    }
  }

`;
