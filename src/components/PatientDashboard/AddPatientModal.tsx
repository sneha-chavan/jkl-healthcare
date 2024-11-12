// src/components/Patient/AddPatientModal.tsx
import React, { useState } from "react";

type Patient = {
  id: number;
  name: string;
  age: number;
  medicalHistory: string;
};

type AddPatientModalProps = {
  onSave: (patient: Patient) => void;
  onClose: () => void;
};

// @TODO: styling
// @TODO: on Click -> open full big Modal to show Patient Details

export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  onSave,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [medicalHistory, setMedicalHistory] = useState("");

  const handleSave = () => {
    const newPatient: Patient = {
      id: Date.now(),
      name,
      age,
      medicalHistory,
    };
    onSave(newPatient);
  };

  return (
    <div className="modal">
      <h2>Add Patient</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <textarea
        placeholder="Medical History"
        value={medicalHistory}
        onChange={(e) => setMedicalHistory(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};
