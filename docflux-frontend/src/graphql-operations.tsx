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
