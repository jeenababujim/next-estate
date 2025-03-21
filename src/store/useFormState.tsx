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
        // sale: boolean;
        // rent: boolean;
        type:string;
        parking: boolean;
        furnished: boolean;
        offer: boolean;
        files: File[] ;
        //file: File
        previews: string[] ;
        //preview: string
        uploadedFileUrl: string[];
        //uploadedFileUrl: string
        loading: boolean; 
    };
  
    setFormData: (field: string, value: any) => void;
    addFiles: (newFiles: File[]) => void;
    resetFormData: () => void;
}

export const useFormState = create<FormState>((set) => ({
    formData: {
        name: '',
        description: '',
        address: '',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: '',
        discountPrice: '',
        // sale: false,
        // rent: false,
        type:'rent',
        parking: false,
        furnished: false,
        offer: false,
        files: [],
        previews: [],
        uploadedFileUrl: [],
        // file: null,
        // preview: null,
        // uploadedFileUrl:null,
        loading: false, 
    },
   
    // setFormData: (field, value) =>
    //     set((state) => ({
    //         formData: {
    //             ...state.formData,
    //             [field]: value,
               
    //         },
    //     })),

    setFormData: (field, value) =>
        set((state) => ({
            formData: {
                ...state.formData,
                // If selecting "sale" or "rent", update the `type` field
                ...(field === "sale" || field === "rent"
                    ? { type: value ? field : "" }
                    : { [field]: value }),
            },
        })),

        addFiles: (newFiles: File[]) =>
            set((state) => {
                const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
                return {
                    formData: {
                        ...state.formData,
                        files: [...state.formData.files, ...newFiles], 
                        previews: [...state.formData.previews, ...newPreviews], 
                    },
                };
            }),




    resetFormData: () =>
        set({
            formData: {
                name: '',
                description: '',
                address: '',
                bedrooms: 1,
                bathrooms: 1,
                regularPrice: '50',
                discountPrice: '0',
                // sale: false,
                // rent: false,
                type:'rent',
                parking: false,
                furnished: false,
                offer: false,
                files: [],
                previews: [],
                uploadedFileUrl:[],
                // file: null,
                // previews: null,
                // uploadedFileUrl:null,
                loading: false,
            },
        }),

}));
