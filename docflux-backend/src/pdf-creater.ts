import { PDFDocument, PDFPage } from "pdf-lib";
import fs from "fs/promises";
import {
  AddOrderInput,
  OrderInfo,
  CustomerInfo,
} from "./generated/graphql-types";
import { parseFinnishDate } from "./utils";

export const PDF_STORE_PATH = "./pdf-store";

const ROW_SIZE = 0.015;

export const createPdf = async (order: AddOrderInput) => {
  const existingPdfBytes = await fs.readFile("./pdf-templates/contract.pdf");

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  writeCustomerInfo(firstPage, order.customerInfo);
  writeOrderInfo(firstPage, order.orderInfo);
  writeSignaturePlaceholders(firstPage, order.customerInfo);
  writeContractDate(firstPage);
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(PDF_STORE_PATH + "/contract.pdf", pdfBytes);
};

const writeOrderInfo = (page: PDFPage, orderInfo: OrderInfo) => {
  const { width, height } = page.getSize();
  page.drawText(orderInfo.performer, {
    x: width * 0.35,
    y: height * 0.638,
    size: 12,
  });
  page.drawText(orderInfo.location, {
    x: width * 0.35,
    y: height * (0.638 - ROW_SIZE * 1),
    size: 12,
  });
  page.drawText(parseFinnishDate(orderInfo.timeOfDelivery), {
    x: width * 0.35,
    y: height * (0.638 - ROW_SIZE * 2),
    size: 12,
  });
  page.drawText(orderInfo.timeInfo ? orderInfo.timeInfo : "", {
    x: width * 0.35,
    y: height * (0.638 - ROW_SIZE * 3),
    size: 12,
  });
  page.drawText(orderInfo.delivery, {
    x: width * 0.35,
    y: height * (0.638 - ROW_SIZE * 4),
    size: 12,
  });
  page.drawText(orderInfo.priceEuro.toString() + "€", {
    x: width * 0.35,
    y: height * (0.638 - ROW_SIZE * 5),
    size: 12,
  });
  page.drawText(orderInfo.priceInfo ? orderInfo.priceInfo : "", {
    x: width * 0.35,
    y: height * (0.638 - ROW_SIZE * 6),
    size: 12,
  });
  page.drawText(orderInfo.otherOne ? orderInfo.otherOne : "", {
    x: width * 0.35,
    y: height * (0.638 - ROW_SIZE * 7),
    size: 12,
  });
  page.drawText(orderInfo.otherTwo ? orderInfo.otherTwo : "", {
    x: width * 0.35,
    y: height * (0.638 - ROW_SIZE * 8),
    size: 12,
  });
};

const writeCustomerInfo = (page: PDFPage, customerInfo: CustomerInfo) => {
  const { width, height } = page.getSize();
  let nextRowMultiplier = 1;
  page.drawText(customerInfo.name, {
    x: width * 0.115,
    y: height * 0.78,
    size: 12,
  });
  if (customerInfo.company) {
    page.drawText(customerInfo.company ? customerInfo.company : "", {
      x: width * 0.115,
      y: height * (0.78 - ROW_SIZE * nextRowMultiplier),
      size: 12,
    });
    nextRowMultiplier++;
  }
  page.drawText(customerInfo.addressOne, {
    x: width * 0.115,
    y: height * (0.78 - ROW_SIZE * nextRowMultiplier),
    size: 12,
  });
  nextRowMultiplier++;
  if (customerInfo.addressTwo) {
    page.drawText(customerInfo.addressTwo, {
      x: width * 0.115,
      y: height * (0.78 - ROW_SIZE * nextRowMultiplier),
      size: 12,
    });
    nextRowMultiplier++;
  }
  page.drawText(customerInfo.email, {
    x: width * 0.115,
    y: height * (0.78 - ROW_SIZE * nextRowMultiplier),
    size: 12,
  });
};

const writeSignaturePlaceholders = (
  page: PDFPage,
  customerInfo: CustomerInfo
) => {
  const { width, height } = page.getSize();
  page.drawText(
    customerInfo.company ? customerInfo.company : customerInfo.name,
    {
      x: width * 0.1175,
      y: height * 0.27,
      size: 12,
    }
  );
  page.drawText(customerInfo.name, {
    x: width * 0.1175,
    y: height * 0.209,
    size: 12,
  });
};

const writeContractDate = (page: PDFPage) => {
  const today = new Date();
  const date = parseFinnishDate(today.toISOString());
  const { width, height } = page.getSize();
  page.drawText(date, {
    x: width * 0.73,
    y: height * 0.85,
    size: 12,
  });
};
