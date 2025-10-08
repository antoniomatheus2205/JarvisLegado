import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// Update the import path if the file is named 'dashboard.tsx' (lowercase) or located elsewhere
// import Dashboard from "./Dashboard";
import Dashboard from "./pages/dashboard";
// Or, if the file does not exist, create 'Dashboard.tsx' in the 'pages' folder with a default export
import Clientes from "./pages/clientes";
// import Boletos from "./pages/Boletos";
// import Relatorios from "./pages/Relatorios";

function Boletos() {
  return <div>Boletos Page</div>;
}

const Index: React.FC = () => {
  return <div>Index Page</div>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/boletos" element={<Boletos />} />
        {/* <Route path="/relatorios" element={<Relatorios />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
