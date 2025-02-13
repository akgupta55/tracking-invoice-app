import { Route, Routes } from "react-router";
import Dashboard from "./Pages/Dashboard";
import ProjectTable from "./Components/ProjectTable";
import CreateProject from "./Components/CreateProject";
import InvoicePage from "./Components/InvoicePage";
import AddNewInvoice from "./Components/AddNewInvoice";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/projects" element={<ProjectTable />} />
      <Route path="/create-project" element={<CreateProject />} />
      <Route path="*" element={<h1>Not Found</h1>} />
      <Route path="/invoices" element={<InvoicePage />} />
      <Route path="/create-invoice" element={<AddNewInvoice />} />
    </Routes>
  );
}

export default App;
