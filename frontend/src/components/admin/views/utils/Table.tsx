import React from 'react';
import { Card, Typography,IconButton } from "@material-tailwind/react";
import { FiEdit2,FiTrash } from "react-icons/fi";
interface DefaultTableProps {
    header: string[],
    tableRow: any[],
    tableKeys: string[],
    actions: string[]; // Use React.ReactNode for dynamic actions
}
export const DefaultTable = ({ header, tableRow, tableKeys, actions }: DefaultTableProps) => {
    return (
        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-center">
                <thead>
                    <tr>
                        {header.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableRow.map((row: any, index: any) => {
                        return (
                            <tr key={index}>
                                {tableKeys.map((key: any) => (
                                    <td
                                        key={key}
                                        className="p-4 border-b border-blue-gray-50"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {row[key]}
                                        </Typography>
                                    </td>
                                ))}
                                {
                                    actions.map((action: any) => (
                                        <td
                                    key={'delete'}
                                    className="p-4 border-b border-blue-gray-50"
                                >
                                    <IconButton onClick={()=>{console.log(row['id'])}}> {action==='EDIT' && <FiEdit2/>}{action==='DELETE' && <FiTrash/>}</IconButton>
                                    </td>
                                    ))
                                }
                                
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    );
};
