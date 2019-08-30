import {MigrationInterface, QueryRunner} from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UbigeoEntity } from '@control/db/entities/ubigeo.entity';
import { TipoDocumentoEntity } from '@control/db/entities/tipo-documento.entity';
import { TipoComprobanteEntity } from '@control/db/entities/tipo-comprobante.entity';
import { MonedaEntity } from '@control/db/entities/moneda.entity';
import { MedioPagoEntity } from '@control/db/entities/medio-pago.entity';
import { TipoAfectacionIGVEntity } from '@control/db/entities/tipo-afectacion-igv.entity';
import { TipoNotaCreditoEntity } from '@control/db/entities/tipo-nota-credito.entity';
import { TipoNotaDebitoEntity } from '@control/db/entities/tipo-nota-debito.entity';
import { TipoPrecioEntity } from '@control/db/entities/tipo-precio.entity';
import { TipoOperacionEntity } from '@control/db/entities/tipo-operacion.entity';
import { UnidadMedidaEntity } from '@control/db/entities/unidad-medida.entity';
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

export class Datos1564526953085 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const [ { ubigeo, departamento, provincia, distrito, codigoPais } ] = Ubigeos;
        /**
         * @Datos
         * [Ubigeo]
         */
        const ctUbigeo = await queryRunner.manager
                            .getRepository<UbigeoEntity>(UbigeoEntity)
                            .save(plainToClass(UbigeoEntity, Ubigeos));

        /**
         * @Datos
         * [TipoDocumento]
         */
        const ctTipoDocumento = await queryRunner.manager
                                    .getRepository<TipoDocumentoEntity>(TipoDocumentoEntity)
                                    .save(plainToClass(TipoDocumentoEntity, TipoDocumentos));

        /**
         * @Datos
         * [TipoComprobante]
         */
        const ctTipoComprobante = await queryRunner.manager
                                    .getRepository<TipoComprobanteEntity>(TipoComprobanteEntity)
                                    .save(plainToClass(TipoComprobanteEntity, TipoComprobante));

        /**
         * @Datos
         * [Moneda]
         */
        const ctMoneda = await queryRunner.manager
                            .getRepository<MonedaEntity>(MonedaEntity)
                            .save(plainToClass(MonedaEntity, Moneda));

        /**
         * @Datos
         * [MedioPago]
         */
        const ctMedioPago = await queryRunner.manager
                                .getRepository<MedioPagoEntity>(MedioPagoEntity)
                                .save(plainToClass(MedioPagoEntity, MedioPago));

        /**
         * @Datos
         * [TipoAfectacionIGV]
         */
        const ctTipoAfectacionIGV = await queryRunner.manager
                                        .getRepository<TipoAfectacionIGVEntity>(TipoAfectacionIGVEntity)
                                        .save(plainToClass(TipoAfectacionIGVEntity, TipoAfectacionIGV));

        /**
         * @Datos
         * [TipoNotaCredito]
         */
        const ctTipoNotaCredito = await queryRunner.manager
                                    .getRepository<TipoNotaCreditoEntity>(TipoNotaCreditoEntity)
                                    .save(plainToClass(TipoNotaCreditoEntity, TipoNotaCredito));

        /**
         * @Datos
         * [TipoNotaDebido]
         */
        const ctTipoNotaDebito = await queryRunner.manager
                                    .getRepository<TipoNotaDebitoEntity>(TipoNotaDebitoEntity)
                                    .save(plainToClass(TipoNotaDebitoEntity, TipoNotaDebito));

        /**
         * @Datos
         * [TipoPrecio]
         */
        const ctTipoPrecio = await queryRunner.manager
                                .getRepository<TipoPrecioEntity>(TipoPrecioEntity)
                                .save(plainToClass(TipoPrecioEntity, TipoPrecio));

        /**
         * @Datos
         * [TipoOperacion]
         */
        const ctTipoOperacion = await queryRunner.manager
                                    .getRepository<TipoOperacionEntity>(TipoOperacionEntity)
                                    .save(plainToClass(TipoOperacionEntity, TipoOperacion));

        /**
         * @Datos
         * [UnidadMedida]
         */
        const ctUnidadMedida = await queryRunner.manager
                                        .getRepository<UnidadMedidaEntity>(UnidadMedidaEntity)
                                        .save(plainToClass(UnidadMedidaEntity, UnidadMedida));
    }

    // tslint:disable-next-line: no-empty
    public async down(queryRunner: QueryRunner): Promise<any> {}

}
