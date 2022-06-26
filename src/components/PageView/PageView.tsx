import React, { FC } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import styles from './PageView.module.scss';
import "react-datepicker/dist/react-datepicker.css";
import CreateSlots from '../CreateSlots/CreateSlots';
import ListSlots from '../ListSlots/ListSlots';
interface PageViewProps {
}

const PageView: FC<PageViewProps> = () => {
  return (
    <div className={`${styles.PageView} p-s h-100 flex-container flex-column`}>
      <div className={`flex-container justify-between ${styles['page-header']}`}>
        <div>Create slots</div>
        <div className="flex-container">
          <span className={styles['bread-crum-text']}>
            Appointments <span>&nbsp;&gt;&nbsp;</span>Create Slots
          </span>
        </div>
      </div>
      <div className={`${styles['page-content']} flex-container flex-column h-100`}>
        <Tabs defaultActiveKey="home" className={`${styles['tab-container']}`}>
          <Tab eventKey="home" title="Create Bulk 15 Min. Slots" className={`${styles['tab-content']}`}>
            <CreateSlots />
          </Tab>
          <Tab eventKey="profile" title="List Slots" className={`${styles['tab-content']}`}>
            <ListSlots />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default PageView;
