interface FormInput {
  id: string,
  type: string,
  register: any,
  error: any,
  label?: string,
  className?: string
}

const FormInput = ({id, type, register, error, label, className}: FormInput) => {
  return <>
    {label && <label htmlFor={id}>{label}</label>}
    <input
    {...register(id)}
    id={id}
    name={id}
    type={type}
    className={className ? className : ""}
    />
    {error && <span role="alert" className="error">{error.message}</span>}
  </>
}

export default FormInput