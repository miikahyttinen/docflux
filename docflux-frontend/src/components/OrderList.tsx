import { useQuery } from "@apollo/client";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Order } from "../generated/graphql-types";
import { ALL_ORDERS_QUERY } from "../graphql-operations";
import { parseFinnishDate } from "../utils";

export default function OrderList() {
  const allOrdersQuery = useQuery(ALL_ORDERS_QUERY);

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>All Orders</TableCaption>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Customer Name</Th>
            <Th>Delivery</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!allOrdersQuery.loading &&
            allOrdersQuery.data.allOrders.map((order: Order) => {
              return (
                <Tr key={order.id}>
                  <Td>{parseFinnishDate(order.orderInfo.timeOfDelivery)}</Td>
                  <Td>{order.customerInfo.name}</Td>
                  <Td>{order.orderInfo.delivery}</Td>
                  <Td>{order.orderInfo.priceEuro}€</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
