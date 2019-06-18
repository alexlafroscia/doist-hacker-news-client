import React, {
  ComponentType,
  FC,
  ReactNode,
  RefAttributes,
  useEffect,
  useRef,
  useState
} from "react";
import {
  BufferOptions,
  useComponentIsVisible
} from "../hooks/useComponentIsVisible";

type Props<T = any> = {
  LoadingIndicator: ComponentType<RefAttributes<HTMLDivElement>>;
  buffer?: BufferOptions;
  children: (items: Array<T>) => ReactNode;
  iterator: AsyncIterableIterator<T>;
};

/**
 * The `LiveData` component accepts an async iterator and will retrieve values from it while
 * the provided `LoadingIndicator` component is visible
 *
 * As the user scrolls the contents of the component, more items will be retrieved automatically
 */
const LiveData: FC<Props> = ({
  LoadingIndicator,
  buffer,
  children,
  iterator,
  ...rest
}) => {
  const [items, setItems] = useState<Array<any>>([]);
  const outerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const loadingIndicatorIsVisible = useComponentIsVisible(
    loadingRef,
    outerRef,
    buffer
  );

  useEffect(function() {
    let stillCaresAboutItem = true;

    if (loadingIndicatorIsVisible) {
      iterator.next().then(({ value }) => {
        if (value && stillCaresAboutItem) {
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
      <LoadingIndicator ref={loadingRef} />
    </div>
  );
};

export { LiveData };
