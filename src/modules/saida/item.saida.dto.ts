import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ItemSaidaDto {
  @ApiProperty({ description: 'ID do Produto', example: 5 })
  @IsNotEmpty({ message: 'O campo id_produto é obrigatório' })
  @IsNumber()
  id_produto: number;

  @ApiProperty({
    description: 'Quantidade do mesmo produto',
    example: '5',
  })
  @IsNotEmpty({ message: 'O campo quantidade é obrigatório' })
  @IsString()
  quantidade: number;
}
