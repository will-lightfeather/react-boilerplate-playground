import { Alert, Card, Table, TableData } from '@team-lightfeather/ui-react-assets';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { CellProps, Column } from 'react-table';

import { useGetUsers, User } from '@/api/User';

export const UsersList = () => {
  const userQuery = useGetUsers();

  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (userQuery.isError) {
    return (
      <Alert type='error'>
        <Alert.Text>Error retrieving users!</Alert.Text>
      </Alert>
    );
  }

  const renderCell = ({ cell }: CellProps<User>) => {
    return <Link to={`/users/${cell.row?.original?.id}`}>View</Link>;
  };

  const columns: Column<TableData>[] = [
    {
      Header: 'Date',
      accessor: 'recordDate',
      Cell: ({ value }: { value: string }) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Email Address',
      accessor: 'email',
    },
    {
      Header: '',
      accessor: 'view',
      Cell: renderCell,
      disableSortBy: true,
    },
  ];
  return (
    <>
      <Card.Group>
        <Card className='padding-bottom-2 width-full'>
          <Card.Header>Users</Card.Header>
          <Card.Body>
            <Table sortable columns={columns} data={userQuery.data as unknown as TableData[]} />
          </Card.Body>
        </Card>
      </Card.Group>
    </>
  );
};
