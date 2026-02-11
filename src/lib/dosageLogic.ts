export const dosageRules = {
    tomato: {
        spraying: {
            gramsPer15L: 40,
            litersPerHectare: 400,
            intervalDays: 7,
            description: "Apply every 7 days from seedlings to harvest."
        },
        sowing: {
            gramsPerPlant: 5,
            frequency: "Once at sowing",
            description: "Mix with soil during planting."
        }
    },
    cocoa: {
        spraying: {
            gramsPer15L: 60,
            litersPerHectare: 600,
            intervalDays: 30,
            description: "Apply monthly to foliage and pods."
        }
    },
    // Add more crops as per Agrodyke guide
};

export type CropType = keyof typeof dosageRules;

export function calculateDosage(
    crop: CropType,
    farmSize: number,
    sizeUnit: 'hectares' | 'plants',
    applicationType: 'spraying' | 'sowing'
) {
    const rule = (dosageRules as any)[crop]?.[applicationType];

    if (!rule) return null;

    let quantity = 0;
    let waterVolume = 0;

    if (applicationType === 'spraying') {
        if (sizeUnit === 'hectares') {
            waterVolume = farmSize * rule.litersPerHectare;
            quantity = (waterVolume / 15) * rule.gramsPer15L;
        } else {
            // Per plant spraying logic (approximation)
            quantity = (farmSize * 2) / 1000; // 2g per plant example
            waterVolume = (farmSize * 0.5); // 0.5L per plant example
        }
    } else if (applicationType === 'sowing') {
        if (sizeUnit === 'plants') {
            quantity = farmSize * rule.gramsPerPlant;
        } else {
            // Per hectare sowing logic (approximation)
            quantity = farmSize * 5000; // 5kg per hectare example
        }
    }

    return {
        quantity,
        waterVolume,
        frequency: rule.intervalDays ? `Every ${rule.intervalDays} days` : rule.frequency,
        description: rule.description,
        estimatedCost: Math.ceil(quantity / 500) * 2500 // 2500 XAF per 500g example
    };
}
