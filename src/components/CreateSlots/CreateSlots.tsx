import React, { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './CreateSlots.module.scss';

interface CreateSlotsProps {
}

interface ValidationProps {
  message: {
    timeRange: string[],
    capacity: string[]
  },
  isFromHHValid: boolean,
  isFromMMValid: boolean,
  isToHHValid: boolean,
  isToMMValid: boolean,
  isTimeRangeValid: boolean,
  isCapacityValid: boolean,
  isFormValid: boolean
};

interface DateStatus {
  status: boolean,
  fromDate?: number,
  toDate?: number
}

interface slotItem {
  id: number,
  slotText: string,
  capacity: number
}

const CreateSlots: FC<CreateSlotsProps> = (props) => {
  const numberRegex = '^[0-9]+$';
  const [createSlotObj, setSlotObj] = useState({
    startDate: new Date(),
    fromHH: '',
    fromMM: '',
    toHH: '',
    toMM: '',
    capacity: '1'
  });

  const [validation, setError] = useState<ValidationProps>({
    message: {
      timeRange: [],
      capacity: []
    },
    isFromHHValid: true,
    isFromMMValid: true,
    isToHHValid: true,
    isToMMValid: true,
    isTimeRangeValid: false,
    isCapacityValid: true,
    isFormValid: false
  });

  const setAnswerVal = (keyName: string, keyValue: any) => {
    setSlotObj(prevState => {
      return { ...prevState, [keyName]: keyValue };
    });
  };

  const validateTime = () => {
    const validNumber = new RegExp(numberRegex);
    let errorMessage: string[] = [];
    let isFromHHValid = true;
    let isFromMMValid = true;
    let isToHHValid = true;
    let isToMMValid = true;
    if (createSlotObj.fromHH) {
      const fromHH = createSlotObj.fromHH;
      if (!validNumber.test(fromHH)) {
        isFromHHValid = false;
        errorMessage.push(
          `Starting Hour has invalid Input. Only Numeric Characters allowed.`
        );
      } else if (Number(fromHH) > 23) {
        isFromHHValid = false;
        errorMessage.push(
          `Starting Hour has invalid value. It should be between 1-23.`
        );
      }
    } else {
      isFromHHValid = false;
      errorMessage.push(
        `Input value required!`
      );
    }
    if (createSlotObj.fromMM) {
      const fromMM = createSlotObj.fromMM;
      if (!validNumber.test(fromMM)) {
        isFromMMValid = false;
        errorMessage.push(`Starting Minute has invalid Input. Only Numeric Characters allowed.`);
      } else if (!(Number(fromMM) === 15 || Number(fromMM) === 30 || Number(fromMM) === 45 || Number(fromMM) === 0)) {
        isFromMMValid = false;
        errorMessage.push(`Starting Minute has invalid value. It should be one of these 15, 30, 45, 00.`);
      }
    } else {
      isFromMMValid = false;
      errorMessage.push(
        `Input value required!`
      );
    }
    if (createSlotObj.toHH) {
      const toHH = createSlotObj.toHH;
      if (!validNumber.test(toHH)) {
        isToHHValid = false;
        errorMessage.push(`Ending Hour has invalid Input. Only Numeric Characters allowed.`);
      } else if (Number(toHH) > 23) {
        isToHHValid = false;
        errorMessage.push(`Ending Hour has invalid value. It should be between 1-23.`);
      }
    } else {
      isToHHValid = false;
      errorMessage.push(
        `Input value required!`
      );
    }
    if (createSlotObj.toMM) {
      const toMM = createSlotObj.toMM;
      if (!validNumber.test(toMM)) {
        isToMMValid = false;
        errorMessage.push(`Ending Minute has invalid Input. Only Numeric Characters allowed.`);
      } else if (!(Number(toMM) === 15 || Number(toMM) === 30 || Number(toMM) === 45 || Number(toMM) === 0)) {
        isToMMValid = false;
        errorMessage.push(`Ending Minute has invalid value. It should be one of these 15, 30, 45, 00.`);
      }
    } else {
      isToMMValid = false;
      errorMessage.push(
        `Input value required!`
      );
    }
    const errorObj: ValidationProps = {
      message: {
        timeRange: errorMessage,
        capacity: validation.message.capacity
      },
      isFromHHValid,
      isFromMMValid,
      isToHHValid,
      isToMMValid,
      isTimeRangeValid: isFromHHValid && isFromMMValid && isToHHValid && isToMMValid,
      isCapacityValid: validation.isCapacityValid,
      isFormValid: isFromHHValid && isFromMMValid && isToHHValid && isToMMValid && validation.isCapacityValid
    };

    setError((prevState: ValidationProps) => {
      return errorObj;
    });
  };

  const validateCapacity = () => {
    const validNumber = new RegExp(numberRegex);
    let isFormValid = true;
    let errorMessage: string[] = [];

    if (createSlotObj.capacity) {
      if (!validNumber.test(createSlotObj.capacity)) {
        isFormValid = false;
        errorMessage.push('Slots has invalid Input. Only Numeric Characters allowed.');
      }
    } else {
      isFormValid = false;
      errorMessage.push(
        `Input value required!`
      );
    }
    const errorObj: ValidationProps = {
      message: {
        timeRange: validation.message.timeRange,
        capacity: errorMessage
      },
      isFromHHValid: validation.isFromHHValid,
      isFromMMValid: validation.isFromMMValid,
      isToHHValid: validation.isToHHValid,
      isToMMValid: validation.isToMMValid,
      isTimeRangeValid: validation.isTimeRangeValid,
      isCapacityValid: isFormValid,
      isFormValid: isFormValid && validation.isTimeRangeValid
    };

    setError((prevState: ValidationProps) => {
      return errorObj;
    });
  };

  const validateForm = (): DateStatus => {
    if (validation.isFormValid) {
      const fromDate = createSlotObj.startDate
        .setHours(Number(createSlotObj.fromHH), Number(createSlotObj.fromMM), 0);
      const toDate = createSlotObj.startDate
        .setHours(Number(createSlotObj.toHH), Number(createSlotObj.toMM) + 15, 0);
      if (fromDate >= toDate) {
        alert('Slot End timing must be greater than Slot Start Timing.');
        return {
          status: false
        };
      } else {
        return {
          status: true,
          fromDate: fromDate,
          toDate: toDate
        }
      }
    }
    return {
      status: false
    };
  };

  const allotSlot = () => {
    const { status, fromDate, toDate } = validateForm();
    if (status && fromDate && toDate) {
      const newFromDate = new Date(fromDate).valueOf();
      const newToDate = new Date(toDate).valueOf();
      const datediff: any = newToDate - newFromDate;
      const diffInMinutes: any = Math.floor((datediff / 1000) / 60);
      const availSlots = diffInMinutes / 15;
      const capacity = createSlotObj.capacity;

      const avgSlotCapacity = availSlots > Number(capacity) ? 1 : Math.floor(Number(capacity) / availSlots);
      const slotLists: slotItem[] = [];
      let startDate = new Date(fromDate);
      let remaingCapacity = Number(capacity);
      for (let i = availSlots; i >= 1; i--) {
        const endDate = new Date(startDate.getTime() + 15 * 60000);
        const fHH = startDate.getHours();
        const fMM = startDate.getMinutes() === 0 ? '00' : startDate.getMinutes();
        const tHH = endDate.getHours();
        const tMM = endDate.getMinutes() === 0 ? '00' : endDate.getMinutes();
        const slotText = fHH + ':' + fMM + ' - ' + tHH + ':' + tMM;
        slotLists.push({
          id: i,
          slotText,
          capacity: remaingCapacity > 0 ? avgSlotCapacity : 0
        });
        remaingCapacity -= avgSlotCapacity;
        startDate = new Date(endDate);
      }
      if (remaingCapacity > 0) {
        renderAdditionalCapacity(availSlots, remaingCapacity, slotLists, new Date(fromDate), avgSlotCapacity, new Date(fromDate));
      }
      localStorage.setItem('slotLists', JSON.stringify(slotLists));
      alert('Slots created Successfully');
    }
  };

  const renderAdditionalCapacity = (availSlots: number, remaingCapacity: number, slotLists: slotItem[], startDate: Date, avgSlotCapacity: number, beginingDate: Date) => {
    for (let i = availSlots; i >= 1; i--) {
      const endDate = new Date(startDate.getTime() + 15 * 60000);
      const fHH = startDate.getHours();
      const fMM = startDate.getMinutes() === 0 ? '00' : startDate.getMinutes();
      const tHH = endDate.getHours();
      const tMM = endDate.getMinutes() === 0 ? '00' : endDate.getMinutes();
      const filteredItem = slotLists.filter(slot => slot.id === i)[0];
      if (filteredItem) {
        filteredItem.capacity += avgSlotCapacity > remaingCapacity ? remaingCapacity : avgSlotCapacity;
      }
      remaingCapacity -= avgSlotCapacity;
      startDate = new Date(endDate);
      if (remaingCapacity <= 0) {
        break;
      }
    }
    if (remaingCapacity > 0) {
      renderAdditionalCapacity(availSlots, remaingCapacity, slotLists, new Date(beginingDate), avgSlotCapacity, new Date(beginingDate));
    }
  };

  return (
    <div className={`${styles.CreateSlots} flex-container flex-column h-100 relative`}>
      <div className={`flex-container justify-between ${styles['section-container']}`}>
        <div className={`${styles['date-field']}`}>
          <div className={`flex-column flex-container m-b-xs`}>
            <span className={`${styles['header']}`}>1. SELECT Date of Appointment *</span>
            <span className={`${styles['sub-header']}`}>Please select the dates that you'd like to open up slots.</span>
          </div>
          <div className={`relative`}>
            <DatePicker
              inline
              selected={createSlotObj.startDate}
              minDate={new Date()}
              calendarClassName="calendar-custom-class"
              disabledKeyboardNavigation
              onChange={(date: any) => setAnswerVal('startDate', date)}
            />
          </div>
        </div>
        <div className={`${styles['time-field']}`}>
          <div className={`flex-column flex-container m-b-xs`}>
            <span className={`${styles['header']}`}>2. SELECT The Hours *</span>
            <span className={`${styles['sub-header']}`}>Please select the Start and End Time.</span>
          </div>
          <div className={`${styles['time-container']} flex-container flex-column`}>
            <div className={`flex-container`}>
              <div className={`${styles['from-time']} flex-container flex-column`}>
                <div className={`flex-container`}>
                  <div className={`flex-container flex-column`}>
                    <label className={`m-b-xxs`}>Start Hour</label>
                    <input className={`text mini ${validation.isFromHHValid ? '' : 'inValid'}`} maxLength={2} pattern="[0-9]"
                      value={createSlotObj.fromHH}
                      onChange={(e: any) => setAnswerVal('fromHH', e.target.value)}
                      onBlur={(e: any) => validateTime()} />
                  </div>
                  <div className={`flex-container flex-column m-l-xs`}>
                    <label className={`m-b-xxs`}>Minute</label>
                    <input className={`text mini ${validation.isFromMMValid ? '' : 'inValid'}`} maxLength={2} pattern="[0-9]"
                      value={createSlotObj.fromMM}
                      onChange={(e: any) => setAnswerVal('fromMM', e.target.value)}
                      onBlur={(e: any) => validateTime()} />
                  </div>
                </div>
                <div className={`grey-text m-t-xxs`}>Please select the Start Time.</div>
              </div>
              <div className={`${styles['separator']} m-l-xs m-r-xs`}>:</div>
              <div className={`${styles['to-time']} flex-container flex-column`}>
                <div className={`flex-container`}>
                  <div className={`flex-container flex-column`}>
                    <label className={`m-b-xxs`}>End Hour</label>
                    <input className={`text mini ${validation.isToHHValid ? '' : 'inValid'}`} maxLength={2} pattern="[0-9]"
                      value={createSlotObj.toHH}
                      onChange={(e: any) => setAnswerVal('toHH', e.target.value)}
                      onBlur={(e: any) => validateTime()} />
                  </div>
                  <div className={`flex-container flex-column m-l-xs`}>
                    <label className={`m-b-xxs`}>Minute</label>
                    <input className={`text mini ${validation.isToMMValid ? '' : 'inValid'}`} maxLength={2} pattern="[0-9]"
                      value={createSlotObj.toMM}
                      onChange={(e: any) => setAnswerVal('toMM', e.target.value)}
                      onBlur={(e: any) => validateTime()} />
                  </div>
                </div>
                <div className={`grey-text m-t-xxs`}>Please select the time your last 15 min Block Starts</div>
              </div>
            </div>

            {validation.message.timeRange.length > 0 ?
              validation.message.timeRange.map((message, index) => {
                return <div className={'error m-t-xxs m-b-xxs'} key={index}>
                  {index + 1}. {message}
                </div>
              })
              : null
            }
          </div>
        </div>
        <div className={`${styles['seating-capacity']} flex-container flex-column`}>
          <div>
            <div className={`flex-column flex-container m-b-xs`}>
              <span className={`${styles['header']}`}>3. Choose Seating Capacity *</span>
              <span className={`${styles['sub-header']}`}>Please enter total Seating Capacity.</span>
            </div>
            <div className={`relative flex-container m-t-s`}>
              <input className={`text ${validation.isCapacityValid ? '' : 'inValid'}`}
                maxLength={3}
                value={createSlotObj.capacity}
                onBlur={(e: any) => validateCapacity()}
                onChange={(e: any) => setAnswerVal('capacity', e.target.value)}
              />
            </div>
          </div>
          <div>
            {validation.message.capacity.length > 0 ?
              validation.message.capacity.map((message, index) => {
                return <div className={'error m-t-xxs m-b-xxs'} key={index}>
                  {index + 1}. {message}
                </div>
              })
              : null
            }
          </div>

        </div>
      </div>
      <div className={`${styles['action']} m-l-xs m-t-l`}>
        <Button variant="primary" disabled={!validation.isFormValid}
          onClick={e => allotSlot()}>Create Slots</Button>{' '}
      </div>
    </div>
  );
}

export default CreateSlots;
