import React, {useState} from "react";

interface useInputState {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function useInput(initialValue: string, func?: (value: string) => void): useInputState {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (func) {
            func(e.target.value);
        }
    }

    return {
        value, onChange
    }
}