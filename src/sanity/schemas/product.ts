export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'sizes',
            title: 'Sizes',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
        },
        {
            name: 'crops',
            title: 'Supported Crops',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'language',
            title: 'Language',
            type: 'string',
            initialValue: 'en',
            options: {
                list: [
                    { title: 'English', value: 'en' },
                    { title: 'French', value: 'fr' },
                ],
            },
        },
    ],
};
