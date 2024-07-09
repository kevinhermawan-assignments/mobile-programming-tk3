import React, { createContext, useContext, useEffect, useState } from 'react';

import School from '../models/School';
import {
  createTables,
  deleteSchool,
  getSchools,
  insertSchool,
} from '../utils/db';

type AppContextType = {
  schools: School[];
  onAddSchool: (
    name: string,
    address: string,
    isEligible: boolean,
  ) => Promise<void>;
  onDeleteSchool: (school: School) => Promise<void>;
};

const AppContext = createContext<AppContextType>({
  schools: [],
  onAddSchool: async () => {},
  onDeleteSchool: async () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    createTables().then(async () => {
      const data = await getSchools();
      const sortedData = data.sort((a, b) => {
        return Number(b.getId()) - Number(a.getId());
      });

      setSchools(sortedData);
    });
  }, []);

  async function onAddSchool(
    name: string,
    address: string,
    isEligible: boolean,
  ) {
    const school = await insertSchool(name, address, isEligible);
    const updatedSchools = [school, ...schools];

    setSchools(updatedSchools);
  }

  async function onDeleteSchool(data: School) {
    const school = await deleteSchool(data);
    const updatedSchools = schools.filter(s => s.getId() !== school.getId());

    setSchools(updatedSchools);
  }

  return (
    <AppContext.Provider
      value={{
        schools,
        onAddSchool,
        onDeleteSchool,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
