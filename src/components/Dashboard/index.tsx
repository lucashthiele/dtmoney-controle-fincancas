import { Summary } from "../Summary";
import { TransactionTable } from "../TransactionsTable";
import { Container } from "./styles";
import { createServer } from "miragejs";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return [
        {
          id: 1,
          title: "Transaction",
          amount: 4000,
          type: "deposit",
          category: "Food",
          createdAt: new Date(),
        },
      ];
    });
  },
});

export function Dashboard() {
  return (
    <>
      <Container>
        <Summary />
        <TransactionTable />
      </Container>
    </>
  );
}
