"use client";
import RegistrationForm from "@/forms/registration.form";
import CustomModal from "@/components/common/modal";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegistrationModal = ({isOpen, onClose}: IProps) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Create account">
            <RegistrationForm onClose={onClose}/>
        </CustomModal>
    )
}
export default RegistrationModal