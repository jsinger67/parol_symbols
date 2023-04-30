export interface Symbol {
    my_id: number,
    name_id: number[],
}

export interface Scope {
    parent: number | null,
    my_id: number,
    symbols: number[],
    names: string[],
}

export interface SymbolTable {
    symbols: Symbol[],
    scopes: Scope[],
}

export interface SymbolTableParams {
    symbolTable: SymbolTable,
    setActiveElement: React.Dispatch<React.SetStateAction<JSX.Element>>,
}

export const EmptySymbolTable: SymbolTable = {
    symbols: [],
    scopes: [],
};