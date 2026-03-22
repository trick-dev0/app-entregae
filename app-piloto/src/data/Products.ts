// src/data/products.ts

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: any; // imagem opcional
}

export interface Category {
    id: number;
    name: string;
    products: Product[];
}

export interface StoreProducts {
    storeId: number;
    storeName: string;
    categories: Category[];
}

// Dados de produtos por loja
export const productsByStore: StoreProducts[] = [
    {
        storeId: 1,
        storeName: 'Burger House',
        categories: [
            {
                id: 1,
                name: 'Hambúrgueres',
                products: [
                    {
                        id: 1,
                        name: 'X-Burger',
                        description: 'Pão, hambúrguer 150g, queijo mussarela, alface, tomate e molho especial',
                        price: 25.90,
                        category: 'Hambúrgueres'
                    },
                    {
                        id: 2,
                        name: 'X-Salada',
                        description: 'Pão, hambúrguer 150g, queijo mussarela, alface, tomate, milho e molho especial',
                        price: 28.90,
                        category: 'Hambúrgueres'
                    },
                    {
                        id: 3,
                        name: 'X-Bacon',
                        description: 'Pão, hambúrguer 150g, queijo mussarela, bacon crocante, alface, tomate e molho especial',
                        price: 32.90,
                        category: 'Hambúrgueres'
                    },
                    {
                        id: 4,
                        name: 'X-Tudo',
                        description: 'Pão, hambúrguer 150g, queijo, presunto, ovo, bacon, alface, tomate e molho especial',
                        price: 38.90,
                        category: 'Hambúrgueres'
                    },
                    {
                        id: 5,
                        name: 'Burger Vegano',
                        description: 'Pão integral, hambúrguer de grão-de-bico, queijo vegano, alface, tomate e molho de ervas',
                        price: 29.90,
                        category: 'Hambúrgueres'
                    }
                ]
            },
            {
                id: 2,
                name: 'Porções',
                products: [
                    {
                        id: 6,
                        name: 'Batata Frita',
                        description: 'Porção de batata frita crocante com sal',
                        price: 15.90,
                        category: 'Porções'
                    },
                    {
                        id: 7,
                        name: 'Batata com Cheddar e Bacon',
                        description: 'Batata frita coberta com cheddar cremoso e bacon crocante',
                        price: 22.90,
                        category: 'Porções'
                    },
                    {
                        id: 8,
                        name: 'Anéis de Cebola',
                        description: 'Porção de anéis de cebola empanados e crocantes',
                        price: 18.90,
                        category: 'Porções'
                    },
                    {
                        id: 9,
                        name: 'Chicken Wings',
                        description: '6 asinhas de frango empanadas com molho barbecue',
                        price: 24.90,
                        category: 'Porções'
                    }
                ]
            },
            {
                id: 3,
                name: 'Bebidas',
                products: [
                    {
                        id: 10,
                        name: 'Refrigerante Lata',
                        description: 'Coca-Cola, Guaraná, Fanta ou Sprite - 350ml',
                        price: 6.90,
                        category: 'Bebidas'
                    },
                    {
                        id: 11,
                        name: 'Refrigerante 600ml',
                        description: 'Coca-Cola, Guaraná ou Fanta - 600ml',
                        price: 8.90,
                        category: 'Bebidas'
                    },
                    {
                        id: 12,
                        name: 'Suco Natural',
                        description: 'Laranja, limão, maracujá ou abacaxi - 500ml',
                        price: 9.90,
                        category: 'Bebidas'
                    },
                    {
                        id: 13,
                        name: 'Água Mineral',
                        description: 'Água sem gás - 500ml',
                        price: 4.90,
                        category: 'Bebidas'
                    }
                ]
            },
            {
                id: 4,
                name: 'Sobremesas',
                products: [
                    {
                        id: 14,
                        name: 'Milkshake',
                        description: 'Sabores: chocolate, morango ou baunilha - 500ml',
                        price: 14.90,
                        category: 'Sobremesas'
                    },
                    {
                        id: 15,
                        name: 'Brownie com Sorvete',
                        description: 'Brownie de chocolate com bola de sorvete de creme',
                        price: 16.90,
                        category: 'Sobremesas'
                    },
                    {
                        id: 16,
                        name: 'Petit Gateau',
                        description: 'Bolo de chocolate com recheio cremoso, servido com sorvete',
                        price: 18.90,
                        category: 'Sobremesas'
                    }
                ]
            }
        ]
    },
    {
        storeId: 2,
        storeName: 'Pastelaria do Jacó',
        categories: [
            {
                id: 1,
                name: 'Pastéis Salgados',
                products: [
                    {
                        id: 17,
                        name: 'Pastel de Carne',
                        description: 'Massa crocante recheada com carne moída temperada',
                        price: 8.90,
                        category: 'Pastéis Salgados'
                    },
                    {
                        id: 18,
                        name: 'Pastel de Queijo',
                        description: 'Massa crocante recheada com queijo mussarela derretido',
                        price: 8.90,
                        category: 'Pastéis Salgados'
                    },
                    {
                        id: 19,
                        name: 'Pastel de Frango com Catupiry',
                        description: 'Massa crocante recheada com frango desfiado e catupiry',
                        price: 10.90,
                        category: 'Pastéis Salgados'
                    },
                    {
                        id: 20,
                        name: 'Pastel de Pizza',
                        description: 'Massa crocante recheada com molho, queijo, presunto e orégano',
                        price: 10.90,
                        category: 'Pastéis Salgados'
                    }
                ]
            },
            {
                id: 2,
                name: 'Pastéis Doces',
                products: [
                    {
                        id: 21,
                        name: 'Pastel de Chocolate',
                        description: 'Massa crocante recheada com chocolate ao leite',
                        price: 7.90,
                        category: 'Pastéis Doces'
                    },
                    {
                        id: 22,
                        name: 'Pastel de Doce de Leite',
                        description: 'Massa crocante recheada com doce de leite cremoso',
                        price: 7.90,
                        category: 'Pastéis Doces'
                    },
                    {
                        id: 23,
                        name: 'Pastel de Banana com Canela',
                        description: 'Massa crocante recheada com banana e canela',
                        price: 8.90,
                        category: 'Pastéis Doces'
                    }
                ]
            },
            {
                id: 3,
                name: 'Calzones',
                products: [
                    {
                        id: 24,
                        name: 'Calzone de Calabresa',
                        description: 'Massa recheada com calabresa, queijo e cebola',
                        price: 18.90,
                        category: 'Calzones'
                    },
                    {
                        id: 25,
                        name: 'Calzone de Frango com Catupiry',
                        description: 'Massa recheada com frango desfiado, catupiry e milho',
                        price: 19.90,
                        category: 'Calzones'
                    }
                ]
            },
            {
                id: 4,
                name: 'Bebidas',
                products: [
                    {
                        id: 26,
                        name: 'Suco de Laranja',
                        description: 'Suco natural de laranja - 500ml',
                        price: 7.90,
                        category: 'Bebidas'
                    },
                    {
                        id: 27,
                        name: 'Caldo de Cana',
                        description: 'Caldo de cana natural com limão',
                        price: 6.90,
                        category: 'Bebidas'
                    },
                    {
                        id: 28,
                        name: 'Refrigerante Lata',
                        description: 'Coca-Cola, Guaraná ou Fanta - 350ml',
                        price: 6.90,
                        category: 'Bebidas'
                    }
                ]
            }
        ]
    },
    {
        storeId: 4,
        storeName: 'Delicia de salgados',
        categories: [
            {
                id: 1,
                name: 'Salgados Assados',
                products: [
                    {
                        id: 29,
                        name: 'Coxinha',
                        description: 'Coxinha de frango com catupiry',
                        price: 5.90,
                        category: 'Salgados Assados'
                    },
                    {
                        id: 30,
                        name: 'Risole de Queijo',
                        description: 'Risole de queijo mussarela',
                        price: 5.90,
                        category: 'Salgados Assados'
                    },
                    {
                        id: 31,
                        name: 'Esfirra de Carne',
                        description: 'Esfirra aberta com carne moída temperada',
                        price: 6.90,
                        category: 'Salgados Assados'
                    },
                    {
                        id: 32,
                        name: 'Empada de Frango',
                        description: 'Empada de frango com cream cheese',
                        price: 6.90,
                        category: 'Salgados Assados'
                    }
                ]
            },
            {
                id: 2,
                name: 'Salgados Fritos',
                products: [
                    {
                        id: 33,
                        name: 'Kibe',
                        description: 'Kibe frito recheado com queijo',
                        price: 6.90,
                        category: 'Salgados Fritos'
                    },
                    {
                        id: 34,
                        name: 'Bolinha de Queijo',
                        description: 'Bolinhas de queijo fritas',
                        price: 5.90,
                        category: 'Salgados Fritos'
                    },
                    {
                        id: 35,
                        name: 'Pastelzinho de Camarão',
                        description: 'Mini pastel recheado com camarão e catupiry',
                        price: 8.90,
                        category: 'Salgados Fritos'
                    },
                    {
                        id: 100,
                        name: 'Centro de Salgados',
                        description: 'Mini salgados: coxinha, pastel, enroladinho, bolinhad e queijo',
                        price: 49.90,
                        category: 'Salgados Fritos'
                    }
                ]
            },
            {
                id: 3,
                name: 'Pizzas',
                products: [
                    {
                        id: 36,
                        name: 'Pizza Margherita',
                        description: 'Molho, mussarela, tomate e manjericão',
                        price: 35.90,
                        category: 'Pizzas'
                    },
                    {
                        id: 37,
                        name: 'Pizza Calabresa',
                        description: 'Molho, mussarela, calabresa e cebola',
                        price: 38.90,
                        category: 'Pizzas'
                    },
                    {
                        id: 38,
                        name: 'Pizza Portuguesa',
                        description: 'Molho, mussarela, presunto, ovo, cebola e azeitona',
                        price: 42.90,
                        category: 'Pizzas'
                    }
                ]
            },
            {
                id: 4,
                name: 'Bebidas',
                products: [
                    {
                        id: 39,
                        name: 'Refrigerante 2L',
                        description: 'Coca-Cola, Guaraná ou Fanta - 2 litros',
                        price: 12.90,
                        category: 'Bebidas'
                    },
                    {
                        id: 40,
                        name: 'Suco de Polpa',
                        description: 'Sabores: maracujá, manga ou caju - 500ml',
                        price: 8.90,
                        category: 'Bebidas'
                    }
                ]
            }
        ]
    }
];

// Função auxiliar para buscar produtos de uma loja específica
export const getProductsByStoreId = (storeId: number): StoreProducts | undefined => {
    return productsByStore.find(store => store.storeId === storeId);
};

// Função auxiliar para buscar um produto específico
export const getProductById = (storeId: number, productId: number): Product | undefined => {
    const store = getProductsByStoreId(storeId);
    if (!store) return undefined;

    for (const category of store.categories) {
        const product = category.products.find(p => p.id === productId);
        if (product) return product;
    }
    return undefined;
};