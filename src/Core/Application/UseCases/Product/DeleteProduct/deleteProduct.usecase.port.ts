import { UUID } from 'crypto';

export interface IDeleteProductUseCase {
  execute(id: UUID): void;
}
