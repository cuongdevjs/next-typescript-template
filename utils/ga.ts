import { isServer } from './helper';

export const gaConfig = () => ({
  pageview: (pageTitle, pageLocation, page, gtag) => {
    if (!isServer) {
      (window as any).gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location: pageLocation,
        page_path: page,
        send_to: gtag,
      });
    }
  },
  event: ({ eventName, sceneName, hotspotType, hotspotName }) => {
    if (!isServer) {
      (window as any).gtag('event', eventName, {
        hotspotName,
        hotspotType,
        sceneName,
      });
    }
  },
});

// export const onHandleRouteChange = url => {
//   if (!isServer) {
//     console.log(url);
//     // gaConfig().pageview(window.origin + url);
//   }
// };

export default gaConfig;
