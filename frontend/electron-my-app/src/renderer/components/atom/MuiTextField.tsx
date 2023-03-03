import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

export default function MuiTextField() {

    const { control } = useFormContext();

    return (
        <Controller
            name="text"
            control={control}
            defaultValue=""
            rules={{
                required: { value: true, message: '必須' }
            }}
            render={({ field, formState: { errors } }) => (
                <TextField
                    {...field}
                    label="text"
                    placeholder="write"
                    fullWidth
                    error={errors.text ? true : false}
                    helperText={errors.text?.message as string}
                />
            )}
        />
    )
}