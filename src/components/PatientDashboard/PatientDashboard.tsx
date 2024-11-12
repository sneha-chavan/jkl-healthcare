// src/components/Patient/PatientDashboard.tsx
import React, { useState } from "react";
import { PatientCard } from "./PatientCard";
import { AddPatientModal } from "./AddPatientModal";
import styles from "./Patient.module.css";

type Patient = {
  id: number;
  name: string;
  age: number;
  medicalHistory: string;
};

// @TODO: show cards in rows & column with pagination
// @TODO: open AddPatient form just beside or below 'Add' btn - DONE
// @TODO: Styling improve
// @TODO: mock data or api calls
// @TODO: state management

export const PatientDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const addPatient = (patient: Patient) => {
    setPatients([...patients, patient]);
    setModalOpen(false);
  };

  const removePatient = (id: number) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2>Patient Dashboard</h2>
      <button className={styles.addButton} onClick={() => setModalOpen(true)}>
        Add Patient
      </button>
      {isModalOpen && (
        <AddPatientModal
          onSave={addPatient}
          onClose={() => setModalOpen(false)}
        />
      )}
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          onRemove={removePatient}
        />
      ))}
    </div>
  );
};
