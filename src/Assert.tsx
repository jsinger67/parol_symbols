import { Alert, Text } from "@mantine/core";
import { BellIcon } from "@modulz/radix-icons";

export interface AssertParams {
    cond: boolean,
    msg: string,
    assert: React.Dispatch<React.SetStateAction<[boolean, string]>>,
}


export const Assert = (props: AssertParams) => {
    const { cond, msg, assert } = props;
    if (!cond) {
        return (
            (<Alert
                icon={<BellIcon/>}
                title='Assertion failed'
                color="red" withCloseButton
                closeButtonLabel="Close alert"
                onClose={() => assert([true, ""])}
                >
                <Text>{msg}</Text>
            </Alert>)
        );
    } else {
        return null;
    }
}