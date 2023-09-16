import { AddOrderInput, AddTemplateInput, Order, Template } from './generated/graphql-types';
import { v4 as uuidv4 } from 'uuid';

export const templates: Template[] = [
    { id: "1", title: 'Private Customers 2023 - Finnish', pdf_filename: 'contract.pdf' },
    { id: "2", title: 'Corporate Customers 2023 - Finnish', pdf_filename: 'contract.pdf' }
]

export const orders: Order[] = []

const resolvers = {
  Query: {
    allOrders: () => orders,
    allTemplates: () => templates 
  },
  Mutation: {
    addTemplate: (_parent, { input }: { input: AddTemplateInput }): Template => {
      const id = String(uuidv4());
      const template = { id: id, title: input.title, pdf_filename: input.pdf_filename  };
      templates.push(template);
      return template;
    },
    addOrder: (_parent, { input }: { input: AddOrderInput }): Order => {
        const id = String(uuidv4());
        const order: Order = { id: id, orderInfo: input.orderInfo, customerInfo: input.customerInfo }   
        orders.push(order)
        return order
    }
  },
};

export default resolvers;