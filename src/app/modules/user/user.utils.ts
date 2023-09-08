import { User } from './user.model';

// manager ID
export const findLastManagerId = async (): Promise<string | null> => {
  const lastManager = await User.findOne(
    {
      role: 'manager',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastManager?.id ? lastManager.id.substring(7) : null;
};

export const generateManagerId = async (): Promise<string> => {
  const lastManagerId =
    (await findLastManagerId()) || (0).toString().padStart(5, '0'); //00000

  //increment by 1
  let incrementedId = (parseInt(lastManagerId) + 1).toString().padStart(5, '0');

  incrementedId = `manager${incrementedId}`;

  return incrementedId;
};

// admin ID
export const findLastAdminId = async (): Promise<string | null> => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(5) : null;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `admin${incrementedId}`;

  return incrementedId;
};
