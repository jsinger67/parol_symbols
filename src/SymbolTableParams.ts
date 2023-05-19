import { SymbolTable } from "./bindings/SymbolTable";

export interface SymbolTableParams {
    symbolTable: SymbolTable,
    setActiveElement: React.Dispatch<React.SetStateAction<JSX.Element>>,
    activeListElement: number,
    setActiveListElement: React.Dispatch<React.SetStateAction<number>>,
    // assert: React.Dispatch<React.SetStateAction<[boolean, string]>>
}

export const EmptySymbolTable: SymbolTable = {
    symbols: [],
    scopes: [],
};
