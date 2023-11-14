import React from 'react';
import { DefaultTable } from '../utils/Table';
import { Filter } from '../../../../types/ServiceTypes';
import { useState, useEffect } from 'react';
import { Brand, BrandModel } from '../../../../types/BrandTypes';
import { IconButton, Alert, Select, Option, Card, Typography } from '@material-tailwind/react';
import { deleteBrand, getBrandListFilter, getBrandModelList } from '../../../../services/BrandService';
import { BrandForm } from './BrandForm';
import { ModelForm } from './ModelForm';
import { deleteModelById } from '../../../../services/ModelService';
import { Model } from '../../../../types/ModelTypes';
import { FiEdit2, FiTrash } from 'react-icons/fi';
import { ConfirmationMessage } from '../utils/ConfirmMessage';
export const IndexCars = () => {
  const [brands, setBrands] = useState<BrandModel[]>([]);
  const [openBrand, setOpenBrand] = useState<boolean>(false);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [brandId, setBrandId] = useState<number>(0);
  const [brandName, setBrandName] = useState<string>('');
  const [selectBrandId, setSelectBrandId] = useState<number | null>(null);
  const [brandsFilter, setbrandsFilter] = useState<Brand[]>([]);
  const [action,setAction]=useState<boolean>(false);
  const [model, setModel] = useState<Model | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [brandDeleteId, setBrandDeleteId] = useState<number>(0);
  const [modelDeleteId, setModelDeleteId] = useState<number>(0);
  const [openDeleteBrand, setOpenDeleteBrand] = useState<boolean>(false);
  const [openDeleteModel, setOpenDeleteModel] = useState<boolean>(false);
  const brandOrder: Filter = {
    name: 'ordering',
    value: 'id'
  };
  useEffect(() => {
    const getBrandsAndModels = async () => {
      const justBrands = await getBrandListFilter([brandOrder]);
      setbrandsFilter(justBrands);
      const brandsQ = await getBrandModelList([
        {
          value: selectBrandId ? selectBrandId.toString() : '',
          name: 'id'
        }
      ]);
      setBrands(brandsQ);
    };
    getBrandsAndModels();
  }, [openModel, openBrand, selectBrandId,action]);
  const handleAddOpen: (type: string) => void = (type) => {
    if (type === 'brand') {
      setOpenBrand((cur: boolean) => !cur);
    } else {
      setModel(null);
      setOpenModel((cur: boolean) => !cur);
    }
  };
  const handleEditBrandOpen = (brand: any) => {
    setBrand(brand);
    setOpenBrand((cur: boolean) => !cur);
  };
  const handleDeleteBrandOpen = (id: number) =>{
    setBrandDeleteId(id);
    handleDeleteBrand(false);
  }
  const handleDeleteBrand = async (isConfirmed : boolean) => {
    if(brandDeleteId && isConfirmed){
      await deleteBrand(brandDeleteId);
      setAction((cur: boolean) => !cur);
    }
    setOpenDeleteBrand((cur: boolean) => !cur);
  }
  const handleDeleteModelOpen = (id: number) =>{
    setModelDeleteId(id);
    handleDeleteModel(false);
  }
  const handleDeleteModel = async (isConfirmed : boolean) => {
    if(modelDeleteId && isConfirmed){
      await deleteModelById(modelDeleteId);
      setAction((cur: boolean) => !cur);
    }
    setOpenDeleteModel((cur: boolean) => !cur);
  }
  const handleActions: (action: string, info: any) => void = (action, info) => {
    if (action === 'EDIT'){
      setModel(info);
      setOpenModel((cur: boolean) => !cur);
    }
    if (action === 'DELETE') {
      console.log(info.id);
      handleDeleteModelOpen(info.id);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center p-5">
    <Card shadow={true} className="text-gray-600 mt-5 shadow-lg rounded-tl rounded-br p-4 ">
          <Typography color="gray"variant="h4" className="mt-1 font-bold text-center">
            Car Information
          </Typography>
        </Card>
    <div className="flex justify-between mt-5 items-start space-x-10">
      <div>

      <Typography color="gray" className="mb-2">
          Brands and models
          </Typography>

        <Select color="teal" label="Filter by brand">
          {brandsFilter.map((brand) => (
            <Option
              value={brand.name}
              key={brand.id}
              onClick={() => {
                setSelectBrandId(brand.id);
              }}
            >
              {brand.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-2 ml-30 space-y-2 ">
          <Typography color="gray" className="text-center ">
            Add Brand
          </Typography>
          <IconButton variant="gradient" color="cyan" className="rounded-full text-xl" onClick={() => handleAddOpen('brand')}>
            +
          </IconButton>

        </div>
        <ConfirmationMessage handleOpen={handleDeleteBrand} open={openDeleteBrand} info={"Are you sure do you want to delete this car?"} title={"Warning"} />
        <ConfirmationMessage handleOpen={handleDeleteModel} open={openDeleteModel} info={"Are you sure do you want to delete this car?"} title={"Warning"} />
        <BrandForm brand={brand} handleOpen={handleAddOpen} open={openBrand} />
        {
          <ModelForm
            model={model}
            handleOpen={handleAddOpen}
            open={openModel}
            brandId={brandId}
            brandName={brandName}
          />
        }
      </div>
    </div>
    <div className="flex mx-10">
      <div className="md:w-[400px]">
        {brands.map((brand: any) => (
          <div key={brand.id}>
            <div className="grid grid-cols-3 mb-5 mt-5">
              <div>
                <Typography color="gray" variant="h5" className="font-bold text-center ">
                  {brand.name}
                </Typography>
              </div>
              <div className="flex items-center">
                <IconButton
                  className="rounded-full"
                  size="sm"
                  variant="gradient"
                  color="blue-gray"
                  onClick={() => {handleEditBrandOpen(brand);}}
                >
                  <FiEdit2 />
                </IconButton>
                <IconButton
                  className="rounded-full"
                  size="sm"
                  variant="gradient"
                  color="blue-gray"
                  onClick={() => {handleDeleteBrandOpen(brand.id);}}
                >
                  <FiTrash />
                </IconButton>
              </div>
              <div className="flex">
                  <IconButton
                    className="rounded-full"
                    size="sm"
                    variant="gradient"
                    color="blue-gray"
                    onClick={() => {
                      setBrandId(brand.id);
                      setBrandName(brand.name);
                      handleAddOpen('model');
                    }}
                  >
                    +
                  </IconButton>
                  <span className="text-xs text-gray-500 ml-1">Add Model</span>
                </div>
            </div>
            {brand.models.length > 0 ? (
              <DefaultTable
                header={['Id', 'name', 'Range(m)', 'Delete', 'Edit']}
                tableRow={brand.models}
                tableKeys={['id', 'name', 'range']}
                actions={['DELETE', 'EDIT']}
                handleActions={handleActions}
              />
            ) : (
              <Alert variant="ghost">
                <span>No models added in the brand {brand.name}</span>
              </Alert>
            )}

          </div>
        ))}
      </div>
    </div>
  </div>
  );
};
