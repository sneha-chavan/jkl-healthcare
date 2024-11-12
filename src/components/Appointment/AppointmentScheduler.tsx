// src/components/Appointment/AppointmentScheduler.tsx
import React, { useState } from "react";
import styles from "./Appointment.module.css";

type Appointment = {
  id: number;
  patientName: string;
  date: string;
  status: string;
};

export const AppointmentScheduler: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patientName: "John Doe", date: "2024-11-07", status: "Scheduled" },
  ]);

  const updateStatus = (id: number, newStatus: string) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <div className={styles.schedulerContainer}>
      <h2>Appointment Scheduler</h2>
      {appointments.map((app) => (
        <div key={app.id} className={styles.appointmentCard}>
          <h3>{app.patientName}</h3>
          <p>Date: {app.date}</p>
          <p>Status: {app.status}</p>
          <button onClick={() => updateStatus(app.id, "Completed")}>
            Mark as Completed
          </button>
          <button onClick={() => updateStatus(app.id, "Cancelled")}>
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};
