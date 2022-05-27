type Option = {value: string, text: string}

interface FormInput {
  id: string,
  register: any,
  error: any,
  label?: string,
  className?: string
  options: Option[]
}

const FormSelectInput = ({id, register, error, label, className, options}: FormInput) => {
  return <>
    {label && <label htmlFor={id}>{label}</label>}
    <select
    {...register(id)}
      name={id}
      className={className ? className : ""}
    >
      {options.map((o) => (<option key={o.value} value={o.value}>{o.text}</option>))}
    </select>
    {error && <span role="alert" className="error">{error.message}</span>}
  </>
}

export default FormSelectInput