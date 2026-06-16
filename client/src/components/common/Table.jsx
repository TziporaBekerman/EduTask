import React from 'react';
export default function Table({ columns, data }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col, i) => <th key={i}>{col.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={row.id ?? i}>
            {columns.map((col, j) => <td key={j}>{col.render(row)}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
