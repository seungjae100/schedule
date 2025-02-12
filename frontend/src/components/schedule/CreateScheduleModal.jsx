import React, {useEffect} from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import {
    ModalOverlay,
    ModalContainer as ScheduleModal
} from '../../styles/components/Modal.styles';
import {
    Form as ModalForm,
    FormGroup,
    TextArea,
    Select
} from '../../styles/components/Form.styles';
import { ModalButtons } from '../../styles/components/Modal.styles';
import {SCHEDULE_CATEGORIES} from "../../constants/scheduleConstants";

const CreateScheduleModal = ({ isOpen, onClose, onSubmit, newEvent, setNewEvent }) => {
    useEffect(() => {

    }, [newEvent.category]);

    if (!isOpen) return null;

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;


        setNewEvent(prevState => ({
            ...prevState,
            category: selectedCategory
        }));

        setTimeout(() => {
        }, 100);
    };


    return (
        <>
            <ModalOverlay onClick={onClose} />
            <ScheduleModal>
                <ModalForm onSubmit={onSubmit}>
                    <FormGroup>
                        <label>제목</label>
                        <Input
                            type="text"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>카테고리</label>
                        <Select
                            value={newEvent.category}
                            onChange={handleCategoryChange}
                            required
                        >
                            {Object.values(SCHEDULE_CATEGORIES).map(category => (
                                <option key={category.value} value={category.value}>
                                    {category.label}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <label>시작 일시</label>
                        <Input
                            type="datetime-local"
                            value={newEvent.startDate}
                            onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>종료 일시</label>
                        <Input
                            type="datetime-local"
                            value={newEvent.endDate}
                            onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>설명</label>
                        <TextArea
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                        />
                    </FormGroup>
                    <ModalButtons>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            취소
                        </Button>
                        <Button type="submit" variant="primary">
                            저장
                        </Button>
                    </ModalButtons>
                </ModalForm>
            </ScheduleModal>
        </>
    );
};

export default CreateScheduleModal;
