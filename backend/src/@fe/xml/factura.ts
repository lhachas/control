import {
    InvoiceTypeCode,
    Note,
    DocumentCurrencyCode,
    UblExtensions,
    InvoiceDocumentReference,
    SignatureCac,
    SignatoryParty,
    DigitalSignatureAttachment,
    PartyIdentification,
    PartyName,
    ExternalReference,
    AccountingSupplierParty,
    Party,
    PartyLegalEntity,
    PartyIdentificationId,
    RegistrationAddress,
    TaxTotal,
    PayableAmount,
    TaxSubtotal,
    TaxCategory,
    TaxSchemeId,
    TaxScheme,
    LegalMonetaryTotal,
    InvoiceLine,
    InvoicedQuantity,
    PricingReference,
    AlternativeConditionPrice,
    Item,
    SellersItemIdentification,
    Price,
    PostalAddress,
    Country,
    TaxExemptionReasonCode,
    PriceTypeCode,
    DocumentTypeCode,
    AddressTypeCode,
} from '@fe/structures';
import { DetalleDocumento, DocumentoRelacionado, DocumentoElectronico } from '@fe/common/models';
import { IEstructuraXml, IDocumentoXml } from '@fe/common/interfaces';
import { Invoice } from '@fe/standard';

export class Factura implements IDocumentoXml {
    public Generar(documento: DocumentoElectronico): IEstructuraXml {
        const invoice = new Invoice();
        invoice.UBLExtensions = new UblExtensions();
        invoice.UBLVersionID = '2.1';
        invoice.CustomizationID = '2.0';
        invoice.ID = 'F001-00000138';
        invoice.IssueDate = '2019-07-07';
        invoice.DueDate = '2019-07-07';
        invoice.InvoiceTypeCode = new InvoiceTypeCode({
            listID: '0101',
            listURI: 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo01',
            name: 'Tipo de Operacion',
            listSchemeURI: 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo51',
            Value: '01',
        });
        invoice.Note = new Note({
            languageLocaleID: '1000',
            Value: 'SETECIENTOS OCHO CON 00/100 SOLES',
        });

        /**
         * @OK
         */
        invoice.DocumentCurrencyCode = new DocumentCurrencyCode({
            listID: 'ISO 4217 Alpha',
            listAgencyName: 'United Nations Economic Commission for Europe',
            listName: 'Currency',
            Value: 'PEN',
        });
        invoice.LineCountNumeric = '1';

        /**
         *  @OK
         */
        documento.OtrosDocumentosRelacionados.forEach((relacionado: DocumentoRelacionado) => {
            invoice.AdditionalDocumentReferences.push(new InvoiceDocumentReference({
                ID: relacionado.NroDocumento,
                DocumentTypeCode: new DocumentTypeCode({
                    listName: 'Documento Relacionado',
                    listAgencyName: 'PE:SUNAT',
                    listURI: 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo12',
                    Value: relacionado.TipoDocumento,
                }),
            }));
        });
        invoice.Signature = new SignatureCac({
            ID: documento.Emisor.NroDocumento,
            SignatoryParty: new SignatoryParty({
                PartyIdentification: new PartyIdentification({
                    ID: new PartyIdentificationId({
                        schemeID: '6',
                        schemeName: 'Documento de Identidad',
                        schemeAgencyName: 'PE:SUNAT',
                        schemeURI: 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06',
                        Value: documento.Emisor.NroDocumento,
                    }),
                }),
                PartyName: new PartyName({
                    Name: documento.Emisor.NombreLegal,
                }),
            }),
            DigitalSignatureAttachment: new DigitalSignatureAttachment({
                ExternalReference:  new ExternalReference({
                    Uri: `#SignatureSP`,
                }),
            }),
        });
        invoice.AccountingSupplierParty = new AccountingSupplierParty({
            CustomerAssignedAccountID: documento.Emisor.NroDocumento,
            AdditionalAccountID: documento.Emisor.TipoDocumento,
            Party: new Party({
                PartyIdentification: new PartyIdentification({
                    ID: new PartyIdentificationId({
                        schemeID: '6',
                        schemeName: 'Documento de Identidad',
                        schemeAgencyName: 'PE:SUNAT',
                        schemeURI: 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06',
                        Value: documento.Emisor.NroDocumento,
                    }),
                }),
                PartyName: new PartyName({
                    Name: documento.Emisor.NombreComercial,
                }),
                PostalAddress: new PostalAddress({
                    ID: documento.Emisor.Ubigeo,
                    StreetName: documento.Emisor.Direccion,
                    CitySubdivisionName: documento.Emisor.Urbanizacion,
                    CityName: documento.Emisor.Provincia,
                    District: documento.Emisor.Distrito,
                    Country: new Country({
                        IdentificationCode: 'PE',
                    }),
                }),

                /**
                 * @OK
                 */
                PartyLegalEntity: new PartyLegalEntity({
                    RegistrationName: documento.Emisor.NombreLegal,
                    RegistrationAddress: new RegistrationAddress({
                        AddressTypeCode: new AddressTypeCode({
                            listAgencyName: 'PE:SUNAT',
                            listName: 'Establecimientos anexos',
                            Value: '0001',
                        }),
                    }),
                }),
            }),
        });
        invoice.AccountingCustomerParty = new AccountingSupplierParty({
            CustomerAssignedAccountID: documento.Receptor.NroDocumento,
            AdditionalAccountID: documento.Receptor.TipoDocumento,
            Party: new Party({
                PartyName: new PartyName({
                    Name: documento.Receptor.NombreComercial,
                }),
                PostalAddress: new PostalAddress({
                    ID: documento.Receptor.Ubigeo,
                    StreetName: documento.Receptor.Direccion,
                    CitySubdivisionName: documento.Receptor.Urbanizacion,
                    CityName: documento.Receptor.Provincia,
                    District: documento.Receptor.Distrito,
                    Country: new Country ({
                        IdentificationCode: 'PE',
                    }),
                }),
                PartyIdentification: new PartyIdentification({
                    ID: new PartyIdentificationId({
                        schemeID: '6',
                        schemeName: 'Documento de Identidad',
                        schemeAgencyName: 'PE:SUNAT',
                        schemeURI: 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06',
                        Value: documento.Receptor.NroDocumento,
                    }),
                }),
                PartyLegalEntity: new PartyLegalEntity({
                    RegistrationName: documento.Receptor.NombreLegal,
                }),
            }),
        });
        // invoice.PrepaidPayment = new PrepaidPayment({
        //     ID: 'F001-245',
        //     PaidAmount: new PayableAmount({
        //         currencyID: 'PEN',
        //         Value: 51731.2,
        //     }),
        //     PaidDate: '2017-07-07',
        // });
        invoice.TaxTotals.push(new TaxTotal({
            TaxAmount: new PayableAmount({
                currencyID: documento.Moneda,
                Value: 108.00,
            }),
            TaxSubtotal: new TaxSubtotal({
                TaxableAmount: new PayableAmount({
                    currencyID: documento.Moneda,
                    Value: 600.00,
                }),
                TaxAmount: new PayableAmount({
                    currencyID: documento.Moneda,
                    Value: 108.00,
                }),
                TaxCategory: new TaxCategory({
                    TaxScheme: new TaxScheme({
                        ID: new TaxSchemeId({
                            schemeName: 'Codigo de tributos',
                            schemeAgencyName: 'PE:SUNAT',
                            schemeURI: 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo05',
                            schemeID: 'UN/ECE 5153',
                            schemeAgencyID: '6',
                            Value: 1000,
                        }),
                        Name: 'IGV',
                        TaxTypeCode: 'VAT',
                    }),
                }),
            }),
        }));
        invoice.LegalMonetaryTotal = new LegalMonetaryTotal({
            LineExtensionAmount: new PayableAmount({
                currencyID: 'PEN',
                Value: 600.00,
            }),
            TaxInclusiveAmount: new PayableAmount({
                currencyID: documento.Moneda,
                Value: 708.00,
            }),
            PayableAmount: new PayableAmount({
                currencyID: documento.Moneda,
                Value: 708.00,
            }),
        });

        /**
         * @OK
         */
        documento.Items.forEach((detalleDocumento: DetalleDocumento) => {
            const linea = new InvoiceLine({
                ID: detalleDocumento.Id.toString(),
                InvoicedQuantity: new InvoicedQuantity({
                    unitCode: 'NIU',
                    Value: 1.0,
                }),
                LineExtensionAmount: new PayableAmount({
                    currencyID: documento.Moneda,
                    Value: 500.00,
                }),
                PricingReference: new PricingReference({
                    AlternativeConditionPrices: [new AlternativeConditionPrice({
                        PriceAmount: new PayableAmount({
                            currencyID: documento.Moneda,
                            Value: 590.00,
                        }),
                        PriceTypeCode: new PriceTypeCode({
                            listAgencyName: 'PE:SUNAT',
                            listName: 'Tipo de Precio',
                            listURI: 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo16',
                            Value: '01',
                        }),
                    })],
                }),
                Item: new Item({
                    Description: detalleDocumento.Descripcion,
                    SellersItemIdentification: new SellersItemIdentification({
                        ID: detalleDocumento.CodigoItem,
                    }),
                }),
                Price: new Price({
                    PriceAmount: new PayableAmount({
                        currencyID: documento.Moneda,
                        Value: 500.0,
                    }),
                }),
            });

            /**
             * @OK
             */
            linea.TaxTotals.push(new TaxTotal({
                TaxAmount: new PayableAmount({
                    currencyID: documento.Moneda,
                    Value: 90.00,
                }),
                TaxSubtotal: new TaxSubtotal({
                    TaxableAmount: new PayableAmount({
                        currencyID: documento.Moneda,
                        Value: 500.00,
                    }),
                    TaxAmount: new PayableAmount({
                        currencyID: documento.Moneda,
                        Value: 90.00,
                    }),
                    TaxCategory: new TaxCategory({
                        Percent: '18.00',
                        TaxExemptionReasonCode: new TaxExemptionReasonCode({
                            listAgencyName: 'PE:SUNAT',
                            listName: 'Afectacion del IGV',
                            listURI: 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo07',
                            Value: '10',
                        }),
                        TaxScheme: new TaxScheme({
                            ID: new TaxSchemeId({
                                schemeName: 'Codigo de tributos',
                                schemeAgencyName: 'PE:SUNAT',
                                schemeURI: 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo05',
                                Value: 1000,
                            }),
                            Name: 'IGV',
                            TaxTypeCode: 'VAT',
                        }),
                    }),
                }),
            }));
            invoice.InvoiceLine.push(linea);
        });
        return invoice;
    }
}
