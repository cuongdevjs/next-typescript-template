/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import {
  selectLayout,
  selectNotification,
  selectTranslations,
} from '@containers/Home/selectors';
import { GET_LAYOUT, GET_TRANS } from '@containers/Home/slice';
import { useNotification } from '@utils/hooks/useNotification';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { debounce } from '@utils/helper';
import { BaseXHR } from '@utils/axios';
import LinkInOutApp from '@components/LinkInOutApp';
import dynamic from 'next/dynamic';
import Reaptcha from 'reaptcha';
import { LIST_MENU } from './constants';
import LIST_LOCALE from '../../next-i18next.config.json';

const DangerouslySetHtmlContent = dynamic(
  () => import('@components/DangerouslySetHtmlContent'),
);
interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const headerRef = useRef(null!);
  const captchaRef = useRef(null!);
  const routerPathname = useRef('/');
  const searchMobileRef = useRef<HTMLInputElement>(null!);
  const searchDesktopRef = useRef<HTMLInputElement>(null!);

  const [isShowLoading, setIsShowLoading] = useState(true);
  const [isExpandMenu, setIsExpandMenu] = useState(false);
  const [emailSubscribe, setEmailSubscribe] = useState('');
  const [loadingSubscribe, setLoadingSubscribe] = useState(false);
  const [isExpandSearch, setIsExpandSearch] = useState(false);
  const [isExpandSearchMobile, setIsExpandSearchMobile] = useState(false);

  const notification = useSelector(selectNotification);
  const { header, footer, liveChats } = useSelector(selectLayout);
  const translations = useSelector(selectTranslations);

  const { onOpenNotification, onCloseNotification, onValidateField } =
    useNotification();

  const htmlLiveChats = useMemo(
    () =>
      liveChats
        ?.filter(item => item.type === 'social')
        .reduce((result, item) => result + item.html, ''),
    [liveChats],
  );
  const scriptsLiveChats = useMemo(
    () =>
      liveChats
        ?.filter(item => item.type === 'social')
        ?.reduce((result, item) => result + item.js, ''),
    [liveChats],
  );

  const onCheckSearch = e => {
    const width =
      document.documentElement.clientWidth || document.body.clientWidth;

    if (e.key === 'Enter' || e.keyCode === 13) {
      onToSearchPage(
        width > 640
          ? searchDesktopRef.current?.value
          : searchMobileRef.current?.value,
      );
    }
  };

  const onToSearchPage = value => {
    router.push(`/search?value=${value}`, undefined, { shallow: true });
    setIsExpandMenu(false);
    setIsExpandSearch(false);
    setIsExpandSearchMobile(false);
    searchMobileRef.current.value = '';
    searchDesktopRef.current.value = '';
  };

  const onSetLanguage = (lang: string) => {
    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      { locale: lang },
    );
  };

  const onSubscribe = () => {
    captchaRef.current?.getResponse().then(async response => {
      if (
        onValidateField('email', emailSubscribe, 'notEmpty') &&
        onValidateField('email', emailSubscribe, 'isEmail') &&
        onValidateField('captcha', response, 'notEmpty')
      ) {
        setLoadingSubscribe(true);
        const formData = new FormData();
        formData.append('email', emailSubscribe);
        formData.append('captcha', response);
        try {
          const data = await BaseXHR.$post(
            '/api/form/newsletter/subscribe',
            formData,
            {
              headers: {
                locale: router.locale,
              },
            },
          );
          if (data)
            onOpenNotification({
              type: 'success',
              message: 'Thank you. Subsribe successfully',
              title: 'Success',
              show: true,
            });
          setEmailSubscribe('');
        } catch {
          onOpenNotification({
            type: 'danger',
            message: 'Error',
            title: 'Error. Try again!',
            show: true,
          });
        } finally {
          setLoadingSubscribe(false);
          captchaRef.current.reset();
        }
      }
    });
  };

  const onCheckScroll = useCallback(() => {
    const width =
      document.documentElement.clientWidth || document.body.clientWidth;
    const scroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (routerPathname.current === '/' && width > 640) {
      if (scroll >= 100) {
        headerRef?.current.classList.add('change');
        headerRef?.current.classList.remove('header-home');
      } else {
        headerRef?.current.classList.remove('change');
        headerRef?.current.classList.add('header-home');
      }
    }
    AOS.refresh();
  }, []);

  const onCheckScrollDebounce = debounce(onCheckScroll, 100);

  const onCheckCollapseMenu = useCallback(
    e => {
      const { target } = e;
      const width =
        document.documentElement.clientWidth || document.body.clientWidth;
      onCheckScroll();
      if (width > 640)
        if (!headerRef.current?.contains(target)) setIsExpandMenu(false);
        else setIsExpandMenu(true);
    },
    [onCheckScroll],
  );

  const onCheckCollapseMenuDebounce = debounce(onCheckCollapseMenu, 350);

  const onToTop = useCallback(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }, []);

  const onShowLoading = () => {
    setIsShowLoading(true);
  };
  const onHideLoading = () => {
    setIsShowLoading(false);
    setIsExpandMenu(false);
    setIsExpandSearch(false);
    setIsExpandSearchMobile(false);
    onCheckScroll();
  };

  useEffect(() => {
    routerPathname.current = router.pathname;
  }, [router.pathname]);

  useEffect(() => {
    dispatch(GET_TRANS({ locale: router.locale }));
    dispatch(GET_LAYOUT({ locale: router.locale }));
    onCheckScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, router.locale]);

  useEffect(() => {
    if (header?.logo)
      setTimeout(() => {
        onHideLoading();
      }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [header]);

  useEffect(() => {
    if (!isExpandMenu) setIsExpandSearch(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpandMenu]);

  useEffect(() => {
    const searchDesktop = searchDesktopRef.current;
    const searchMobile = searchMobileRef.current;
    document.addEventListener('mousemove', onCheckCollapseMenuDebounce);
    document.addEventListener('scroll', onCheckScrollDebounce);
    searchMobile && searchMobile.addEventListener('keyup', onCheckSearch);
    searchDesktop && searchDesktop.addEventListener('keyup', onCheckSearch);
    AOS.init({
      offset: -100,
      duration: 1200,
      easing: 'ease-out-back',
      disable: 'mobile',
      once: true,
    });

    router.events.on('routeChangeStart', onShowLoading);
    router.events.on('routeChangeComplete', onHideLoading);
    router.events.on('routeChangeError', onHideLoading);

    return () => {
      document.removeEventListener('mousemove', onCheckCollapseMenuDebounce);
      document.removeEventListener('scroll', onCheckScrollDebounce);
      searchMobile && searchMobile.removeEventListener('keyup', onCheckSearch);
      searchDesktop &&
        searchDesktop.removeEventListener('keyup', onCheckSearch);
      router.events.off('routeChangeStart', onShowLoading);
      router.events.off('routeChangeComplete', onHideLoading);
      router.events.off('routeChangeError', onHideLoading);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header ref={headerRef} className={`${isExpandMenu ? 'active' : ''} `}>
        <Link href="/">
          <div className={`--logo --link ${isExpandMenu ? 'active' : ''}`}>
            <img src={header?.logoSmall} alt="" />
            <img src={header?.logo} alt="" />
          </div>
        </Link>
        <div className={`loading ${isShowLoading ? '' : 'hide'}`}>
          <div className="logo">
            <img src={header?.logo} alt="" />
          </div>
          <div className="partent_loading">
            <img src="/static/img/partent_30.svg" alt="" />
          </div>
        </div>
        <div className={`tab_menu ${isExpandMenu ? 'active' : ''}`}>
          <div className="--img" onClick={() => setIsExpandMenu(prev => !prev)}>
            <img src="static/img/Frame 4943.svg" alt="" />
            <div className="--tab">
              <p />
              <p />
              <p />
            </div>
          </div>
          <ul className="menu ps-0 mb-0">
            {LIST_MENU.map(item => (
              <li
                key={item.key}
                className={`--link ${
                  item.key === router.asPath ? 'active' : ''
                }`}
              >
                <Link href={item.key}>
                  <span>{translations ? translations[item.label] : ''}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="menu menu_mobi d-none ps-0 mb-0">
          <img src="/static/img/partentabc.svg" alt="" />
          {LIST_MENU.map(item => (
            <li
              key={item.key}
              className={`--link ${item.key === router.asPath ? 'active' : ''}`}
            >
              <Link href={item.key}>
                <span>{translations ? translations[item.label] : ''}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className={`search_tab ${isExpandSearch ? 'active' : ''}`}>
          <div className="search">
            <input ref={searchDesktopRef} type="text" placeholder="Search" />
            <img src="/static/img/search.svg" alt="" />
          </div>
          <div
            className="close --link"
            onClick={() => setIsExpandSearch(false)}
          >
            <i className="fa-solid fa-xmark" />
          </div>
        </div>
        <div className="--bot">
          <div
            className="search --link d-flex justify-content-center"
            onClick={() => {
              if (!isExpandSearch) searchDesktopRef.current?.focus();
              else onToSearchPage(searchDesktopRef?.current.value);
              setIsExpandSearch(prev => !prev);
            }}
          >
            <img src="/static/img/search.svg" alt="" />
          </div>
          <div
            className={`search ${
              isExpandSearchMobile ? 'active' : ''
            } --link d-none mobi justify-content-center`}
          >
            <input
              ref={searchMobileRef}
              onBlur={() => {
                setIsExpandSearchMobile(false);
              }}
              type="text"
            />
            <img
              src="/static/img/search.svg"
              alt=""
              onClick={() => {
                if (isExpandSearchMobile)
                  onToSearchPage(searchMobileRef.current.value);
                process.nextTick(() => {
                  setIsExpandSearchMobile(prev => !prev);
                  searchMobileRef.current.focus();
                });
              }}
            />
          </div>
          <div className="--followlink --link d-flex flex-column align-items-center mb-3">
            {header?.socialList?.map(item => (
              <a key={item.icon} href={item.link}>
                <i className={`fa-brands fa-${item.icon}`} />
              </a>
            ))}
          </div>
          <div className="language --link">
            {LIST_LOCALE.locales.map(item => (
              <span
                key={item}
                className={`${item !== router.locale ? 'active' : ''}`}
                onClick={() => onSetLanguage(item)}
              >
                {item.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </header>
      {children}
      <footer>
        <div className="footer">
          <div className="footer_1">
            <h6>THÀNH VIÊN TẬP ĐOÀN SUN GROUP</h6>
            <ul className="--info">
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={footer?.departmentLink}
                >
                  <i className="fa-solid fa-location-dot" />
                  <span>{footer?.department}</span>
                </a>
              </li>
              <li>
                <a target="_blank" rel="noreferrer" href={footer?.addressLink}>
                  <i className="fa-solid fa-house-chimney" />
                  <span>{footer?.address}</span>
                </a>
              </li>
              <li>
                <i className="fa-solid fa-phone-volume" />
                <a href={`tel:${footer?.phone}`}>
                  <span>{footer?.phone}</span>
                </a>
                <a href={`tel:${footer?.phone}`}>
                  <span>{footer?.phone2}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${footer?.email}`}>
                  <i className="fa-solid fa-envelope-open" />
                  <span>{footer?.email}</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="footer_2">
            <h6>{footer?.pageListTitle}</h6>
            <div className="--menu d-flex">
              <ul className="--link">
                {footer?.pageLeftListList?.map(item => (
                  <li key={item.name}>
                    <LinkInOutApp href={item.link?.urlOrSlug}>
                      <div className="--link">
                        <i className="fa-solid fa-chevron-right" />
                        <span>{item.name}</span>
                      </div>
                    </LinkInOutApp>
                  </li>
                ))}
              </ul>
              <ul className="--link">
                {footer?.pageRightListList?.map(item => (
                  <li key={item.name}>
                    <LinkInOutApp href={item.link?.urlOrSlug}>
                      <div className="--link">
                        <i className="fa-solid fa-chevron-right" />
                        <span>{item.name}</span>
                      </div>
                    </LinkInOutApp>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <div className="footer_3">
            <h6>{footer?.policySupportTitle}</h6>
            <ul className="--link">
              {footer?.policySupportList?.map(item => (
                <li key={item.name}>
                  <LinkInOutApp href={item.link?.urlOrSlug}>
                    <div className="--link">
                      <i className="fa-solid fa-chevron-right" />
                      <span>{item.name}</span>
                    </div>
                  </LinkInOutApp>
                </li>
              ))}
            </ul>
          </div> */}
          <div className="footer_4">
            <h6>{footer?.subscribeTitle}</h6>
            <div className="form">
              <input
                type="text"
                placeholder="Email"
                value={emailSubscribe}
                onChange={e => setEmailSubscribe(e.target.value)}
              />
              <button
                className="button_hover"
                type="submit"
                disabled={loadingSubscribe}
                onClick={() => (!loadingSubscribe ? onSubscribe() : {})}
              >
                {loadingSubscribe ? '' : ''}
                <i className="fa-solid fa-right-long" />
              </button>
            </div>
            <div className="w-100 captcha">
              <Reaptcha
                ref={captchaRef}
                className="mt-2 mb-2"
                size="normal"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
              />
            </div>
            <div className="--network">
              <span>{footer?.socialTitle}:</span>
              <ul>
                {footer?.socialList?.map(item => (
                  <li key={item.icon}>
                    <a href={item.link}>
                      <i className={`fa-brands fa-${item.icon}`} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="partent">
            <img src="static/img/Frame 427318529.png" alt="" />
          </div>
        </div>
        <div className="logo">
          {footer?.partner?.map(item => (
            <div key={item.id} className="--item">
              <div className="--img">
                <img src={item.imageBW} alt="" />
              </div>
            </div>
          ))}
        </div>
        <div className="coppyright ">
          <div className="--txt d-flex justify-content-center">
            <span>{footer?.copyright}</span>
            {footer?.copyrightList?.map(item => (
              <LinkInOutApp
                key={item?.name || ''}
                href={item?.link?.urlOrSlug || ''}
              >
                <span className="--link">{item.name}</span>
              </LinkInOutApp>
            ))}
          </div>
          <div className="backtop d-none --link" onClick={onToTop}>
            <span>Back to top</span>
            <i className="fa-solid fa-angle-up" />
          </div>
        </div>
      </footer>
      <div className="social d-flex flex-column">
        {liveChats
          ?.filter(item => item.type !== 'social')
          ?.map((item, index) => (
            <a
              key={index}
              href={`${item.type === 'phone' ? 'tel:' : 'mailto:'}${
                item.content
              }`}
              className="--link"
              style={{
                backgroundColor: item.background_color || 'inherit',
                color: item.color || 'inherit',
                bottom: item.bottom || 'inherit',
                right: item.right || 'inherit',
                width: item.size || 'inherit',
                height: item.size || 'inherit',
              }}
            >
              <i className={`fa-solid fa-${item.icon}`} />
            </a>
          ))}
      </div>
      <ToastContainer
        containerPosition="fixed"
        position="bottom-end"
        style={{ zIndex: 100000 }}
      >
        <Toast
          show={notification?.show}
          className="d-inline-block m-1"
          autohide
          bg={notification?.type}
          onClose={onCloseNotification}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{notification?.title}</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {notification?.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {htmlLiveChats && <DangerouslySetHtmlContent html={htmlLiveChats} />}
      {scriptsLiveChats && (
        <DangerouslySetHtmlContent html={scriptsLiveChats} />
      )}
    </>
  );
}
