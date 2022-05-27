import styled from 'styled-components';
export const LoginStyles = styled.div`
  max-width: 430px;
  padding: 4em 2em;
  margin: 0 auto;
  font-family: "Archivo";
  font-size: 14px;
  /* background-color: rgba(0, 0, 0, 0.1); */
  form {
    width: 100%;
    /* background-color: rgba(0, 0, 0, 0.1); */
  }

  .section-header__title {
    text-align: center;
    margin-bottom: 1em;
  }
  .label_container {
    display: block;
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    label {

    }
  }
  input {
    margin-bottom: 1em;
  }
  .forgot_password {
    width: 100%;
    text-align: right;
    font-size: 0.85em;
  }

  .btn {
    margin-bottom: 1em;
  }

  .create_account_link {
    display: block;
    padding: 5px;
    width: calc(100% - 10px);
    text-align: center;
  }
  .or {
    text-align: center;
    /* letter-spacing: 2px; */
    margin: 1em auto;
  }
  .login_with_google {
    display: block;
    width: calc(100% - 2px);
    /* background-color: #1890ff; */
    background-color: #ffffff;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0px;
    color: #000;
  }
  .google_icon {
    display: inline-block;
    height: 25px;
    width: 25px;
    vertical-align: center;
    /* border: 1px solid #eee; */
    margin-right: 1em;
    background: white;
    border-radius: 50%;
    position: relative;
  }
`;