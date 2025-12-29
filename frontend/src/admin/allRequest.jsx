import { useEffect, useState } from "react";
import axios from "axios";

export default function Deyn() {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get("http://localhost:5000/api/deyn");
    setCustomers(res.data);
  };

  const createCustomer = async () => {
    await axios.post("http://localhost:5000/api/deyn", {
      customerName: name,
    });
    setName("");
    fetchCustomers();
  };

  const addDebt = async () => {
    await axios.post(
      `http://localhost:5000/api/deyn/${selected._id}/add`,
      { amount: Number(amount), description: "Deyn cusub" }
    );
    fetchCustomers();
  };

  const payDebt = async () => {
    await axios.post(
      `http://localhost:5000/api/deyn/${selected._id}/pay`,
      { amount: Number(amount), description: "Lacag la bixiyay" }
    );
    fetchCustomers();
  };

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      {/* Macmiil list */}
      <div>
        <h2 className="font-bold mb-2">Macmiisha</h2>
        {customers.map((c) => (
          <div
            key={c._id}
            onClick={() => setSelected(c)}
            className="p-2 border mb-2 cursor-pointer hover:bg-gray-100"
          >
            {c.customerName} <br />
            <span className="text-sm text-red-600">
              Deyn: ${c.totalDebt}
            </span>
          </div>
        ))}
      </div>

      {/* Diiwaangelin */}
      <div>
        <h2 className="font-bold mb-2">Macmiil cusub</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Magaca macmiilka"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={createCustomer}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Save
        </button>
      </div>

      {/* Details */}
      {selected && (
        <div>
          <h2 className="font-bold">{selected.customerName}</h2>
          <p>Total Deyn: ${selected.totalDebt}</p>

          <input
            className="border p-2 w-full my-2"
            placeholder="Lacag"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={addDebt}
              className="bg-red-600 text-white px-3 py-1"
            >
              Deyn ku dar
            </button>
            <button
              onClick={payDebt}
              className="bg-green-600 text-white px-3 py-1"
            >
              Ka jar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}