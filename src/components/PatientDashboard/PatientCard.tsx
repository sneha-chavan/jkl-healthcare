import React from "react";
import styles from "./Patient.module.css";

type Patient = {
  id: number;
  name: string;
  age: number;
  medicalHistory: string;
};

type PatientCardProps = {
  patient: Patient;
  onRemove: (id: number) => void;
};

// @TODO: styling improve
// @TODO: show top Medical History only, for more click on Card to show Patient Details
export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onRemove,
}) => {
  return (
    <div className={styles.patientCard}>
      <h3>{patient.name}</h3>
      <p>Age: {patient.age}</p>
      <p>Medical History: {patient.medicalHistory}</p>
      <button onClick={() => onRemove(patient.id)}>Remove</button>
    </div>
  );
};
