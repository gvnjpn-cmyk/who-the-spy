# 🕵️ Who The Spy

Game online multiplayer berbasis room — siapa mata-matanya?

## 📁 Struktur File

```
who-the-spy/
├── index.html     ← seluruh game (HTML + CSS + JS)
├── config.js      ← isi Firebase config kamu di sini
├── netlify.toml   ← config deploy Netlify
└── README.md
```

---

## 🔥 LANGKAH 1 — Setup Firebase

### 1.1 Buat project Firebase

1. Buka [console.firebase.google.com](https://console.firebase.google.com)
2. Klik **"Add project"** → isi nama → disable Google Analytics → klik **Create project**
3. Tunggu selesai, lalu klik **Continue**

### 1.2 Aktifkan Realtime Database

1. Di sidebar kiri, klik **Build → Realtime Database**
2. Klik **"Create database"**
3. Pilih lokasi: **Singapore (asia-southeast1)** (paling dekat Indonesia)
4. Pilih mode: **"Start in test mode"** (bisa diubah nanti)
5. Klik **Enable**

### 1.3 Ambil Firebase Config

1. Di sidebar kiri, klik ⚙️ **Project Settings** (gear icon)
2. Scroll ke bawah ke bagian **"Your apps"**
3. Klik ikon `</>` (Web)
4. Isi nama app (contoh: `who-the-spy`), klik **Register app**
5. Copy kode yang muncul — cari bagian seperti ini:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "nama-project.firebaseapp.com",
  databaseURL: "https://nama-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nama-project",
  storageBucket: "nama-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 1.4 Isi config.js

Buka file `config.js` dan ganti semua nilai `GANTI_...` dengan nilai dari Firebase:

```javascript
var FIREBASE_CONFIG = {
  apiKey:            "AIzaSy...",         // ← ganti
  authDomain:        "nama.firebaseapp.com",
  databaseURL:       "https://nama-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "nama-project",
  storageBucket:     "nama-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123:web:abc"
};
```

> ⚠️ Pastikan `databaseURL` diisi! Tanpa ini game online tidak akan berjalan.

### 1.5 Atur Rules Database (opsional, untuk keamanan)

Di Firebase Console → Realtime Database → **Rules**, ganti dengan:

```json
{
  "rules": {
    "rooms": {
      "$roomCode": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

---

## 🚀 LANGKAH 2 — Deploy ke Netlify

### Cara A: Drag & Drop (paling mudah)

1. Buka [app.netlify.com](https://app.netlify.com)
2. Login / daftar akun
3. Di dashboard, ada area **"Drag and drop your site folder here"**
4. Drag folder `who-the-spy/` ke sana
5. Tunggu upload selesai → kamu dapat URL langsung! ✅

### Cara B: Via GitHub (recommended untuk update mudah)

1. Push folder `who-the-spy/` ke repo GitHub
2. Di Netlify → **"Add new site" → "Import an existing project"**
3. Pilih GitHub → pilih repo
4. Build settings:
   - **Build command**: (kosongkan)
   - **Publish directory**: `.` (titik)
5. Klik **Deploy site**

Setiap kali kamu push ke GitHub → Netlify auto-deploy! 🔄

---

## 🎮 Cara Main

### Online (3–10 pemain, tiap orang pakai HP masing-masing)

1. Semua buka URL yang sama
2. Satu orang klik **"Buat Room Baru"** → dapat kode 4 huruf (contoh: `KOPI`)
3. Teman-teman klik **"Join Room"** → ketik kode → isi nama
4. Host lihat lobby → semua masuk → klik **"Mulai Game"**
5. Tiap pemain lihat kata di HP masing-masing (privat)
6. Giliran petunjuk → diskusi → vote → reveal!

### Offline (1 perangkat, 3–10 pemain)

1. Klik **"Main Offline"**
2. Setup nama pemain
3. Giliran tiap orang lihat kata di layar yang sama (pass-and-play)

### Aturan Game

- **Warga** mendapat kata yang sama
- **Mata-mata** mendapat kata yang mirip tapi berbeda
- Setiap ronde: berikan 1 kata petunjuk tentang kata-mu
- Vote siapa yang kamu curigai sebagai mata-mata
- Mata-mata yang tereliminasi bisa menebak kata warga untuk menang!
- **Warga menang** jika semua mata-mata tereliminasi
- **Mata-mata menang** jika berhasil bertahan sampai tersisa ≤2 orang, atau berhasil menebak kata warga

---

## 🛠️ Kustomisasi

### Tambah kata baru

Buka `index.html`, cari array `PAIRS` di baris ~12:

```javascript
const PAIRS=[
  ["Kucing","Anjing"],
  // tambahkan pasangan kata di sini
  ["BuatSendiri","VersiSpy"],
];
```

---

## ❓ Troubleshooting

| Masalah | Solusi |
|---|---|
| Tombol online tidak muncul | Isi `config.js` dengan Firebase config yang benar |
| "Room tidak ditemukan" | Pastikan kode 4 huruf benar |
| Game tidak sync | Cek koneksi internet + `databaseURL` di config.js |
| Firebase error di konsol | Pastikan Realtime Database sudah diaktifkan |
