import { useState, useEffect } from "react";

interface Caregiver {
  id: number;
  name: string;
  isAvailable: boolean;
  patientId: number;
}

interface Patient {
  id: string;
  patientId: number;
  name: string;
  assignedCaregiver?: Caregiver;
}

interface ApiResponsePatients extends Array<Patient> {}
interface ApiResponseCaregivers extends Array<Caregiver> {}

const useApiCall = (apiUrl: string, options?: RequestInit) => {
  const [data, setData] = useState<Caregiver[] | Patient[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
          throw new Error("Network response is not ok");
        }
        const result: ApiResponseCaregivers | ApiResponsePatients =
          await response.json();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, options]);

  return { data, loading, error };
};

export default useApiCall;
