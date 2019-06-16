import React, {
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  useEffect,
  useRef,
  useState
} from "react";
import { useComponentIsVisible } from "../hooks/useComponentIsVisible";

type Props<T = any> = {
  LoadingIndicator: ReactElement;
  iterator: AsyncIterableIterator<T>;
  children: (items: Array<T>) => ReactNode;
};

/**
 * The `LiveData` component accepts an async iterator and will retrieve values from it while
 * the provided `LoadingIndicator` component is visible
 *
 * As the user scrolls the contents of the component, more items will be retrieved automatically
 */
const LiveData: FC<Props> = ({
  LoadingIndicator,
  iterator,
  children,
  ...rest
}) => {
  const [items, setItems] = useState<Array<any>>([]);
  const outerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line no-undef
  const loadingIndicator = cloneElement(LoadingIndicator, {
    ref: loadingRef
  });

  const loadingIndicatorIsVisible = useComponentIsVisible(loadingRef, outerRef);

  useEffect(function() {
    let stillCaresAboutItem = true;

    if (loadingIndicatorIsVisible) {
      iterator.next().then(({ value }) => {
        if (stillCaresAboutItem) {
          setItems([...items, value]);
        }
      });
    }

    return () => {
      stillCaresAboutItem = false;
    };
  });

  return (
    <div ref={outerRef} {...rest}>
      {children(items)}
      {loadingIndicator}
    </div>
  );
};

export { LiveData };
