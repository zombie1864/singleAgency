import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../src/reducers/rootReducer'
import {middlewares} from '../src/store/store'

export const findByTestAttr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`)
    return wrapper
};

export const testStore = (initialStore) => {
    const testStore = createStore(rootReducer, initialStore, applyMiddleware(...middlewares))
    return testStore
} // createStore( reducer, initialState, func )


export const mockData = {
    count: 1, 
    next: null, 
    previous: null, 
    results: [
        {
          address: "test", 
          bdbid: 1234, 
          building_name: "test", 
          co2eui_breakdown: "test", 
          energy_breakdown: "test", 
          epapm_primary_function: "test", 
          latitude: 0.0, 
          longitude: 0.0, 
          oper_agency_acronym: "test", 
          outofservice: false, 
          parent_record_id: "test", 
          total_bldg_gross_sq_ft: 1900, 
          year_built: "test" , 
        }
    ]
}

export const initialState = {
    setDataReducer: {
        objFromResults: null, 
        results: [
            {
                address: "addressTest1", 
                bdbid: 1234, 
                building_name: "buildingNameTest1", 
                co2eui_breakdown: [
                    {
                    "bdbid": 1234,
                    "bldg_sqft": 192000,
                    "co2emissions_kg_sqft_site": 4.6839056,
                    "co2emissions_kg_sqft_source": 7.383769,
                    "fiscal_year": 2019,
                    "id": 145000,
                    "site_eui": 80.69169,
                    "source_eui": 117.46657,
                    "total_co2emissions_kg_site": 899309.8,
                    "total_co2emissions_kg_source": 1417683.6,
                    "total_site_energy_kbtu": 15492804,
                    "total_source_energy_kbtu": 22553582,
                    "updated_on": "2021-02-10T10:24:53.575000-05:00"
                    }
                    ], 
                energy_breakdown: "energyBreakdownTest1", 
                epapm_primary_function: "epapmTest1", 
                latitude: 0.0, 
                longitude: 0.0, 
                oper_agency_acronym: "operTest1", 
                outofservice: false, 
                parent_record_id: "parentTest1", 
                total_bldg_gross_sq_ft: 50000, 
                year_built: "1901.0" , 
            }, 
            {
                address: "addressTest2", 
                bdbid: 5678, 
                building_name: "buildingNameTest2 M50 (MK9)", 
                co2eui_breakdown: [
                    {
                    "bdbid": 5678,
                    "bldg_sqft": 192000,
                    "co2emissions_kg_sqft_site": 4.6839056,
                    "co2emissions_kg_sqft_source": 7.383769,
                    "fiscal_year": 2019,
                    "id": 145000,
                    "site_eui": 80.69169,
                    "source_eui": 117.46657,
                    "total_co2emissions_kg_site": 899309.8,
                    "total_co2emissions_kg_source": 1417683.6,
                    "total_site_energy_kbtu": 15492804,
                    "total_source_energy_kbtu": 22553582,
                    "updated_on": "2021-02-10T10:24:53.575000-05:00"
                    }
                    ], 
                energy_breakdown: "energyBreakdownTest2", 
                epapm_primary_function: "epapmTest2", 
                latitude: 0.0, 
                longitude: 0.0, 
                oper_agency_acronym: "operTest2", 
                outofservice: false, 
                parent_record_id: "parentTest2", 
                total_bldg_gross_sq_ft: 100000, 
                year_built: "1902.0" , 
            }, 
            {
                address: "addressTest3", 
                bdbid: 9012, 
                building_name: "buildingNameTest3 (LL84)", 
                co2eui_breakdown: [
                    {
                    "bdbid": 9012,
                    "bldg_sqft": 192000,
                    "co2emissions_kg_sqft_site": 4.6839056,
                    "co2emissions_kg_sqft_source": 7.383769,
                    "fiscal_year": 2019,
                    "id": 145000,
                    "site_eui": 80.69169,
                    "source_eui": 117.46657,
                    "total_co2emissions_kg_site": 899309.8,
                    "total_co2emissions_kg_source": 1417683.6,
                    "total_site_energy_kbtu": 15492804,
                    "total_source_energy_kbtu": 22553582,
                    "updated_on": "2021-02-10T10:24:53.575000-05:00"
                    }
                    ], 
                energy_breakdown: "energyBreakdownTest3", 
                epapm_primary_function: "epapmTest3", 
                latitude: 0.0, 
                longitude: 0.0, 
                oper_agency_acronym: "operTest3", 
                outofservice: false, 
                parent_record_id: "parentTest3", 
                total_bldg_gross_sq_ft: 200000, 
                year_built: "1903.0" , 
            }, 
            {
                address: "address Test4", 
                bdbid: 9123, 
                building_name: "buildingNameTest4, K052 Campus: M183", 
                co2eui_breakdown: [
                    {
                    "bdbid": 9123,
                    "bldg_sqft": 192000,
                    "co2emissions_kg_sqft_site": 4.6839056,
                    "co2emissions_kg_sqft_source": 7.383769,
                    "fiscal_year": 2019,
                    "id": 145000,
                    "site_eui": 80.69169,
                    "source_eui": 117.46657,
                    "total_co2emissions_kg_site": 899309.8,
                    "total_co2emissions_kg_source": 1417683.6,
                    "total_site_energy_kbtu": 15492804,
                    "total_source_energy_kbtu": 22553582,
                    "updated_on": "2021-02-10T10:24:53.575000-05:00"
                    }
                    ], 
                energy_breakdown: "energyBreakdownTest4", 
                epapm_primary_function: "epapmTest4", 
                latitude: 0.0, 
                longitude: 0.0, 
                oper_agency_acronym: "operTest4", 
                outofservice: false, 
                parent_record_id: "parentTest4", 
                total_bldg_gross_sq_ft: 200000, 
                year_built: "1904.0" , 
            }, 
        ]
    }
}