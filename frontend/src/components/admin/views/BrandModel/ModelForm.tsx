import React from 'react';
import {Button,Dialog,Card,CardHeader,CardBody,CardFooter,Typography,Input} from '@material-tailwind/react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Model, ModelInfo } from '../../../../types/ModelTypes';
import { createModel, editModel } from '../../../../services/ModelService';
import { useState, useEffect } from 'react';
interface ModelForm {
  model: Model | null;
  handleOpen: (type: string) => void;
  open: boolean;
  brandId: number;
  brandName: string;
}
export const ModelForm = ({ model, handleOpen, open, brandId, brandName }: ModelForm) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ModelInfo>();
  const [dataError, setDataError] = useState<string>('');
  useEffect(() => {
    if(model){
      setValue("name", model.name);
      setValue("brand", model.brand);
      setValue("range", model.range);
    }
  }, [model])
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
        if(model === null){
          await createModel(data);
        }else{
          await editModel(model.id, data);
        }
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
            className="mb-2 grid h-10 place-items-center bg-blue-gray-500"
          >
            <Typography variant="h4" color="white">
              Add model to {brandName}
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-6 items-end">
            <button onClick={() => handleOpen('model')} className="w-auto">
              <AiFillCloseCircle size={30} />
            </button>
            <form className="w-full" onSubmit={handleSubmit(submitBrandForm)}>
              <Input crossOrigin={undefined}
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

              <Input crossOrigin={undefined}
                type="number"
                label="Range (meters)"
                size="lg"
                {...register('range', {
                  required: 'You must enter the models range before submitting'
                })}
                error={errors.range !== undefined}
              />
              {errors.range && (
                <Typography variant="small" color="red">
                  {errors.range?.message}
                </Typography>
              )}

              <input  type="hidden" value={brandId} {...register('brand')} />
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
