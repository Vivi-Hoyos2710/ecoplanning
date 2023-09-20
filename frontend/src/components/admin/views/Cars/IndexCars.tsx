import React from 'react';
import { DefaultTable } from '../utils/Table';
import { Filter } from '../../../../types/ServiceTypes';
import { useState, useEffect } from 'react';
import { Brand, BrandModel } from '../../../../types/BrandTypes';
import { IconButton, Alert, Select, Option } from '@material-tailwind/react';
import { getBrandListFilter, getBrandModelList } from '../../../../services/BrandService';
import { BrandForm } from './BrandForm';
import { ModelForm } from './ModelForm';
export const IndexCars = () => {
  const [brands, setBrands] = useState<BrandModel[]>([]);
  const [openBrand, setOpenBrand] = useState<boolean>(false);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [brandId, setBrandId] = useState<number>(0);
  const [brandName, setBrandName] = useState<string>('');
  const [selectBrandId, setSelectBrandId] = useState<number | null>(null);
  const [brandsFilter, setbrandsFilter] = useState<Brand[]>([]);

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
  }, [openModel, openBrand, selectBrandId]);
  const handleOpen: (type: string) => void = (type) => {
    if (type === 'brand') {
      setOpenBrand((cur: boolean) => !cur);
    } else {
      setOpenModel((cur: boolean) => !cur);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="block bg-gradient-to-tr from-green-600 to-cyan-400 bg-clip-text font-sans text-3xl font-semibold leading-tight tracking-normal text-transparent antialiased">
            Cars Info
          </h1>
          <hr className="border-t border-gray-300 my-5 w-full" />
          <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-blue-gray-900 antialiased my-5">
            Brands and models
          </h2>
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

        <div className="flex flex-col items-center my-5 mx-20">
          <div className="flex items-center mb-2">
            <IconButton className="rounded-full text-xl" onClick={() => handleOpen('brand')}>
              +
            </IconButton>
            <span className="ml-2">Add Brand</span>
          </div>
          <BrandForm handleOpen={handleOpen} open={openBrand} />
          {
            <ModelForm
              handleOpen={handleOpen}
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
              <div className="grid grid-cols-3">
                <div>
                  <h3 className="block font-sans text-xl font-semibold leading-tight tracking-normal text-blue-gray-900 antialiased my-5">
                    {brand.name}
                  </h3>
                </div>
                <div className="flex items-center">
                  <IconButton
                    className="rounded-full"
                    size="sm"
                    variant="gradient"
                    color="blue-gray"
                    onClick={() => {
                      setBrandId(brand.id);
                      setBrandName(brand.name);
                      handleOpen('model');
                    }}
                  >
                    +
                  </IconButton>
                  <span className="text-xs text-gray-500 ml-1">Add Model</span>
                </div>
              </div>
              {brand.models.length > 0 ? (
                <DefaultTable
                  header={['Id', 'name', 'Delete', 'Edit']}
                  tableRow={brand.models}
                  tableKeys={['id', 'name']}
                  actions={['DELETE', 'EDIT']}
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
