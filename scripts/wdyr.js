// import React from 'react';

// if (process.env.NODE_ENV === 'development') {
//   const antComponents = require('antd');
//   Object.values(antComponents).forEach(c => {
//     if (typeof c === 'function') {
//       c.whyDidYouRender = false;
//     }
//   });

//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   // const ReactRedux = require('react-redux');

//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//     // trackExtraHooks: [ReactRedux, 'useSelector'],
//     collapseGroups: true,
//     onlyLogs: true,
//   });
// }

import React from 'react';

if (process.env.NODE_ENV === 'development') {
  if (typeof window !== 'undefined') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
      trackAllPureComponents: false,
    });
  }
}
