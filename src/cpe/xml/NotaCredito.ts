import { xml } from 'xml-serializer-ts';
import * as fs from 'fs';
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
} from '@estructuras';
import { 
    DocumentoRelacionado,
    DocumentoElectronico, 
    Discrepancia, 
    DetalleDocumento,
    IEstructuraXml, 
    IDocumentoXml,
} from '@comun';
import { CreditNote } from '@estandarUBL';

export class NotaCredito implements IDocumentoXml {
    public Generar(documento: DocumentoElectronico): IEstructuraXml {
        const creditNote = new CreditNote();
        creditNote.UBLVersionID = '2.1';
        creditNote.CustomizationID = '2.0';
        creditNote.ID = 'F001-1';
        creditNote.IssueDate = '2019-07-05';
        creditNote.DocumentCurrencyCode = documento.Moneda;
        creditNote.UBLExtensions = new UblExtensions();
        documento.Discrepancias.forEach((discrepancia: Discrepancia) => {
            creditNote.DiscrepancyResponses.push(new DiscrepancyResponse({
                ReferenceID: 'FC01-4355',
                ResponseCode: '07',
                Description: discrepancia.Descripcion,
            }));
        });
        documento.Relacionados.forEach((relacionado: DocumentoRelacionado) => {
            creditNote.BillingReferences.push(new BillingReference(new InvoiceDocumentReference({
                ID: relacionado.NroDocumento,
                DocumentTypeCode: relacionado.TipoDocumento,
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
                        AddressTypeCode: '0000',
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
                Value: 9.92,
            }),
            TaxSubtotal: new TaxSubtotal({
                TaxableAmount: new PayableAmount({
                    currencyID: documento.Moneda,
                    Value: 55.01,
                }),
                TaxAmount: new PayableAmount({
                    currencyID: documento.Moneda,
                    Value: 9.92,
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
                Value: 55.01,
            }),
            TaxInclusiveAmount: new PayableAmount({
                currencyID: documento.Moneda,
                Value: 65.01,
            }),
            PayableAmount: new PayableAmount({
                currencyID: documento.Moneda,
                Value: 65.01,
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
                    Value: 16.95,
                }),
                PricingReference: new PricingReference({
                    AlternativeConditionPrices: [new AlternativeConditionPrice({
                        PriceAmount: new PayableAmount({
                            currencyID: documento.Moneda,
                            Value: 20.01,
                        }),
                        PriceTypeCode: detalleDocumento.TipoPrecio,
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
                        Value: 16.95,
                    }),
                }),
            });
            linea.TaxTotals.push(new TaxTotal({
                TaxAmount: new PayableAmount({
                    currencyID: documento.Moneda,
                    Value: 3.05,
                }),
                TaxSubtotal: new TaxSubtotal({
                    TaxableAmount: new PayableAmount({
                        currencyID: documento.Moneda,
                        Value: 16.95,
                    }),
                    TaxAmount: new PayableAmount({
                        currencyID: documento.Moneda,
                        Value: 3.05,
                    }),
                    TaxCategory: new TaxCategory({
                        Percent: '18.00',
                        TaxExemptionReasonCode: detalleDocumento.TipoImpuesto,
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
        const serializado = xml.serialize(creditNote);
        fs.writeFile('./leo.xml', serializado, error => {
            if (!error) {
                console.log(error);
            }
        });
        return creditNote;
    }   
}
