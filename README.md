# Baca Cerdas

Bikinin aku web app card game bahasa Indonesia dengan nama "Baca Aku". Konsepnya: pemain baca kartu berisi situasi sosial, tebak maksud tersembunyi dari 4 opsi, lalu pilih respons terbaik dari 4 opsi. Data 30 kartu ada di file kartuv3.json yang aku attach.

Flow per kartu: (1) Tampilkan situasi, (2) Tampilkan 4 opsi tafsir, pemain pilih satu, kasih feedback apakah paling mungkin + tampilkan reasoning, (3) Tampilkan 4 opsi respons, pemain pilih satu, tampilkan skor yang didapat (Insight, Empathy, Social Damage) + feedback jika ada, tampilkan mana yang "best answer" dengan penanda halus, (4) Tombol "kartu berikutnya".

Di akhir 30 kartu: tampilkan skor total tiga dimensi + interpretasi singkat gaya persona ("Kamu punya kepekaan tinggi tapi cenderung overthinking..." dst).

Aesthetic: cute-pastel-soft. Pakai warna peach, lavender, sage, cream, dengan aksen dusty rose. Rounded corners besar (20px+), soft shadows, banyak white space. Font: display font bulat untuk judul (Fraunces atau Quicksand dari Google Fonts), body font clean (Plus Jakarta Sans). Semua text bahasa Indonesia dengan tone hangat dan playful ringan.

Design untuk mobile-first (target device: HP Android), tapi tetap enak dibuka di desktop. Nggak perlu login, nggak perlu database. Data cukup dimuat dari JSON.

Sebelum mulai, konfirmasi ke aku struktur file dan komponen yang bakal kamu bikin. tambahkan penanda visual untuk kartu yang punya field twist: true — misalnya badge kecil setelah jawaban dibuka." Badge twist itu penting secara desain: pemain perlu sadar kalau kartu itu jenis yang berbeda, karena itu bagian dari pelajarannya.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://baca-hati-main.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c50198f2-cd1a-4d5b-971a-93a700cb5224).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
