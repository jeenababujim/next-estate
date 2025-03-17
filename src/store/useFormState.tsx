/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/useFormState.tsx
'use client';

import { create } from 'zustand';

interface FormState {
    formData: {
        name: string;
        description: string;
        address: string;
        bedrooms: number;
        bathrooms: number;
        regularPrice: string;
        discountPrice: string;
        sale: boolean;
        rent: boolean;
        parking: boolean;
        furnished: boolean;
        offer: boolean;
        file: File | null;
        preview: string | null;
        uploadedFileUrl: string | null;
        loading: boolean; 
    };
  
    setFormData: (field: string, value: any) => void;
    resetFormData: () => void;
}

export const useFormState = create<FormState>((set) => ({
    formData: {
        name: '',
        description: '',
        address: '',
        bedrooms: 0,
        bathrooms: 0,
        regularPrice: '',
        discountPrice: '',
        sale: false,
        rent: false,
        parking: false,
        furnished: false,
        offer: false,
        file: null,
        preview: null,
        uploadedFileUrl: null,
        loading: false, 
    },
   
    setFormData: (field, value) =>
        set((state) => ({
            formData: {
                ...state.formData,
                [field]: value,
               
            },
        })),






    resetFormData: () =>
        set({
            formData: {
                name: '',
                description: '',
                address: '',
                bedrooms: 1,
                bathrooms: 1,
                regularPrice: '',
                discountPrice: '',
                sale: false,
                rent: false,
                parking: false,
                furnished: false,
                offer: false,
                file: null,
                preview: null,
                uploadedFileUrl: null,
                loading: false,
            },
        }),

}));
