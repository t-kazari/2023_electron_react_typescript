import { Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form"
import MuiButton from "./atom/MuiButton";
import MuiTextField from "./atom/MuiTextField";
import axios from "axios";
import { useEffect, useState } from "react";

interface Row {
    id: number
}

interface Column<T extends Row> {
    id: keyof T;
    label: string;
    minWidth?: number;
    align?: "right";
}

interface MemberRow extends Row {
    id: number;
    name: string;
    gender: string;
}

const columns: Column<MemberRow>[] = [
    { id: "id", label: "ID" },
    { id: "name", label: "名前" },
    { id: "gender", label: "性別" },
]

export default function Form() {

    const [members, setMembers] = useState<MemberRow[]>([]);

    const methods = useForm({});

    const fetchMembers = async () => {
        const url = 'http://localhost:8000/fastapi/api/v1/alldata';
        const response = await axios.post(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.data) {
            const entities: MemberRow[] = response.data.responseEntity;
            setMembers(entities);
        }

    }


    useEffect(() => {
        fetchMembers();
    }, [])

    const submit = async (data: any) => {
        console.info(data);

        const url = 'http://localhost:8000/fastapi/api/v1/formdata';
        const param = {
            id: data.id,
            name: data.name,
            gender: data.gender,
        }
        const response = await axios.post(url, param, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.data) {
            const entities: MemberRow[] = response.data.responseEntity;
            setMembers(entities);
        }
    }

    return (
        <>
            <Container maxWidth="xs" sx={{ mt: 6 }}>
                <span>メンバー登録</span>
                <div style={{ margin: "10px" }}>
                    <FormProvider {...methods}>
                        ID
                        <MuiTextField name="id" />
                        名前
                        <MuiTextField name="name" />
                        性別
                        <MuiTextField name="gender" />
                        <MuiButton sendData={submit} />
                    </FormProvider>
                </div>
                <div>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {members.map((member) => {
                                    return (
                                        <TableRow>
                                            {columns.map((column) => {
                                                const value = member[column.id]
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>
        </>
    )
}