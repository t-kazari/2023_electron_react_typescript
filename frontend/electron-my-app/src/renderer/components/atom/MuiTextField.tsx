import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

type Props = {
    name: string
}

export default function MuiTextField(props: Props) {

    const { control } = useFormContext();

    return (
        <Controller
            name={props.name}
            control={control}
            defaultValue=""
            rules={{
                required: { value: true, message: '必須' }
            }}
            render={({ field, formState: { errors } }) => (
                <TextField
                    {...field}
                    label={props.name}
                    placeholder="write"
                    fullWidth
                    error={errors.name ? true : false}
                    helperText={errors.name?.message as string}
                />
            )}
        />
    )
}