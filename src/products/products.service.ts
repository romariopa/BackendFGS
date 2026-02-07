import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductQueryDto } from './dto/product-query.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: uuidv4(),
      name: "Cuenta Amiga",
      type: "ahorro",
      interestRate: 0.05,
      description: "Tu cuenta de ahorro tradicional sin cuota de manejo.",
    },
    {
      id: uuidv4(),
      name: "CDT Digital",
      type: "cdts",
      interestRate: 11.5,
      description: "Invierte seguro con tasas garantizadas desde tu celular.",
    },
    {
      id: uuidv4(),
      name: "Cuenta Pro",
      type: "corriente",
      interestRate: 0.01,
      description: "Maneja tus finanzas con chequera y sobregiro.",
    },
    {
      id: uuidv4(),
      name: "Ahorro Programado",
      type: "inversion",
      interestRate: 8.0,
      description: "Alcanza tu meta de vivienda con aportes mensuales.",
    },
    {
      id: uuidv4(),
      name: "Cuenta Joven",
      type: "ahorro",
      interestRate: 2.5,
      description: "Beneficios exclusivos para menores de 25 años.",
    },
  ];

  findAll(query: ProductQueryDto): Product[] {
    let filtered = this.products;

    if (query.name) {
      const nameFilter = query.name.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(nameFilter));
    }

    if (query.type) {
        const typeFilter = query.type.toLowerCase();
        filtered = filtered.filter(p => p.type.toLowerCase() === typeFilter);
    }

    return filtered;
  }
}
