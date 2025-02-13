import React, { useState } from "react";

const AddNewInvoice = ({ invoices, setInvoices }) => {
  const [newInvoice, setNewInvoice] = useState({
    id: `INV-${Math.floor(Math.random() * 1000) + 1}`,
    dateIssued: "",
    client: "",
    address: "",
    items: [],
    status: "Pending",
    total: 0,
  });

  const [description, setDescription] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);

  const handleAddItem = () => {
    if (!description || price <= 0 || qty <= 0) return;

    const newItem = { description, qty, price };

    setNewInvoice((prevInvoice) => {
      const updatedItems = [...prevInvoice.items, newItem];
      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
      );
      return { ...prevInvoice, items: updatedItems, total: updatedTotal };
    });

    // Clear input fields
    setDescription("");
    setQty(1);
    setPrice(0);
  };

  const handleAddInvoice = async () => {
    if (!newInvoice.client || newInvoice.items.length === 0) return;

    try {
      const response = await fetch("http://your-server.com/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInvoice),
      });
      if (!response.ok) throw new Error("Failed to save invoice");
      const savedInvoice = await response.json();
      setInvoices([...invoices, savedInvoice]);
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Invoice</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              className="border p-2 rounded w-full bg-gray-200"
              placeholder="Invoice No"
              value={newInvoice.id}
              disabled
            />
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={newInvoice.dateIssued}
              onChange={(e) =>
                setNewInvoice((prev) => ({
                  ...prev,
                  dateIssued: e.target.value,
                }))
              }
              required
            />
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="Client Name"
              value={newInvoice.client}
              onChange={(e) =>
                setNewInvoice((prev) => ({ ...prev, client: e.target.value }))
              }
              required
            />
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="Address"
              value={newInvoice.address}
              onChange={(e) =>
                setNewInvoice((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>

          <h3 className="text-md font-semibold mt-4">Add Items</h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="Item Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              className="border p-2 rounded w-full"
              placeholder="Qty"
              value={qty}
              min="1"
              onChange={(e) => setQty(+e.target.value)}
            />
            <input
              type="number"
              className="border p-2 rounded w-full"
              placeholder="Price"
              value={price}
              min="0"
              onChange={(e) => setPrice(+e.target.value)}
            />
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAddItem}
            >
              Add Item
            </button>
          </div>

          {/* ✅ Display Added Items */}
          <h3 className="text-md font-semibold mt-4">Invoice Items</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Qty</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {newInvoice.items.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    {item.description}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.qty}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    ${item.price}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    ${item.qty * item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-md font-semibold mt-4">Invoice Status</h3>
          <select
            className="border p-2 rounded w-full"
            value={newInvoice.status}
            onChange={(e) =>
              setNewInvoice((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleAddInvoice}
            >
              Save Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewInvoice;
