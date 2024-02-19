export const UPDATE_FILTER_OPTIONS = "UPDATE_FILTER_OPTIONS";
export const UPDATE_PATIENT_NUMBER = "UPDATE_PATIENT_NUMBER";

interface UpdateFilterAction {
  type: typeof UPDATE_FILTER_OPTIONS;
  payload: any;
}

interface UpdatePatientNumberAction {
  type: typeof UPDATE_PATIENT_NUMBER;
  payload: string | null;
}

export const updateFilterOptions = (
  filterOptions: any,
): UpdateFilterAction => ({
  type: UPDATE_FILTER_OPTIONS,
  payload: filterOptions,
});

export const updatePatientNumber = (
  patientNumber: string | null,
): UpdatePatientNumberAction => ({
  type: UPDATE_PATIENT_NUMBER,
  payload: patientNumber,
});
