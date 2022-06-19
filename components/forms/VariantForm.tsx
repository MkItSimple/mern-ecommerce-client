import { FormEvent } from "react";

import styled from 'styled-components'; const StyledForm = styled.form`
  font-weight: 200;
  margin-bottom: 3em;
  input {
    margin-bottom: .5em;
    max-width: 300px;
  }
  button {
    min-width: 100px;
  }
`

interface TypeCategoryForm { handleSubmit: (e: FormEvent<HTMLFormElement>) => void, name: string, setName: (name: string) => void }

const VariantForm = ({ handleSubmit, name, setName }: TypeCategoryForm) => (
  <StyledForm onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        className="regular full"
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
      />
      <button className="btn_black regular">Save</button>
    </div>
  </StyledForm>
);

export default VariantForm;
