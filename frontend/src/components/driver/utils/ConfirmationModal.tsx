import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
interface ConfirmationModal {
    handleOpen: (isConfirmed:boolean) => void;
    open: boolean;
    title:string|null;
    info:string;

  }
export const ConfirmationModal=({handleOpen, open,title,info}:ConfirmationModal) =>{
  return (
    <>
      
      <Dialog open={open}  handler={() => {
          handleOpen;
        }}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>
         {info}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => handleOpen(true)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}