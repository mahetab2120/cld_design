// reducers.ts
import {
  UPDATE_FILTER_OPTIONS,
  UPDATE_PATIENT_NUMBER,
  updateFilterOptions,
  updatePatientNumber,
} from "./Actions";

interface AppState {
  filterOption: any;
  patientNumber: string | null;
}

const initialState: AppState = {
  filterOption: {},
  patientNumber: null,
};

type AppAction =
  | ReturnType<typeof updateFilterOptions>
  | ReturnType<typeof updatePatientNumber>;

const rootReducer = (
  state: AppState = initialState,
  action: AppAction,
): AppState => {
  switch (action.type) {
    case UPDATE_FILTER_OPTIONS:
      return { ...state, filterOption: action.payload };
    case UPDATE_PATIENT_NUMBER:
      return { ...state, patientNumber: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
