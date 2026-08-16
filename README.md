# NailBook

Egyedi, reszponzív időpontfoglaló rendszer körmös szolgáltatók számára. A vendégoldal mellett teljes adminfelületet, automatikus e-mailes értesítéseket és biztonságos adatkezelést biztosít.

## Fő funkciók

- Online időpontfoglalás valós szabad idősávokkal
- Vendégfiókok, e-mailes megerősítés és jelszó-visszaállítás
- Admin naptár, foglalás-, vendég-, szolgáltatás- és nyitvatartáskezelés
- Szabadságok, lemondások, jóváhagyás és meg nem jelenés kezelése
- Foglalási, módosítási, lemondási és emlékeztető e-mailek
- Mobil- és tabletbarát, egyedi luxury megjelenés
- Adatbázis-szintű foglalásütközés-védelem és publikus végpontok rate limitje

## Technológiák

- Next.js és TypeScript
- Tailwind CSS
- Prisma és PostgreSQL / Supabase
- Auth.js
- Resend
- Cloudinary

## Helyi indítás

1. Telepítsd a függőségeket: `npm install`
2. Másold az `.env.example` fájlt `.env` néven, majd töltsd ki a szükséges értékeket.
3. Alkalmazd az adatbázis-migrációkat: `npx prisma migrate deploy`
4. Indítsd a fejlesztői szervert: `npm run dev`

## Hasznos parancsok

- `npm run lint` – ESLint ellenőrzés
- `npm run format` – egységes Prettier formázás
- `npm run format:check` – formázás ellenőrzése módosítás nélkül
- `npm run build` – production build
- `npm audit --omit=dev` – production függőségek biztonsági ellenőrzése

## Élesítés

Az infrastruktúra, környezeti változók, cron emlékeztetők és átadás előtti ellenőrzések leírása a [DEPLOYMENT.md](DEPLOYMENT.md) fájlban található.
