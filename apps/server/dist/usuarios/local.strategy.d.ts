import { UsuariosService } from './usuarios.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private usuariosService;
    constructor(usuariosService: UsuariosService);
    validate(email: string, clave: string): Promise<any>;
}
export {};
