import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(dto: CreateRoleDto) {
    return await this.roleRepository.create(dto);
  }

  async getByValue(value: string) {
    return await this.roleRepository.findOne({ where: { value } });
  }
}
