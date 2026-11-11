// src/data/vets.js
// Veterinarian records for AniCare.
// Every vet has a unique "id". We pass this id between screens.
// "photo" is just a name for now. We connect the real pictures in a later step.

export const VETS = [
  {
    id: '1',
    name: 'Dr. Maria Santos, DVM',
    kind: 'Veterinarian',
    about: 'Swine and poultry health. Farm visits within Bunawan.',
    photo: 'doctor',
    distanceKm: 1.2,
    fee: 350,
    rating: 4.9,
    services: ['Farm visit', 'Vaccination', 'Pregnancy check'],
  },
  {
    id: '2',
    name: 'Tech. Carlo Reyes',
    kind: 'Animal Technician',
    about: 'Vaccination, deworming and basic care for goats and hogs.',
    photo: 'doctor_3',
    distanceKm: 2.8,
    fee: 200,
    rating: 4.7,
    services: ['Vaccination', 'Deworming', 'Hoof care'],
  },
  {
    id: '3',
    name: 'Dr. Paolo Lim, DVM',
    kind: 'Veterinarian',
    about: 'Large animal and flock health programs.',
    photo: 'doctor_2',
    distanceKm: 4.5,
    fee: 400,
    rating: 4.8,
    services: ['Farm visit', 'Flock program', 'Emergency'],
  },
];

// Finds one vet by id. The details screen uses this.
export function getVetById(id) {
  return VETS.find((vet) => vet.id === id);
}