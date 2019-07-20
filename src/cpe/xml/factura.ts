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
} from '@structures';
import { 
    DocumentoRelacionado,
    DocumentoElectronico, 
    Discrepancia, 
    DetalleDocumento,
    IEstructuraXml, 
    IDocumentoXml,
} from '@common';
import { Invoice } from '@standard';

export class Factura implements IDocumentoXml {
    public Generar(documento: DocumentoElectronico): IEstructuraXml {
        const invoice = new Invoice();
        invoice.UBLExtensions = new UblExtensions();
        invoice.UBLVersionID = '2.1';
        invoice.CustomizationID = '2.0';
        invoice.ID = 'F001-00000125';
        invoice.IssueDate = '2019-07-07';
        invoice.DueDate = '2019-07-07';
        invoice.InvoiceTypeCode = new InvoiceTypeCode({
            listID: '0101',
            listAgencyName: 'PE:SUNAT',
            listName: 'SUNAT:Identificador de Tipo de Documento',
            listURI: 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo01',
            Value: '01',
        });
        invoice.Note = new Note({
            languageLocaleID: '1000',
            Value: 'SETENTA Y UN MIL TRESCIENTOS CINCUENTICUATRO Y 99/100',
        });
        invoice.DocumentCurrencyCode = new DocumentCurrencyCode({
            listID: 'ISO 4217',
            listName: 'Currency',
            listAgencyName: 'United Nations Economic Commission for Europe',
            Value: 'PEN',
        });
        invoice.LineCountNumeric = '1';
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
                        schemeName: 'SUNAT:Identificador de Documento de Identidad',
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
                        schemeName: 'SUNAT:Identificador de Documento de Identidad',
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
                PartyLegalEntity: new PartyLegalEntity({
                    RegistrationName: documento.Emisor.NombreLegal,
                    RegistrationAddress: new RegistrationAddress({
                        AddressTypeCode: '0000',
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
                        schemeName: 'SUNAT:Identificador de Documento de Identidad',
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
                Value: 26.69,
            }),
            TaxSubtotal: new TaxSubtotal({
                TaxableAmount: new PayableAmount({
                    currencyID: documento.Moneda,
                    Value: 148.31,
                }),
                TaxAmount: new PayableAmount({
                    currencyID: documento.Moneda,
                    Value: 26.69,
                }),
                TaxCategory: new TaxCategory({
                    TaxScheme: new TaxScheme({
                        ID: new TaxSchemeId({
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
                Value: 148.31,
            }),
            TaxInclusiveAmount: new PayableAmount({
                currencyID: documento.Moneda,
                Value: 175.01,
            }),
            PayableAmount: new PayableAmount({
                currencyID: documento.Moneda,
                Value: 175.01,
            }),
        });
        documento.Items.forEach((detalleDocumento: DetalleDocumento) => {
            const linea = new InvoiceLine({
                ID: detalleDocumento.Id.toString(),
                InvoicedQuantity: new InvoicedQuantity({
                    unitCode: detalleDocumento.UnidadMedida,
                    Value: detalleDocumento.Cantidad,
                }),
                LineExtensionAmount: new PayableAmount({
                    currencyID: documento.Moneda,
                    Value: 84.75,
                }),
                PricingReference: new PricingReference({
                    AlternativeConditionPrices: [new AlternativeConditionPrice({
                        PriceAmount: new PayableAmount({
                            currencyID: documento.Moneda,
                            Value: 50.01,
                        }),
                        PriceTypeCode: new PriceTypeCode({
                            Value: detalleDocumento.TipoPrecio,
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
                        Value: 42.37,
                    }),
                }),
            });
            linea.TaxTotals.push(new TaxTotal({
                TaxAmount: new PayableAmount({
                    currencyID: documento.Moneda,
                    Value: 15.25,
                }),
                TaxSubtotal: new TaxSubtotal({
                    TaxableAmount: new PayableAmount({
                        currencyID: documento.Moneda,
                        Value: 84.75,
                    }),
                    TaxAmount: new PayableAmount({
                        currencyID: documento.Moneda,
                        Value: 15.75,
                    }),
                    TaxCategory: new TaxCategory({
                        Percent: '18.00',
                        TaxExemptionReasonCode: new TaxExemptionReasonCode({
                            Value: detalleDocumento.TipoImpuesto,
                        }),
                        TaxScheme: new TaxScheme({
                            ID: new TaxSchemeId({
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
            invoice.InvoiceLine.push(linea);
        });      
        return invoice;
    }
}
