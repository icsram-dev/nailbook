export type TimeSlotReason = "BOOKED" | "VACATION" | "PAST";

export type TimeSlot = {
  start: Date;
  end: Date;
  available: boolean;
  reason?: TimeSlotReason;
};
