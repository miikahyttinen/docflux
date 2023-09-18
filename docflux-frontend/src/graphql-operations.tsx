import { useQuery, gql } from "@apollo/client";

export const ALL_TEMPLATES_QUERY = gql`
  query AllTemplatesQuery {
    allTemplates {
      id
      title
      pdf_filename
    }
  }
`;

export const ALL_ORDERS_QUERY = gql`
  query AllOrders {
    allOrders {
      customerInfo {
        addressOne
        addressTwo
        company
        email
        name
      }
      id
      orderInfo {
        performer
        location
        timeOfDelivery
        timeInfo
        delivery
        priceEuro
        priceInfo
        otherOne
        otherTwo
      }
    }
  }
`;

export const ADD_ORDER_MUTATION = gql`
  mutation AddOrder($input: AddOrderInput!) {
    addOrder(input: $input) {
      id
    }
  }
`;
