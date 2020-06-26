import { createCell } from '../../services/google-sheets/cell';

/** The full range of our checklist items - only 10 rows allowed. */
export const checklistRange = createCell('Checklist', 'A', 2).toRange('B', 11);
/** The full range of our key-value pairs. */
export const keyValRange = createCell('KeyVal', 'A', 1).toRange('B', 5);