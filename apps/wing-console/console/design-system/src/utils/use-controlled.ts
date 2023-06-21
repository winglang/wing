import { useCallback, useRef, useState } from "react";

export interface UseControlledProps<T = unknown> {
  /**
   * Holds the component value when it's controlled.
   */
  controlled: T | undefined;
  /**
   * The default value when uncontrolled.
   */
  default: T | undefined;
  /**
   * Callback fired when the value changes.
   */
  onChange?: (newValue: T) => void;
}

/**
 * A hook to manage a controlled/uncontrolled component properties.
 *
 * @example
 * ```
 * interface AgeViewProps { age: number; onAgeChange?: (age: number) => void; }
 * const AgeView = (props: AgeViewProps) => {
 *   const [age, setAge] = useControlled({
 *     controlled: props.age,
 *     default: 34,
 *     onChange: props.onAgeChange,
 *   });
 *   // ...
 * };
 * ```
 */
export const useControlled = <T = unknown>({
  onChange,
  ...props
}: UseControlledProps<T>) => {
  const { current: controlled } = useRef(props.controlled !== undefined);
  const [valueState, setValue] = useState(props.default);
  const value = controlled ? props.controlled : valueState;

  const setValueIfUncontrolled = useCallback(
    (newValue: T) => {
      if (!controlled) {
        setValue(newValue);
      }
      onChange?.(newValue);
    },
    [controlled, onChange],
  );

  return [value, setValueIfUncontrolled] as [
    T,
    (newValue: T | ((previousValue: T) => T)) => void,
  ];
};
