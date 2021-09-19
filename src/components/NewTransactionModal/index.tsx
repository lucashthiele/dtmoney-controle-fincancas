import { Container, TrasactionTypeContainer, RadioBox } from "./styles";
import Modal from "react-modal";
import income from "../../assets/income.svg";
import outcome from "../../assets/outcome.svg";
import close from "../../assets/close.svg";
import { FormEvent, useState } from "react";
import { api } from "../../services/api";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal(props: NewTransactionModalProps) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      value,
      category,
      type,
    };

    api.post("/transactions", data);
  }

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

        <Container onSubmit={(event) => handleCreateNewTransaction(event)}>
          <h2>Cadastrar Transação</h2>

          <input
            placeholder="Título"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            placeholder="Valor"
            type="number"
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
          />

          <TrasactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => {
                setType("deposit");
              }}
              isActive={type === "deposit"}
              activeColor="green"
            >
              <img src={income} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>

            <RadioBox
              type="button"
              onClick={() => {
                setType("withdraw");
              }}
              isActive={type === "withdraw"}
              activeColor="red"
            >
              <img src={outcome} alt="Saída" />
              <span>Saída</span>
            </RadioBox>
          </TrasactionTypeContainer>

          <input
            placeholder="Categoria"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <button type="submit">Cadastar</button>
        </Container>
      </Modal>
    </>
  );
}
