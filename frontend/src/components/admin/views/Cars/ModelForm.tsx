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
import { ModelInfo } from '../../../../types/ModelTypes';
import { createModel } from '../../../../services/ModelService';
import { useState, useEffect } from 'react';
interface ModelForm {
  handleOpen: (type: string) => void;
  open: boolean;
  brandId: number;
  brandName: string;
}
export const ModelForm = ({ handleOpen, open, brandId, brandName }: ModelForm) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ModelInfo>();
  const [dataError, setDataError] = useState<string>('');
  useEffect(() => {
    if (!open) {
      reset();
      setDataError('');
    }
  }, [open]);
  const submitBrandForm: SubmitHandler<ModelInfo> = (data: ModelInfo) => {
    setDataError('');
    const submitBrandName = async () => {
      try {
        await createModel(data);
        handleOpen('model');
      } catch (error: any) {
        console.log(error);
        setDataError(error.response.data.non_field_errors);
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
            color="light-green"
            className="mb-2 grid h-10 place-items-center"
          >
            <Typography variant="h4" color="white">
              Add Model to {brandName}
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-6 items-end">
            <button onClick={() => handleOpen('model')} className="w-auto p-2">
              <AiFillCloseSquare size={20} /> {/* You can adjust the size as needed */}
            </button>
            <form className="w-full" onSubmit={handleSubmit(submitBrandForm)}>
              <Input
                type="text"
                label="Model name"
                size="lg"
                {...register('name', {
                  required: 'You must enter a model name before submitting'
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

              <input type="hidden" value={brandId} {...register('brand')} />
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
