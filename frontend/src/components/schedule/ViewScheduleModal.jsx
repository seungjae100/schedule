import {ModalButtons, ModalContent, ModalOverlay, ModalText, ModalTitle,
        ModalContainer as ScheduleModal} from "../../styles/components/Modal.styles";
import Button from "../common/Button";
import React from "react";
import {SCHEDULE_CATEGORIES} from "../../constants/scheduleConstants";

const ViewScheduleModal = ({ isOpen, onClose, event, onEdit, onDelete}) => {
    if (!isOpen || !event) return null;

    // 카테고리를 안전하게 가져오는 함수
    const getCategoryLabel = () => {
        if (!event.extendedProps?.category || ! SCHEDULE_CATEGORIES[event.extendedProps]) {
            return '알 수 없음';
        }
        return SCHEDULE_CATEGORIES[event.extendedProps].label;
    };

    return (
        <>
            <ModalOverlay onClick={onClose} />
            <ScheduleModal>
                <ModalTitle>{event.title}</ModalTitle>
                <ModalContent>
                    <ModalText>카테고리: {SCHEDULE_CATEGORIES[event.extendedProps?.category]?.label || '알 수 없음'}</ModalText>
                    <ModalText>시작: {new Date(event.start).toLocaleString()}</ModalText>
                    <ModalText>종료: {new Date(event.end).toLocaleString()}</ModalText>
                    <ModalText>설명: {event.extendedProps?.description || ''}</ModalText>
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