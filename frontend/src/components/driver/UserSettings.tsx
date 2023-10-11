import React, { useState, useEffect } from 'react';
import { Card, Button, Avatar, Typography, Select, Option, Input } from '@material-tailwind/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import fondo1 from '../../img/fondoRecomendacionesBateria.svg';
import fondo2 from '../../img/fondoRecomendacionesBateria1.svg';
import { Link } from 'react-router-dom';
import { SignInFormData } from '../../types/AuthTypes';
import { Model } from '../../types/ModelTypes';
import { getModelListFilter } from '../../services/ModelService';
import { getBrandListFilter, getBrandModelList } from '../../services/BrandService';
import { Filter } from '../../types/ServiceTypes';
import { createCar } from '../../services/CarService';
import { Brand } from '../../types/BrandTypes';

const BrandOrder: Filter = {
  name: 'ordering',
  value: 'name'
};

const UserSettings = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [brandId, setBrandId] = useState<number>(0);
  const [modelId, setModelId] = useState<number>(0);


  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');

  useEffect(() => {
    const getBrands = async () => {
      const brands = await getBrandListFilter([BrandOrder]);
      setBrands(brands);
    };
    getBrands();
    const getModels = async () => {
      try {
        const models = await getModelListFilter([{ name: '', value: brandId.toString() }]);
        setModels(models);
      } catch (error) {
        console.log(error);
      }
    };
    if (brandId !== 0) {
      getModels();
    }
  }, [brandId, modelId]);

  useEffect(() => {
    if (brands.length > 0 && models.length > 0) {
      const defaultBrandData = brands.find((brand) => brand.id === brandId);
      if (defaultBrandData) {
        setSelectedBrand(defaultBrandData.name);
      }

      const defaultModelData = models.find((model) => model.id === modelId);
      if (defaultModelData) {
        setSelectedModel(defaultModelData.name);
      }
    }
  }, [brandId, models, brands, modelId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<SignInFormData>();

  const submitFun: SubmitHandler<SignInFormData> = async (data: SignInFormData) => {
    try {

      console.log('Formulario editar :((((', data);




    } catch (error: any) {
        console.log(error);
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url(${fondo1}), url(${fondo2})`, margin: '0', padding: '0' }}
    >
      <div className="p-5 space-y-4 lg:space-y-0">
        <div className=" flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 flex text-left p-4 ">
          <Link to="/">
            <Button variant="gradient" color="gray" size="lg" className="rounded-full ml-4">
              Back
            </Button>
          </Link>
          <div>
            <Card className="flex items-center justify-center shadow-lg w-full rounded-t-lg p-3">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <Avatar withBorder={true} color="cyan" />
                  <div>
                    <Typography variant="h5">Tania Andrew</Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      Web Developer
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex flex-col justify-center pt-10 items-center ">
          <div className="flex flex-col items-center space-y-8 w-full max-w-screen-lg">
            <Card
              shadow={true}
              className="shadow-lg w-full rounded-t-lg p-8 "
              style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
            >
              <Typography color="gray" className="mt-1 font-normal text-center">
                Register the details of one of your vehicles
              </Typography>
              <form onSubmit={handleSubmit(submitFun)} className="mt-4 space-y-4">
                <Input
                  type="text"
                  label="Vehicle plate"
                  {...register('regisPlate', {
                    required: 'You must enter a vehicle plate',
                    pattern: {
                      value: /^[A-Z]{3}\d{3}/,
                      message: 'Enter a valid vehicle plate "ABC123" '
                    }
                  })}
                  error={errors.regisPlate !== undefined}
                defaultValue="ABC123"
                />

                <div className="flex justify-center items-center w-full h-full">
                  <div className="flex w-72 flex-col gap-6 flex w-full ">
                    <Controller
                      name="brand"
                      control={control}
                      rules={{ required: 'You must enter the brand' }}
                      render={({ field }) => (
                        <Select label="Select a brand" error={errors.brand !== undefined} {...field}>
                          {brands.map((brand) => (
                            <Option
                              value={brand.name}
                              key={brand.id}
                              onClick={() => {
                                setBrandId(brand.id);
                                field.onChange(brand.name);
                              }}
                            >
                              {brand.name}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />

                    <Controller
                      name="model"
                      control={control}
                      rules={{ required: 'You must enter a vehicle model' }}
                      render={({ field }) => (
                        <Select label="Select a model" error={errors.model !== undefined} {...field}>
                          {models.map((model) => (
                            <Option
                              value={model.name}
                              key={model.id}
                              onClick={() => {
                                setModelId(model.id);
                                field.onChange(model.name);
                              }}
                            >
                              {model.name}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <button className="test" type="submit">
                  another test
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
