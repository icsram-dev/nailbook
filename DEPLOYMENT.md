# Élesítési ellenőrzőlista

## Kiadás előtt

- Állítsd be az `.env.example` összes változóját a hoszting szolgáltatónál. A `.env` fájlt és valódi titkokat ne töltsd fel verziókezelőbe.
- A `DATABASE_URL` kizárólag SSL-kapcsolatot használjon, és az adatbázishoz külön, csak ehhez az alkalmazáshoz tartozó felhasználó legyen.
- Generálj külön, hosszú véletlenszerű értéket az `AUTH_SECRET` és a `CRON_SECRET` számára.
- Az `AUTH_URL`, `NEXTAUTH_URL` és `NEXT_PUBLIC_APP_URL` a végleges `https://` címet tartalmazza.
- A Resendben hitelesítsd a saját küldő domaint; az alapértelmezett teszt feladó nem megfelelő ügyféloldali éles használatra.
- A Cloudinary API-kulcsai maradjanak szerveroldali titkok; csak a feltöltési funkcióhoz szükséges jogosultságot kapják.

## Adatbázis és kiadás

- Készíts automatikus, rendszeresen ellenőrzött adatbázis-mentést.
- Minden kiadáskor futtasd: `npx prisma migrate deploy`.
- A kiadás előtt futtasd: `npm run build` és `npm audit --omit=dev`.
- A hosztingon kapcsold be a HTTPS-t, és állíts be hibajelzést/monitorozást.

## E-mailes emlékeztetők

- A hoszting ütemezőjében naponta egyszer hívd meg az `https://sajat-domain.hu/api/cron/reminders` címet.
- A kéréshez ezt a HTTP fejlécet add meg: `Authorization: Bearer <CRON_SECRET>`.
- A sikeres válasz `sent` értéke mutatja, hány emlékeztető e-mail ment ki.

## Átadás előtt ellenőrizendő folyamatok

- Regisztráció és e-mail-megerősítés.
- Bejelentkezés, kijelentkezés és jelszó-visszaállítás.
- Foglalás, jóváhagyás, vendég általi lemondás és admin lemondás.
- Visszaigazoló, módosítási, lemondási és emlékeztető e-mailek.
- Mobil és tablet nézet a kezdőlapon, galériában, foglalásnál és adminban.

## Jogi tartalom

Az adatkezelési tájékoztató és a cookie-szabályzat csak az adatkezelő hivatalos adataival és szükség esetén jogi felülvizsgálattal kerüljön ki az oldalra.
