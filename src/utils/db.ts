import { open } from 'react-native-quick-sqlite';

import School from '../models/School';

function createConnection() {
  return open({ name: 'BantuSekolah.sqlite', location: 'default' });
}

export async function createTables() {
  const db = createConnection();
  const result = await db.executeAsync(
    'CREATE TABLE IF NOT EXISTS schools (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT, isEligible BOOLEAN);',
  );

  return result;
}

export async function insertSchool(
  name: string,
  address: string,
  isEligible: boolean,
): Promise<School> {
  const db = createConnection();
  const { insertId } = await db.executeAsync(
    'INSERT INTO schools (name, address, isEligible) VALUES (?, ?, ?);',
    [name, address, isEligible],
  );

  const school = new School(insertId ?? 0, name, address, isEligible);

  return school;
}

export async function getSchools(): Promise<School[]> {
  const schools: School[] = [];

  const db = createConnection();
  const result = await db.executeAsync('SELECT * FROM schools;');

  for (let i = 0; i < (result.rows?.length ?? 0); i++) {
    const item = result.rows?.item(i);
    const school = new School(
      item.id,
      item.name,
      item.address,
      item.isEligible,
    );

    schools.push(school);
  }

  return schools;
}

export async function deleteSchool(school: School) {
  const db = createConnection();
  await db.executeAsync('DELETE FROM Schools WHERE id = ?;', [school.getId()]);

  return school;
}
