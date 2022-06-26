import React, { FC } from 'react';
import { Table } from 'react-bootstrap';
import styles from './ListSlots.module.scss';

interface ListSlotsProps { }

interface slotItem {
  id: number,
  slotText: string,
  capacity: number
}

const ListSlots: FC<ListSlotsProps> = () => {
  const storageData = localStorage.getItem('slotLists');
  const listItems: slotItem[] = storageData ? JSON.parse(storageData) : [];
  
  const sortByKey = (array: any, key: string) => {
    return array.sort(function(a: any, b: any) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  sortByKey(listItems, 'id');

  const allRows = listItems && listItems.length > 0 && listItems.map((item: slotItem) => {
    return <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.slotText}</td>
      <td>{item.capacity}</td>
      <td>Edit / Delete</td>
    </tr>
  });
  return (
    <div className={`${styles.ListSlots} flex-container flex-column h-100 relative p-x-s`}>
      <Table striped bordered hover className={`${styles['custom-table']}`}>
        <thead>
          <tr>
            <th></th>
            <th>Slot Timing</th>
            <th>Seating Capacity</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {allRows}
        </tbody>
      </Table>
    </div>
  );
};

export default ListSlots;
