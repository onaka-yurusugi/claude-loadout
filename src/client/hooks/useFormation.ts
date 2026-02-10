import { useReducer, useCallback } from "react";
import type { Formation, FormationAction } from "../lib/types";

const STORAGE_KEY = "claude-loadout-draft";

function createInitialFormation(): Formation {
  return {
    title: "",
    description: "",
    author: "",
    scenario: "",
    slots: [],
    v: 1,
  };
}

function loadDraft(): Formation {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Formation;
      if (parsed.v === 1 && Array.isArray(parsed.slots)) return parsed;
    }
  } catch {
    // ignore
  }
  return createInitialFormation();
}

function formationReducer(
  state: Formation,
  action: FormationAction
): Formation {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_AUTHOR":
      return { ...state, author: action.payload };
    case "SET_SCENARIO":
      return { ...state, scenario: action.payload };
    case "ADD_SLOT":
      if (state.slots.length >= 10) return state;
      return { ...state, slots: [...state.slots, action.payload] };
    case "UPDATE_SLOT":
      return {
        ...state,
        slots: state.slots.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    case "REMOVE_SLOT":
      return {
        ...state,
        slots: state.slots.filter((s) => s.id !== action.payload),
      };
    case "REORDER_SLOTS":
      return { ...state, slots: action.payload };
    case "LOAD":
      return action.payload;
    default:
      return state;
  }
}

export function useFormation() {
  const [formation, dispatch] = useReducer(formationReducer, null, loadDraft);

  const saveDraft = useCallback((f: Formation) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(f));
    } catch {
      // ignore
    }
  }, []);

  const dispatchAndSave = useCallback(
    (action: FormationAction) => {
      dispatch(action);
      // We save after dispatch by using the action to predict next state
      // Better approach: save in useEffect
    },
    []
  );

  return { formation, dispatch: dispatchAndSave, saveDraft };
}
