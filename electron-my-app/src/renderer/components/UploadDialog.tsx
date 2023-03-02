import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import Papa from 'papaparse';

interface CsvData {
    sales_date: string;
    store_cd: string;
    store_nm: string;
    jan_cd: string;
    product_nm: string;
    sales_qty: number;
    sales_amt: number;
}

export default function UploadDialog() {

    const [open, setOpen] = useState<boolean>(false);
    const [uploadFile, setUploadFile] = useState<File>();
    const [csvData, setCsvData] = useState<CsvData[]>([]);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const csvFile: File = e.target.files[0];
        setUploadFile(csvFile);
    }

    useEffect(()=>{
        csvData.forEach((e)=>{console.log(e)});
    }, [csvData])

    const handleUpload = () => {
        if (!uploadFile) {
            alert("CSVファイルが選択されていません");
            return;
        }

        Papa.parse(uploadFile, {
            header: true,
            complete: (results) => {
                const { data } = results;
                const parsedData: CsvData[] = data.map((row: any) => {
                    return({
                    sales_date: row.sales_date,
                    store_cd: row.store_cd,
                    store_nm: row.store_nm,
                    jan_cd: row.jan_cd,
                    product_nm: row.product_nm,
                    sales_qty: parseFloat(row.sales_qty),
                    sales_amt: parseFloat(row.sales_amt),
                })});
                const eliminatedData = parsedData.filter((e)=>{
                    return e.sales_date;
                })
                setCsvData(eliminatedData);
            },
            error: (error) => {
                console.error(error);
            },
        });

        handleClose();

    }

    return (
        <>
            <Button
                onClick={handleClickOpen}
            >
                CSVアップロード
            </Button>
            <Dialog
                open={open} onClose={handleClose}
            >
                <DialogTitle>CSVアップロード</DialogTitle>
                <DialogContent>
                    <input
                        name="uploadFile"
                        type="file"
                        onChange={handleFiles}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>閉じる</Button>
                    <Button onClick={handleUpload}>アップロード</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}