import PersonModel from '../models/persons.model';
import PersonLogModel from '../models/person_logs.model';

export interface IPerson {
  _id: string;
  personal_id_number: string;
  fname: string;
  lname: string;
}

export async function createPerson(data: Omit<IPerson, '_id'>): Promise<IPerson> {
  const person = await PersonModel.create(data);
  const result = person.toObject({ flattenObjectIds: true }) as IPerson;
  await PersonLogModel.create({ ref_id: result._id, data: result, action: 'create' });
  return result;
}

export async function getPersons(): Promise<IPerson[]> {
  const persons = await PersonModel.find();
  return persons.map((p) => p.toObject({ flattenObjectIds: true })) as IPerson[];
}

export async function updatePerson(id: string, data: Partial<IPerson>): Promise<IPerson | null> {
  const person = await PersonModel.findByIdAndUpdate(id, data, { new: true });
  if (person) {
    const result = person.toObject({ flattenObjectIds: true }) as IPerson;
    await PersonLogModel.create({ ref_id: id, data: result, action: 'update' });
    return result;
  }
  return null;
}

export async function deletePerson(id: string): Promise<IPerson | null> {
  const person = await PersonModel.findByIdAndDelete(id);
  if (person) {
    const result = person.toObject({ flattenObjectIds: true }) as IPerson;
    await PersonLogModel.create({ ref_id: id, data: result, action: 'delete' });
    return result;
  }
  return null;
}

export async function getPersonLogs() {
  return await PersonLogModel.find().sort({ action_at: -1 });
}
