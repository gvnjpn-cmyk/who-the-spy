# Who The Spy — Panduan Setup & Deploy

## Apa yang dibutuhkan
- Akun Google (untuk Firebase)
- Akun Netlify (untuk deploy, gratis)

---

## STEP 1 — Buat Firebase Project

1. Buka https://console.firebase.google.com
2. Klik **"Add project"** → beri nama (contoh: `who-the-spy`)
3. Matikan Google Analytics kalau mau → klik **Create project**

---

## STEP 2 — Aktifkan Realtime Database

1. Di sidebar Firebase, klik **Build → Realtime Database**
2. Klik **"Create database"**
3. Pilih region (Singapore untuk Indonesia: `asia-southeast1`)
4. Pilih **"Start in test mode"** → klik **Enable**

> ⚠️ Test mode = database terbuka untuk umum selama 30 hari.
> Untuk produksi, update rules-nya (lihat STEP 5).

---

## STEP 3 — Ambil Config Firebase

1. Di Firebase, klik ikon ⚙️ → **Project settings**
2. Scroll ke bawah ke bagian **"Your apps"**
3. Klik ikon **Web** (`</>`)
4. Register app (nama bebas) → klik **Register app**
5. Kamu akan lihat object seperti ini:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "who-the-spy.firebaseapp.com",
  databaseURL: "https://who-the-spy-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "who-the-spy",
  storageBucket: "who-the-spy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

6. Copy semua nilai tersebut

---

## STEP 4 — Isi Config di index.html

Buka `index.html`, temukan bagian ini di atas:

```javascript
const FIREBASE_CONFIG = {
  apiKey:            "GANTI_INI",
  authDomain:        "GANTI_INI",
  databaseURL:       "GANTI_INI",    // ← PALING PENTING
  projectId:         "GANTI_INI",
  storageBucket:     "GANTI_INI",
  messagingSenderId: "GANTI_INI",
  appId:             "GANTI_INI"
};
```

Ganti setiap `"GANTI_INI"` dengan nilai dari config Firebase kamu.

> ⚠️ `databaseURL` harus diisi! Format:
> `https://NAMA_PROJECT-default-rtdb.REGION.firebasedatabase.app`

---

## STEP 5 — Deploy ke Netlify

### Cara A: Drag & Drop (paling mudah)
1. Buka https://app.netlify.com
2. Login / daftar
3. Drag folder `who-the-spy/` ke halaman Netlify
4. Tunggu deploy selesai → kamu dapat URL seperti `https://amazing-name-123.netlify.app`

### Cara B: Via GitHub
1. Upload folder ke GitHub repository
2. Di Netlify: **Add new site → Import from Git**
3. Pilih repo → Deploy

---

## STEP 6 (Opsional) — Update Database Rules

Untuk keamanan setelah testing, ganti rules di Firebase Console:
**Build → Realtime Database → Rules**

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["info/createdAt"]
      }
    }
  }
}
```

---

## CARA MAIN

### Mode Online (HP masing-masing)
1. Satu orang buat room → pilih **ONLINE** → isi nama → **BUAT ROOM**
2. Dapat kode 4 huruf → bagikan ke teman
3. Teman buka URL game → isi nama → masukkan kode → **GABUNG**
4. Host klik **MULAI GAME** setelah semua masuk (min 3 orang)
5. Setiap pemain lihat kata di HP masing-masing

### Mode Pass-and-Play (1 perangkat)
1. Buat room → pilih **PASS-PLAY**
2. Di lobby, tambahkan nama semua pemain
3. Mulai game → perangkat digilir ke tiap pemain

---

## JUMLAH SPY
| Pemain | Spy |
|--------|-----|
| 3–7    | 1   |
| 8–10   | 2   |

---

## ATURAN GAME
1. Semua dapat kata yang sama, KECUALI spy yang dapat kata berbeda tapi mirip
2. Bergantian beri 1 kata petunjuk tentang kata kamu
3. Diskusikan → vote siapa yang spy
4. Yang paling banyak vote → dieliminasi
5. Spy yang ketahuan bisa menebak kata warga untuk menang!
6. Warga menang jika semua spy dieliminasi
7. Spy menang jika tersisa ≤2 pemain atau berhasil menebak kata warga

---

## Troubleshooting

**"Room tidak ditemukan"**
→ Pastikan kode benar (4 huruf besar)

**Game tidak sync / loading terus**
→ Cek `databaseURL` di config, harus diisi dengan URL yang benar

**"Permission denied" di console**
→ Cek Firebase Database Rules, pastikan `.read` dan `.write` = `true`
