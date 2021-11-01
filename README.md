# Crossplat Students Server

## Cara Instalasi:
- Pastikan kamu mempunyai Node.js dan PostgreSQL pada sistem
- Clone repo ini
- Lakukan instalasi _dependencies_ dengan `npm install`
- Buat file baru bernama `.env` menggunakan `.env.example`
  - Jika kamu menggunakan Linux/macOS, gunakan perintah berikut:
  - `cp .env.example .env`
- Pada file `.env`, _replace_ nilai pada _placeholder_ yang sudah disediakan
- Jalankan perintah `npx prisma db push` untuk menyusun skema basis data