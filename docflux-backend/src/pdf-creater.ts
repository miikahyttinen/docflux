import { jsPDF } from "jspdf";
import { CustomerInfo } from "./app";

export const PDF_STORE_PATH = "./pdf-store"

export const createPdf = (customerInfo: CustomerInfo) => {
    const doc = new jsPDF();
    doc.text(customerInfo.name, 10, 10);
    doc.text(customerInfo.address, 10, 20);
    doc.text(customerInfo.email, 10, 30);
    doc.save(PDF_STORE_PATH + "/customer-info.pdf");
}