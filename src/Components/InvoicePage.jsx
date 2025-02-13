import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function InvoicePage() {
  const navigate = useNavigate();

  // Sample Invoice Data
  const [invoices, setInvoices] = useState([
    {
      id: "INV-1001",
      dateIssued: "2025-02-10",
      client: "John Doe",
      address: "123 Elm Street, NY",
      items: [
        { description: "Wedding Photography", qty: 1, price: 500 },
        { description: "Photo Editing", qty: 1, price: 150 },
      ],
      status: "Pending",
      total: 650,
    },
    {
      id: "INV-1002",
      dateIssued: "2025-02-11",
      client: "Jane Smith",
      address: "456 Oak Avenue, CA",
      items: [
        { description: "Event Coverage", qty: 1, price: 800 },
        { description: "Album Printing", qty: 2, price: 120 },
      ],
      status: "Paid",
      total: 1040,
    },
  ]);

  const generatePDF = (invoice) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("INVOICE", 14, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Date Issued: ${invoice.dateIssued}`, 14, 30);
    doc.text(`Invoice No: ${invoice.id}`, 14, 38);
    doc.text(`Issued to: ${invoice.client}`, 140, 30);
    doc.text(invoice.address, 140, 38);

    const tableRows = invoice.items.map((item, index) => [
      index + 1,
      item.description,
      item.qty,
      `$${item.price}`,
      `$${item.qty * item.price}`,
    ]);

    doc.autoTable({
      head: [["No", "Description", "Qty", "Price", "Subtotal"]],
      body: tableRows,
      startY: 50,
      theme: "grid",
      headStyles: { fillColor: [200, 200, 200] },
      styles: { fontSize: 10 },
    });

    doc.setFont("helvetica", "bold");
    doc.text(
      `GRAND TOTAL: $${invoice.total}`,
      140,
      doc.autoTable.previous.finalY + 10
    );
    doc.setFont("helvetica", "normal");
    doc.text(
      `Status: ${invoice.status}`,
      14,
      doc.autoTable.previous.finalY + 20
    );

    doc.text("Bank Name: Rimberio", 14, doc.autoTable.previous.finalY + 30);
    doc.text(
      "Account No: 0123 4567 8901",
      14,
      doc.autoTable.previous.finalY + 38
    );

    doc.text(
      "_________________________",
      140,
      doc.autoTable.previous.finalY + 60
    );
    doc.text("Claudia", 140, doc.autoTable.previous.finalY + 68);
    doc.text("Finance Manager", 140, doc.autoTable.previous.finalY + 76);

    doc.save(`Invoice_${invoice.id}.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Invoice Manager</h1>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={() => navigate("/create-invoice")}
      >
        Add New Invoice
      </button>

      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <h2 className="text-lg font-semibold mb-2">Invoices</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Invoice No</th>
              <th className="p-3 border">Client</th>
              <th className="p-3 border">Total ($)</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index} className="border-b">
                <td className="p-3 border">{invoice.id}</td>
                <td className="p-3 border">{invoice.client}</td>
                <td className="p-3 border">${invoice.total}</td>
                <td
                  className={`p-3 border ${
                    invoice.status === "Paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {invoice.status}
                </td>
                <td className="p-3 border">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => generatePDF(invoice)}
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {invoices.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No invoices found.</p>
        )}
      </div>
    </div>
  );
}
