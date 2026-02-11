import { describe, it, expect } from 'vitest';
import { calculateDosage } from '../lib/dosageLogic';

describe('calculateDosage', () => {
    it('calculates correct dosage for tomato spraying on 1 hectare', () => {
        const result = calculateDosage('tomato', 1, 'hectares', 'spraying');
        expect(result).not.toBeNull();
        if (result) {
            expect(result.waterVolume).toBe(400);
            expect(result.quantity).toBeCloseTo((400 / 15) * 40);
            expect(result.frequency).toBe('Every 7 days');
        }
    });

    it('calculates correct dosage for tomato sowing for 100 plants', () => {
        const result = calculateDosage('tomato', 100, 'plants', 'sowing');
        expect(result).not.toBeNull();
        if (result) {
            expect(result.quantity).toBe(500); // 100 * 5g
            expect(result.waterVolume).toBe(0);
        }
    });

    it('returns null for unknown crop/application combination', () => {
        const result = calculateDosage('cocoa' as any, 1, 'hectares', 'sowing');
        expect(result).toBeNull();
    });
});
