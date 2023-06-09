import React from 'react';

type Props = {
  name: string;
  id: string;
  value: string[];
  selectCheck: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SelectBox({ name, id, value, onChange, selectCheck }: Props) {
  return (
    <select name={name} id={id} onChange={onChange} value={selectCheck} className="bg-gray-50 border-2 border-gray-300 rounded-lg focus:border-blue-500 w-full p-2.5 focus:outline-none cursor-pointer">
      <option value="">{name}</option>
      {value.map((val, index) => (
        <option key={index} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;