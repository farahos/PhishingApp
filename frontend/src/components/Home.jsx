import React, { useState } from "react";

const PRIZES = [
  "hhh",
  "walasha igu darso",
  "ana ku waso",
  "qosol kuu soo baxay",
  100000,
  "Bax soo Xar",
  "0",
  "mcn ii cun",
  "2050 guursane",
  "2026 Ma gaaresid",
];

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const pickNumber = (index) => {
    if (selected !== null) return; // prevent selecting again
    setSelected(index);
    setTimeout(() => setRevealed(true), 1000); // delay for reveal
  };

  const pickRandom = () => {
    if (selected !== null) return; // prevent picking again
    const idx = Math.floor(Math.random() * 10);
    setSelected(idx);
    setTimeout(() => setRevealed(true), 1000);
  };

  const reset = () => {
    setSelected(null);
    setRevealed(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-white p-6">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6">
        <header className="mb-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💰 Prize Picker</h1>
          <p className="text-sm text-gray-500">Dooro number 1 ilaa 10 si aad u ogaato lacagta aad ku guuleysatay!</p>
        </header>

        <main>
          <div className="grid grid-cols-5 gap-3 mb-4">
            {Array.from({ length: 10 }).map((_, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => pickNumber(i)}
                  disabled={selected !== null}
                  className={`py-4 rounded-lg font-bold text-lg shadow-sm transition-all transform focus:outline-none ` +
                    (isSelected
                      ? "bg-green-500 text-white scale-105"
                      : selected !== null
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-slate-50 text-slate-700 hover:-translate-y-1 hover:bg-slate-100")}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 mb-4 justify-center">
            <button
              onClick={pickRandom}
              disabled={selected !== null}
              className={`px-4 py-2 rounded-lg font-medium shadow transition-all ` +
                (selected !== null
                  ? "bg-indigo-200 text-white cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:brightness-105")}
            >
              Random dooro
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-sm hover:bg-slate-50"
            >
              Reset
            </button>
          </div>

          <section className="mt-6 text-center">
            {selected !== null && !revealed && (
              <div className="text-lg text-slate-600 animate-pulse">Natiijada la hubinayo...</div>
            )}

            {revealed && selected !== null && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-6 inline-block animate-bounce">
                <h2 className="text-xl font-bold text-green-800 mb-2">🎉 Hambalyo!</h2>
                <p className="text-green-700 text-lg">Waxaad dooratay lambarka <span className="font-semibold">{selected + 1}</span></p>
                <p className="mt-2 text-2xl font-bold text-green-800">Waxaad ku guuleysatay ${PRIZES[selected].toLocaleString()} 💵</p>
              </div>
            )}

            {selected === null && !revealed && (
              <p className="text-slate-500">Fadlan dooro number si aad u aragto Natiijada.</p>
            )}
          </section>
        </main>

        <footer className="mt-6 text-xs text-gray-400 text-center">
         
        </footer>
      </div>
    </div>
  );
}
