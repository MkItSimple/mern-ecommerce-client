import styled from 'styled-components';
// import { ModalType } from '../../app/types';
 const ConfirmationModalStyles = styled.div`
 position: fixed;
top: 0px;
left: 0px;
z-index: 5;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

.modalContainer {
  width: fit-content;
  height: fit-content;
  min-width: 360px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;

  .title {
    display: inline-block;
    text-align: center;
    margin-top: 10px;
    }
}

.titleCloseBtn {
  display: flex;
  justify-content: flex-end;

  button {
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    margin: 0px;
    }
}

.titleCloseBtn {
  padding: 0em;
  margin: 0em;
}

.modalContainer .body {
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  text-align: center;
}
h2 {
  margin: 0px;
  letter-spacing: 1px;
  /* font-family: 'Gotham Light'; */
}
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    flex: 1;
    margin: 1em;
  }
}

`
interface ConfirmationModalProps {
    closeModal: () => void,
    body?: JSX.Element | string
}
const ConfirmationModal = ({closeModal, body }: ConfirmationModalProps) => {
return (
    <ConfirmationModalStyles>
    <div className="modalContainer">
        <div className="titleCloseBtn">
        <button
            onClick={closeModal}
        >
            X
        </button>
        </div>
        <div className="title">
        <h2>Leave a rating</h2>
        </div>
        <div className="body">
        {body}
        </div>
        <div className="footer">
        </div>
    </div>
    </ConfirmationModalStyles>
)
  
}

export default ConfirmationModal