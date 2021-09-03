import { useState, useCallback, useRef, useEffect } from "react";
import { Draft, produce, freeze } from "immer";

export type InitialState<State> = State | (() => State);

type UpdaterFunction<State> = (draft: Draft<State>) => void;

export const useVState = <State>(initialState: InitialState<State>) => {
  const [state, innerSetState] = useState<State>(
    freeze(
      typeof initialState === "function"
        ? (initialState as () => State)()
        : initialState,
      true
    )
  );

  const initialStateRef = useRef<State>(state);
  const prevStateRef = useRef<State | undefined>(undefined);

  const setState = useCallback((updater: UpdaterFunction<State> | State) => {
    if (typeof updater === "function") {
      innerSetState(produce(updater as UpdaterFunction<State>));
    } else {
      innerSetState(freeze(updater));
    }
  }, []);

  const reset = useCallback(() => {
    innerSetState(initialStateRef.current);
  }, []);

  const getInitialState = useCallback(() => {
    return initialStateRef.current;
  }, []);

  const getPrevState = useCallback(() => prevStateRef.current, []);

  useEffect(() => {
    const currentState = state;

    return () => {
      prevStateRef.current = currentState;
    }
  }, [state])

  return [state, setState, { reset, getInitialState, getPrevState }] as const;
};
