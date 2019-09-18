import { IsNotEmpty, IsNumber, IsJSON } from 'class-validator';

export class UserStarredDto {
    @IsNumber()
    @IsNotEmpty()
    public readonly id: number;

    @IsJSON()
    public readonly starred: { contacts: string[] };
}
