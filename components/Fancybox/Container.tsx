import {
  useEffect,
  ReactNode,
  useImperativeHandle,
  forwardRef,
  RefObject,
} from 'react';

import { Fancybox as NativeFancybox } from '@fancyapps/ui/dist/fancybox.umd.js';
import '@fancyapps/ui/dist/fancybox.css';

interface Props {
  delegate?: string;
  options?: object;
  children?: ReactNode;
}

export type Type_RefFuncFancybox = {
  getRoot: () => any;
  getInstance: () => any;
};

const Fancybox = forwardRef(
  (
    { delegate, options, children }: Props,
    ref: RefObject<Type_RefFuncFancybox>,
  ) => {
    const _delegate = delegate || '[data-fancybox]';

    useEffect(() => {
      const opts = options || {};

      NativeFancybox.bind(_delegate, opts);

      (window as any).fancybox = NativeFancybox;

      return () => {
        NativeFancybox.destroy();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      getRoot: () => {
        return NativeFancybox;
      },
      getInstance: () => {
        return NativeFancybox.getInstance();
      },
    }));

    return <>{children}</>;
  },
);

export default Fancybox;
