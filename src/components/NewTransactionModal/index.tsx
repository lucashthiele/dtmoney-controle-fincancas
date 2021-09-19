import { Container } from "./styles";
import Modal from "react-modal";
import close from "../../assets/close.svg";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal(props: NewTransactionModalProps) {
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          onClick={props.onRequestClose}
          className="react-modal-close"
        >
          <img src={close} alt="Fechar Modal" />
        </button>

        <Container>
          <h2>Cadastrar Transação</h2>

          <input placeholder="Título" />
          <input placeholder="Valor" type="number" />
          <input placeholder="Categoria" />
          <button type="submit">Cadastar</button>
        </Container>
      </Modal>
    </>
  );
}
