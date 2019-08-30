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
import { IEstructuraXml, IDocumentoXml } from '@fe/common/interfaces';
import { CreditNote } from '@fe/standard';

export class NotaCredito implements IDocumentoXml {
    public Generar(documento: DocumentoElectronico): IEstructuraXml {
        const creditNote = new CreditNote();
        creditNote.UBLVersionID = '2.1';
        creditNote.CustomizationID = '2.0';
        creditNote.ID = 'F001-00000025';
        creditNote.IssueDate = '2019-07-07';
        creditNote.DocumentCurrencyCode = documento.Moneda;
        creditNote.UBLExtensions = new UblExtensions();
        documento.Discrepancias.forEach((discrepancia: Discrepancia) => {
            creditNote.DiscrepancyResponses.push(new DiscrepancyResponse({
                ReferenceID: discrepancia.NroReferencia,
                ResponseCode: discrepancia.Tipo,
                Description: discrepancia.Descripcion,
            }));
        });
        documento.Relacionados.forEach((relacionado: DocumentoRelacionado) => {
            creditNote.BillingReferences.push(new BillingReference(new InvoiceDocumentReference({
                ID: relacionado.NroDocumento,
                DocumentTypeCode: new DocumentTypeCode({
                    Value: relacionado.TipoDocumento,
                }),
            })));
        });
        // documento.OtrosDocumentosRelacionados.forEach((relacionado: DocumentoRelacionado) => {
        //     creditNote.AdditionalDocumentReferences.push(new InvoiceDocumentReference({
        //         ID: relacionado.NroDocumento,
        //         DocumentTypeCode: relacionado.TipoDocumento,
        //     }));
        // });
        creditNote.Signature = new SignatureCac({
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
        creditNote.AccountingSupplierParty = new AccountingSupplierParty({
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
                        AddressTypeCode: new AddressTypeCode({
                            Value: '0000',
                        }),
                    }),
                }),
            }),
        });
        creditNote.AccountingCustomerParty = new AccountingSupplierParty({
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
        creditNote.TaxTotals.push(new TaxTotal({
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
        creditNote.LegalMonetaryTotal = new LegalMonetaryTotal({
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
                CreditedQuantity: new InvoicedQuantity({
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
            creditNote.CreditNoteLines.push(linea);
        });       
        return creditNote;
    }   
}
