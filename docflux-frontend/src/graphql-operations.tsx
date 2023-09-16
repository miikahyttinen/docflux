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

export const ADD_ORDER_MUTATION = gql`
  mutation AddOrder($input: AddOrderInput!) {
    addOrder(input: $input) {
      id
    }
  }
`;
