type Props = {
  name: string;
  id?: string;
  value: string;
  type: string;
  onChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
  completeValue?: string;
}

const InputText = (props: Props) => {
  return (
    <input className="border block p-3" type={props.type} name={props.name} id={props.id} value={props.value} onChange={props.onChange} autoComplete={props.completeValue} />
  )
}

export default InputText