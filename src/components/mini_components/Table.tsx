import React from 'react';

type TableProps = {
  headers: string[];
  children: React.ReactNode;
};

export const Table = ({ headers, children }: TableProps) => {
  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-stone-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#faf7f2] border-b border-stone-200">
            <tr>
              {headers.map((header, index) => (
                <th 
                  key={index} 
                  className={`px-6 py-5 text-xs font-bold text-stone-500 uppercase tracking-widest ${
                    header === "Actions" || header === "Status" ? "text-center" : ""
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 font-sans">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};