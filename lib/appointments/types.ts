export interface AppointmentValidationInput {
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