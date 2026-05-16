'use client';

import { useEffect, useState } from 'react';

// Bikin tipe data biar rapi
interface Pekerjaan {
  id: string;
  judul: string;
  bayaran: string;
  klien: string;
}

export default function PijakOS() {
  const [pekerjaan, setPekerjaan] = useState<Pekerjaan[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Panggil script core.js hasil compile C++
    const script = document.createElement('script');
    script.src = '/wasm/core.js';
    script.async = true;
    
    script.onload = () => {
    
      // @ts-expect-error "from c++"
      if (window.createPijakModule) {
       
        // @ts-expect-error "from c++"
        window.createPijakModule().then((Module) => {
          
          // Tangkap fungsi C++ pakai cwrap
          const getData = Module.cwrap('getDaftarPekerjaan', 'string', []);
          
          // Panggil fungsinya
          const rawData = getData();
          
          // Pecah string dari C++ jadi Array Object
          const parsedData = rawData.split('|').map((item: string) => {
            const [id, judul, bayaran, klien] = item.split(',');
            return { id, judul, bayaran, klien };
          });

          setPekerjaan(parsedData);
          setIsReady(true);
        });
      }
    };
    
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Pijak OS</h1>
        <p className="text-gray-600 mb-8">Peluang nyata buat kamu mulai berkarya.</p>

        {!isReady ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500 animate-pulse">Menghubungkan ke mesin C++...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pekerjaan.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wider">
                  Micro-Task
                </span>
                <h3 className="text-xl font-bold text-gray-800 mt-4 mb-1">{job.judul}</h3>
                <p className="text-gray-500 text-sm mb-4">Klien: {job.klien}</p>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-lg font-bold text-green-600">{job.bayaran}</span>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
                    Ambil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}