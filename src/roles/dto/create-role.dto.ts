import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Unique role name' })
  readonly value: string;

  @ApiProperty({
    example: 'Description of role',
    description: 'Description of role',
  })
  readonly description: string;
}
