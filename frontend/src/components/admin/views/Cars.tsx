import React from 'react';
import { DefaultTable } from './utils/Table';
import { FilterNameValue, FilterOrder } from '../../../types/ServiceTypes';
import { useState, useEffect } from 'react';
import { Brand } from '../../../types/BrandTypes';
import { Model } from '../../../types/ModelTypes';
import { getBrandListFilter,getBrandModelList } from '../../../services/BrandService';
export const Cars = () => {
  const [view, setView] = useState('cars-index');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const modelOrder: FilterOrder = {
    ordering: "brand",
  };

  const brandOrder: FilterOrder = {
    ordering: "id",
  };
  useEffect(() => {

    const getBrands = async () => {
      const brandsQ = await getBrandModelList();
      console.log(brandsQ);
      setBrands(brandsQ);
      
    }
    getBrands();


  }, []);
  return (
    <div>
      <h1 className="block bg-gradient-to-tr from-green-600 to-cyan-400 bg-clip-text font-sans text-3xl font-semibold leading-tight tracking-normal text-transparent antialiased">
        Cars Info
      </h1>
      <hr />
      <div>
        <h2 className="block font-sans text-2xl font-semibold leading-tight tracking-normal text-blue-gray-900 antialiased my-5">
          Brands and models
        </h2>
        <ul>
        {brands.map((brand:any) => (
          <li key={brand.id}>
            {brand.name}
            <DefaultTable header={["Id","name"]} tableRow={brand.models} tableKeys={["id","name"]}/>
          </li>
        ))}
        </ul>


      </div>

    </div>
  );
};
