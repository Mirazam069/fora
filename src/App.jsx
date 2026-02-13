import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Products from "./components/Products";
import WhyChoose from "./components/WhyChoose";
import CTAForm from "./components/CTAForm";
import Footer from "./components/Footer";
import About from "./components/About";
import Hamkorlar from "./components/Hamkorlar";

import Catalog from "./pages/catalog/Catalog";
import Delivery from "./pages/delivery/Delivery";
import Contact from "./pages/contact/Contact";
import Warranty from "./pages/warranty/Warranty";

import ScrollToTop from "./components/ScrollToTop";

import { Routes, Route } from "react-router-dom"; // ✅ ADD

function Home() {
  return (
    <>
      <Header />
      <About />
      <Products />
      <WhyChoose />
      <Hamkorlar/>
      <CTAForm />
    </>
  );
}

function App() {
  return (
    <div>
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/warranty" element={<Warranty />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
