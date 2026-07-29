export interface GenerateSlotsParams {
  date: Date;
  serviceDuration: number;
}

export interface TimeSlot {
  startTime: Date;
  endTime: Date;
}