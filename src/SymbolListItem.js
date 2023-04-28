import { Button } from "@mantine/core";

const SymbolListItem = (props) => {
    const { symbol, data } = props;
    const enveloping_scope = data.scopes.find(scope => scope.my_id === symbol.name_id[0]);
    const name = enveloping_scope.names[symbol.name_id[1]] || "<unnamed>";
    return <div><Button className="list_item">{symbol.my_id} {name}</Button></div>;
}

export default SymbolListItem;