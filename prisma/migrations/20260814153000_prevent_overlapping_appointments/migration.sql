-- A foglalható állapotú időpontok nem fedhetik egymást.
-- A lemondott és meg nem jelent foglalások nem blokkolnak idősávot.
ALTER TABLE "Appointment"
ADD CONSTRAINT "Appointment_no_active_time_overlap"
EXCLUDE USING GIST (
  tsrange("startTime", "endTime", '[)') WITH &&
)
WHERE ("status" NOT IN ('CANCELLED'::"AppointmentStatus", 'NO_SHOW'::"AppointmentStatus"));
