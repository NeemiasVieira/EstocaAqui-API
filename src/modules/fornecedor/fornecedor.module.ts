import { Module } from '@nestjs/common';
import { CreateFornecedorController } from './use-cases/create-fornecedor/create-fornecedor.controller';
import { CreateFornecedorService } from './use-cases/create-fornecedor/create-fornecedor.service';
import { GetFornecedorService } from './use-cases/get-fornecedor/get-fornecedor.service';
import { GetFornecedorController } from './use-cases/get-fornecedor/get-fornecedor.controller';
import { UpdateFornecedorController } from './use-cases/update-fornecedor/update-fornecedor.controller';
import { UpdateFornecedorService } from './use-cases/update-fornecedor/update-fornecedor.service';
import { DeleteFornecedorController } from './use-cases/delete-fornecedor/delete-fornecedor.controller';
import { DeleteFornecedorService } from './use-cases/delete-fornecedor/delete-fornecedor.service';

@Module({
  controllers: [CreateFornecedorController, GetFornecedorController, UpdateFornecedorController, DeleteFornecedorController],
  providers: [CreateFornecedorService, GetFornecedorService, UpdateFornecedorService, DeleteFornecedorService]
})
export class FornecedorModule {}
