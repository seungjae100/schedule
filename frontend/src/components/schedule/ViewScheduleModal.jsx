import {ModalButtons, ModalContent, ModalOverlay, ModalText, ModalTitle,
        ModalContainer as ScheduleModal} from "../../styles/components/Modal.styles";
import Button from "../common/Button";
import React from "react";
import {SCHEDULE_CATEGORIES} from "../../constants/scheduleConstants";

const ViewScheduleModal = ({ isOpen, onClose, event, onEdit, onDelete}) => {
    if (!isOpen) return null;

    return (
        <>
            <ModalOverlay onClick={onClose} />
            <ScheduleModal>
                <ModalTitle>{event.title}</ModalTitle>
                <ModalContent>
                    <ModalText>카테고리: {SCHEDULE_CATEGORIES[event.category].label}</ModalText>
                    <ModalText>시작: {new Date(event.start).toLocaleString()}</ModalText>
                    <ModalText>종료: {new Date(event.end).toLocaleString()}</ModalText>
                    <ModalText>설명: {event.description}</ModalText>
                </ModalContent>
                <ModalButtons>
                    <Button variant="secondary" onClick={onEdit}>수정</Button>
                    <Button variant="danger" onClick={onDelete}>삭제</Button>
                    <Button variant="primary" onClick={onClose}>닫기</Button>
                </ModalButtons>
            </ScheduleModal>
        </>
    );
};

export default ViewScheduleModal;