import React from 'react';

type RadioProps = {
  name: string;
  value: string[];
  label: string[];
  checked: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputRadio(props: RadioProps){
  const { name, value, label, checked, onChange } = props;

  return(
    <>
    {value.map((item, i) => (
      <label key={i} className="mr-2 cursor-pointer">
        <input type="radio" name={name} value={item} checked={item === checked} onChange={onChange} className="mr-2 cursor-pointer" />
        {item}
      </label>
    ))}
    </>
  )
}