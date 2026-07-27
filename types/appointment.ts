export type AppointmentTableItem = {
  id: string;
  customerName: string;
  serviceName: string;
  startTime: Date;
  endTime: Date;
  price: number;
  status: string;
};