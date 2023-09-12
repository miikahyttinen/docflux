import { PDFDocument, PDFPage, StandardFonts } from 'pdf-lib'
import fs from 'fs/promises';
import { CustomerInfo, OrderDto, OrderInfo } from './types';

export const PDF_STORE_PATH = "./pdf-store"

const ROW_SIZE = 0.015


export const createPdf = async (order: OrderDto) => {
    const existingPdfBytes = await fs.readFile("./pdf-templates/contract.pdf");

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    writeCustomerInfo(firstPage, order.customerInfo)
    writeOrderInfo(firstPage, order.orderInfo)
    const pdfBytes = await pdfDoc.save()
    await fs.writeFile(PDF_STORE_PATH + "/contract.pdf", pdfBytes)
}

const parseFinnishDate = (isoDateString: string) => {
    const yyyy = isoDateString.substring(0, 4) 
    const mm = isoDateString.substring(5, 7)
    const dd = isoDateString.substring(8, 10) 
    return `${dd}.${mm}.${yyyy}`
}

const writeOrderInfo = (page: PDFPage, orderInfo: OrderInfo) => {
    const { width, height } = page.getSize()
    page.drawText(orderInfo.performer, {
        x: (width * 0.35),
        y: (height * 0.638),
        size: 12
    })
    page.drawText(orderInfo.location, {
        x: (width * 0.35),
        y: (height * (0.638 - (ROW_SIZE * 1))),
        size: 12
    })
    page.drawText(parseFinnishDate(orderInfo.timeOfDelivery), {
        x: (width * 0.35),
        y: (height * (0.638 - (ROW_SIZE * 2))),
        size: 12
    })     
    page.drawText(orderInfo.timeInfo ? orderInfo.timeInfo : "", {
        x: (width * 0.35),
        y: (height * (0.638 - (ROW_SIZE * 3))),
        size: 12
    })
    page.drawText(orderInfo.delivery, {
        x: (width * 0.35),
        y: (height * (0.638 - (ROW_SIZE * 4))),
        size: 12
    })
    page.drawText(orderInfo.priceEuro.toString() + "€", {
        x: (width * 0.35),
        y: (height * (0.638 - (ROW_SIZE * 5))),
        size: 12
    })   
    page.drawText(orderInfo.priceInfo ? orderInfo.priceInfo : "", {
        x: (width * 0.35),
        y: (height * (0.638 - (ROW_SIZE * 6))),
        size: 12
    })                    
    page.drawText(orderInfo.otherOne ? orderInfo.otherOne : "", {
        x: (width * 0.35),
        y: (height * (0.638 - (ROW_SIZE * 7))),
        size: 12
    })
    page.drawText(orderInfo.otherTwo ? orderInfo.otherTwo : "", {
        x: (width * 0.35),
        y: (height * (0.638 - (ROW_SIZE * 8))),
        size: 12
    })           
}

const writeCustomerInfo = (page: PDFPage, customerInfo: CustomerInfo) => {
    const { width, height } = page.getSize()
    let nextRowMultiplier = 1
    page.drawText(customerInfo.name, {
        x: (width * 0.115),
        y: (height * 0.78),
        size: 12
    })
    if(customerInfo.company) {
        page.drawText(customerInfo.company ? customerInfo.company : "", {
            x: (width * 0.115),
            y: (height * (0.78 - (ROW_SIZE * nextRowMultiplier))),
            size: 12
        })    
        nextRowMultiplier++
    }
    page.drawText(customerInfo.addressOne, {
        x: (width * 0.115),
        y: (height * (0.78 - (ROW_SIZE * nextRowMultiplier))),
        size: 12
    })
    nextRowMultiplier++
    if(customerInfo.addressTwo) {
        page.drawText(customerInfo.addressTwo, {
            x: (width * 0.115),
            y: (height * (0.78 - (ROW_SIZE * nextRowMultiplier))),
            size: 12
        })
        nextRowMultiplier++
    }
    page.drawText(customerInfo.email, {
        x: (width * 0.115),
        y: (height * (0.78 - (ROW_SIZE * nextRowMultiplier))),
        size: 12
    })
}

