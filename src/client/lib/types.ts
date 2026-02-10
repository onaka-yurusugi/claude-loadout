export type SlotCategory =
  | "model"
  | "plugin"
  | "skill"
  | "claude-md"
  | "mcp-server"
  | "hook"
  | "custom";

export type Slot = {
  id: string;
  name: string;
  category: SlotCategory;
  description: string;
};

export type Formation = {
  title: string;
  description: string;
  author: string;
  scenario: string;
  slots: Slot[];
  v: 1;
};

export type FormationAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_AUTHOR"; payload: string }
  | { type: "SET_SCENARIO"; payload: string }
  | { type: "ADD_SLOT"; payload: Slot }
  | { type: "UPDATE_SLOT"; payload: Slot }
  | { type: "REMOVE_SLOT"; payload: string }
  | { type: "REORDER_SLOTS"; payload: Slot[] }
  | { type: "LOAD"; payload: Formation };
