import {IconButton} from "../../styles/components/Common.styles";
import {ChevronDown, User} from "lucide-react";
import {DropdownItem, ProfileDropdown} from "../../styles/components/Profile.styles";
import {useNavigate} from "react-router-dom";


const ProfileMenu = ({ isOpen, onToggle }) => {
    const navigate = useNavigate();

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
                </ProfileDropdown>
            )}
        </div>
    );
};

export default ProfileMenu;