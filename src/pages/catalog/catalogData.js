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

// ARMATURA BUKISH
import armoturabukish1 from "../../images/armaturabukish1.jpg";
import armoturakesish1 from "../../images/armaturakesish1.jpg";
import armoturakesish2 from "../../images/armaturakesish2.jpg";

// ASFALT KESGICH
import asfaltkesgich1 from "../../images/asfaltkesgich1.jpg";
import asfaltkesgich2 from "../../images/asfaltkesgich2.jpg";
import asfaltkesgich3 from "../../images/asfaltkesgich3.jpg";

// SUV NASOSOLARI
import suvnasosi1 from "../../images/suvnasosi1.jpg";
import suvnasosi2 from "../../images/suvnasosi2.jpg";
import suvnasosi3 from "../../images/suvnasosi3.jpg";

// Traktorlar
import traktorlar1 from "../../images/traktorlar1.jpg";
import traktorlar2 from "../../images/traktorlar2.jpg";

// VIBRO
import vibro1 from "../../images/vibro1.jpg";
import vibro2 from "../../images/vibro2.jpg";
import vibro3 from "../../images/vibro3.jpg";
import vibro4 from "../../images/vibro4.jpg";
import vibro5 from "../../images/vibro5.jpg";

// GENERATORLAR
import generatorlar1 from "../../images/generatorlar1.jpg";
import generatorlar2 from "../../images/generatorlar2.jpg";
import generatorlar3 from "../../images/generatorlar3.jpg";
import generatorlar4 from "../../images/generatorlar4.jpg";
import generatorlar5 from "../../images/generatorlar5.jpg";
import generatorlar6 from "../../images/generatorlar6.jpg";
import generatorlar7 from "../../images/generatorlar7.jpg";


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


  { id: "p4", title: "PAYALNIK", price: 6900000, unit: "dona", image: img4, category: "Po‘lat prut kesish stanoklari" },
  { id: "p5", title: "PROFESSIONAL PAYALNIK", price: 315000000, unit: "dona", image: img5, category: "Po‘lat prut kesish stanoklari" },
  { id: "p6", title: "SANOAT PAYALNIK", price: 8900000, unit: "dona", image: img6, category: "Po‘lat prut kesish stanoklari" },
  // Kompressor
  { id: "p7", title: "KOMPRESSOR", price: 315000000, unit: "dona", image: kompressor1, category: "Vintli kompressorlar" },
  { id: "p8", title: "KOMPRESSOR", price: 8900000, unit: "dona", image: kompressor2, category: "Vintli kompressorlar" },

  // Yukkotarishustunalari
  { id: "p9", title: "YUK KO'TARISH USKUNASI", price: 315000000, unit: "dona", image: Yukkotarishustunalari1, category: "Yuk ko‘tarish uskunalari" },
  { id: "p10", title: "YUK KO'TARISH USKUNASI", price: 8900000, unit: "dona", image: Yukkotarishustunalari2, category: "Yuk ko‘tarish uskunalari" },
  { id: "p11", title: "YUK KO'TARISH USKUNASI", price: 8900000, unit: "dona", image: Yukkotarishustunalari3, category: "Yuk ko‘tarish uskunalari" },

  // Silliqlash Mashinalari
  { id: "p12", title: "SILLIQLASH MASHINASI", price: 315000000, unit: "dona", image: silliqlashmashinalari1, category: "Silliqlash mashinalari" },
  { id: "p13", title: "SILLIQLASH MASHINASI", price: 8900000, unit: "dona", image: silliqlashmashinalari2, category: "Silliqlash mashinalari" },
  { id: "p14", title: "SILLIQLASH MASHINASI", price: 8900000, unit: "dona", image: silliqlashmashinalari3, category: "Silliqlash mashinalari" },

  // Armotura bukish
  { id: "p15", title: "ARMOTURA BUKISH", price: 315000000, unit: "dona", image: armoturabukish1, category: "Armatura bukish" },
  { id: "p16", title: "ARMOTURA BUKISH", price: 8900000, unit: "dona", image: armoturakesish1, category: "Armatura kesish" },
  { id: "p17", title: "ARMOTURA BUKISH", price: 8900000, unit: "dona", image: armoturakesish2, category: "Armatura kesish" },

  // Asfalt kesgich
  { id: "p18", title: "ASFALT KESGICH", price: 315000000, unit: "dona", image: asfaltkesgich1, category: "Asfalt kesgichlar" },
  { id: "p19", title: "ASFALT KESGICH", price: 8900000, unit: "dona", image: asfaltkesgich2, category: "Asfalt kesgichlar" },
  { id: "p20", title: "ASFALT KESGICH", price: 8900000, unit: "dona", image: asfaltkesgich3, category: "Asfalt kesgichlar" },

  // SUV NASOSOLARI
  { id: "p21", title: "SUV NASOSI", price: 315000000, unit: "dona", image: suvnasosi1, category: "Suv nasoslari" },
  { id: "p22", title: "SUV NASOSI", price: 8900000, unit: "dona", image: suvnasosi2, category: "Suv nasoslari" },
  { id: "p23", title: "SUV NASOSI", price: 8900000, unit: "dona", image: suvnasosi3, category: "Suv nasoslari" },

  // TRAKTORLAR
  { id: "p24", title: "TRAKTORLAR", price: 315000000, unit: "dona", image: traktorlar1, category: "Traktorlar" },
  { id: "p25", title: "TRAKTORLAR", price: 8900000, unit: "dona", image: traktorlar2, category: "Traktorlar" },

  // VIBRO
  { id: "p26", title: "VIBRO APPARATI", price: 315000000, unit: "dona", image: vibro1, category: "Zichlash (vibro) apparatlari" },
  { id: "p27", title: "VIBRO APPARATI", price: 8900000, unit: "dona", image: vibro2, category: "Zichlash (vibro) apparatlari" },
  { id: "p28", title: "VIBRO APPARATI", price: 315000000, unit: "dona", image: vibro3, category: "Zichlash (vibro) apparatlari" },
  { id: "p29", title: "VIBRO APPARATI", price: 8900000, unit: "dona", image: vibro4, category: "Zichlash (vibro) apparatlari" },
  { id: "p30", title: "VIBRO APPARATI", price: 315000000, unit: "dona", image: vibro5, category: "Zichlash (vibro) apparatlari" },

  // GENERATOR
  { id: "p31", title: "GENERATOR", price: 315000000, unit: "dona", image: generatorlar1, category: "Generatorlar" },
  { id: "p32", title: "GENERATOR", price: 8900000, unit: "dona", image: generatorlar2, category: "Generatorlar" },
  { id: "p33", title: "GENERATOR", price: 315000000, unit: "dona", image: generatorlar3, category: "Generatorlar" },
  { id: "p34", title: "GENERATOR", price: 8900000, unit: "dona", image: generatorlar4, category: "Generatorlar" },
  { id: "p35", title: "GENERATOR", price: 315000000, unit: "dona", image: generatorlar5, category: "Generatorlar" },
  { id: "p36", title: "GENERATOR", price: 8900000, unit: "dona", image: generatorlar6, category: "Generatorlar" },
  { id: "p37", title: "GENERATOR", price: 315000000, unit: "dona", image: generatorlar7, category: "Generatorlar" },
];








