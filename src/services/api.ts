export const CAREGIVER_URL = "http://localhost:5000/caregivers";
export const PATIENT_URL = "http://localhost:5000/patients";

export const fetchCaregivers = async () => {
  const response = await fetch(`${CAREGIVER_URL}/users`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
