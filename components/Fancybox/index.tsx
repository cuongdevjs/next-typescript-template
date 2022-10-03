import {
  forwardRef,
  RefObject,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import FancyboxContainer, { Type_RefFuncFancybox } from './Container';

export type Type_RefFancyBox = {
  getInstance: () => any;
};
interface Props {
  options?: object;
  onClose?: () => void;
}

const Fancybox = forwardRef(
  (
    {
      options = {
        infinite: false,
        closeButton: 'outside',
        dragToClose: false,
        helpers: {
          overlay: { closeClick: false },
        },
        clickSlide: false,
        touch: false,
      },
      onClose,
    }: Props,
    ref: RefObject<Type_RefFancyBox>,
  ) => {
    const fancyboxRef = useRef<Type_RefFuncFancybox>(null!);

    const _options = useMemo(
      () => ({
        ...options,
        on: {
          destroy: () => (onClose ? onClose() : () => {}),
        },
      }),
      [onClose, options],
    );

    useImperativeHandle(
      ref,
      () => ({
        getInstance() {
          return fancyboxRef.current.getRoot();
        },
      }),
      [],
    );

    return (
      <FancyboxContainer ref={fancyboxRef} options={_options}>
        <a
          data-fancybox="gallery"
          href="https://lipsum.app/id/3/800x600"
          className="d-none"
        >
          Panoee
        </a>
      </FancyboxContainer>
    );
  },
);

export default Fancybox;
