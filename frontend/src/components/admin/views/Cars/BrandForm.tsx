import React from 'react';
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input
} from '@material-tailwind/react';
import { AiFillCloseSquare } from 'react-icons/ai';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BrandInfo } from '../../../../types/BrandTypes';
import { createBrand } from '../../../../services/BrandService';
import { useState, useEffect } from 'react';
interface BrandForm {
  handleOpen: (type: string) => void;
  open: boolean;
}
export const BrandForm = ({ handleOpen, open }: BrandForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BrandInfo>();
  const [dataError, setDataError] = useState<string>('');
  useEffect(() => {
    setDataError('');
  }, [open]);
  const submitBrandForm: SubmitHandler<BrandInfo> = (data: BrandInfo) => {
    setDataError('');
    const submitBrandName = async () => {
      try {
        await createBrand(data);
        handleOpen('brand');
      } catch (error: any) {
        setDataError(error.response.data.name);
      }
    };
    submitBrandName();
  };
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={() => {
          handleOpen;
        }}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="green"
            className="mb-2 grid h-10 place-items-center"
          >
            <Typography variant="h4" color="white">
              Add New Brand
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-6 items-end">
            <button onClick={() => handleOpen('brand')} className="w-auto p-2">
              <AiFillCloseSquare size={20} /> {/* You can adjust the size as needed */}
            </button>
            <form className="w-full" onSubmit={handleSubmit(submitBrandForm)}>
              <Input
                type="text"
                label="Brand Name"
                size="lg"
                {...register('name', {
                  required: 'You must enter a brand to create before submitting'
                })}
                error={errors.name !== undefined}
              />
              {errors.name && (
                <Typography variant="small" color="red">
                  {errors.name?.message}
                </Typography>
              )}
              {dataError !== '' && (
                <Typography variant="small" color="red">
                  {dataError}
                </Typography>
              )}

              <CardFooter className="pt-0 flex justify-center mt-5">
                <Button type="submit" variant="gradient">
                  Add
                </Button>
              </CardFooter>
            </form>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
};
