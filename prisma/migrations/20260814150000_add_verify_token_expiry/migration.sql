-- E-mail-megerősítő linkek legfeljebb 24 óráig használhatók.
ALTER TABLE "User" ADD COLUMN "verifyTokenExpiresAt" TIMESTAMP(3);
