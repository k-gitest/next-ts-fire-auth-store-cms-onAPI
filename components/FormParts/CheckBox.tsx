import React from 'react';

type Props = {
  name: string;
  value: string[];
  label: string[];
  checked: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputCheckbox(props: Props) {
  const { name, value, label, checked, onChange } = props;
  return (
    <>
      {value.map((item, i) =>
        <label key={i} className="mr-3 cursor-pointer">
          <input type="checkbox" name={name} id={item} value={item} checked={checked.includes(item)} onChange={onChange} className="mr-1 cursor-pointer" />
          {item}
        </label>
      )
      }
    </>
  );
};

