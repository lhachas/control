import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        if(!value) {
            throw new BadRequestException('No se han enviado datos');
        }

        const { metatype } = metadata;
        if(!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if(errors.length > 0) {
            throw new HttpException({
                message: 'La validación de los datos de entrada falló',
                errors:  this.buildError(errors),
            }, HttpStatus.BAD_REQUEST);
        }
        return value;
    }

    private buildError(errors) {
        const result = {};
        errors.forEach(el => {
            const prop = el.property;
            Object.entries(el.constraints).forEach(constraint => {
                result[prop + constraint[0]] = `${constraint[1]}`;
            });
        });
        return result;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}
