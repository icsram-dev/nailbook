export default function BookingSuccessPage() {
  return (
    <div className="mx-auto max-w-xl py-20 text-center">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Sikeres foglalás!
      </h1>

      <p className="mt-4 text-muted-foreground">
        A foglalásodat sikeresen rögzítettük.
      </p>

      <p className="mt-2 text-muted-foreground">
        Visszaigazoló e-mailt küldtünk a megadott e-mail címre.
      </p>
    </div>
  );
}