
import {Form as ModalForm,FormGroup, Select, TextArea} from "../../styles/components/Form.styles";
import React from "react";
import Input from "../common/Input";
import {SCHEDULE_CATEGORIES} from "../../constants/scheduleConstants";
import Button from "../common/Button";
import {ModalOverlay, ModalContainer as ScheduleModal, ModalButtons} from "../../styles/components/Modal.styles";

const ModifyScheduleModal = ({ isOpen,
                                 onClose,
                                 onSubmit,
                                 modifyEvent,
                                 setModifyEvent  }) => {
    if(!isOpen) return null;

    const handleCategoryChange = (e) => {
        setModifyEvent({
            ...modifyEvent,
            category: e.target.value
        });
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
                            value={modifyEvent.title}
                            onChange={(e) => setModifyEvent({...modifyEvent, title:e.target.value})}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>시작 일시</label>
                        <Input
                            type="datetime-local"
                            value={modifyEvent.startDate}
                            onChange={(e) => setModifyEvent({...modifyEvent, startDate: e.target.value})}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>종료 일시</label>
                        <Input
                            type="datetime-local"
                            value={modifyEvent.endDate}
                            onChange={(e) => setModifyEvent({...modifyEvent, endDate: e.target.value})}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>설명</label>
                        <TextArea
                            value={modifyEvent.description}
                            onChange={(e) => setModifyEvent({...modifyEvent, description: e.target.value})}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>카테고리</label>
                        <Select
                            value={modifyEvent.category || 'WORK'}
                            onChange={handleCategoryChange}
                            required
                        >
                            {Object.values(SCHEDULE_CATEGORIES).map((category) => (
                                <option key={category.value} value={category.value}>
                                    {category.label}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>
                    <ModalButtons>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            취소
                        </Button>
                        <Button type="submit" variant="primary">
                            수정
                        </Button>
                    </ModalButtons>
                </ModalForm>
            </ScheduleModal>
        </>
    );
};

export default ModifyScheduleModal;