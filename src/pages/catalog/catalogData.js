// src/pages/catalog/catalogData.js
import img1 from "../../images/image1.jpg";
import img2 from "../../images/image2.jpg";
import img3 from "../../images/image3.jpg";
import img4 from "../../images/image4.jpg";
import img5 from "../../images/image5.jpg";
import img6 from "../../images/image7.jpg";

// PAYKA
import payka1 from "../../images/payka1.jpg";
import payka2 from "../../images/payka2.jpg";
import payka3 from "../../images/payka3.jpg";

// KOMPRESSOR
import kompressor1 from "../../images/kompressor1.jpg";
import kompressor2 from "../../images/kompressor2.jpg";

// Yukkotarishustunalari
import Yukkotarishustunalari1 from "../../images/yukkotarishuskunalari1.jpg";
import Yukkotarishustunalari2 from "../../images/yukkotarishustunalari2.jpg";
import Yukkotarishustunalari3 from "../../images/yukkotarishustunalari3.jpg";

// Silliqlash mashinalari
import silliqlashmashinalari1 from "../../images/silliqlashmashinalari1.jpg";
import silliqlashmashinalari2 from "../../images/silliqlashmashinalari2.jpg";
import silliqlashmashinalari3 from "../../images/silliqlashmashinalari3.jpg";


export const CATEGORIES = [
  "Vintli kompressorlar",
  "Porshenli kompressorlar",
  "Suv nasoslari",
  "Kultivatorlar",
  "Armatura bukish",
  "Polietilen quvur payvandlagichlar",
  "Traktorlar",
  "Armatura kesish",
  "Zichlash (vibro) apparatlari",
  "Generatorlar",
  "Po‘lat prut kesish stanoklari",
  "Silliqlash mashinalari",
  "Asfalt kesgichlar",
  "Mini ekskavatorlar",
  "Yuk ko‘tarish uskunalari", // ✅ YANGI
];

// ✅ Demo mahsulotlar (flat category bilan)
export const PRODUCTS = [
  { id: "p1", title: "WEIMA WM1000BE-6 motokultivator", price: 4300000, unit: "dona", image: img1, category: "Kultivatorlar" },
  { id: "p2", title: "WEIMA WM1000NA motokultivator", price: 5200000, unit: "dona", image: img2, category: "Kultivatorlar" },
  { id: "p3", title: "WEIMA WM1000N motokultivator", price: 1750000, unit: "dona", image: img3, category: "Kultivatorlar" },


  { id: "p4", title: "Fora Group payalnik", price: 6900000, unit: "dona", image: img4, category: "Po‘lat prut kesish stanoklari" },
  { id: "p5", title: "Fora Group professional payalnik", price: 315000000, unit: "dona", image: img5, category: "Po‘lat prut kesish stanoklari" },
  { id: "p6", title: "Fora Group sanoat payalnik", price: 8900000, unit: "dona", image: img6, category: "Po‘lat prut kesish stanoklari" },
  // Kompressor
  { id: "p7", title: "BECKER BK20-10-500 havo vintli kompressor.", price: 315000000, unit: "dona", image: kompressor1, category: "Vintli kompressorlar" },
  { id: "p8", title: "BECKER BK10-10-300 havo vintli kompressor.", price: 8900000, unit: "dona", image: kompressor2, category: "Vintli kompressorlar" },

  // Yukkotarishustunalari
  { id: "p9", title: "BECKER BK20-10-500 havo vintli kompressor.", price: 315000000, unit: "dona", image: Yukkotarishustunalari1, category: "Yuk ko‘tarish uskunalari" },
  { id: "p10", title: "BECKER BK10-10-300 havo vintli kompressor.", price: 8900000, unit: "dona", image: Yukkotarishustunalari2, category: "Yuk ko‘tarish uskunalari" },
  { id: "p11", title: "BECKER BK10-10-300 havo vintli kompressor.", price: 8900000, unit: "dona", image: Yukkotarishustunalari3, category: "Yuk ko‘tarish uskunalari" },

  // Silliqlash Mashinalari
  { id: "p12", title: "BECKER BK20-10-500 havo vintli kompressor.", price: 315000000, unit: "dona", image: silliqlashmashinalari1, category: "Silliqlash mashinalari" },
  { id: "p13", title: "BECKER BK10-10-300 havo vintli kompressor.", price: 8900000, unit: "dona", image: silliqlashmashinalari2, category: "Silliqlash mashinalari" },
  { id: "p14", title: "BECKER BK10-10-300 havo vintli kompressor.", price: 8900000, unit: "dona", image: silliqlashmashinalari3, category: "Silliqlash mashinalari" },
];








