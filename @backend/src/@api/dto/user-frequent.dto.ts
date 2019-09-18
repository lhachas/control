import { IsNotEmpty, IsNumber, IsJSON } from 'class-validator';

export class UserFrequentDto {
    @IsNumber()
    @IsNotEmpty()
    public readonly id: number;

    @IsJSON()
    public readonly frequent: { contacts: string[] };
}
