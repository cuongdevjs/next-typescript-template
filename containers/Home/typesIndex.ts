/* --- STATE --- */

export interface I_Home {
  loading: boolean;
  error: boolean;
  success: boolean;
}

/**
 * !SECTION
 */
export interface AppState {
  home: I_Home | null;
}

export type ContainerState = AppState;

export default AppState;
