# Module 5 Solution - Restaurant Web App

**Live Web:** https://ryanfebryan707.github.io/module5-solution/

## 📋 Deskripsi Tugas

Aplikasi web restoran interaktif dengan fitur kategori menu acak untuk tombol "Spesial". Ketika pengguna mengklik tombol Spesial, aplikasi akan menampilkan kategori menu yang berbeda setiap kali, seperti "Makan Siang", "Makan Malam", "Sushi", "Dessert", atau "Minuman".

## ✨ Fitur Utama

### 1. **Tiga Ubin Utama**
- **Menu** - Menampilkan semua kategori menu dengan filter
- **Spesial** - Kategori acak yang berubah setiap kali diklik
- **Peta** - Informasi lokasi dan kontak restoran

### 2. **Kategori Menu Dinamis**
- **Makan Siang** - Nasi goreng, mie kuah, soto ayam, gado-gado
- **Makan Malam** - Ribeye premium, salmon, chicken alfredo, seafood mix
- **Sushi** - California roll, spicy tuna, Philadelphia, dragon roll
- **Dessert** - Tiramisu, chocolate lava cake, cheesecake, matcha ice cream
- **Minuman** - Lychee iced tea, citrus sparkler, cold brew, mango smoothie

### 3. **Efek 3D Interaktif**
- Animasi ring yang berputar di halaman beranda
- Desain responsif dengan transisi halus
- Navigasi yang mulus antar halaman

### 4. **User Experience**
- Filter kategori yang responsif
- Format harga dalam Rupiah (IDR)
- Navigasi mudah dengan back buttons
- Mobile-friendly design
- Smooth scroll navigation

## 🗂️ Struktur File

```
module5-solution/
├── index.html      # Halaman utama dengan struktur HTML
├── style.css       # Styling responsif dengan efek 3D
├── script.js       # Logika JavaScript untuk interaktivitas
└── README.md       # Dokumentasi proyek
```

## 🎨 Desain & Layout

### Halaman Beranda
- Hero section dengan deskripsi
- Animasi ring 3D interaktif
- Call-to-action buttons

### Halaman Menu
- Grid layout responsif untuk tiles
- Filter kategori dropdown
- Setiap item menampilkan nama, deskripsi, dan harga

### Halaman Spesial
- Menampilkan kategori acak
- Tombol untuk memilih kategori acak lain
- List menu dalam kategori terpilih

### Halaman Peta
- Informasi lokasi restoran
- Jam operasional dan kontak
- Placeholder untuk peta interaktif

## 🚀 Cara Menggunakan

1. **Kunjungi website:**
   ```
   https://ryanfebryan707.github.io/module5-solution/
   ```

2. **Navigasi di halaman beranda:**
   - Klik "Mulai Jelajahi" untuk ke halaman menu
   - Klik "Pelajari lebih lanjut" untuk info tentang tugas

3. **Jelajahi Menu:**
   - Klik tile "Menu" untuk melihat semua kategori
   - Gunakan dropdown filter untuk filter kategori

4. **Kategori Acak (Spesial):**
   - Klik tile "Spesial Hari Ini" untuk mendapatkan kategori acak
   - Setiap klik akan menampilkan kategori berbeda
   - Klik tombol "Kategori Acak Lain" untuk kategori baru

5. **Lihat Peta:**
   - Klik tile "Peta" untuk melihat informasi lokasi

## 💻 Teknologi

- **HTML5** - Struktur semantik
- **CSS3** - Styling responsif dengan CSS variables
- **Vanilla JavaScript** - Interaktivitas tanpa library eksternal
- **Intl API** - Format mata uang Rupiah
- **GitHub Pages** - Hosting gratis

## 📱 Responsivitas

- **Desktop (>1190px)** - Layout 3 kolom, hero visual penuh
- **Tablet (768px-1190px)** - Layout 1 kolom, simplified visual
- **Mobile (<768px)** - Optimized untuk layar kecil, navigasi hamburger

## 🔧 Struktur Data

### Menu Categories Object
```javascript
const menuCategories = {
    'makan-siang': {
        name: 'Makan Siang',
        items: [ /* array of items */ ]
    },
    // ... kategori lain
}
```

### Item Structure
```javascript
{
    id: number,
    name: string,
    price: number,
    description: string
}
```

## 🎯 Fitur JavaScript Utama

- `selectRandomCategory()` - Memilih kategori acak
- `renderMenuList(category)` - Render list menu berdasarkan kategori
- `renderSpecialCategory()` - Render kategori spesial acak
- `showPage(pageId)` - Menampilkan halaman tertentu
- Navigation dan scroll handling

## 📝 Catatan

- Setiap kali tombol "Spesial" diklik, kategori akan berubah secara acak
- Data menu tersimpan lokal dalam JavaScript
- Tidak ada request ke server atau pengiriman data
- Semua perubahan terjadi di client-side

## 👨‍💻 Dibuat Oleh

**Moch Rizky Febryanto (Ryan)**

Untuk Module 5 Solution Task

---

**Last Updated:** 2026
**Repository:** https://github.com/ryanfebryan707/module5-solution