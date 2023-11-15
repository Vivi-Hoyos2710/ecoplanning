import React from 'react';
import { Spinner } from "@material-tailwind/react";
export const SpinnerComponent = () => {


    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner className="h-16 w-16 text-indigo-900/50" />
        </div>
    );
};
