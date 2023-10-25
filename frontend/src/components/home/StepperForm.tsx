import React from 'react';
import { useState, useEffect } from 'react';
import { createUser, validateUser } from '../../services/UserService';
import { createCar } from '../../services/CarService';
import { UserInfo } from '../../types/UserTypes';
import { Brand } from '../../types/BrandTypes';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Card, Input, Typography, Select, Option, Spinner } from '@material-tailwind/react';
import { SignInFormData } from '../../types/AuthTypes';
import { Car } from '../../types/CarTypes';
import { Model } from '../../types/ModelTypes';
import { getBrandListFilter, getBrandModelList } from '../../services/BrandService';
import { getModelListFilter } from '../../services/ModelService';
import { Link } from 'react-router-dom';
import { getLoginToken } from '../../services/AuthService';
import { Filter } from '../../types/ServiceTypes';

interface StepperProps {
  stepIndex: number;
  checkValid: any; //buscar type de una function
}
const BrandOrder: Filter = {
  name: 'ordering',
  value: 'name'
};

const StepperForm = ({ stepIndex, checkValid }: StepperProps) => {
  const [errorUser, setErrorUser] = useState<string>('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [brandId, setBrandId] = useState<number>(0);
  const [modelId, setModelId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    console.log(modelId);
    const getBrands = async () => {
      const brands = await getBrandListFilter([BrandOrder]);
      setBrands(brands);
    };
    getBrands();
    const getModels = async () => {
      try {
        const models = await getModelListFilter([{ name: 'brand', value: brandId.toString() }]);
        console.log(models);
        setModels(models);
      } catch (error) {
        console.log(error);
      }
    };
    if (brandId != 0) {

      getModels();
    }
  }, [brandId, modelId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<SignInFormData>();

  const submitFun: SubmitHandler<SignInFormData> = (data: SignInFormData) => {
    if (stepIndex === 0) {
      const validate = async () => {
        try {
          const user = await validateUser(data);
          checkValid(true);
        } catch (error: any) {
          setErrorUser(error.response.data.email);
        }
      };
      validate();
    }
    if (stepIndex === 1) {
      const userInfo: UserInfo = {
        email: data.email,
        password: data.password,
        name: data.name
      };
      const signIn = async () => {
        try {
          setLoading(true);
          const user = await createUser(userInfo);
          const userCar: Car = {
            user: user.id,
            brand: brandId,
            brand__name: data.brand,
            license_plate: data.regisPlate,
            model: modelId
          };
          console.log(userCar);
          const car = await createCar(userCar);
          await getLoginToken(data);
          setLoading(false);
          checkValid(true);
        } catch (error: any) {
          console.log(error.response.data);
        }
      };
      signIn();
    }
  };
  return (
    <div className="w-full ">
      {stepIndex === 0 && (
        <Card
          shadow={true}
          className="shadow-lg w-full rounded-t-lg p-8 "
          style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
        >
          <Typography color="gray" className="mt-1 font-normal text-center">
            Register your personal data
          </Typography>
          <form onSubmit={handleSubmit(submitFun)} className="mt-4 space-y-4">
            <Input crossOrigin={undefined}
              type="text"
              label="Name"
              {...register('name', {
                required: 'You must enter your full name'
              })}
              error={errors.name !== undefined}
            />
            {errors.name && (
              <Typography variant="small" color="red">
                {errors.name?.message}
              </Typography>
            )}

            <Input crossOrigin={undefined}
              type="text"
              label="E-mail"
              {...register('email', {
                required: 'You must enter an email',
                pattern: {
                  value: /^\S+@\S+.\S+$/i,
                  message: 'The email entered is invalid "someone@example.com" '
                }
              })}
              error={errors.email !== undefined}
            />
            {errors.email && (
              <Typography variant="small" color="red">
                {errors.email?.message}
              </Typography>
            )}
            {errorUser !== '' && (
              <Typography variant="small" color="red">
                {errorUser}
              </Typography>
            )}

            <Input crossOrigin={undefined}
              type="password"
              label="Password"
              {...register('password', {
                required: 'You must enter a password',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: 'Minimum 8 characters, one lowercase, one uppercase, and one digit'
                }
              })}
              error={errors.password !== undefined}
            />
            {errors.password && (
              <Typography variant="small" color="red">
                {errors.password?.message}
              </Typography>
            )}

            <button className="test" type="submit" hidden>
              hidden
            </button>
          </form>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-gray-900">
              Login
            </Link>
          </Typography>
        </Card>
      )}
      {stepIndex === 1 && (
        <Card
          shadow={true}
          className="shadow-lg w-full rounded-t-lg p-8 "
          style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
        >
          <Typography color="gray" className="mt-1 font-normal text-center">
            Register the details of one of your vehicles
          </Typography>
          <form onSubmit={handleSubmit(submitFun)} className="mt-4 space-y-4">
            <Input crossOrigin={undefined}
              type="text"
              label="Vehicle plate"
              {...register('regisPlate', {
                required: 'You must enter a vehicle plate',
                pattern: {
                  value: /^[A-Z]{3}\d{3}/,
                  message: 'Enter a valid vehicle plate "ABC123" '
                }
              })}
              error={errors.name !== undefined}
            />
            {errors.regisPlate && (
              <Typography variant="small" color="red">
                {errors.regisPlate?.message}
              </Typography>
            )}
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
                    <Select label="Select a model" error={errors.model !== undefined}>
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
                {loading ? <Spinner color="green" /> : <span />}
              </div>
            </div>

            <button className="test" type="submit" hidden>
              another test
            </button>
          </form>
        </Card>
      )}
      {stepIndex === 2 && (
        <Card
          shadow={true}
          className="shadow-lg w-full rounded-t-lg p-8 "
          style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}
        >
          <Typography variant="h4" color="gray" className="text-center">
            Welcome
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-center">
            Start experiencing the true peace of mind of driving an electric car.
          </Typography>
          <div className="flex justify-center items-center">
            <img width="200" height="160" src={require('../../img/gifCarro.gif')} alt="ImgCar" />
          </div>
        </Card>
      )}
    </div>
  );
};

export default StepperForm;
