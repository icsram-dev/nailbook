export interface AvailableTimeSlot {
  startTime: Date;
  endTime: Date;
}

export interface GetAvailableTimesInput {
  date: Date;
  serviceId: string;
}

export interface GetAvailableDaysInput {
  year: number;
  month: number;
  serviceId: string;
}