import { AppointmentScheduler } from "./components/Appointment/AppointmentScheduler";
import { LoginForm } from "./components/Auth/LoginForm";
import { RegistrationForm } from "./components/Auth/RegistrationForm";
import CaregiverAssignment from "./components/caregiver/CaregiverAssignmentDashboard";
import { PatientDashboard } from "./components/PatientDashboard/PatientDashboard";

// @TODO:  lazy loading & code splitting
// @TODO: routing
function App() {
  return (
    <>
      <RegistrationForm />
      <LoginForm />
      <PatientDashboard />
      <CaregiverAssignment />
      <AppointmentScheduler />
    </>
  );
}

export default App;
