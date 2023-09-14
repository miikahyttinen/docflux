import { AddTemplateInput, Template } from './generated/graphql-types';
import { v4 as uuidv4 } from 'uuid';

export const templates: Template[] = [
    { id: "1", title: 'Private Customers 2023 - Finnish', pdf_filename: 'contract.pdf' },
    { id: "2", title: 'Corporate Customers 2023 - Finnish', pdf_filename: 'contract.pdf' }
]

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    allTemplates: () => templates 
  },
  Mutation: {
    addTemplate: (_parent, { input }: { input: AddTemplateInput }): Template => {
      const id = String(uuidv4());
      const template = { id: id, title: input.title, pdf_filename: input.pdf_filename  };
      templates.push(template);
      return template;
    },
  },
};

export default resolvers;