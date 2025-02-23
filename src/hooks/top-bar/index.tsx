import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';

type TopBarState = {
  actions?: ReactNode;
  label?: string;
  subtitle?: ReactNode | string;
};
const initContext: TopBarState = {
  actions: [],
  label: ''
};

export enum TopBarActionType {
  SET_TOP_BAR = 'SET_TOP_BAR',
  RESET_TOP_BAR = 'RESET_TOP_BAR'
}

type Action =
  | {
      type: TopBarActionType.SET_TOP_BAR;
      payload: { data?: TopBarState };
    }
  | {
      type: TopBarActionType.RESET_TOP_BAR;
    };

const TopBarContext = createContext({ state: initContext } as {
  state: TopBarState;
  dispatch: Dispatch<Action>;
});

type TopBarProviderProps = {
  children: ReactNode;
};

export function TopBarProvider({ children }: TopBarProviderProps) {
  const reducer = (state: TopBarState, action: Action): TopBarState => {
    switch (action.type) {
      case TopBarActionType.SET_TOP_BAR: {
        const payload = action.payload;
        return { ...state, ...payload.data };
      }
      case TopBarActionType.RESET_TOP_BAR: {
        return initContext;
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initContext as TopBarState);
  return <TopBarContext.Provider value={{ state, dispatch }}>{children}</TopBarContext.Provider>;
}

export const useTopBar = () => {
  const { state, dispatch } = useContext(TopBarContext);

  const setTopBar = (data: TopBarState) => {
    dispatch({
      type: TopBarActionType.SET_TOP_BAR,
      payload: { data }
    });
  };

  const resetTopBar = () => {
    dispatch({
      type: TopBarActionType.RESET_TOP_BAR
    });
  };

  return {
    state,
    actions: {
      setTopBar,
      resetTopBar
    }
  };
};
