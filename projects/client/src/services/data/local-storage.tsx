import { createNamespace } from '@messman/react-common';
import { DEFINE } from '../define';

const namespace = 'of-the-day';
export const localStorage = createNamespace(namespace, DEFINE.buildVersion);