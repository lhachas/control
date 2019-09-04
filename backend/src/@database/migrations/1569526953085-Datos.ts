import {MigrationInterface, QueryRunner} from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UbigeoModel } from '@control/api/models/ubigeo.model';
import { TipoDocumentoModel } from '@control/api/models/tipo-documento.model';
import { TipoComprobanteModel } from '@control/api/models/tipo-comprobante.model';
import { MonedaModel } from '@control/api/models/moneda.model';
import { MedioPagoModel } from '@control/api/models/medio-pago.model';
import { TipoAfectacionIGVModel } from '@control/api/models/tipo-afectacion-igv.model';
import { TipoNotaCreditoModel } from '@control/api/models/tipo-nota-credito.model';
import { TipoNotaDebitoModel } from '@control/api/models/tipo-nota-debito.model';
import { TipoPrecioModel } from '@control/api/models/tipo-precio.model';
import { TipoOperacionModel } from '@control/api/models/tipo-operacion.model';
import { UnidadMedidaModel } from '@control/api/models/unidad-medida.model';
import { ContactoModel } from '@control/api/models/contacto.model';
import { PerfilModel } from '@control/api/models/perfil.model';
import { EmpresaModel } from '@control/api/models/empresa.model';
import { PersonalModel } from '@control/api/models/personal.model';
import { UsuarioModel } from '@control/api/models/usuario.model';
import * as Ubigeos from '@control/db/data/ubigeo.json';
import * as TipoDocumentos from '@control/db/data/tipo-documento.json';
import * as TipoComprobante from '@control/db/data/tipo-comprobante.json';
import * as Moneda from '@control/db/data/moneda.json';
import * as MedioPago from '@control/db/data/medio-pago.json';
import * as TipoAfectacionIGV from '@control/db/data/tipo-afectacion-igv.json';
import * as TipoNotaCredito from '@control/db/data/tipo-nota-credito.json';
import * as TipoNotaDebito from '@control/db/data/tipo-nota-debito.json';
import * as TipoPrecio from '@control/db/data/tipo-nota-debito.json';
import * as TipoOperacion from '@control/db/data/tipo-operacion.json';
import * as UnidadMedida from '@control/db/data/unidad-medida.json';
import * as Contacto from '@control/db/data/contacto.json';
import * as Perfil from '@control/db/data/perfil.json';
import * as Empresa from '@control/db/data/empresa.json';
import * as Personal from '@control/db/data/personal.json';
import * as Usuario from '@control/db/data/usuario.json';

export class Datos1569526953085 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const [ { ubigeo, departamento, provincia, distrito, codigoPais } ] = Ubigeos;
        /**
         * @Datos
         * [Ubigeo]
         */
        const ctUbigeo = await queryRunner.manager
                            .getRepository<UbigeoModel>(UbigeoModel)
                            .save(plainToClass(UbigeoModel, Ubigeos));

        /**
         * @Datos
         * [TipoDocumento]
         */
        const ctTipoDocumento = await queryRunner.manager
                                    .getRepository<TipoDocumentoModel>(TipoDocumentoModel)
                                    .save(plainToClass(TipoDocumentoModel, TipoDocumentos));

        /**
         * @Datos
         * [TipoComprobante]
         */
        const ctTipoComprobante = await queryRunner.manager
                                    .getRepository<TipoComprobanteModel>(TipoComprobanteModel)
                                    .save(plainToClass(TipoComprobanteModel, TipoComprobante));

        /**
         * @Datos
         * [Moneda]
         */
        const ctMoneda = await queryRunner.manager
                            .getRepository<MonedaModel>(MonedaModel)
                            .save(plainToClass(MonedaModel, Moneda));

        /**
         * @Datos
         * [MedioPago]
         */
        const ctMedioPago = await queryRunner.manager
                                .getRepository<MedioPagoModel>(MedioPagoModel)
                                .save(plainToClass(MedioPagoModel, MedioPago));

        /**
         * @Datos
         * [TipoAfectacionIGV]
         */
        const ctTipoAfectacionIGV = await queryRunner.manager
                                        .getRepository<TipoAfectacionIGVModel>(TipoAfectacionIGVModel)
                                        .save(plainToClass(TipoAfectacionIGVModel, TipoAfectacionIGV));

        /**
         * @Datos
         * [TipoNotaCredito]
         */
        const ctTipoNotaCredito = await queryRunner.manager
                                    .getRepository<TipoNotaCreditoModel>(TipoNotaCreditoModel)
                                    .save(plainToClass(TipoNotaCreditoModel, TipoNotaCredito));

        /**
         * @Datos
         * [TipoNotaDebido]
         */
        const ctTipoNotaDebito = await queryRunner.manager
                                    .getRepository<TipoNotaDebitoModel>(TipoNotaDebitoModel)
                                    .save(plainToClass(TipoNotaDebitoModel, TipoNotaDebito));

        /**
         * @Datos
         * [TipoPrecio]
         */
        const ctTipoPrecio = await queryRunner.manager
                                .getRepository<TipoPrecioModel>(TipoPrecioModel)
                                .save(plainToClass(TipoPrecioModel, TipoPrecio));

        /**
         * @Datos
         * [TipoOperacion]
         */
        const ctTipoOperacion = await queryRunner.manager
                                    .getRepository<TipoOperacionModel>(TipoOperacionModel)
                                    .save(plainToClass(TipoOperacionModel, TipoOperacion));

        /**
         * @Datos
         * [UnidadMedida]
         */
        const ctUnidadMedida = await queryRunner.manager
                                        .getRepository<UnidadMedidaModel>(UnidadMedidaModel)
                                        .save(plainToClass(UnidadMedidaModel, UnidadMedida));

        /**
         * @Datos
         * [Contacto]
         */
        const ctContacto = await queryRunner.manager
                                    .getRepository<ContactoModel>(ContactoModel)
                                    .save(plainToClass(ContactoModel, Contacto));

        /**
         * @Datos
         * [Perfil]
         */
        const ctPerfil = await queryRunner.manager
                                    .getRepository<PerfilModel>(PerfilModel)
                                    .save(plainToClass(PerfilModel, Perfil));

        /**
         * @Datos
         * [Empresa]
         */
        const ctEmpresa = await queryRunner.manager
                                    .getRepository<EmpresaModel>(EmpresaModel)
                                    .save(plainToClass(EmpresaModel, Empresa));

        /**
         * @Datos
         * [Personal]
         */
        const ctPersonal = await queryRunner.manager
                                    .getRepository<PersonalModel>(PersonalModel)
                                    .save(plainToClass(PersonalModel, Personal));

        /**
         * @Datos
         * [Usuario]
         */
        const ctUsuario = await queryRunner.manager
                                    .getRepository<UsuarioModel>(UsuarioModel)
                                    .save(plainToClass(UsuarioModel, Usuario));
    }

    // tslint:disable-next-line: no-empty
    public async down(queryRunner: QueryRunner): Promise<any> {}

}
