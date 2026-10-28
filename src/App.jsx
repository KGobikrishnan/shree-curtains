import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CustomerGatewayLayout } from './components/customer/CustomerGatewayLayout';
import { Services } from './pages/Services';
import { Reviews } from './pages/Reviews';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main User Review Flow on root */}
        <Route path="/" element={<CustomerGatewayLayout />} />

        {/* Dynamic Shop URL Review Flow: /r/:shopSlug */}
        <Route path="/r/:shopSlug" element={<CustomerGatewayLayout />} />

        {/* Shree Curtains Services & Collections Page */}
        <Route path="/services" element={<Services />} />

        {/* Shree Curtains Reviews & Testimonials Page */}
        <Route path="/reviews" element={<Reviews />} />

        {/* Catch-all redirect to user panel */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
