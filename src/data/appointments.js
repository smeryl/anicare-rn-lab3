// src/data/appointments.js
// Keeps the user's appointments in memory while the app is open.
// (The Flutter version used a SQLite database. For this lab we keep it simple.)

let appointments = [];
let nextId = 1;

// Returns a copy of all appointments
export function getAppointments() {
  return [...appointments];
}

// Adds a new appointment. It gets a unique id and a "Pending" status.
export function addAppointment(data) {
  const appointment = {
    id: String(nextId),
    status: 'Pending',
    ...data,
  };
  nextId += 1;
  appointments = [appointment, ...appointments]; // newest first
  return appointment;
}

// Finds one appointment by id
export function getAppointmentById(id) {
  return appointments.find((item) => item.id === id);
}