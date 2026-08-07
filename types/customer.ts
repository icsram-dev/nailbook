export type CustomerTableItem = {
  id: string;

  firstName: string;
  lastName: string;

  name: string;

  email: string;
  phone: string;

  appointmentCount: number;

  totalSpent: number;

  lastAppointment: Date | null;
  nextAppointment: Date | null;
};