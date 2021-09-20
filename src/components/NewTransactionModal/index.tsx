import { Container, TrasactionTypeContainer, RadioBox } from "./styles";
import { TransactionsContext } from "../../TransactionsContext";
import Modal from "react-modal";
import income from "../../assets/income.svg";
import outcome from "../../assets/outcome.svg";
import close from "../../assets/close.svg";
import { FormEvent, useState, useContext } from "react";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal(props: NewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");

    props.onRequestClose();
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
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
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
