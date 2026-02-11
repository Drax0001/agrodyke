export default {
    name: 'cropGuide',
    title: 'Crop Guide',
    type: 'document',
    fields: [
        {
            name: 'cropName',
            title: 'Crop Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'cropName',
            },
        },
        {
            name: 'overview',
            title: 'Overview',
            type: 'text',
        },
        {
            name: 'stages',
            title: 'Application Stages',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Stage Name', type: 'string' },
                        { name: 'instruction', title: 'Instruction', type: 'text' },
                    ],
                },
            ],
        },
        {
            name: 'language',
            title: 'Language',
            type: 'string',
            options: {
                list: [
                    { title: 'English', value: 'en' },
                    { title: 'French', value: 'fr' },
                ],
            },
        },
    ],
};
