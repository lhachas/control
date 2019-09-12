import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

// tslint:disable-next-line: variable-name
export const ControlPassport = [
    JwtStrategy,
    LocalStrategy,
];
