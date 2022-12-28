import { authHandlers } from './authHandlers';
import { sampleHandlers } from './sampleHandlers';
import { userHandlers } from './userHandlers';

const handlers = [...authHandlers, ...sampleHandlers, ...userHandlers];

export default handlers;
