/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/FormManager.tsx
'use client';

import React, { ReactNode } from 'react';
import { useFormState } from '@/store/useFormState';

interface FormManagerProps {
    children: ReactNode;
}

const FormManager: React.FC<FormManagerProps> = ({ children }) => {
    const { formData, setFormData, resetFormData } = useFormState();

    return (
        <div className="w-full p-4 bg-gray-100 rounded-lg shadow">
            {/* <h2 className="text-lg font-bold mb-4">Form Manager</h2> */}
            {children}
        </div>
    );
};

export default FormManager;
