import { Space, Text } from "@mantine/core";
import { SymbolTable } from "./bindings/SymbolTable";
import { Symbol } from "./bindings/Symbol";
import { Type } from "./bindings/Type";
import { Instance } from "./bindings/Instance";
import { Function } from "./bindings/Function";
import ScopeDetails from "./ScopeDetails";
import { ScopeId } from "./bindings/ScopeId";
import { Scope } from "./bindings/Scope";

export interface SymbolListItemParams {
  symbol: Symbol;
  symbolTable: SymbolTable;
}

interface InstanceParams {
  instance: Instance;
  symbolTable: SymbolTable;
}

const getScopeByID = (scope_id: ScopeId, symbolTable: SymbolTable): Scope => {
  const scope = symbolTable.scopes.find(
    (scope) => scope.my_id === scope_id
  )!;
  return scope;
}

export const getSymbolName = (symbol: Symbol, symbolTable: SymbolTable): string => {
  const enveloping_scope = getScopeByID(symbol.name_id[0], symbolTable);
  return enveloping_scope.names[symbol.name_id[1]] || "<Unnamed>";
};

const getSymbolNameById = (
  symbol_id: number,
  symbolTable: SymbolTable
): string => {
  const symbol = symbolTable.symbols[symbol_id];
  const enveloping_scope = getScopeByID(symbol.name_id[0], symbolTable);
  return enveloping_scope.names[symbol.name_id[1]] || "<Unnamed>";
};

const InstanceComp = (props: InstanceParams) => {
  const { instance, symbolTable } = props;
  const type_name = getSymbolNameById(instance.type_id, symbolTable);

  return (
    <>
      <Space h="md"></Space>
      <Text fw={700} td="underline">
        Instance
      </Text>
      <Space h="md"></Space>
      <Text>"{instance.description}"</Text>
      <Text>Semantic: {instance.sem}</Text>
      <Text>
        Type: ID {instance.type_id} ({type_name})
      </Text>
      <Text>Scope: {instance.scope}</Text>
      <Text>Used: {instance.used ? "true" : "false"}</Text>
    </>
  );
};

interface TypeParams {
  type_symbol: Type;
  symbolTable: SymbolTable;
}

const TypeComp = (props: TypeParams) => {
  const {
    type_symbol: { entrails, member_scope },
    symbolTable,
  } = props;

  const type_member_scope = getScopeByID(member_scope, symbolTable);

  let entrails_specificity = <Text>Unspecified</Text>;
  if (typeof entrails === "object") {
    if ("Function" in entrails) {
      const function_symbol: Function = entrails.Function;
      entrails_specificity = (
        <>
          <Text fw={600} fs="italic">
            Function
          </Text>
          <Space h="sm"></Space>
          <Text>Alternations: {function_symbol.alts}</Text>
          <Text>Non-Terminal: "{function_symbol.non_terminal}"</Text>
          <Text>
            Production: #{function_symbol.prod_num} "
            {function_symbol.prod_string}"
          </Text>
          <Text>Relative production index: {function_symbol.rel_idx}</Text>
          <Text>Semantics: {function_symbol.sem}</Text>
        </>
      );
    } else if ("Box" in entrails) {
      const symbol_id = entrails.Box;
      const name = getSymbolNameById(symbol_id, symbolTable);
      entrails_specificity = (
        <>
          <Text fw={600} fs="italic">
            Box
          </Text>
          <Space h="sm"></Space>
          <Text>
            Boxed symbol: #{symbol_id} "{name}"
          </Text>
        </>
      );
    } else if ("EnumVariant" in entrails) {
      const symbol_id = entrails.EnumVariant;
      const name = getSymbolNameById(symbol_id, symbolTable);
      entrails_specificity = (
        <>
          <Text fw={600} fs="italic">
            EnumVariant
          </Text>
          <Space h="sm"></Space>
          <Text>
            Variant symbol: #{symbol_id} "{name}"
          </Text>
        </>
      );
    } else if ("Option" in entrails) {
      const symbol_id = entrails.Option;
      const name = getSymbolNameById(symbol_id, symbolTable);
      entrails_specificity = (
        <>
          <Text fw={600} fs="italic">
            Option
          </Text>
          <Space h="sm"></Space>
          <Text>
            Variant symbol: #{symbol_id} "{name}"
          </Text>
        </>
      );
    } else if ("Clipped" in entrails) {
      const meta_symbol_kind = entrails.Clipped;
      let name = "Unassigned";
      let symbol_id = "";
      if (typeof meta_symbol_kind === "string") {
        name = meta_symbol_kind;
      } else {
        const { NonTerminal } = meta_symbol_kind;
        name = getSymbolNameById(NonTerminal, symbolTable);
        symbol_id = `${NonTerminal}`;
      }
      entrails_specificity = (
        <>
          <Text fw={600} fs="italic">
            Option
          </Text>
          <Space h="sm"></Space>
          <Text>
            Clipped symbol: #{symbol_id} "{name}"
          </Text>
        </>
      );
    }
  } else if (typeof entrails === "string") {
    entrails_specificity = (
      <>
        <Text fw={600} fs="italic">
          {entrails}
        </Text>
        <Space h="sm"></Space>
      </>
    );
  }

  const scope = getScopeByID(type_member_scope.my_id, symbolTable);

  return (
    <>
      <Space h="md"></Space>
      <Text fw={700} td="underline">
        Type entrails
      </Text>
      <Space h="md"></Space>
      {entrails_specificity}
      <Text>Member Scope: {type_member_scope.my_id}</Text>
      <ScopeDetails scope={scope} symbolTable={symbolTable}/>
    </>
  );
};

const SymbolDetails = (props: SymbolListItemParams | null) => {
  if (props) {
    const { symbol, symbolTable } = props;
    const name = getSymbolName(symbol, symbolTable);
    let type_or_instance = <Text>Type</Text>;
    if ("Instance" in symbol.kind) {
      console.log(symbol.kind);
      const { Instance } = symbol.kind;
      type_or_instance = (
        <InstanceComp instance={Instance} symbolTable={symbolTable} />
      );
    } else if ("Type" in symbol.kind) {
      console.log(symbol.kind);
      const { Type } = symbol.kind;
      type_or_instance = (
        <TypeComp type_symbol={Type} symbolTable={symbolTable} />
      );
    }

    return (
      <div className="details">
        <Text fw={700} td="underline">
          Symbol Details
        </Text>
        <Space h="md" />
        <Text>
          {symbol.my_id} {name}
        </Text>
        <Text>{type_or_instance}</Text>
      </div>
    );
  }
  return null;
};

export default SymbolDetails;
