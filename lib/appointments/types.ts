export interface AppointmentValidationInput {
  customerId: string;
  serviceId: string;
  startTime: Date;
  appointmentId?: string;
}

export type ValidationResult =
  | {
      ok: true;
      endTime: Date;
    }
  | {
      ok: false;
      message: string;
    };