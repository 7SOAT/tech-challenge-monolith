import ProductCategory from "@enums/product-category.enum";
import ProductModel from "@entities/product.model";
import ProductEntity from "infrastructure/entities/product.entity";

const ProductMockList: ProductModel[] = [
    new ProductModel("x-salada", "Pão crocante, alface, tomate, queijo e maionese da casa.", 25.5, ProductCategory.Burger, '00000000-0000-0000-0000-000000000001'),
    new ProductModel("Coca-Cola", "Lata de Coca-Cola (350ml)", 5, ProductCategory.Beverage, '00000000-0000-0000-0000-000000000002'),
    new ProductModel("Batata Frita", "Porção de Batata Frita (300g)", 15, ProductCategory.Side, '00000000-0000-0000-0000-000000000003'),
    new ProductModel("Petit Gateau", "Pequeno bolo de chocolate com casca e recheio cremoso acompanhado de sorvete", 45, ProductCategory.Dessert, '00000000-0000-0000-0000-000000000004')
]

const ProductsMock: ProductEntity[] = ProductMockList.map(item => new ProductEntity(item))

export default ProductsMock;