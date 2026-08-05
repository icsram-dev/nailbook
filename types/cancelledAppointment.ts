export type CancelledAppointment = {
  id: string;

  customerId: string;

  customerName: string;
  customerEmail: string;
  customerPhone: string;

  serviceName: string;

  appointmentDate: Date;

  cancelledAt: Date | null;

  cancelledBy: string;

  cancelReason: string | null;
};