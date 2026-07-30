# Gestore Spese

Applicazione Android nativa realizzata con React Native, Expo, TypeScript, Expo Router ed Expo SQLite. Funziona offline: le spese e le impostazioni sono persistite in SQLite.

## Installazione

```bash
npm install
npx expo start
```

Per creare l'APK Android:

```bash
npx eas login
npx eas build --platform android --profile preview
```

Il profilo `preview` genera un APK installabile. Il profilo `production` genera un Android App Bundle.

## Funzioni

- CRUD spese con validazione, categoria, data, pagamento e note.
- Dashboard mensile con budget, disponibilità, percentuale, avviso all'80% e sforamento.
- Movimenti con ricerca, filtri e ordinamento.
- Statistiche con grafici a barre, ciambella e andamento giornaliero.
- Budget persistente e categorie personalizzate.
- Export CSV e condivisione tramite le funzioni Android.
- Cancellazione dati con doppia conferma.
- Persistenza offline con SQLite e tema di sistema tramite Expo.
