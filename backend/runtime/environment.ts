import { RuntimeValue } from "./values.ts";

export default class Environment {

    private parent?: Environment;
    private variables? : Map<string, RuntimeValue>; 

    constructor (parentEnvironment?: Environment) {
        this.parent = parentEnvironment
        this.variables = new Map()
    }

    public declareVariable (varname: string, value: RuntimeValue ): RuntimeValue {
        if (this.variables?.has(varname)) {
            throw `Cannot declare variable ${varname} as it is already defined`
        }
        this.variables?.set(varname, value);
        return value
    }

    public assignVariable (varname: string, value: RuntimeValue): RuntimeValue {
        const env = this.resolve(varname)
        env.variables?.set(varname, value);
        return value
    }

    public lookupVar (varname: string): RuntimeValue {
        const env = this.resolve(varname)
        return env.variables?.get(varname) as RuntimeValue;
    }

    public resolve(varname: string): Environment {
        if (this.variables?.has(varname)) {
            return this;
        }

        if (this.parent == undefined) {
            throw `Cannot resolve ${varname}, does not exist`;
        }

        return this.parent.resolve(varname);
    }
}