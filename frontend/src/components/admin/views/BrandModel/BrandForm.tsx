import React from 'react';
import {Button,Dialog,Card,CardHeader,CardBody,CardFooter,Typography,Input} from '@material-tailwind/react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Brand, BrandInfo } from '../../../../types/BrandTypes';
import { createBrand, editBrand } from '../../../../services/BrandService';
import { useState, useEffect } from 'react';
interface BrandForm {
  brand: Brand | null;
  handleOpen: (type: string) => void;
  open: boolean;
}
export const BrandForm = ({ brand, handleOpen, open }: BrandForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<BrandInfo>();
  const [dataError, setDataError] = useState<string>('');
  useEffect(() => {
    setDataError('');
  }, [open]);
  useEffect(() => {
    if(brand){
      setValue("name", brand.name);
    }else{
      setValue("name", "");
    }
  }, [brand]);
  const submitBrandForm: SubmitHandler<BrandInfo> = (data: BrandInfo) => {
    setDataError('');
    const submitBrandName = async () => {
      try {
        if(brand === null){
          await createBrand(data);
        }else{
          await editBrand(brand.id, data);
        }
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
            color="cyan"
            className="mb-2 grid h-10 place-items-center"
          >
            <Typography variant="h4" color="white">
              Add new brand
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-6 items-end">
            <button onClick={() => handleOpen('brand')} className="w-auto">
              <AiFillCloseCircle size={30} />
            </button>
            <form className="w-full" onSubmit={handleSubmit(submitBrandForm)}>
              <Input crossOrigin={undefined}
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
