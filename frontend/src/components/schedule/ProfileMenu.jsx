import {IconButton} from "../../styles/components/Common.styles";
import {ChevronDown, User} from "lucide-react";
import {DropdownItem, ProfileDropdown} from "../../styles/components/Profile.styles";
import {useNavigate} from "react-router-dom";
import {deleteUser} from "../../api/user";


const ProfileMenu = ({ isOpen, onToggle }) => {
    const navigate = useNavigate();

    const handleDeleteUser = async () => {
        const confirmDelete = window.confirm("회원을 탈퇴하시겠습니까?");
        if (confirmDelete) {
            try {
                await deleteUser();
                alert("회원탈퇴가 완료되었습니다.");
                navigate("/");
            } catch (error) {
                console.error("회원 탈퇴 실패", error);
                alert("회원 탈퇴 중 문제가 발생했습니다.");
            }
        }
    };

    return (
        <div style={{ position: 'relative'}}>
            <IconButton onClick={onToggle}>
                <User size={20} />
                내 정보
                <ChevronDown
                    size={16}
                    style={{
                        transform:isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s'
                    }}
                />
            </IconButton>

            {isOpen && (
                <ProfileDropdown>
                    <DropdownItem onClick={() => navigate('/users/me')}>
                        내 정보 수정</DropdownItem>
                    <DropdownItem onClick={() => navigate('/schedules/all')}>
                        내 일정
                    </DropdownItem>
                    <DropdownItem onClick={handleDeleteUser}>
                        회원 탈퇴
                    </DropdownItem>
                </ProfileDropdown>
            )}
        </div>
    );
};

export default ProfileMenu;