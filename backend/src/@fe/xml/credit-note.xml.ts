import {
    DiscrepancyResponse,
    UblExtensions,
    BillingReference,
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
import { DocumentoRelacionado, DocumentoElectronico, Discrepancia, DetalleDocumento } from '@fe/common/models';
import { IXmlStructure, IXmlDocument } from '@fe/common/interfaces';
import { CreditNote } from '@fe/standard';

export class CreditNoteXML implements IXmlDocument {
    public generate(document: DocumentoElectronico): IXmlStructure {
        const creditNote = new CreditNote();
        creditNote.UBLVersionID = '2.1';
        creditNote.CustomizationID = '2.0';
        creditNote.ID = 'F001-00000025';
        creditNote.IssueDate = '2019-07-07';
        creditNote.DocumentCurrencyCode = document.Moneda;
        creditNote.UBLExtensions = new UblExtensions();
        document.Discrepancias.forEach((discrepancia: Discrepancia) => {
            creditNote.DiscrepancyResponses.push(new DiscrepancyResponse({
                ReferenceID: discrepancia.NroReferencia,
                ResponseCode: discrepancia.Tipo,
                Description: discrepancia.Descripcion,
            }));
        });
        document.Relacionados.forEach((relacionado: DocumentoRelacionado) => {
            creditNote.BillingReferences.push(new BillingReference(new InvoiceDocumentReference({
                ID: relacionado.NroDocumento,
                DocumentTypeCode: new DocumentTypeCode({
                    Value: relacionado.TipoDocumento,
                }),
            })));
        });
        // document.OtrosDocumentosRelacionados.forEach((relacionado: DocumentoRelacionado) => {
        //     creditNote.AdditionalDocumentReferences.push(new InvoiceDocumentReference({
        //         ID: relacionado.NroDocumento,
        //         DocumentTypeCode: relacionado.TipoDocumento,
        //     }));
        // });
        creditNote.Signature = new SignatureCac({
            ID: document.Emisor.NroDocumento,
            SignatoryParty: new SignatoryParty({
                PartyIdentification: new PartyIdentification({
                    ID: new PartyIdentificationId({
                        schemeID: '6',
                        schemeName: 'SUNAT:Identificador de Documento de Identidad',
                        schemeAgencyName: 'PE:SUNAT',
                        schemeURI: 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06',
                        Value: document.Emisor.NroDocumento,
                    }),
                }),
                PartyName: new PartyName({
                    Name: document.Emisor.NombreLegal,
                }),
            }),
            DigitalSignatureAttachment: new DigitalSignatureAttachment({
                ExternalReference:  new ExternalReference({
                    Uri: `#SignatureSP`,
                }),
            }),
        });
        creditNote.AccountingSupplierParty = new AccountingSupplierParty({
            CustomerAssignedAccountID: document.Emisor.NroDocumento,
            AdditionalAccountID: document.Emisor.TipoDocumento,
            Party: new Party({
                PartyIdentification: new PartyIdentification({
                    ID: new PartyIdentificationId({
                        schemeID: '6',
                        schemeName: 'SUNAT:Identificador de Documento de Identidad',
                        schemeAgencyName: 'PE:SUNAT',
                        schemeURI: 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06',
                        Value: document.Emisor.NroDocumento,
                    }),
                }),
                PartyName: new PartyName({
                    Name: document.Emisor.NombreComercial,
                }),
                PostalAddress: new PostalAddress({
                    ID: document.Emisor.Ubigeo,
                    StreetName: document.Emisor.Direccion,
                    CitySubdivisionName: document.Emisor.Urbanizacion,
                    CityName: document.Emisor.Provincia,
                    District: document.Emisor.Distrito,
                    Country: new Country({
                        IdentificationCode: 'PE',
                    }),
                }),
                PartyLegalEntity: new PartyLegalEntity({
                    RegistrationName: document.Emisor.NombreLegal,
                    RegistrationAddress: new RegistrationAddress({
                        AddressTypeCode: new AddressTypeCode({
                            Value: '0000',
                        }),
                    }),
                }),
            }),
        });
        creditNote.AccountingCustomerParty = new AccountingSupplierParty({
            CustomerAssignedAccountID: document.Receptor.NroDocumento,
            AdditionalAccountID: document.Receptor.TipoDocumento,
            Party: new Party({
                PartyName: new PartyName({
                    Name: document.Receptor.NombreComercial,
                }),
                PostalAddress: new PostalAddress({
                    ID: document.Receptor.Ubigeo,
                    StreetName: document.Receptor.Direccion,
                    CitySubdivisionName: document.Receptor.Urbanizacion,
                    CityName: document.Receptor.Provincia,
                    District: document.Receptor.Distrito,
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
                        Value: document.Receptor.NroDocumento,
                    }),
                }),
                PartyLegalEntity: new PartyLegalEntity({
                    RegistrationName: document.Receptor.NombreLegal,
                }),
            }),
        });
        creditNote.TaxTotals.push(new TaxTotal({
            TaxAmount: new PayableAmount({
                currencyID: document.Moneda,
                Value: 26.69,
            }),
            TaxSubtotal: new TaxSubtotal({
                TaxableAmount: new PayableAmount({
                    currencyID: document.Moneda,
                    Value: 148.31,
                }),
                TaxAmount: new PayableAmount({
                    currencyID: document.Moneda,
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
        creditNote.LegalMonetaryTotal = new LegalMonetaryTotal({
            LineExtensionAmount: new PayableAmount({
                currencyID: 'PEN',
                Value: 148.31,
            }),
            TaxInclusiveAmount: new PayableAmount({
                currencyID: document.Moneda,
                Value: 175.01,
            }),
            PayableAmount: new PayableAmount({
                currencyID: document.Moneda,
                Value: 175.01,
            }),
        });
        document.Items.forEach((detalleDocumento: DetalleDocumento) => {
            const linea = new InvoiceLine({
                ID: detalleDocumento.Id.toString(),
                CreditedQuantity: new InvoicedQuantity({
                    unitCode: detalleDocumento.UnidadMedida,
                    Value: detalleDocumento.Cantidad,
                }),
                LineExtensionAmount: new PayableAmount({
                    currencyID: document.Moneda,
                    Value: 84.75,
                }),
                PricingReference: new PricingReference({
                    AlternativeConditionPrices: [new AlternativeConditionPrice({
                        PriceAmount: new PayableAmount({
                            currencyID: document.Moneda,
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
                        currencyID: document.Moneda,
                        Value: 42.37,
                    }),
                }),
            });
            linea.TaxTotals.push(new TaxTotal({
                TaxAmount: new PayableAmount({
                    currencyID: document.Moneda,
                    Value: 15.25,
                }),
                TaxSubtotal: new TaxSubtotal({
                    TaxableAmount: new PayableAmount({
                        currencyID: document.Moneda,
                        Value: 84.75,
                    }),
                    TaxAmount: new PayableAmount({
                        currencyID: document.Moneda,
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
            creditNote.CreditNoteLines.push(linea);
        });
        return creditNote;
    }
}
