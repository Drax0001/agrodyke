export const products = [
    {
        id: 'agrodyke-organic-1kg',
        name: 'Agrodyke Organic Fertilizer',
        slug: 'agrodyke-organic-fertilizer',
        description: 'High-quality organic fertilizer for all crop types.',
        price: 5000,
        sizes: ['1kg', '5kg', '25kg'],
        image: '/images/product-placeholder.jpg',
        crops: ['Tomato', 'Cocoa', 'Maize'],
        category: 'Organic Fertilizer'
    },
    {
        id: 'agrodyke-soil-booster',
        name: 'Agrodyke Soil Booster',
        slug: 'agrodyke-soil-booster',
        description: 'Enhances soil fertility and root development.',
        price: 3500,
        sizes: ['500g', '1kg'],
        image: '/images/product-placeholder.jpg',
        crops: ['Rice', 'Palm Oil'],
        category: 'Soil Enhancer'
    }
];

export const cropGuides = [
    {
        id: 'tomato-guide',
        crop: 'Tomato',
        slug: 'tomato',
        overview: 'Tomatoes require consistent nutrient supply and protection from fungal diseases.',
        stages: [
            {
                name: 'Pre-Planting',
                instruction: 'Mix Agrodyke Soil Booster with nursery soil (10g per tray).'
            },
            {
                name: 'Post-Planting',
                instruction: 'Spray Agrodyke Organic every 7 days (40g/15L).'
            }
        ]
    },
    {
        id: 'cocoa-guide',
        crop: 'Cocoa',
        slug: 'cocoa',
        overview: 'Cocoa yield can be doubled with proper pruning and Agrodyke application.',
        stages: [
            {
                name: 'Foliar Spraying',
                instruction: 'Spray pods and leaves every 30 days.'
            }
        ]
    }
];
