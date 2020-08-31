import { IsNotEmpty, Min } from 'class-validator';

export class CreateEmployee {
  @IsNotEmpty()
  @Min(2)
  name: string;

  @IsNotEmpty()
  dayOfBirth: string;

  @IsNotEmpty()
  department: string;
}
