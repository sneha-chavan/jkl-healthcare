import React, { useEffect, useState } from "react";
import styles from "./CaregiverAssignment.module.css";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import useApiCall from "../../hooks/useApiCalls";
import { CAREGIVER_URL, PATIENT_URL } from "../../services/api";

interface Caregiver {
  id: number;
  name: string;
  isAvailable: boolean;
  patientId?: number;
}

interface Patient {
  id: number;
  patientId: number;
  name: string;
  assignedCaregiver?: Caregiver;
}

const caregiversList: Caregiver[] = [
  { id: 1, name: "Alice Johnson", isAvailable: true },
  { id: 2, name: "Bob Smith", isAvailable: false, patientId: 23467 },
  { id: 3, name: "Charlie Brown", isAvailable: true },
  { id: 4, name: "David Williams", isAvailable: true },
  { id: 5, name: "Eva Davis", isAvailable: false, patientId: 45678 },
];

const patientsList: Patient[] = [
  {
    id: 1,
    patientId: 23467,
    name: "John Doe",
    assignedCaregiver: caregiversList[1],
  },
  {
    id: 2,
    patientId: 45678,
    name: "Mary Johnson",
    assignedCaregiver: caregiversList[4],
  },
  { id: 3, patientId: 85362, name: "James Carter" }, // No assigned caregiver
  {
    id: 4,
    patientId: 33456,
    name: "Sophia Lee",
    assignedCaregiver: caregiversList[3],
  },
  { id: 5, patientId: 78654, name: "William Harris" }, // No assigned caregiver
];

//@TODO: Add Tabs - each for list of Patients & Caregivers
//@TODO: common css: all btn styling should at one place.
// @TODO: manipulation with patient Name instead of patient Id - so check on this.
// @TODO: how will you handle duplicate names;
// @TODO: if no cg available to assign, show message "Sorry, You need to wait till next cg is available"
// @TODO: notify admin when any cg are available only after all cgs were occupied
// @TODO : mock api calls creat with Json-Server

const CaregiverAssignment: React.FC = () => {
  const { data, loading, error } = useApiCall(PATIENT_URL);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);

  useEffect(() => {
    console.log(data);
    if (data) {
      console.log("patient:", patients);
      setPatients(data);
    }
  }, [data]);
  //Assign first available caregiver
  const assignCaregiver = (patientId: number) => {
    const availableCG = caregivers.find((caregiver) => caregiver.isAvailable);

    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.patientId === patientId
          ? { ...patient, assignedCaregiver: availableCG }
          : patient
      )
    );

    setCaregivers((prevCaregivers) =>
      prevCaregivers.map((caregiver) =>
        caregiver.id === availableCG?.id
          ? { ...caregiver, patientId: patientId, isAvailable: false }
          : caregiver
      )
    );
  };

  const removeCaregiver = (patientId: number) => {
    setPatients((prevPatientList) =>
      prevPatientList.map((patient) =>
        patient.patientId === patientId
          ? { ...patient, assignedCaregiver: undefined }
          : { ...patient }
      )
    );
    setCaregivers((prevCGList) =>
      prevCGList.map((caregiver) =>
        caregiver.patientId === patientId
          ? { ...caregiver, patientId: undefined, isAvailable: true }
          : { ...caregiver }
      )
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(patients);
  return (
    <div>
      <h2>Caregiver Assignment Dashboard</h2>
      <Table>
        <Thead>
          <Tr>
            <Th>Patient Name</Th>
            <Th>Caregiver</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {patients.map((patient) => (
            <Tr key={patient.patientId}>
              <Td className={styles.patientName}>{patient?.name}</Td>
              {patient?.assignedCaregiver ? (
                <>
                  <Td>
                    <div className={styles.caregiverInfoStatus}>
                      {patient?.assignedCaregiver?.name}
                    </div>
                  </Td>
                  <Td>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeCaregiver(patient.patientId)}
                    >
                      <DeleteIcon />
                    </button>
                  </Td>
                </>
              ) : (
                <>
                  <Td>
                    <div className={styles.addCaregiverBtn}></div>
                  </Td>
                  <Td>
                    <button
                      className={styles.addButton}
                      onClick={() => assignCaregiver(patient.patientId)}
                    >
                      <AddIcon />
                    </button>
                  </Td>
                </>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <CareGiverList />
    </div>
  );
};

const CareGiverList: React.FC = () => {
  const { data, loading, error } = useApiCall(CAREGIVER_URL);
  const [caregivers, setCaregivers] = useState([]);
  useEffect(() => {
    data && setCaregivers(data);
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      {/* CG Name, Availability, OnGoing Assignment */}
      <Table>
        <Thead>
          <Tr>
            <Th>CareGiver Name</Th>
            <Th>Status</Th>
            <Th>Assignment</Th>
          </Tr>
        </Thead>
        <Tbody>
          {caregivers.map((caregiver) => (
            <Tr>
              <Td>{caregiver.name}</Td>
              <Td className={styles.caregiverInfoStatus}>
                <div
                  className={`${styles.statusIndicator} ${
                    caregiver.isAvailable
                      ? styles.availableStatus
                      : styles.unavailableStatus
                  }`}
                />
                {caregiver.isAvailable ? "Available" : "Occupied"}
              </Td>
              <Td>{caregiver.patientId}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};
export default CaregiverAssignment;
