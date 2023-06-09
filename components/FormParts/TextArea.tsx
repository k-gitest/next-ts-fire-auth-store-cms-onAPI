import React from 'react'

type Props = {
  name: string;
  id: string;
  value: string;
  onChange: (event:React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({name, id, value, onChange}: Props){
  return (
    <textarea className="w-full rounded border-2 px-3 py-[0.32rem] leading-[1.6] outline-none" name={name} id={id} value={value} onChange={onChange} />
  )
}