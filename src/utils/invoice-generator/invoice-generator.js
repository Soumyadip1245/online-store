import pdfMake from 'pdfmake/build/pdfmake';
// import { TDocumentDefinitions } from 'pdfmake/interfaces';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import date from 'date-and-time';
import Order from '../../models/order';
pdfMake.vfs = pdfFonts.pdfMake.vfs
const dateFormat = (createdAt) => {
    const nowe = new Date(createdAt);
    return date.format(nowe, 'DD MMM hh:mm A');
  }
export const generateInvoice = (data,generated) =>{
    console.log(data,generated)
    const documentDefination = {
        
        content: [
            
          {
            columns: [
            //   {
            //     image:
            //       'data:image/png;base64,',
            //     width: 150,
            //   },
              [
                
                {
                  text: 'Invoice',
                  color: '#333333',
                  width: '*',
                  fontSize: 28,
                  bold: true,
                  alignment: 'right',
                  margin: [0, 0, 0, 15],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: 'Order No.',
                          color: '#aaaaab',
                          bold: true,
                          width: '*',
                          fontSize: 12,
                          alignment: 'right',
                        },
                        {
                          text: `#${data.orderNumber}`,
                          bold: true,
                          color: '#333333',
                          fontSize: 12,
                          alignment: 'right',
                          width: 100,
                        },
                      ],
                    },
                    {
                      columns: [
                        {
                          text: 'Invoice Created',
                          color: '#aaaaab',
                          bold: true,
                          width: '*',
                          fontSize: 12,
                          alignment: 'right',
                        },
                        {
                          text: dateFormat(data.createdAt),
                          bold: true,
                          color: '#333333',
                          fontSize: 12,
                          alignment: 'right',
                          width: 100,
                        },
                      ],
                    },
                    {
                      columns: [
                        {
                          text: 'Status',
                          color: '#aaaaab',
                          bold: true,
                          fontSize: 12,
                          alignment: 'right',
                          width: '*',
                        },
                        {
                          text: data.isPaynow?"Paid":"Not Paid",
                          bold: true,
                          fontSize: 14,
                          alignment: 'right',
                          color: data.isPaynow?"green":"red",
                          width: 100,
                        },
                      ],
                    },
                  ],
                },
              ],
            ],
          },
          {
            columns: [
              {
                text: 'From',
                color: '#aaaaab',
                bold: true,
                fontSize: 14,
                alignment: 'left',
                margin: [0, 20, 0, 5],
              },
              {
                text: 'To',
                color: '#aaaaab',
                bold: true,
                fontSize: 14,
                alignment: 'left',
                margin: [0, 20, 0, 5],
              },
            ],
          },
          {
            columns: [
              {
                text: generated.store.storeName,
                bold: true,
                color: '#333333',
                alignment: 'left',
              },
              {
                text: data.buyerName,
                bold: true,
                color: '#333333',
                alignment: 'left',
              },
            ],
          },
          {
            columns: [
              {
                text: 'Address',
                color: '#aaaaab',
                bold: true,
                margin: [0, 7, 0, 3],
              },
              {
                text: 'Address',
                color: '#aaaaab',
                bold: true,
                margin: [0, 7, 0, 3],
              },
            ],
          },
          {
            columns: [
              {
                text: generated.seller.profile.address,
                style: 'invoiceBillingAddress',
              },
              {
                text: data.deliveryAddress.address,
                style: 'invoiceBillingAddress',
              },
            ],
          },
          '\n\n',
          {
            width: '100%',
            alignment: 'center',
            text: `Invoice No. #${data.orderNumber}`,
            bold: true,
            margin: [0, 10, 0, 10],
            fontSize: 15,
          },
          {
            layout: {
              defaultBorder: false,
              hLineWidth: function(i, node) {
                return 1;
              },
              vLineWidth: function(i, node) {
                return 1;
              },
              hLineColor: function(i, node) {
                if (i === 1 || i === 0) {
                  return '#bfdde8';
                }
                return '#eaeaea';
              },
              vLineColor: function(i, node) {
                return '#eaeaea';
              },
              hLineStyle: function(i, node) {
                // if (i === 0 || i === node.table.body.length) {
                return null;
                //}
              },
              // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              paddingLeft: function(i, node) {
                return 10;
              },
              paddingRight: function(i, node) {
                return 10;
              },
              paddingTop: function(i, node) {
                return 2;
              },
              paddingBottom: function(i, node) {
                return 2;
              },
              fillColor: function(rowIndex, node, columnIndex) {
                return '#fff';
              },
            },
            table: {
              headerRows: 1,
              widths: ['*', 80],
              body: [
                [
                  {
                    text: 'Product',
                    fillColor: 'black',
                    border: [false, true, false, true],
                    margin: [0, 5, 0, 5],
                    textTransform: 'uppercase',
                    color: 'white'
                  },
                  {
                    text: 'Price',
                    border: [false, true, false, true],
                    alignment: 'right',
                    fillColor: 'black',
                    margin: [0, 5, 0, 5],
                    textTransform: 'uppercase',
                    color: 'white'
                  },
                ],
                ...data.cartItems.map((curr) => [
                    {
                      text: curr.productName || 'N/A', // Provide a fallback if undefined
                      border: [false, false, false, true],
                      margin: [0, 5, 0, 5],
                      alignment: 'left',
                      color: 'black',
                    },
                    {
                      border: [false, false, false, true],
                      text: `₹${curr.productPrice ? curr.productPrice.toFixed(2) : '0.00'}`, // Provide a fallback and format
                      fillColor: '#ffffff', // Dark background for rows
                      alignment: 'right',
                      margin: [0, 5, 0, 5],
                      color: 'black',
                    },
                  ]),
                 [
                  {
                    text: 'Total Amount',
                    bold: true,
                    fontSize: 15,
                    alignment: 'right',
                    border: [false, false, false, true],
                    margin: [0, 5, 0, 5],
                  },
                  {
                    text: `₹${data.totalAmount}`,
                    bold: true,
                    fontSize: 15,
                    alignment: 'right',
                    border: [false, false, false, true],
                    fillColor: '#f5f5f5',
                    margin: [0, 5, 0, 5],
                  },
                ],
              ],
            },
          },
          '\n',
          '\n\n',
         
          '\n\n',
        ],
        styles: {
          notesTitle: {
            fontSize: 10,
            bold: true,
            margin: [0, 50, 0, 3],
          },
          notesText: {
            fontSize: 10,
          },
        },
        defaultStyle: {
          columnGap: 20,
          //font: 'Quicksand',
        },
      };
       pdfMake.createPdf(documentDefination).getBase64(async (curr)=>{
        const order = new Order()
        const uploaded = await order.uploadInvoice(curr,data.orderNumber)
        console.log(uploaded)
      })
      pdfMake.createPdf(documentDefination).download()

}