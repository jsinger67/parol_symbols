import { Button } from "@mantine/core";

const ScopeListItem = (props) => {
    const { scope } = props;
    const parent = scope.parent || "<no parent>"
    return <div><Button className="list_item">{scope.my_id} parent: {parent}</Button></div>;
}

export default ScopeListItem;