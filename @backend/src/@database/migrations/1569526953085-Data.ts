import { MigrationInterface, QueryRunner } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UbigeoModel } from '@control/api/models/ubigeo.model';
import { DocumentTypeModel } from '@control/api/models/document-type.model';
import { VoucherTypeModel } from '@control/api/models/voucher-type.model';
import { CurrencyModel } from '@control/api/models/currency.model';
import { PaymentMethodModel } from '@control/api/models/payment-method.model';
import { AffectationTypeIGVModel } from '@control/api/models/affectation-type-igv.model';
import { CreditNoteTypeModel } from '@control/api/models/credit-note-type.model';
import { DebitNoteTypeModel } from '@control/api/models/debit-note-type.model';
import { PriceTypeModel } from '@control/api/models/price-type.model';
import { OperationTypeModel } from '@control/api/models/operation-type.model';
import { UnitMeasureModel } from '@control/api/models/unit-measure.model';
import { ContactModel } from '@control/api/models/contact.model';
import { RoleModel } from '@control/api/models/role.model';
import { CompanyModel } from '@control/api/models/company.model';
import { StaffModel } from '@control/api/models/staff.model';
import { UserModel } from '@control/api/models/user.model';
import * as ubigeo from '@control/db/data/ubigeo.json';
import * as ubi from '@control/db/data/ubi.json';
import * as documentType from '@control/db/data/document-type.json';
import * as voucherType from '@control/db/data/voucher-type.json';
import * as currency from '@control/db/data/currency.json';
import * as paymentMethod from '@control/db/data/payment-method.json';
import * as affectationTypeIGV from '@control/db/data/affectation-type-igv.json';
import * as creditNoteType from '@control/db/data/credit-note-type.json';
import * as debitNoteType from '@control/db/data/debit-note-type.json';
import * as priceType from '@control/db/data/price-type.json';
import * as operationType from '@control/db/data/operation-type.json';
import * as unitMeasure from '@control/db/data/unit-measure.json';
import * as contact from '@control/db/data/contact.json';
import * as role from '@control/db/data/role.json';
import * as company from '@control/db/data/company.json';
import * as staff from '@control/db/data/staff.json';
import * as user from '@control/db/data/user.json';

export class Data1569526953085 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // tslint:disable-next-line: no-shadowed-variable
        // const [ { ubigeo, departament, province, district, countryCode } ] = ubigeo;
        /**
         * @Datos
         * [Ubigeo]
         */
        const ctUbigeo = await queryRunner.manager
                            .getRepository<UbigeoModel>(UbigeoModel)
                            .save(plainToClass(UbigeoModel, ubi));

        /**
         * @Datos
         * [TipoDocumento]
         */
        const ctdocumentType = await queryRunner.manager
                                    .getRepository<DocumentTypeModel>(DocumentTypeModel)
                                    .save(plainToClass(DocumentTypeModel, documentType));

        /**
         * @Datos
         * [TipoComprobante]
         */
        const ctVoucherType= await queryRunner.manager
                                    .getRepository<VoucherTypeModel>(VoucherTypeModel)
                                    .save(plainToClass(VoucherTypeModel, voucherType));

        /**
         * @Datos
         * [Moneda]
         */
        const ctCurrency = await queryRunner.manager
                            .getRepository<CurrencyModel>(CurrencyModel)
                            .save(plainToClass(CurrencyModel, currency));

        /**
         * @Datos
         * [MedioPago]
         */
        const ctPaymentMethod = await queryRunner.manager
                                .getRepository<PaymentMethodModel>(PaymentMethodModel)
                                .save(plainToClass(PaymentMethodModel, paymentMethod));

        /**
         * @Datos
         * [TipoAfectacionIGV]
         */
        const ctAffectationTypeIGV = await queryRunner.manager
                                        .getRepository<AffectationTypeIGVModel>(AffectationTypeIGVModel)
                                        .save(plainToClass(AffectationTypeIGVModel, affectationTypeIGV));

        /**
         * @Datos
         * [TipoNotaCredito]
         */
        const ctCreditNoteType = await queryRunner.manager
                                    .getRepository<CreditNoteTypeModel>(CreditNoteTypeModel)
                                    .save(plainToClass(CreditNoteTypeModel, creditNoteType));

        /**
         * @Datos
         * [TipoNotaDebido]
         */
        const ctDebitNoteType = await queryRunner.manager
                                    .getRepository<DebitNoteTypeModel>(DebitNoteTypeModel)
                                    .save(plainToClass(DebitNoteTypeModel, debitNoteType));

        /**
         * @Datos
         * [TipoPrecio]
         */
        const ctPriceType = await queryRunner.manager
                                .getRepository<PriceTypeModel>(PriceTypeModel)
                                .save(plainToClass(PriceTypeModel, priceType));

        /**
         * @Datos
         * [TipoOperacion]
         */
        const ctOperationType = await queryRunner.manager
                                    .getRepository<OperationTypeModel>(OperationTypeModel)
                                    .save(plainToClass(OperationTypeModel, operationType));

        /**
         * @Datos
         * [UnidadMedida]
         */
        const ctUnitMeasure= await queryRunner.manager
                                        .getRepository<UnitMeasureModel>(UnitMeasureModel)
                                        .save(plainToClass(UnitMeasureModel, unitMeasure));

        /**
         * @Datos
         * [Perfil]
         */
        const ctRole = await queryRunner.manager
                                .getRepository<RoleModel>(RoleModel)
                                .save(plainToClass(RoleModel, role));

        /**
         * @Datos
         * [Contacto]
         */
        // if (await queryRunner.manager.getRepository)
        const ctContact = await queryRunner.manager
                                    .getRepository<ContactModel>(ContactModel)
                                    .save(plainToClass(ContactModel, {
                                        businessName: 'CARLOS MENDEZ PACHECO',
                                        tradeName: 'CARLOS MENDEZ PACHECO',
                                        avatar: '',
                                        type: 'PERSONAL NATURAL',
                                        condition: 'HABIDO',
                                        documentType: ctdocumentType[0],
                                        documentNumber: '12345678912',
                                        ubigeo: ctUbigeo[0],
                                        address: 'AV. LOS NOGALES S/N.',
                                        urbanization: 'URB. LOS ROMALAES',
                                        fixedPhone: '984256352',
                                        mobilePhone: '974856245',
                                        email: 'CARLITOS_XYZ@GOOGLE.COM',
                                        observations: 'SIN OBSERVACIONES',
                                        status: 'ACTIVO',
                                    }));

        /**
         * @Datos
         * [Empresa]
         */
        const ctCompany = await queryRunner.manager
                                    .getRepository<CompanyModel>(CompanyModel)
                                    .save(plainToClass(CompanyModel, {
                                        ruc: '20553510661',
                                        businessName: 'CONTROL S.A.',
                                        tradeName: 'CONTROL S.A.',
                                        representative: 'GALINDO GAL GALINDON',
                                        ubigeo: ctUbigeo[0],
                                        arigv: 'NO',
                                        apvi: 'NO',
                                        apcl: 'NO',
                                        address: 'AV. LOS INKAS S/N',
                                        urbanization: 'URB. LOS ANGELES.',
                                        fixedPhone: '084789632',
                                        mobilePhone: '944859678',
                                        activity: 'VENTA',
                                        email: 'GALINDO_XYZ@GOO.COM',
                                        logo: '',
                                    }));

        /**
         * @Datos
         * [Personal]
         */
        const ctStaff = await queryRunner.manager
                                    .getRepository<StaffModel>(StaffModel)
                                    .save(plainToClass(StaffModel, {
                                        role: plainToClass(RoleModel, {
                                            id: 1,
                                            ...role[0],
                                        }),
                                        contact: plainToClass(ContactModel, {
                                            id: 1,
                                            ...contact[0],
                                        }),
                                        company: plainToClass(CompanyModel, {
                                            id: 1,
                                            ...company[0],
                                        }),
                                        status: 'ACTIVO',
                                    }));

        /**
         * @Datos
         * [Usuario]
         */
        const ctUser = await queryRunner.manager
                                    .getRepository<UserModel>(UserModel)
                                    .save(plainToClass(UserModel, {
                                        staff: plainToClass(StaffModel, {
                                            id: 1,
                                            ...staff[0],
                                        }),
                                        username: 'administrador',
                                        password: '123456admin',
                                        token: '',
                                        settings: '',
                                        shorcuts: '',
                                        starred: '',
                                        frequent: '',
                                        status: 'ACTIVO',
                                    }));

    }

    // tslint:disable-next-line: no-empty
    public async down(queryRunner: QueryRunner): Promise<any> {}

}
