import React, { FC } from 'react';
import { Accordion } from 'react-bootstrap';
import styles from './SideBar.module.scss';

interface SideBarProps { }

const SideBar: FC<SideBarProps> = () => (
  <div className={`${styles.SideBar} p-s h-100 flex-container flex-column`}>
    <div className={`${styles['side-menu-option']} top-options`}>
      <span>
        Overview
      </span>
    </div>
    <div className="flex-container flex-1">
      <Accordion defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0" className={styles['accordion-item']}>
          <Accordion.Header className={styles['accordion-button']}>Appointments</Accordion.Header>
          <Accordion.Body className={styles['accordion-body']}>
            <div className={`cursor-pointer ${styles['item']}`}>Create Slots</div>
            <div className={`cursor-pointer ${styles['item']}`}>List Slots</div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
    <div className={`${styles['bottom-options']} flex-container flex-column`}>
      <div className={styles['side-menu-option']}>
        <span>
          Support
        </span>
      </div>
      <div className={styles['side-menu-option']}>
        <span>
          Logout
        </span>
      </div>
    </div>
  </div>
);

export default SideBar;
