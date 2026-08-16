# 💊 PharmacyPro - ระบบนับสต็อกอัจฉริยะ

> ระบบนับสต็อกที่ทำงานได้ทั้งแบบ Offline และ Online รองรับการสแกนบาร์โค้ด เชื่อมต่อ Google Sheets และส่งออกรายงานได้หลายรูปแบบ

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/PharmacyPro/stockcount)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-✅-blueviolet.svg)](https://web.dev/progressive-web-apps/)

---

## 🌐 ใช้งานได้ที่

👉 **[https://pharmacypro.github.io/stockcount](https://pharmacypro.github.io/stockcount)**

---

## 📱 ภาพรวม

PharmacyPro เป็นระบบนับสต็อกอัจฉริยะสำหรับร้านขายยา โดยมีจุดเด่นคือ:

- ✅ ทำงานได้ทั้ง Offline และ Online
- ✅ สแกนบาร์โค้ดด้วยกล้องมือถือ
- ✅ นำเข้าข้อมูลจาก Excel, CSV, Google Sheets
- ✅ จัดผังร้านด้วยระบบตู้และชั้นวาง
- ✅ รายงานผลต่างแบบ Real-time
- ✅ ส่งออกข้อมูลเป็น PDF, Excel, CSV
- ✅ ติดตั้งบนมือถือเหมือนแอป (PWA)
- ✅ ฟรี 100%

---

## 🚀 เริ่มต้นใช้งาน

1. เปิดเบราว์เซอร์ไปที่: **[https://pharmacypro.github.io/stockcount](https://pharmacypro.github.io/stockcount)**
2. กดปุ่ม "ติดตั้งเลย" เพื่อเพิ่มลงหน้าจอหลัก

---

## 📖 วิธีใช้งาน

### ขั้นตอนที่ 1: นำเข้าข้อมูลสินค้า
- ไปที่แท็บ **"นำเข้า"**
- อัปโหลดไฟล์ Excel/CSV หรือเชื่อมต่อ Google Sheets
- เลือกรูปแบบ POS แล้วกดยืนยัน

### ขั้นตอนที่ 2: เริ่มนับสต็อก
- ไปที่แท็บ **"นับสต็อก"**
- เปิดกล้องเพื่อสแกนบาร์โค้ด
- ปรับจำนวนแล้วกดยืนยัน

### ขั้นตอนที่ 3: ดูรายงาน
- ไปที่แท็บ **"รายงาน"**
- ดาวน์โหลดเป็น CSV, Excel, PDF

---

## 📁 โครงสร้างไฟล์
stockcount/
├── index.html
├── manifest.json
├── sw.js
├── README.md
└── LICENSE

---

## 🛠️ เทคโนโลยีที่ใช้

- HTML5 + CSS3 + JavaScript
- IndexedDB (Offline)
- Google Sheets API
- ZXing (สแกนบาร์โค้ด)
- SheetJS (Excel)
- jsPDF (PDF)
- PWA + Service Worker

---

## ❓ คำถามที่พบบ่อย

**Q: ข้อมูลถูกเก็บไว้ที่ไหน?**
A: เก็บในเบราว์เซอร์ (IndexedDB) ไม่มีการส่งออกไปไหน

**Q: ใช้ Google Sheets ต้องเสียเงินไหม?**
A: ฟรี 1,000,000 คำขอ/วัน

---

## 📄 สัญญาอนุญาต

MIT License - ใช้ฟรีสำหรับทุกคน

---

**⭐ ถ้าชอบโปรเจคนี้ อย่าลืมกด Star!**


